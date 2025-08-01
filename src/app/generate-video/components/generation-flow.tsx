"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { Download, RefreshCw, Check, X, Sparkles } from "lucide-react"
import { createProject, startImageGeneration, pollTaskStatus, getProjectAssets, createVideo, Project, Asset, EraPreset } from "../lib/api"

interface GenerationFlowProps {
    selectedEra: EraPreset
    projectConfig: { duration: number; ratio: string; title?: string }
    onProjectCreated: (project: Project) => void
    onGenerationComplete: () => void
    onStartOver: () => void
}

type GenerationPhase = "creating" | "generating-images" | "reviewing-images" | "generating-video" | "completed" | "error"

export default function GenerationFlow({
    selectedEra,
    projectConfig,
    onProjectCreated,
    onGenerationComplete,
    onStartOver
}: GenerationFlowProps) {
    const [currentPhase, setCurrentPhase] = useState<GenerationPhase>("creating")
    const [project, setProject] = useState<Project | null>(null)
    const [progress, setProgress] = useState(0)
    const [currentMessage, setCurrentMessage] = useState("")
    const [generatedAssets, setGeneratedAssets] = useState<Asset[]>([])
    const [selectedAssets, setSelectedAssets] = useState<Asset[]>([])
    const [error, setError] = useState<string | null>(null)
    const [stableVideoUrl, setStableVideoUrl] = useState<string | null>(null)
    const hasStarted = useRef(false)

    // Auto-switch to completed if we have a video URL (failsafe) - ONLY if not already completed
    useEffect(() => {
        if (project?.final_video_url && currentPhase !== "completed" && currentPhase !== "error") {
            console.log("🎯 Auto-switching to completed because video URL is available:", project.final_video_url)
            setCurrentPhase("completed")
            // Set stable video URL to prevent it from disappearing
            if (!stableVideoUrl) {
                setStableVideoUrl(project.final_video_url)
            }
        }
    }, [project?.final_video_url, currentPhase, stableVideoUrl])

    // Set stable video URL whenever we get a video URL (prevents loss during re-renders)
    useEffect(() => {
        if (project?.final_video_url && !stableVideoUrl) {
            console.log("🔒 Setting stable video URL:", project.final_video_url)
            setStableVideoUrl(project.final_video_url)
        }
    }, [project?.final_video_url, stableVideoUrl])
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null

        // ONLY check if we're in completed phase, don't have video URL, AND project exists
        if (currentPhase === "completed" && !project?.final_video_url && project?.id) {
            console.log("🔄 Starting periodic check for video URL...")

            intervalId = setInterval(async () => {
                try {
                    // Double-check that we still don't have the video URL before making API call
                    if (project?.final_video_url) {
                        console.log("🔄 Video URL already exists, stopping periodic check")
                        if (intervalId) clearInterval(intervalId)
                        return
                    }

                    const { getProject } = await import("../lib/api")
                    const updatedProject = await getProject(project.id)

                    console.log("🔄 Periodic check - Updated project:", {
                        id: updatedProject.id,
                        status: updatedProject.status,
                        final_video_url: updatedProject.final_video_url
                    })

                    if (updatedProject.final_video_url) {
                        console.log("✅ Video URL found during periodic check!")
                        setProject(updatedProject)
                        // Set stable video URL to prevent loss
                        if (!stableVideoUrl) {
                            setStableVideoUrl(updatedProject.final_video_url)
                        }
                        // Clear interval immediately to prevent further checks
                        if (intervalId) {
                            clearInterval(intervalId)
                            intervalId = null
                        }
                    }
                } catch (error) {
                    console.error("Error during periodic check:", error)
                }
            }, 3000) // Check every 3 seconds
        }

        // Cleanup interval when component unmounts or conditions change
        return () => {
            if (intervalId) {
                console.log("🔄 Clearing periodic check interval")
                clearInterval(intervalId)
            }
        }
    }, [currentPhase, project?.final_video_url, project?.id])

    useEffect(() => {
        // Prevent double initialization with ref flag
        if (!hasStarted.current) {
            console.log("🚀 Starting project creation (first time)")
            hasStarted.current = true
            startProjectCreation()
        } else {
            console.log("⚠️ Prevented duplicate project creation")
        }
    }, [])

    const startProjectCreation = async () => {
        try {
            console.log("📋 Creating project with config:", { era: selectedEra.preset_name, duration: projectConfig.duration, ratio: projectConfig.ratio })
            setCurrentMessage("Creating your project...")
            const newProject = await createProject({
                title: projectConfig.title,
                era_preset: selectedEra.preset_name,
                duration: projectConfig.duration,
                ratio: projectConfig.ratio
            })

            console.log("✅ Project created successfully:", newProject.id)
            setProject(newProject)
            onProjectCreated(newProject)
            setCurrentPhase("generating-images")
            startImageGenerationFlow(newProject.id)

        } catch (err) {
            setError("Failed to create project. Please try again.")
            setCurrentPhase("error")
        }
    }

    const startImageGenerationFlow = async (projectId: number) => {
        try {
            setCurrentMessage("Starting AI image generation...")
            const taskResponse = await startImageGeneration(projectId)

            // Poll for completion
            await pollTaskStatus(
                taskResponse.task_id,
                (status) => {
                    setProgress(status.progress || 0)
                    setCurrentMessage(status.message || "Generating images...")
                }
            )

            // Get generated assets - wait a bit for database to be updated
            await new Promise(resolve => setTimeout(resolve, 1000))
            const assets = await getProjectAssets(projectId, 'image')

            console.log("Generated assets:", assets.map(a => ({ id: a.id, status: a.status, is_selected: a.is_selected })))

            // Filter only completed assets
            const completedAssets = assets.filter(asset => asset.status === 'completed')
            setGeneratedAssets(completedAssets)

            // Pre-select all completed assets (user can modify selection)
            const preSelectedAssets = completedAssets.map(asset => ({ ...asset, is_selected: true }))
            setSelectedAssets(preSelectedAssets)

            // Show review phase - user chooses when to proceed
            setCurrentPhase("reviewing-images")

        } catch (err) {
            setError("Image generation failed. Please try again.")
            setCurrentPhase("error")
        }
    }

    const handleImageSelection = (asset: Asset) => {
        setSelectedAssets(prev => {
            const isSelected = prev.some(a => a.id === asset.id)
            if (isSelected) {
                return prev.filter(a => a.id !== asset.id)
            } else {
                return [...prev, asset]
            }
        })
    }

    const startVideoGenerationWithAssets = async (assetsToUse: Asset[]) => {
        if (!project || assetsToUse.length === 0) return

        try {
            setCurrentPhase("generating-video")
            setProgress(0)
            setCurrentMessage("Creating your cinematic video...")

            // Validate assets before creating video
            const validAssets = assetsToUse.filter(asset =>
                asset.status === 'completed' &&
                asset.file_url &&
                asset.id
            )

            if (validAssets.length === 0) {
                throw new Error("No valid completed assets selected")
            }

            console.log("Creating video for project:", project.id)
            console.log("Using assets:", validAssets.map(a => ({ id: a.id, status: a.status, file_url: a.file_url })))
            console.log("Asset IDs being sent:", validAssets.map(a => a.id))

            const taskResponse = await createVideo(project.id, {
                selected_asset_ids: validAssets.map(a => a.id)
            })

            // Continue with the same polling logic...
            await handleVideoCreationPolling(taskResponse.task_id)
        } catch (err) {
            console.error("Video generation error:", err)

            setError("Video generation failed. Please try again.")
            setCurrentPhase("error")
        }
    }

    const startVideoGeneration = async () => {
        return startVideoGenerationWithAssets(selectedAssets)
    }

    const handleVideoCreationPolling = async (taskId: string) => {
        try {
            // Poll for completion
            const finalStatus = await pollTaskStatus(
                taskId,
                (status) => {
                    setProgress(status.progress || 0)
                    setCurrentMessage(status.message || "Generating video...")
                }
            )

            // Check if we have a final_task_id for the actual video creation
            if (finalStatus.result?.final_task_id) {
                setCurrentMessage("Creating final video...")
                console.log("Polling final task:", finalStatus.result.final_task_id)

                const finalTaskResult = await pollTaskStatus(
                    finalStatus.result.final_task_id,
                    (status) => {
                        setProgress(status.progress || 90)
                        setCurrentMessage(status.message || "Creating final video...")
                    }
                )

                console.log("Final task completed:", finalTaskResult)

                if (finalTaskResult.result?.final_video_url) {
                    console.log("✅ Final video URL from task:", finalTaskResult.result.final_video_url)
                    setStableVideoUrl(finalTaskResult.result.final_video_url)
                    setCurrentPhase("completed")
                    setCurrentMessage("Video ready!")
                    return
                }

                // Fallback: controlla il progetto
                await new Promise(resolve => setTimeout(resolve, 2000))
                const { getProject } = await import("../lib/api")
                const updatedProject = await getProject(project!.id)

                if (updatedProject.final_video_url) {
                    console.log("✅ Final video from project:", updatedProject.final_video_url)
                    setProject(updatedProject)
                    setStableVideoUrl(updatedProject.final_video_url)
                    setCurrentPhase("completed")
                    setCurrentMessage("Video ready!")
                    return
                }
            } else {
                setCurrentPhase("completed")
                onGenerationComplete()
            }

        } catch (err) {
            console.error("Video creation polling error:", err)
            setError("Video generation failed. Please try again.")
            setCurrentPhase("error")
        }
    }

    const getPhaseInfo = () => {
        switch (currentPhase) {
            case "creating":
                return { title: "Creating Project", subtitle: "Setting up your video generation" }
            case "generating-images":
                return { title: "AI Image Generation", subtitle: `Creating ${project?.num_images || 6} cinematic scenes` }
            case "reviewing-images":
                return { title: "Review & Select Images", subtitle: "Choose the best scenes for your video" }
            case "generating-video":
                return { title: "Video Generation", subtitle: "Bringing your images to life" }
            case "completed":
                return { title: "Generation Complete", subtitle: "Your cinematic video is ready!" }
            case "error":
                return { title: "Generation Error", subtitle: "Something went wrong" }
            default:
                return { title: "", subtitle: "" }
        }
    }

    const phaseInfo = getPhaseInfo()

    // Simplified rendering logic
    const hasVideoReady = !!(project?.final_video_url || stableVideoUrl)
    const videoUrlToUse = stableVideoUrl || project?.final_video_url
    const isError = currentPhase === "error"
    const isCompleted = currentPhase === "completed" || hasVideoReady
    const isReviewing = currentPhase === "reviewing-images" && !hasVideoReady
    const isGenerating = !isError && !isCompleted && !isReviewing

    console.log("🎬 Render decisions:", {
        currentPhase,
        hasVideoReady,
        videoUrl: project?.final_video_url,
        stableVideoUrl,
        videoUrlToUse,
        isError,
        isCompleted,
        isReviewing,
        isGenerating
    })

    const handleStartOver = () => {
        // Reset all local states completely
        setCurrentPhase("creating")
        setProject(null)
        setProgress(0)
        setCurrentMessage("")
        setGeneratedAssets([])
        setSelectedAssets([])
        setError(null)
        setStableVideoUrl(null)

        // Call parent's start over function to navigate back to era selection
        onStartOver()
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto w-full">
                <div className="text-center space-y-4 sm:space-y-6 mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        {phaseInfo.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        {phaseInfo.subtitle}
                    </p>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 shadow-xl text-center">
                        <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-red-400 mb-4">Generation Failed</h3>
                        <p className="text-gray-300 mb-6">{error}</p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={startProjectCreation}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Retry
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleStartOver}
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                                Start Over
                            </Button>
                        </div>
                    </div>
                )}

                {/* Generation Progress */}
                {isGenerating && (
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 mx-auto relative">
                                {/* Particelle animate */}
                                <div className="absolute inset-0">
                                    <div className="absolute top-2 right-6 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="absolute top-6 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                    <div className="absolute bottom-2 right-3 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                                </div>

                                {/* Anelli concentrici animati */}
                                <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 animate-spin" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

                                {/* Sfondo sfocato migliorato */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-purple-600/30 rounded-full blur-xl animate-pulse"></div>

                                {/* Contenitore principale */}
                                <div className="relative w-full h-full bg-black/60 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center shadow-2xl">
                                    <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }} />
                                </div>
                            </div>

                            {/* Titoli con animazioni */}
                            <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500" style={{ animationDelay: '200ms' }}>
                                <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                    {selectedEra.display_name}
                                </h3>
                                <p className="text-gray-300 transition-all duration-300">{currentMessage}</p>
                            </div>

                            {/* Barra di progresso */}
                            <div className="space-y-3 animate-in fade-in-50 slide-in-from-bottom-2 duration-500" style={{ animationDelay: '400ms' }}>
                                <div className="relative">
                                    <Progress
                                        value={progress}
                                        className="w-full h-4 bg-gray-800/50 border border-white/10 rounded-full overflow-hidden shadow-inner"
                                    />
                                    {/* Overlay con gradiente dinamico */}
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${progress}%`,
                                            background: `linear-gradient(90deg, 
                                                ${progress < 30 ? '#ef4444, #f97316' :
                                                    progress < 70 ? '#f97316, #eab308' :
                                                        '#eab308, #22c55e'})`
                                        }}
                                    ></div>
                                    {/* Effetto riflesso */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-gray-300">
                                        {Math.round(progress)}% Complete
                                    </p>
                                    <div className="flex space-x-1">
                                        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Messaggio informativo */}
                            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed animate-in fade-in-50 duration-500" style={{ animationDelay: '600ms' }}>
                                We're creating your high-quality AI cinematic content.
                            </p>
                        </div>
                    </div>
                )}

                {/* Image Review & Selection */}
                {isReviewing && (
                    <div className="space-y-8">
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">Generated Images ({generatedAssets.length})</h3>
                            <p className="text-gray-400 mb-6">
                                Review and select the images you want to include in your video. You can deselect any that don't meet your vision.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {generatedAssets.map((asset, index) => (
                                    <div key={asset.id} className="relative group">
                                        <div
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${selectedAssets.some(a => a.id === asset.id)
                                                ? "border-yellow-400 ring-2 ring-yellow-400/50"
                                                : "border-white/20 hover:border-white/40"
                                                }`}
                                            onClick={() => handleImageSelection(asset)}
                                        >
                                            {asset.file_url && (
                                                <img
                                                    src={asset.file_url}
                                                    alt={`Scene ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}

                                            {/* Selection Overlay */}
                                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${selectedAssets.some(a => a.id === asset.id)
                                                ? "bg-yellow-400/20 opacity-100"
                                                : "bg-black/50 opacity-0 group-hover:opacity-100"
                                                }`}>
                                                {selectedAssets.some(a => a.id === asset.id) ? (
                                                    <Check className="w-8 h-8 text-yellow-400" />
                                                ) : (
                                                    <div className="w-8 h-8 border-2 border-white rounded-full" />
                                                )}
                                            </div>

                                            {/* Scene Number */}
                                            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                Scene {index + 1}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-gray-400">
                                    {selectedAssets.length} of {generatedAssets.length} images selected
                                </p>
                                <Button
                                    onClick={startVideoGeneration}
                                    disabled={selectedAssets.length === 0}
                                    className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 font-semibold rounded-full transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Generate Video ({selectedAssets.length} scenes)
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Completion */}
                {isCompleted && (
                    <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
                        <div className="text-center space-y-6">
                            <div className="relative w-16 h-16 mx-auto">
                                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                                <Check className="w-16 h-16 text-yellow-400 relative z-10 drop-shadow-glow" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                    Video Generated Successfully!
                                </h3>
                                <p className="text-gray-400 mt-2">Your cinematic {selectedEra.display_name} video is ready.</p>
                            </div>

                            {/* Always try to show video if URL exists */}
                            {videoUrlToUse ? (
                                <div className="max-w-sm mx-auto">
                                    <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black/40">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                                        <video
                                            controls
                                            autoPlay
                                            muted
                                            loop
                                            className="w-full"
                                            src={videoUrlToUse}
                                            onError={(e) => {
                                                console.error("Video error:", e)
                                                console.error("Video URL:", videoUrlToUse)
                                            }}
                                            onLoadStart={() => console.log("Video loading started")}
                                            onLoadedData={() => console.log("Video loaded successfully")}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-sm mx-auto p-4 bg-black/40 border border-yellow-400/20 rounded-lg">
                                    <p className="text-yellow-400">Video is processing... Please wait a moment.</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Current phase: {currentPhase}, Project ID: {project?.id}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-4 justify-center pt-4">
                                <Button
                                    className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold px-6 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-yellow-400/25"
                                    onClick={() => videoUrlToUse && window.open(videoUrlToUse, '_blank')}
                                    disabled={!videoUrlToUse}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Video
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        onGenerationComplete() // Torna al menu principale
                                    }}
                                    className="bg-black/40 border border-white/20 text-white hover:bg-white/10 px-6 py-2 rounded-full transition-all duration-200"
                                >
                                    Create Another Video
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Emergency Fallback - Prevent Black Screen */}
                {!isGenerating && !isReviewing && !isCompleted && !isError && (
                    <div className="bg-yellow-900/40 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 shadow-xl text-center">
                        <div className="text-center space-y-4">
                            <div className="text-yellow-400 text-lg">🔧 Debug Mode</div>
                            <p className="text-gray-300">Phase: {currentPhase}</p>
                            <p className="text-gray-300">Project ID: {project?.id}</p>
                            <p className="text-gray-300">Video URL: {videoUrlToUse ? "✅ Available" : "❌ Missing"}</p>
                            {videoUrlToUse && (
                                <div className="max-w-md mx-auto">
                                    <video
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full rounded-lg shadow-2xl"
                                        src={videoUrlToUse}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                            <Button onClick={handleStartOver} className="bg-yellow-600 hover:bg-yellow-700">
                                Start Over
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
} 
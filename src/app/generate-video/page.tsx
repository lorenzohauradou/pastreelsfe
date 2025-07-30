"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import ProjectForm from "./components/project-form"
import ImageGallery from "./components/image-gallery"
import VideoCreation from "./components/video-creation"
import { Project, Asset } from "./lib/api"

export type ProjectStep = "create" | "generate" | "select" | "video" | "complete"

export default function GenerateVideoPage() {
    const [currentStep, setCurrentStep] = useState<ProjectStep>("create")
    const [project, setProject] = useState<Project | null>(null)
    const [taskId, setTaskId] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedAssets, setGeneratedAssets] = useState<Asset[]>([])
    const [selectedAssets, setSelectedAssets] = useState<Asset[]>([])

    const handleProjectCreated = (newProject: Project) => {
        setProject(newProject)
        setCurrentStep("generate")
    }

    const handleGenerationStarted = (taskId: string) => {
        setTaskId(taskId)
        setIsGenerating(true)
    }

    const handleGenerationProgress = (progress: number) => {
        setProgress(progress)
    }

    const handleGenerationComplete = (assets: Asset[]) => {
        setIsGenerating(false)
        setGeneratedAssets(assets)
        setCurrentStep("select")
    }

    const handleAssetsSelected = (selectedAssets: Asset[]) => {
        setSelectedAssets(selectedAssets)
        setCurrentStep("video")
    }

    const handleVideoComplete = (videoUrl: string) => {
        if (project) {
            setProject({ ...project, final_video_url: videoUrl })
        }
        setCurrentStep("complete")
    }

    const getStepNumber = (step: ProjectStep): number => {
        const steps = { create: 1, generate: 2, select: 3, video: 4, complete: 5 }
        return steps[step] || 1
    }

    const resetToStart = () => {
        setCurrentStep("create")
        setProject(null)
        setTaskId(null)
        setProgress(0)
        setIsGenerating(false)
        setGeneratedAssets([])
        setSelectedAssets([])
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Genera il tuo Video AI
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Crea video cinematografici attraverso diverse epoche storiche
                    </p>
                </div>

                {/* Progress Indicator */}
                <Card className="mb-8 bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium">Step {getStepNumber(currentStep)} di 5</span>
                            <span className="text-sm text-gray-400">
                                {currentStep === "create" && "Configura progetto"}
                                {currentStep === "generate" && "Generazione immagini"}
                                {currentStep === "select" && "Seleziona immagini"}
                                {currentStep === "video" && "Crea video"}
                                {currentStep === "complete" && "Completato"}
                            </span>
                        </div>
                        <Progress value={(getStepNumber(currentStep) / 5) * 100} className="w-full" />
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Step 1: Create Project */}
                    {currentStep === "create" && (
                        <ProjectForm onProjectCreated={handleProjectCreated} />
                    )}

                    {/* Step 2: Generate Images */}
                    {currentStep === "generate" && project && (
                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                                <CardTitle>Generazione Immagini in Corso</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ImageGeneration
                                    project={project}
                                    onGenerationStarted={handleGenerationStarted}
                                    onProgress={handleGenerationProgress}
                                    onComplete={handleGenerationComplete}
                                    isGenerating={isGenerating}
                                    progress={progress}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Select Images */}
                    {currentStep === "select" && project && (
                        <ImageGallery
                            projectId={project.id}
                            assets={generatedAssets}
                            onAssetsSelected={handleAssetsSelected}
                        />
                    )}

                    {/* Step 4: Create Video */}
                    {currentStep === "video" && project && (
                        <VideoCreation
                            projectId={project.id}
                            selectedAssets={selectedAssets}
                            onVideoComplete={handleVideoComplete}
                        />
                    )}

                    {/* Step 5: Complete */}
                    {currentStep === "complete" && project && (
                        <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-700">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl text-green-400">
                                    🎉 Video Completato!
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-4">
                                <p className="text-gray-300">
                                    Il tuo video è stato generato con successo
                                </p>
                                {project.final_video_url && (
                                    <div className="space-y-4">
                                        <video
                                            controls
                                            className="w-full max-w-md mx-auto rounded-lg"
                                            src={project.final_video_url}
                                        >
                                            Il tuo browser non supporta il tag video.
                                        </video>
                                        <div className="flex gap-2 justify-center">
                                            <Button variant="outline">
                                                Scarica Video
                                            </Button>
                                            <Button
                                                onClick={resetToStart}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Crea Nuovo Video
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

// Component for handling image generation
interface ImageGenerationProps {
    project: Project
    onGenerationStarted: (taskId: string) => void
    onProgress: (progress: number) => void
    onComplete: (assets: Asset[]) => void
    isGenerating: boolean
    progress: number
}

function ImageGeneration({
    project,
    onGenerationStarted,
    onProgress,
    onComplete,
    isGenerating,
    progress
}: ImageGenerationProps) {
    const [hasStarted, setHasStarted] = useState(false)

    const startGeneration = async () => {
        try {
            const { startImageGeneration, pollTaskStatus, getProjectAssets } = await import("./lib/api")

            // Start generation
            const taskResponse = await startImageGeneration(project.id)
            onGenerationStarted(taskResponse.task_id)
            setHasStarted(true)

            // Poll for completion
            await pollTaskStatus(
                taskResponse.task_id,
                (status) => {
                    if (status.progress) {
                        onProgress(status.progress)
                    }
                }
            )

            // Get generated assets
            const assets = await getProjectAssets(project.id, 'image')
            onComplete(assets)

        } catch (error) {
            console.error('Error during generation:', error)

            // Check if we have partial results even if polling timed out
            try {
                const assets = await (await import("./lib/api")).getProjectAssets(project.id, 'image')
                if (assets && assets.length > 0) {
                    alert(`Generazione parzialmente completata: ${assets.length} immagini generate. Puoi continuare con quelle disponibili.`)
                    onComplete(assets)
                    return
                }
            } catch (assetsError) {
                console.error('Error checking for partial assets:', assetsError)
            }

            // Show appropriate error message
            const errorMessage = (error as Error)?.message?.includes('timeout')
                ? 'La generazione sta richiedendo più tempo del previsto. Alcune immagini potrebbero essere state create. Ricarica la pagina per controllare.'
                : 'Errore durante la generazione. Riprova.'

            alert(errorMessage)
        }
    }

    return (
        <div className="space-y-4">
            <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                    {project.era_preset.replace('_', ' ').toUpperCase()}
                </div>
                <p className="text-gray-400">
                    Generando {project.num_images} immagini per il tuo video...
                </p>
            </div>

            {isGenerating && (
                <div className="space-y-3">
                    <Progress value={progress} className="w-full" />
                    <p className="text-center text-sm text-gray-400">
                        Questo processo può richiedere alcuni minuti. OpenAI GPT Image sta creando immagini di alta qualità.
                    </p>
                </div>
            )}

            <div className="text-center">
                {!hasStarted ? (
                    <Button
                        onClick={startGeneration}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Avvia Generazione
                    </Button>
                ) : (
                    <p className="text-green-400">
                        {isGenerating ? "Generazione in corso..." : "Generazione completata!"}
                    </p>
                )}
            </div>
        </div>
    )
} 
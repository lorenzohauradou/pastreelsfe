"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft, Clock, Monitor, Smartphone, Square } from "lucide-react"
import { getAvailableOptions, EraPreset } from "../lib/api"

interface ConfigurationStepProps {
    selectedEra: EraPreset
    onConfigurationComplete: (config: { duration: number; ratio: string; title?: string }) => void
    onBack: () => void
}

const formatOptions = [
    {
        ratio: "720:1280",
        name: "TikTok/Reels",
        icon: Smartphone,
        description: "Perfect for vertical social media",
        dimensions: "720×1280"
    },
    {
        ratio: "1280:720",
        name: "YouTube",
        icon: Monitor,
        description: "Standard horizontal video",
        dimensions: "1280×720"
    },
    {
        ratio: "960:960",
        name: "Instagram Square",
        icon: Square,
        description: "Square format for feeds",
        dimensions: "960×960"
    },
    {
        ratio: "1584:672",
        name: "Cinematic",
        icon: Monitor,
        description: "Ultra-wide cinematic look",
        dimensions: "1584×672"
    }
]

export default function ConfigurationStep({ selectedEra, onConfigurationComplete, onBack }: ConfigurationStepProps) {
    const [availableOptions, setAvailableOptions] = useState<{ duration_options: number[]; available_ratios: string[] } | null>(null)
    const [selectedDuration, setSelectedDuration] = useState<number>(30)
    const [selectedRatio, setSelectedRatio] = useState<string>("720:1280")
    const [projectTitle, setProjectTitle] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const options = await getAvailableOptions()
                setAvailableOptions({
                    duration_options: options.duration_options,
                    available_ratios: options.available_ratios
                })
                if (options.duration_options.length > 0) {
                    setSelectedDuration(options.duration_options[0])
                }
            } catch (error) {
                console.error("Failed to load configuration options:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadOptions()
    }, [])

    const handleContinue = () => {
        if (isCreating) return // Prevent double clicks

        setIsCreating(true)
        onConfigurationComplete({
            duration: selectedDuration,
            ratio: selectedRatio,
            title: projectTitle || `${selectedEra.display_name} Video`
        })
    }

    const availableFormats = formatOptions.filter(format =>
        availableOptions?.available_ratios.includes(format.ratio)
    )

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/70">Loading configuration options...</p>
                </div>
            </div>
        )
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <div className="text-center space-y-4 sm:space-y-6 mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Button
                            variant="outline"
                            onClick={onBack}
                            className="absolute left-4 top-4 sm:relative sm:left-auto sm:top-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Configure Your <span className="text-yellow-400">Video</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        Choose the perfect duration and format for your {selectedEra.display_name} video.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Duration Selection */}
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center mb-6">
                            <Clock className="w-6 h-6 text-yellow-400 mr-3" />
                            <h3 className="text-xl font-bold text-white">Video Duration</h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {availableOptions?.duration_options.map((duration) => (
                                <button
                                    key={duration}
                                    onClick={() => setSelectedDuration(duration)}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${selectedDuration === duration
                                        ? "border-yellow-400 bg-yellow-400/20"
                                        : "border-white/20 bg-white/5 hover:border-white/40"
                                        }`}
                                >
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${selectedDuration === duration ? "text-yellow-400" : "text-white"
                                            }`}>
                                            {duration}s
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {Math.floor(duration / 5)} scenes
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Format Selection */}
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center mb-6">
                            <Monitor className="w-6 h-6 text-yellow-400 mr-3" />
                            <h3 className="text-xl font-bold text-white">Video Format</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {availableFormats.map((format) => {
                                const IconComponent = format.icon
                                return (
                                    <button
                                        key={format.ratio}
                                        onClick={() => setSelectedRatio(format.ratio)}
                                        className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${selectedRatio === format.ratio
                                            ? "border-yellow-400 bg-yellow-400/20"
                                            : "border-white/20 bg-white/5 hover:border-white/40"
                                            }`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <IconComponent className={`w-8 h-8 ${selectedRatio === format.ratio ? "text-yellow-400" : "text-white"
                                                }`} />
                                            <div className="text-left flex-1">
                                                <div className={`text-lg font-bold ${selectedRatio === format.ratio ? "text-yellow-400" : "text-white"
                                                    }`}>
                                                    {format.name}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {format.description}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {format.dimensions}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <Button
                        size="lg"
                        onClick={handleContinue}
                        disabled={isCreating}
                        className="w-full bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-yellow-400/25 border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isCreating ? "Creating..." : "Start Creating Video →"}
                    </Button>
                </div>
            </div>
        </section>
    )
} 
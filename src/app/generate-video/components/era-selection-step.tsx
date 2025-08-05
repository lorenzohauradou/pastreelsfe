"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { ChevronLeft, ChevronRight, Play, LogOut, User } from "lucide-react"
import { getAvailableOptions, EraPreset } from "../lib/api"
import { useAuth } from "@/src/hooks/useAuth"
import { useLogoutContext } from "@/src/components/auth/logout-guard"

interface EraSelectionStepProps {
    onEraSelected: (era: EraPreset) => void
}

const eraVideos = {
    "roma_antica": "/videos/ancient_rome.mp4",
    "usa_1990": "/videos/usa90ss.mp4",
    "tokyo_1970": "/videos/Tokyo70s.mp4",
    "apollo_11": "/videos/apollo_11.mp4",
    "dinosaur_era": "/videos/dinoprev.mp4",
    "italia_1980s": "/videos/italia80s.mp4",
    "brasil_1980s": "/videos/brazil.mp4",
    "usa_1970s": "/videos/usa70sprev.mp4",
}

export default function EraSelectionStep({ onEraSelected }: EraSelectionStepProps) {
    const [eras, setEras] = useState<EraPreset[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isSelecting, setIsSelecting] = useState(false)
    const { user } = useAuth()
    const { logout } = useLogoutContext()

    useEffect(() => {
        const loadEras = async () => {
            try {
                const options = await getAvailableOptions()
                setEras(options.era_presets)
            } catch (error) {
                console.error("Failed to load era options:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadEras()
    }, [])

    const currentEra = eras[selectedIndex]

    const nextEra = () => {
        setSelectedIndex((prev) => (prev + 1) % eras.length)
    }

    const prevEra = () => {
        setSelectedIndex((prev) => (prev - 1 + eras.length) % eras.length)
    }

    const handleSelectEra = () => {
        if (isSelecting || !currentEra) return // Prevent double clicks

        setIsSelecting(true)
        onEraSelected(currentEra)
    }

    const handleLogout = () => {
        logout()
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/70">Loading eras...</p>
                </div>
            </div>
        )
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            {user && (
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 shadow-lg">
                        <div className="flex items-center space-x-2 text-white/90 text-sm">
                            <User className="w-4 h-4" />
                            <span className="hidden sm:block max-w-[120px] truncate">{user.name}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto w-full">
                <div className="text-center space-y-4 sm:space-y-6 mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Choose Your <span className="text-yellow-400">Era</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        Select the historical period for your cinematic video. Each era brings its own authentic atmosphere and visual style.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center scale-[0.8]">
                    <div className="relative order-2 lg:order-1">
                        <div className="relative aspect-[9/16] max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                            <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                                {currentEra && (
                                    <video
                                        key={currentEra.preset_name}
                                        src={eraVideos[currentEra.preset_name as keyof typeof eraVideos]}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center group">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 transition-all duration-300 group-hover:opacity-0">
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
                            {currentEra && (
                                <>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                        {currentEra.display_name}
                                    </h2>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                        {currentEra.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div className="text-2xl font-bold text-yellow-400">6</div>
                                            <div className="text-sm text-gray-400">Scenes</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div className="text-2xl font-bold text-yellow-400">4K</div>
                                            <div className="text-sm text-gray-400">Quality</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={prevEra}
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Previous
                            </Button>

                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex space-x-2">
                                    {[0, 1, 2].map((dotIndex) => {
                                        // Calcola quale pallino deve essere attivo in base alla posizione corrente
                                        const isActive = selectedIndex % 3 === dotIndex;
                                        return (
                                            <div
                                                key={dotIndex}
                                                className={`w-3 h-3 rounded-full transition-all duration-200 ${isActive
                                                    ? "bg-yellow-400 scale-125"
                                                    : "bg-white/30"
                                                    }`}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                                    <span className="text-yellow-400 font-medium">{selectedIndex + 1}</span>
                                    <span className="text-gray-400 mx-1">/</span>
                                    <span className="text-white/70">{eras.length}</span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={nextEra}
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
                            >
                                Next
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        <Button
                            size="lg"
                            onClick={handleSelectEra}
                            disabled={isSelecting}
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-yellow-400/25 border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSelecting ? "Selecting..." : "Select This Era →"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
} 
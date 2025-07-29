"use client"

import { useState } from "react"
import { Share2, Volume2, VolumeX, MousePointer2 } from "lucide-react"

interface VideoCardProps {
    title: string
    videoSrc?: string
    className?: string
    showAudioHint?: boolean
}

export function VideoCard({
    title,
    videoSrc = "/placeholder.jpg",
    className = "",
    showAudioHint = false
}: VideoCardProps) {
    const [hasAudio, setHasAudio] = useState(false)

    const handleMouseEnter = (event: React.MouseEvent) => {
        if (videoSrc.includes('.mp4')) {
            const videoElement = event.currentTarget.querySelector('video') as HTMLVideoElement
            if (videoElement) {
                setHasAudio(true)
                videoElement.muted = false
            }
        }
    }

    const handleMouseLeave = (event: React.MouseEvent) => {
        if (videoSrc.includes('.mp4')) {
            const videoElement = event.currentTarget.querySelector('video') as HTMLVideoElement
            if (videoElement) {
                setHasAudio(false)
                videoElement.muted = true
            }
        }
    }

    return (
        <div
            className={`relative group cursor-pointer ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-[#2a2a2a] border border-[#3a3a3a] shadow-lg sm:shadow-xl lg:shadow-2xl group-hover:shadow-xl sm:group-hover:shadow-2xl lg:group-hover:shadow-4xl transition-all duration-500`}>
                <div className="w-32 h-56 sm:w-36 sm:h-60 lg:w-[12rem] lg:h-[23rem] overflow-hidden relative">
                    {videoSrc.includes('.mp4') ? (
                        <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {videoSrc.includes('.mp4') && (
                        <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                            <div className={`w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${hasAudio
                                ? 'bg-white/20 border-white'
                                : 'bg-black/20 border-[#6b7280]'
                                }`}>
                                {hasAudio ? (
                                    <Volume2 className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-white" />
                                ) : (
                                    <VolumeX className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-white" />
                                )}
                            </div>
                            {!hasAudio && showAudioHint && (
                                <div className="absolute inset-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 rounded-full border-2 border-white/50 animate-ping"></div>
                            )}
                        </div>
                    )}
                    <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer">
                            <Share2 className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-white" />
                        </div>
                    </div>

                    {videoSrc.includes('.mp4') && !hasAudio && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 sm:px-3 lg:px-4 py-1 sm:py-2 border border-white/30">
                                <div className="flex items-center gap-1 sm:gap-2 text-white text-xs lg:text-sm">
                                    <MousePointer2 className="w-3 sm:w-3 lg:w-4 h-3 sm:h-3 lg:h-4" />
                                    <span className="hidden sm:inline lg:hidden">Hover</span>
                                    <span className="hidden lg:inline">Hover for audio</span>
                                    <Volume2 className="w-3 sm:w-3 lg:w-4 h-3 sm:h-3 lg:h-4" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4">
                        <h3 className="text-white font-medium text-xs sm:text-sm lg:text-lg mb-1 sm:mb-2 line-clamp-2">{title}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
} 
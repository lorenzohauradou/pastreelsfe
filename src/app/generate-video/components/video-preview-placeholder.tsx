"use client"

interface VideoPreviewPlaceholderProps {
    progress: number
    isGenerating: boolean
}

export default function VideoPreviewPlaceholder({
    progress,
    isGenerating
}: VideoPreviewPlaceholderProps) {
    return (
        <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-sm">
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-white/10 bg-black/20">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/60 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-800/20 to-purple-700/30 animate-pulse"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/10 via-transparent to-purple-600/20 opacity-70"></div>

                        {/* Effetto blur animato che simula il contenuto video */}
                        <div className="absolute inset-4 rounded bg-gradient-to-br from-gray-600/40 to-gray-700/60 blur-xl animate-pulse"
                            style={{ animationDuration: '2s' }}></div>
                        <div className="absolute inset-6 rounded bg-gradient-to-tr from-blue-500/30 to-purple-500/40 blur-lg animate-pulse"
                            style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-8 rounded bg-gradient-to-bl from-yellow-400/20 to-orange-500/30 blur-md animate-pulse"
                            style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>


                    </div>

                    {/* Overlay con stato */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${isGenerating
                        ? "bg-yellow-400/20 opacity-100"
                        : "bg-gray-500/30 opacity-100"
                        }`}>
                        {isGenerating && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-3">
                                    <div className="w-12 h-12 border-2 border-black/60 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <div className="text-black font-medium text-sm">
                                        Creating Video...
                                    </div>
                                    <div className="text-gray-300 text-xs">
                                        {Math.round(progress)}% Complete
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Final Video
                    </div>

                    {/* Glowing effect during generation */}
                    {isGenerating && (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 rounded-lg blur-xl animate-pulse"></div>
                    )}

                    {/* Gradiente overlay finale */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
    )
}
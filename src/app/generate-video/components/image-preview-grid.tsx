"use client"

interface ImagePreviewProps {
    totalImages: number
    currentProgress: number
    generatedImages: { index: number; url: string }[]
}

export default function ImagePreviewGrid({
    totalImages,
    currentProgress,
    generatedImages
}: ImagePreviewProps) {
    // Calcola quale immagine è attualmente in generazione basandosi sulle immagini effettivamente generate
    const currentImageIndex = generatedImages.length

    return (
        <div className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: totalImages }, (_, index) => {
                    const generatedImage = generatedImages.find(img => img.index === index)
                    const isCurrentlyGenerating = index === currentImageIndex && !generatedImage
                    const isCompleted = !!generatedImage
                    const isPending = index > currentImageIndex

                    return (
                        <div key={index} className="relative group">
                            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/10 bg-black/20">
                                {generatedImage ? (
                                    <img
                                        src={generatedImage.url}
                                        alt={`Scene ${index + 1}`}
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                ) : (
                                    <div className={`w-full h-full bg-gray-800/50 flex items-center justify-center transition-all duration-700 ${isCurrentlyGenerating ? "animate-pulse" : ""
                                        }`}>
                                        {!isCurrentlyGenerating && (
                                            <div className="text-gray-500 text-center">
                                                <div className="w-12 h-12 mx-auto opacity-30">
                                                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                                                        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className={`absolute inset-0 transition-opacity duration-500 ${isCurrentlyGenerating
                                    ? "bg-yellow-400/20 opacity-100"
                                    : isCompleted
                                        ? "bg-green-400/10 opacity-0"
                                        : "bg-gray-500/30 opacity-100"
                                    }`}>
                                    {isCurrentlyGenerating && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <div className="absolute top-2 right-2">
                                            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    Scene {index + 1}
                                </div>
                                {isCurrentlyGenerating && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 rounded-lg blur-xl animate-pulse"></div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                    {generatedImages.length} of {totalImages} scenes completed
                </p>
            </div>
        </div>
    )
}
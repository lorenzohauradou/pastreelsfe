"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Asset } from "../lib/api"

interface ImageGalleryProps {
    projectId: number
    assets: Asset[]
    onAssetsSelected: (selectedAssets: Asset[]) => void
}

export default function ImageGallery({ projectId, assets, onAssetsSelected }: ImageGalleryProps) {
    const [selectedAssetIds, setSelectedAssetIds] = useState<number[]>(
        assets.filter(asset => asset.is_selected).map(asset => asset.id)
    )

    const handleAssetToggle = (assetId: number) => {
        setSelectedAssetIds(prev =>
            prev.includes(assetId)
                ? prev.filter(id => id !== assetId)
                : [...prev, assetId]
        )
    }

    const handleSelectAll = () => {
        setSelectedAssetIds(assets.map(asset => asset.id))
    }

    const handleDeselectAll = () => {
        setSelectedAssetIds([])
    }

    const handleContinue = () => {
        const selectedAssets = assets.filter(asset => selectedAssetIds.includes(asset.id))
        onAssetsSelected(selectedAssets)
    }

    const sortedAssets = [...assets].sort((a, b) => (a.sequence_order || 0) - (b.sequence_order || 0))

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle className="text-2xl text-center">
                    Seleziona le Immagini per il Video
                </CardTitle>
                <p className="text-center text-gray-400">
                    Scegli le immagini che vuoi includere nel tuo video finale
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Controls */}
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                            >
                                Seleziona Tutte
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDeselectAll}
                            >
                                Deseleziona Tutte
                            </Button>
                        </div>
                        <div className="text-sm text-gray-400">
                            {selectedAssetIds.length} di {assets.length} selezionate
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedAssets.map((asset, index) => (
                            <ImageCard
                                key={asset.id}
                                asset={asset}
                                index={index}
                                isSelected={selectedAssetIds.includes(asset.id)}
                                onToggle={() => handleAssetToggle(asset.id)}
                            />
                        ))}
                    </div>

                    {/* Continue Button */}
                    <div className="text-center">
                        <Button
                            onClick={handleContinue}
                            disabled={selectedAssetIds.length === 0}
                            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                        >
                            Continua con {selectedAssetIds.length} immagini
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

interface ImageCardProps {
    asset: Asset
    index: number
    isSelected: boolean
    onToggle: () => void
}

function ImageCard({ asset, index, isSelected, onToggle }: ImageCardProps) {
    return (
        <Card
            className={`relative overflow-hidden transition-all duration-200 cursor-pointer ${isSelected
                ? 'ring-2 ring-blue-500 bg-blue-900/20'
                : 'bg-gray-700/50 hover:bg-gray-700'
                }`}
            onClick={onToggle}
        >
            <div className="aspect-[3/4] relative">
                {asset.file_url ? (
                    <img
                        src={asset.file_url}
                        alt={`Scene ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl mb-2">🎬</div>
                            <div className="text-sm text-gray-400">Scene {index + 1}</div>
                        </div>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-white text-center">
                        <div className="text-sm font-medium mb-1">Scene {index + 1}</div>
                        <div className="text-xs text-gray-300">
                            {asset.status === 'completed' ? 'Pronta' : 'In elaborazione'}
                        </div>
                    </div>
                </div>

                {/* Selection Checkbox */}
                <div className="absolute top-2 right-2">
                    <div className="bg-white/80 rounded p-1">
                        <Checkbox
                            checked={isSelected}
                            onChange={onToggle}
                            className="w-4 h-4"
                        />
                    </div>
                </div>

                {/* Sequence Number */}
                <div className="absolute top-2 left-2">
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        #{index + 1}
                    </div>
                </div>

                {/* Status Indicator */}
                {asset.status !== 'completed' && (
                    <div className="absolute bottom-2 left-2">
                        <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                            {asset.status}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
} 

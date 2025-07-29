"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Progress } from "@/src/components/ui/progress"
import { createVideo, pollTaskStatus } from "../lib/api"

interface VideoCreationProps {
    projectId: number
    onVideoComplete: (videoUrl: string) => void
}

export default function VideoCreation({ projectId, onVideoComplete }: VideoCreationProps) {
    const [isCreating, setIsCreating] = useState(false)
    const [progress, setProgress] = useState(0)
    const [overlayText, setOverlayText] = useState("")
    const [hasStarted, setHasStarted] = useState(false)

    const startVideoCreation = async () => {
        try {
            setIsCreating(true)
            setHasStarted(true)

            // Create video with selected assets
            const taskResponse = await createVideo(projectId, {
                selected_asset_ids: [1, 2, 3], // This should come from selected assets
                overlay_text: overlayText || undefined
            })

            // Poll for completion
            await pollTaskStatus(
                taskResponse.task_id,
                (status) => {
                    if (status.progress) {
                        setProgress(status.progress)
                    }
                }
            )

            // Simulate video completion
            const mockVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            onVideoComplete(mockVideoUrl)

        } catch (error) {
            console.error('Error creating video:', error)
            alert('Errore durante la creazione del video. Riprova.')
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle className="text-2xl text-center">
                    Crea il Video Finale
                </CardTitle>
                <p className="text-center text-gray-400">
                    Personalizza il tuo video con testo e musica
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {!hasStarted ? (
                        <>
                            {/* Video Customization */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="overlay-text">Testo Sovrapposto (opzionale)</Label>
                                    <Textarea
                                        id="overlay-text"
                                        value={overlayText}
                                        onChange={(e) => setOverlayText(e.target.value)}
                                        placeholder="Es: Il mio viaggio nell'antica Roma..."
                                        className="bg-gray-700 border-gray-600 text-white"
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-400">
                                        Il testo apparirà sovrapposto al video
                                    </p>
                                </div>
                            </div>

                            {/* Preview Settings */}
                            <Card className="bg-gray-700/50 border-gray-600">
                                <CardContent className="p-4">
                                    <h4 className="font-semibold mb-2">Anteprima Impostazioni:</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400">Formato:</span>
                                            <div className="font-medium">9:16 Verticale</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Scene:</span>
                                            <div className="font-medium">3 immagini</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Durata:</span>
                                            <div className="font-medium">~15 secondi</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Testo:</span>
                                            <div className="font-medium">
                                                {overlayText ? "Personalizzato" : "Nessuno"}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Create Button */}
                            <div className="text-center">
                                <Button
                                    onClick={startVideoCreation}
                                    disabled={isCreating}
                                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold"
                                >
                                    Crea Video Finale
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Video Creation Progress */}
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-green-400 mb-2">
                                        Creazione Video in Corso
                                    </div>
                                    <p className="text-gray-400">
                                        Stiamo combinando le tue immagini in un video cinematografico...
                                    </p>
                                </div>

                                {isCreating && (
                                    <div className="space-y-3">
                                        <Progress value={progress} className="w-full" />
                                        <p className="text-center text-sm text-gray-400">
                                            {progress < 30 && "Preparazione scene..."}
                                            {progress >= 30 && progress < 60 && "Generazione transizioni..."}
                                            {progress >= 60 && progress < 90 && "Applicazione effetti..."}
                                            {progress >= 90 && "Finalizzazione video..."}
                                        </p>
                                    </div>
                                )}

                                {!isCreating && (
                                    <div className="text-center">
                                        <div className="text-green-400 text-lg font-semibold">
                                            Video creato con successo! 🎉
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Video Creation Steps */}
                            <Card className="bg-gray-700/50 border-gray-600">
                                <CardContent className="p-4">
                                    <h4 className="font-semibold mb-3">Processo di Creazione:</h4>
                                    <div className="space-y-2">
                                        <div className={`flex items-center gap-2 text-sm ${progress > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                                            <div className="w-2 h-2 rounded-full bg-current"></div>
                                            Elaborazione immagini
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${progress > 30 ? 'text-green-400' : 'text-gray-400'}`}>
                                            <div className="w-2 h-2 rounded-full bg-current"></div>
                                            Generazione transizioni
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${progress > 60 ? 'text-green-400' : 'text-gray-400'}`}>
                                            <div className="w-2 h-2 rounded-full bg-current"></div>
                                            Applicazione effetti
                                        </div>
                                        <div className={`flex items-center gap-2 text-sm ${progress > 90 ? 'text-green-400' : 'text-gray-400'}`}>
                                            <div className="w-2 h-2 rounded-full bg-current"></div>
                                            Finalizzazione
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 
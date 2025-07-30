"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Progress } from "@/src/components/ui/progress"
import { createVideo, pollTaskStatus, Asset } from "../lib/api"

interface VideoCreationProps {
    projectId: number
    selectedAssets: Asset[]
    onVideoComplete: (videoUrl: string) => void
}

export default function VideoCreation({ projectId, selectedAssets, onVideoComplete }: VideoCreationProps) {
    const [isCreating, setIsCreating] = useState(false)
    const [progress, setProgress] = useState(0)
    const [overlayText, setOverlayText] = useState("")
    const [hasStarted, setHasStarted] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")

    const startVideoCreation = async () => {
        let taskResponse: any = null
        try {
            if (selectedAssets.length === 0) {
                alert('Nessun asset selezionato. Torna indietro e seleziona almeno un\'immagine.')
                return
            }

            setIsCreating(true)
            setHasStarted(true)
            setStatusMessage("")

            // Create video with selected assets
            const taskResponse = await createVideo(projectId, {
                selected_asset_ids: selectedAssets.map(asset => asset.id),
                overlay_text: overlayText || undefined
            })

            // Poll for completion (timeout aumentato per la scrittura video)
            console.log(`Starting video creation polling for task: ${taskResponse.task_id}`)

            const finalStatus = await pollTaskStatus(
                taskResponse.task_id,
                (status) => {
                    console.log(`Task status update:`, status)
                    if (status.progress) {
                        setProgress(status.progress)
                    }
                    // Aggiorna messaggio se disponibile dal backend
                    if (status.message) {
                        setStatusMessage(status.message)
                        console.log(`Status message: ${status.message}`)
                    }
                },
                120, // 120 tentativi (era 60)
                3000 // ogni 3 secondi = 6 minuti totali
            )

            console.log(`Final status received:`, finalStatus)
            console.log(`finalStatus.result:`, finalStatus.result)
            console.log(`final_task_id found:`, finalStatus.result?.final_task_id)

            // Check if we have a final video URL directly
            if (finalStatus.status === 'completed' && finalStatus.result?.final_video_url) {
                console.log(`Found direct video URL: ${finalStatus.result.final_video_url}`)
                onVideoComplete(finalStatus.result.final_video_url)
            }
            // Check if we need to continue polling a final video task
            else if (finalStatus.status === 'completed' && finalStatus.result?.final_task_id) {
                console.log(`Switching to final video task: ${finalStatus.result.final_task_id}`)
                setStatusMessage("Creazione video finale in corso...")

                // Poll the final video creation task
                const finalVideoStatus = await pollTaskStatus(
                    finalStatus.result.final_task_id,
                    (status) => {
                        console.log(`Final video task status:`, status)
                        if (status.progress) {
                            setProgress(status.progress)
                        }
                        if (status.message) {
                            setStatusMessage(status.message)
                            console.log(`Final video status message: ${status.message}`)
                        }
                    },
                    120, // 120 tentativi
                    3000 // ogni 3 secondi = 6 minuti totali
                )

                console.log(`Final video task completed:`, finalVideoStatus)

                if (finalVideoStatus.status === 'completed' && finalVideoStatus.result?.final_video_url) {
                    onVideoComplete(finalVideoStatus.result.final_video_url)
                } else {
                    throw new Error('Video finale non disponibile nel task finale: ' + (finalVideoStatus.message || 'Errore sconosciuto'))
                }
            }
            else {
                throw new Error('Video finale non disponibile: ' + (finalStatus.message || 'Errore sconosciuto'))
            }

        } catch (error) {
            console.error('Error creating video:', error)
            const err = error as Error
            console.error('Error details:', {
                message: err.message,
                stack: err.stack,
                taskId: taskResponse?.task_id
            })

            // Messaggio di errore più dettagliato per il debug
            const errorMsg = err.message || 'Errore sconosciuto'
            alert(`Errore durante la creazione del video: ${errorMsg}\n\nControlla la console per dettagli.`)
        } finally {
            setIsCreating(false)
            setStatusMessage("")
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
                <p className="text-center text-sm text-blue-400">
                    {selectedAssets.length} immagini selezionate
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
                                            {statusMessage || (
                                                <>
                                                    {progress < 30 && "Preparazione scene..."}
                                                    {progress >= 30 && progress < 60 && "Generazione transizioni..."}
                                                    {progress >= 60 && progress < 90 && "Applicazione effetti..."}
                                                    {progress >= 90 && "Finalizzazione video..."}
                                                </>
                                            )}
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
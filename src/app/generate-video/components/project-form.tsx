"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Project, EraPreset, createProject, getAvailableOptions } from "../lib/api"

interface ProjectFormData {
    title: string
    era_preset: string
    duration: number
    ratio: string
}

interface ProjectFormProps {
    onProjectCreated: (project: Project) => void
}

export default function ProjectForm({ onProjectCreated }: ProjectFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [eraOptions, setEraOptions] = useState<EraPreset[]>([])
    const [availableRatios, setAvailableRatios] = useState<string[]>([])
    const [durationOptions, setDurationOptions] = useState<number[]>([])

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormData>({
        defaultValues: {
            title: "",
            era_preset: "",
            duration: 15,
            ratio: "720:1280" // 9:16 vertical for reels
        }
    })

    const selectedEra = watch("era_preset")

    useEffect(() => {
        loadOptions()
    }, [])

    const loadOptions = async () => {
        try {
            const options = await getAvailableOptions()
            setEraOptions(options.era_presets)
            setAvailableRatios(options.available_ratios)
            setDurationOptions(options.duration_options)
        } catch (error) {
            console.error("Errore nel caricamento opzioni:", error)
        }
    }

    const onSubmit = async (data: ProjectFormData) => {
        setIsLoading(true)
        try {
            const project = await createProject(data)
            onProjectCreated(project)
        } catch (error) {
            console.error("Errore nella creazione del progetto:", error)
            alert("Errore nella creazione del progetto. Riprova.")
        } finally {
            setIsLoading(false)
        }
    }

    const getSelectedEraInfo = () => {
        return eraOptions.find(era => era.preset_name === selectedEra)
    }

    const getRatioLabel = (ratio: string) => {
        const ratioLabels: { [key: string]: string } = {
            "720:1280": "9:16 Verticale (TikTok/Reels)",
            "1280:720": "16:9 Orizzontale (YouTube)",
            "1104:832": "4:3 Orizzontale",
            "832:1104": "3:4 Verticale",
            "960:960": "1:1 Quadrato (Instagram)",
            "1584:672": "Ultra-wide"
        }
        return ratioLabels[ratio] || ratio
    }

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle className="text-2xl text-center">
                    Configura il tuo Video AI
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Titolo Progetto */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Titolo del Video (opzionale)</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="Es: Il mio viaggio nell'antica Roma"
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                    </div>

                    {/* Selezione Epoca */}
                    <div className="space-y-2">
                        <Label>Epoca Storica</Label>
                        <Select
                            value={selectedEra}
                            onValueChange={(value) => setValue("era_preset", value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Seleziona un'epoca" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                                {eraOptions.map((era) => (
                                    <SelectItem key={era.preset_name} value={era.preset_name}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{era.display_name}</span>
                                            <span className="text-sm text-gray-400">{era.description}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Descrizione Epoca Selezionata */}
                    {selectedEra && getSelectedEraInfo() && (
                        <Card className="bg-blue-900/20 border-blue-700">
                            <CardContent className="p-4">
                                <h4 className="font-semibold text-blue-300 mb-2">
                                    {getSelectedEraInfo()?.display_name}
                                </h4>
                                <p className="text-sm text-gray-300">
                                    {getSelectedEraInfo()?.description}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Durata Video */}
                    <div className="space-y-2">
                        <Label>Durata Video (secondi)</Label>
                        <Select
                            value={watch("duration").toString()}
                            onValueChange={(value) => setValue("duration", parseInt(value))}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                                {durationOptions.map((duration) => (
                                    <SelectItem key={duration} value={duration.toString()}>
                                        {duration} secondi ({Math.ceil(duration / 5)} scene)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Formato Video */}
                    <div className="space-y-2">
                        <Label>Formato Video</Label>
                        <Select
                            value={watch("ratio")}
                            onValueChange={(value) => setValue("ratio", value)}
                        >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                                {availableRatios.map((ratio) => (
                                    <SelectItem key={ratio} value={ratio}>
                                        {getRatioLabel(ratio)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Anteprima Configurazione */}
                    <Card className="bg-gray-700/50 border-gray-600">
                        <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Anteprima Configurazione:</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Epoca:</span>
                                    <div className="font-medium">
                                        {getSelectedEraInfo()?.display_name || "Non selezionata"}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-400">Durata:</span>
                                    <div className="font-medium">{watch("duration")} secondi</div>
                                </div>
                                <div>
                                    <span className="text-gray-400">Scene:</span>
                                    <div className="font-medium">{Math.ceil(watch("duration") / 5)} immagini</div>
                                </div>
                                <div>
                                    <span className="text-gray-400">Formato:</span>
                                    <div className="font-medium">{getRatioLabel(watch("ratio"))}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading || !selectedEra}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 text-lg font-semibold"
                    >
                        {isLoading ? "Creazione in corso..." : "Crea Progetto"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
} 
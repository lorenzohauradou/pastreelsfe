"use client"

import { useState } from "react"
import AnimatedBackground from "@/src/components/landing/animated-background"
import AuthGuard from "@/src/components/auth/auth-guard"
import LogoutGuard from "@/src/components/auth/logout-guard"
import EraSelectionStep from "@/src/app/generate-video/components/era-selection-step"
import ConfigurationStep from "@/src/app/generate-video/components/configuration-step"
import GenerationFlow from "@/src/app/generate-video/components/generation-flow"
import { Project, EraPreset } from "./lib/api"
import { useAuth } from "@/src/hooks/useAuth"

export type GenerationStep = "era-selection" | "configuration" | "generation" | "complete"

export default function GenerateVideoPage() {
    const [currentStep, setCurrentStep] = useState<GenerationStep>("era-selection")
    const [selectedEra, setSelectedEra] = useState<EraPreset | null>(null)
    const [project, setProject] = useState<Project | null>(null)
    const [projectConfig, setProjectConfig] = useState<{
        duration: number
        ratio: string
        title?: string
    } | null>(null)
    const { logout } = useAuth()

    const handleEraSelected = (era: EraPreset) => {
        setSelectedEra(era)
        setCurrentStep("configuration")
    }

    const handleConfigurationComplete = (config: { duration: number; ratio: string; title?: string }) => {
        setProjectConfig(config)
        setCurrentStep("generation")
    }

    const handleProjectCreated = (newProject: Project) => {
        setProject(newProject)
    }

    const handleGenerationComplete = () => {
        setCurrentStep("complete")
    }

    const handleStartOver = () => {
        setCurrentStep("era-selection")
        setSelectedEra(null)
        setProject(null)
        setProjectConfig(null)
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                <AnimatedBackground />

                <div className="relative z-10">
                    {currentStep === "era-selection" && (
                        <LogoutGuard onLogout={logout}>
                            <EraSelectionStep onEraSelected={handleEraSelected} />
                        </LogoutGuard>
                    )}

                    {currentStep === "configuration" && selectedEra && (
                        <ConfigurationStep
                            selectedEra={selectedEra}
                            onConfigurationComplete={handleConfigurationComplete}
                            onBack={() => setCurrentStep("era-selection")}
                        />
                    )}

                    {currentStep === "generation" && selectedEra && projectConfig && (
                        <GenerationFlow
                            selectedEra={selectedEra}
                            projectConfig={projectConfig}
                            onProjectCreated={handleProjectCreated}
                            onGenerationComplete={handleGenerationComplete}
                            onStartOver={handleStartOver}
                        />
                    )}
                </div>
            </div>
        </AuthGuard>
    )
} 
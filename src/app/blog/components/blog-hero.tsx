"use client"

import Header from "../../../components/landing/header"
import AnimatedBackground from "../../../components/landing/animated-background"

export default function BlogHero() {
    return (
        <section className="relative min-h-[70vh] flex flex-col">
            <AnimatedBackground />

            {/* Header integrated into hero */}
            <Header />

            {/* Hero Content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
                        The Blog
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Stay up to date with the latest in AI-powered video creation,<br />
                        time travel aesthetics, and cinematic storytelling techniques.
                    </p>
                </div>
            </div>
        </section>
    )
}
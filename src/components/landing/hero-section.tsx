"use client"

import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { VideoCard } from "../ui/video-card"
import { TrustedUsers } from "../ui/trusted-users"
import { SocialBanner } from "../ui/social-banner"
import { Play } from "lucide-react"
import { useAuth } from "@/src/hooks/useAuth"

export default function HeroSection() {
  const { user, loading } = useAuth()

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 lg:pt-32 lg:pb-20 mt-12 sm:mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <Badge variant="outline" className="border-yellow-400/30 text-yellow-400 bg-yellow-400/10 font-medium inline-flex items-center text-sm">
              <span className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Powered by GPT-4.5
            </Badge>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight text-white">
                Your <span className="text-yellow-400">Time Machine</span>
                <br />
                for <span className="text-yellow-400">Viral Videos</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                From the 1950s to Ancient Rome, turn your ideas into cinematic videos with a signature aesthetic. Every frame tells a story through time.
              </p>
            </div>

            <a href={!loading && user ? "/generate-video" : "/login"}>
              <Button
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300  px-6 sm:px-8 mt-6 text-base sm:text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-yellow-400/25 border-2 border-black"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Time Traveling →
              </Button>
            </a>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="hidden lg:block relative right-14">
              <div className="relative flex flex-col-3 gap-4">
                <div className="flex flex-col-3 gap-4 items-start pt-10">
                  <VideoCard
                    title="Rio de Janeiro 80's"
                    videoSrc="/videos/brazil.mp4"
                    className="transform rotate-6 hover:rotate-1 transition-transform duration-500"
                  />
                  <VideoCard
                    title="A man in USA 1990s"
                    videoSrc="/videos/usa90ss.mp4"
                    className="transform rotate-0 hover:rotate-0 transition-transform duration-500 pt-6"
                  />
                </div>
                <div className="flex justify-end pt-10">
                  <VideoCard
                    title="Ancient Rome 121 BC"
                    videoSrc="/videos/ancient_rome.mp4"
                    className="transform rotate-2 hover:-rotate-3 transition-transform duration-500 pt-16"
                  />
                </div>
              </div>
            </div>

            <div className="lg:hidden flex flex-col items-center space-y-4">
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <VideoCard
                  title="Rio de Janeiro 80's"
                  videoSrc="/videos/brazil.mp4"
                  className="transform rotate-1 hover:rotate-0 transition-transform duration-500"
                />
                <VideoCard
                  title="A man in USA 1990s"
                  videoSrc="/videos/usa90s.mp4"
                  className="transform -rotate-1 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="flex justify-center">
                <VideoCard
                  title="Ancient Rome 121 BC"
                  videoSrc="/videos/ancient_rome.mp4"
                  className="transform -rotate-2 hover:-rotate-1 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 sm:mt-8">
          <TrustedUsers />
          <SocialBanner />
        </div>
      </div>
    </section>
  )
}

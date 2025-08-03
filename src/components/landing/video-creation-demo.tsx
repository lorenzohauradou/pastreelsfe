import { Button } from "../ui/button"
import { Play, Volume2, ArrowRight } from "lucide-react"

export default function VideoCreationDemo() {
  return (
    <section className="relative z-10 px-6 lg:px-8 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 text-white/70">
                  <span className="text-lg">📝</span>
                  <span>Headline</span>
                </div>
                <div className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-6">
                  <h3 className="text-xl sm:text-2xl font-bold leading-relaxed text-center">
                    <span className="text-yellow-400 drop-shadow-lg" style={{
                      textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(251, 191, 36, 0.4), 0 1px 2px rgba(0, 0, 0, 0.9)'
                    }}>
                      POV:
                    </span>
                    <span className="text-white drop-shadow-lg ml-2" style={{
                      textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.9)'
                    }}>
                      Waking Up as a Teenager in 2000s USA
                    </span>
                  </h3>
                </div>
                <Button size="sm" className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  Choose Headline
                  <ArrowRight />
                </Button>
              </div>

              <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 text-white/70">
                  <span className="text-lg">🎵</span>
                  <span>Background music</span>
                </div>
                <div className="flex items-center justify-between bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                  <div>
                    <p className="text-white font-medium">Hip Hop</p>
                    <p className="text-white/60 text-sm">Hip Hop, 2000s, USA</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="aspect-[9/16] relative">
                  <video
                    src="/videos/horror-story.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-20 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      He <span className="bg-yellow-400 text-black px-2 py-1 rounded">lifted</span> his
                    </h3>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                      <Volume2 className="w-4 h-4 mr-1" />
                      Sound On
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

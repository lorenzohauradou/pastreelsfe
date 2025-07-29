import { Youtube, Music, Upload, Sparkles, Mic, Heart } from "lucide-react"

const features = [
  {
    icon: Youtube,
    title: "Era-Perfect YouTube Shorts",
    description: "Create historically immersive shorts that transport viewers to any time period with authentic visual storytelling.",
  },
  {
    icon: Music,
    title: "Viral Time Travel Content",
    description: "Craft TikTok videos that capture the magic of different eras, from vintage aesthetics to ancient civilizations.",
  },
  {
    icon: Upload,
    title: "Publish on TikTok and YouTube",
    description: "Publish your videos directly on TikTok and YouTube with ease.",
  },
  {
    icon: Sparkles,
    title: "Ultra-Realistic AI",
    description: "Our AI acts as your personal cinematographer, bringing the past to life.",
  },
  {
    icon: Mic,
    title: "Era-Appropriate Voiceovers",
    description: "From historical documentarians to vintage storytellers, find the perfect voice to match your narrative and time period.",
  },
  {
    icon: Music,
    title: "Period-Accurate Soundtracks",
    description: "A curated music library designed to evoke the perfect atmosphere for any era.",
  },
  {
    icon: Heart,
    title: "Endless Historical Possibilities",
    description: "Past Reels constantly expands its time-traveling capabilities. New eras, styles, and cinematic techniques added weekly.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 sm:space-y-6 mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white/90 leading-tight">
            Bringing History to Life
            <br />
            Has Never Been So Cinematic
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

const videoExamples = [
  {
    id: "dinosaurs",
    title: "Life with dinosaurs",
    fullVideoSrc: "/videos/dinos.mp4",
    aspectRatio: "landscape"
  },
  {
    id: "julius",
    title: "Rio de Janeiro 80's",
    fullVideoSrc: "/videos/brazil.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "usa",
    title: "USA 1990s",
    fullVideoSrc: "/videos/usahero.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "rome",
    title: "The story of Caius",
    fullVideoSrc: "/videos/ancient_roma.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "apollo",
    title: "Apollo 11 Moon Landing",
    fullVideoSrc: "/videos/apollo_11.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "brazil",
    title: "Brazil 80's",
    fullVideoSrc: "/videos/brazile.mp4",
    aspectRatio: "landscape"
  },
]

interface VideoCardProps {
  example: typeof videoExamples[0]
  className?: string
}

function InteractiveVideoCard({ example, className = "" }: VideoCardProps) {
  return (
    <div className={className}>
      <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
        <video
          src={example.fullVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
            {example.title}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default function VideoExamplesSection() {

  return (
    <>
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Pick Your Era. Tell Your Story.</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              From ancient civilizations to modern history, Past Reels captures the authentic essence of any time period with cinematic precision.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <InteractiveVideoCard
                example={videoExamples[0]}
                className="sm:col-span-2 lg:col-span-2"
              />
              <InteractiveVideoCard
                example={videoExamples[1]}
              />
              <InteractiveVideoCard
                example={videoExamples[2]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <InteractiveVideoCard
                example={videoExamples[3]}
              />
              <InteractiveVideoCard
                example={videoExamples[4]}
              />
              <InteractiveVideoCard
                example={videoExamples[5]}
                className="sm:col-span-2 lg:col-span-2"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

"use client"

import { useState } from "react"
import { X, Play } from "lucide-react"

const videoExamples = [
  {
    id: "dinosaurs",
    title: "Life with dinosaurs",
    thumbnailSrc: "/videos/thumbnails/dinosaurs-thumb.jpg",
    hoverVideoSrc: "/videos/previews/dinosaurs-preview.mp4",
    fullVideoSrc: "/videos/dinosaurs.mp4",
    aspectRatio: "landscape"
  },
  {
    id: "julius",
    title: "Rio de Janeiro 80's",
    thumbnailSrc: "/images/brazil_prev.png",
    hoverVideoSrc: "/videos/brazil.mp4",
    fullVideoSrc: "/videos/brazil.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "images-to-videos",
    title: "Turn images into videos",
    thumbnailSrc: "/videos/thumbnails/images-thumb.jpg",
    hoverVideoSrc: "/videos/previews/images-preview.mp4",
    fullVideoSrc: "/videos/images-to-videos.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "cleopatra",
    title: "The story of Cleopatra",
    thumbnailSrc: "/videos/thumbnails/cleopatra-thumb.jpg",
    hoverVideoSrc: "/videos/previews/cleopatra-preview.mp4",
    fullVideoSrc: "/videos/cleopatra.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "apollo",
    title: "Apollo 11 Moon Landing",
    thumbnailSrc: "/videos/thumbnails/apollo-thumb.jpg",
    hoverVideoSrc: "/videos/previews/apollo-preview.mp4",
    fullVideoSrc: "/videos/.mp4",
    aspectRatio: "portrait"
  },
  {
    id: "japanese",
    title: "Japanese Ink Style",
    thumbnailSrc: "/videos/thumbnails/japanese-thumb.jpg",
    hoverVideoSrc: "/videos/previews/japanese-preview.mp4",
    fullVideoSrc: "/videos/japanese.mp4",
    aspectRatio: "landscape"
  },
]

interface VideoCardProps {
  example: typeof videoExamples[0]
  className?: string
  onVideoClick: (video: typeof videoExamples[0]) => void
}

function InteractiveVideoCard({ example, className = "", onVideoClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={className}>
      <div
        className="relative h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-lg sm:shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onVideoClick(example)}
      >
        {!isHovered ? (
          <img
            src={example.thumbnailSrc}
            alt={example.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        ) : (
          <video
            src={example.hoverVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {!imageLoaded && (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
            {example.title}
          </h3>
          <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to watch full video
          </p>
        </div>
      </div>
    </div>
  )
}

interface VideoLightboxProps {
  video: typeof videoExamples[0] | null
  isOpen: boolean
  onClose: () => void
}

function VideoLightbox({ video, isOpen, onClose }: VideoLightboxProps) {
  if (!isOpen || !video) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
          <video
            src={video.fullVideoSrc}
            controls
            autoPlay
            className="w-full h-auto max-h-[70vh]"
          />

          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
            <p className="text-gray-300">
              Experience the cinematic quality and historical accuracy that Past Reels delivers for every era.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VideoExamplesSection() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videoExamples[0] | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleVideoClick = (video: typeof videoExamples[0]) => {
    setSelectedVideo(video)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedVideo(null)
  }

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
                onVideoClick={handleVideoClick}
              />
              <InteractiveVideoCard
                example={videoExamples[1]}
                onVideoClick={handleVideoClick}
              />
              <InteractiveVideoCard
                example={videoExamples[2]}
                onVideoClick={handleVideoClick}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <InteractiveVideoCard
                example={videoExamples[3]}
                onVideoClick={handleVideoClick}
              />
              <InteractiveVideoCard
                example={videoExamples[4]}
                onVideoClick={handleVideoClick}
              />
              <InteractiveVideoCard
                example={videoExamples[5]}
                className="sm:col-span-2 lg:col-span-2"
                onVideoClick={handleVideoClick}
              />
            </div>
          </div>
        </div>
      </section>

      <VideoLightbox
        video={selectedVideo}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </>
  )
}

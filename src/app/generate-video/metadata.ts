import { Metadata } from 'next'

export const generateVideoMetadata: Metadata = {
  title: 'Generate AI Video - Past Reels | Create Historical Cinematic Videos',
  description: 'Create stunning AI-generated videos with historical aesthetics. Choose your era, customize your story, and generate viral content in minutes.',
  keywords: ['AI video creation', 'historical video generator', 'cinematic videos', 'video editing AI', 'past reels generator'],
  openGraph: {
    title: 'Generate Your Historical Video | Past Reels',
    description: 'Transform your ideas into cinematic videos with authentic historical aesthetics.',
    type: 'website',
    images: [
      {
        url: '/images/pastreelslogo.png',
        width: 1200,
        height: 630,
        alt: 'Past Reels Video Generator',
      }
    ],
  },
  twitter: {
    title: 'Generate Your Historical Video | Past Reels',
    description: 'Transform your ideas into cinematic videos with authentic historical aesthetics.',
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
import { Metadata } from 'next'

export const blogMetadata: Metadata = {
  title: 'Blog - Past Reels | AI Video Generation Tips & Historical Insights',
  description: 'Discover tips for creating viral historical videos, learn about different eras, and master AI video generation with our comprehensive guides.',
  keywords: ['historical video tips', 'AI video generation guide', 'viral video creation', 'past reels blog', 'video marketing'],
  openGraph: {
    title: 'Past Reels Blog | Historical Video Creation Tips',
    description: 'Learn how to create viral historical videos with AI. Tips, tutorials, and insights.',
    type: 'website',
    images: [
      {
        url: '/images/pastreelslogo.png',
        width: 1200,
        height: 630,
        alt: 'Past Reels Blog',
      }
    ],
  },
  twitter: {
    title: 'Past Reels Blog | Historical Video Creation Tips',
    description: 'Learn how to create viral historical videos with AI. Tips, tutorials, and insights.',
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
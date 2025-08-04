import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from "@vercel/analytics/next"
import { OrganizationStructuredData, WebSiteStructuredData, SoftwareApplicationStructuredData } from '@/src/components/seo/structured-data'
import './globals.css'

export const metadata: Metadata = {
  title: 'Past Reels - AI Video Generator | Create Cinematic Historical Videos',
  description: 'Transform your ideas into stunning cinematic videos with historical aesthetics. From the 1950s to Ancient Rome, create viral videos powered by AI. Start your time travel journey today.',
  keywords: ['AI video generator', 'historical videos', 'cinematic videos', 'video creation', 'time travel videos', 'vintage aesthetics', 'viral videos', 'GPT-4 powered'],
  authors: [{ name: 'Past Reels' }],
  creator: 'Past Reels',
  publisher: 'Past Reels',
  generator: 'Past Reels',
  applicationName: 'Past Reels',
  referrer: 'origin-when-cross-origin',
  category: 'Technology',
  classification: 'AI Video Generation Platform',

  // Open Graph metadata for social sharing
  openGraph: {
    title: 'Past Reels - Your Time Machine for Viral Videos',
    description: 'Create stunning cinematic videos with historical aesthetics. From the 1950s to Ancient Rome, turn your ideas into viral content.',
    url: 'https://pastreels.com',
    siteName: 'Past Reels',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/OpenGraphImage.png',
        width: 1200,
        height: 630,
        alt: 'Past Reels - AI Video Generator',
        type: 'image/png',
      }
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Past Reels - Your Time Machine for Viral Videos',
    description: 'Create stunning cinematic videos with historical aesthetics. Powered by AI.',
    creator: '@pastreels', // Replace with your actual Twitter handle
    site: '@pastreels', // Replace with your actual Twitter handle
    images: ['/images/pastreelslogo.png'],
  },

  // Favicon and icons configuration
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  // Additional metadata
  metadataBase: new URL('https://pastreels.com'), // Replace with your actual domain
  alternates: {
    canonical: 'https://pastreels.com', // Replace with your actual domain
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional verification (add these when you set up Google Search Console, etc.)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <SoftwareApplicationStructuredData />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-black px-4 py-2 rounded-md font-medium z-50">
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}

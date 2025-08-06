import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Past Reels - AI Video Generator',
    short_name: 'Past Reels',
    description: 'Transform your ideas into stunning cinematic videos with historical aesthetics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#facc15', // Yellow-400
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon',
      },
      // {
      //   src: '/icon-192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      // },
      // {
      //   src: '/icon-512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      // },
      // {
      //   src: '/apple-touch-icon.png',
      //   sizes: '180x180',
      //   type: 'image/png',
      // },
    ],
  }
}
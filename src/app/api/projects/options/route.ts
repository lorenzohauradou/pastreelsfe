import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/options`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching project options:', error)
    
    // Fallback data in case backend is not available
    const fallbackData = {
      era_presets: [
        {
          preset_name: "roma_antica",
          display_name: "Roma Antica (100 a.C.)",
          description: "Una giornata nella vita di un giovane cittadino romano"
        },
        {
          preset_name: "usa_1990",
          display_name: "USA Anni '90",
          description: "Una giornata nella vita di un teenager americano degli anni '90"
        },
        {
          preset_name: "cyberpunk_tokyo",
          display_name: "Cyberpunk Tokyo 2080",
          description: "Una giornata nella vita di un cyber-enhanced in Tokyo futuristica"
        }
      ],
      music_tracks: [],
      available_ratios: [
        "720:1280",   // 9:16 verticale (TikTok/Reels)
        "1280:720",   // 16:9 orizzontale (YouTube)
        "1104:832",   // 4:3 orizzontale
        "832:1104",   // 3:4 verticale
        "960:960",    // 1:1 quadrato (Instagram)
        "1584:672"    // Ultra-wide
      ],
      duration_options: [10, 15, 20, 25, 30]
    }
    
    return NextResponse.json(fallbackData)
  }
} 
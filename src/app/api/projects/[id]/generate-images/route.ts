import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    
    const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}/generate-images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Backend error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error starting image generation:', error)
    
    // In demo mode, return mock task
    if (process.env.DEMO_MODE === 'true') {
      const mockTask = {
        task_id: `task_${Date.now()}`,
        status: 'started',
        message: 'Image generation started (demo mode)'
      }
      return NextResponse.json(mockTask)
    }
    
    return NextResponse.json(
      { error: 'Failed to start image generation' },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    const body = await request.json()
    
    const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}/create-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Backend error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error starting video creation:', error)
    
    // In demo mode, return mock task
    if (process.env.DEMO_MODE === 'true') {
      const mockTask = {
        task_id: `video_task_${Date.now()}`,
        status: 'started',
        message: 'Video creation started (demo mode)'
      }
      return NextResponse.json(mockTask)
    }
    
    return NextResponse.json(
      { error: 'Failed to start video creation' },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: taskId } = await params
    
    const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}/status`, {
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
    console.error('Error fetching task status:', error)
    
    // In demo mode, simulate task progression
    if (process.env.DEMO_MODE === 'true') {
      const { id: taskId } = await params
      const now = Date.now()
      const taskCreatedTime = parseInt(taskId.split('_')[1]) || now
      const elapsed = now - taskCreatedTime
      
      // Simulate task progression over time
      if (elapsed < 5000) { // First 5 seconds
        return NextResponse.json({
          task_id: taskId,
          status: 'running',
          message: 'Task is running...',
          progress: Math.min(Math.floor(elapsed / 100), 50)
        })
      } else if (elapsed < 10000) { // 5-10 seconds
        return NextResponse.json({
          task_id: taskId,
          status: 'running',
          message: 'Almost done...',
          progress: Math.min(50 + Math.floor((elapsed - 5000) / 100), 90)
        })
      } else { // After 10 seconds
        return NextResponse.json({
          task_id: taskId,
          status: 'completed',
          message: 'Task completed successfully!',
          progress: 100
        })
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch task status' },
      { status: 500 }
    )
  }
} 
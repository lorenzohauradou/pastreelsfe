import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    const { searchParams } = new URL(request.url)
    const assetType = searchParams.get('asset_type') || 'image'
    
    const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}/assets?asset_type=${assetType}`, {
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
    console.error('Error fetching project assets:', error)
    
    // In demo mode, return mock assets
    if (process.env.DEMO_MODE === 'true') {
      const assetType = new URL(request.url).searchParams.get('asset_type') || 'image'
      const numAssets = assetType === 'image' ? 3 : 0 // Default to 3 demo images
      
      const mockAssets = Array.from({ length: numAssets }, (_, i) => ({
        id: i + 1,
        asset_type: assetType,
        status: 'completed',
        file_url: `https://picsum.photos/600/800?random=${i + 1}`,
        sequence_order: i,
        is_selected: true,
        created_at: new Date().toISOString()
      }))
      
      return NextResponse.json(mockAssets)
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch project assets' },
      { status: 500 }
    )
  }
} 
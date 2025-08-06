// Types
export interface EraPreset {
  preset_name: string
  display_name: string
  description: string
}

export interface MusicTrack {
  id: number
  title: string
  artist?: string
  genre?: string
  mood?: string
  duration: number
}

export interface AvailableOptions {
  era_presets: EraPreset[]
  music_tracks: MusicTrack[]
  available_ratios: string[]
  duration_options: number[]
}

export interface ProjectCreateData {
  title?: string
  era_preset: string
  duration: number
  ratio: string
}

export interface Project {
  id: number
  title?: string
  era_preset: string
  duration: number
  ratio: string
  num_images: number
  status: string
  created_at: string
  completed_at?: string
  overlay_text?: string
  final_video_url?: string
  assets?: Asset[]
  selected_music?: MusicTrack
}

export interface Asset {
  id: number
  asset_type: string
  status: string
  file_url?: string
  sequence_order?: number
  is_selected: boolean
  created_at: string
}

export interface TaskStatus {
  task_id: string
  status: string
  message?: string
  progress?: number
  result?: {
    final_video_url?: string
    final_task_id?: string
    video_assets?: any[]
    [key: string]: any
  }
}

export interface CreateVideoRequest {
  selected_asset_ids: number[]
  music_id?: number
  overlay_text?: string
}

// Utility function for API calls to our Next.js API routes
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `/api${endpoint}`
  
  // Ottieni il token di autenticazione da Supabase
  const { supabase } = await import('@/src/lib/supabase')
  const { data: { session } } = await supabase.auth.getSession()
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.access_token && { 
        'Authorization': `Bearer ${session.access_token}` 
      }),
      ...options.headers,
    },
    signal: AbortSignal.timeout(30000), // 30 secondi timeout
  }

  const response = await fetch(url, { ...defaultOptions, ...options })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `API Error ${response.status}`)
  }
  
  return response.json()
}

async function apiCallWithRetry<T>(
  endpoint: string, 
  options: RequestInit = {},
  maxRetries = 3,
  retryDelay = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall<T>(endpoint, options)
    } catch (error) {
      lastError = error as Error
      console.warn(`API call attempt ${attempt} failed:`, error)
      
      // Non fare retry per errori 4xx (client errors)
      if (error instanceof Error && error.message.includes('API Error 4')) {
        throw error
      }
      
      // Se non è l'ultimo tentativo, aspetta prima di riprovare
      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay}ms... (attempt ${attempt + 1}/${maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        retryDelay *= 1.5 // Backoff esponenziale
      }
    }
  }
  
  throw lastError!
}

// API Functions

/**
 * Get available options for creating a project
 */
export async function getAvailableOptions(): Promise<AvailableOptions> {
  return apiCallWithRetry<AvailableOptions>('/projects/options')
}

/**
 * Create a new project
 */
export async function createProject(data: ProjectCreateData): Promise<Project> {
  return apiCall<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Get project by ID
 */
export async function getProject(projectId: number): Promise<Project> {
  return apiCall<Project>(`/projects/${projectId}`)
}

/**
 * Start image generation for a project
 */
export async function startImageGeneration(projectId: number): Promise<TaskStatus> {
  return apiCall<TaskStatus>(`/projects/${projectId}/generate-images`, {
    method: 'POST',
  })
}

/**
 * Regenerate a single image asset
 */
export async function regenerateAsset(projectId: number, assetId: number): Promise<TaskStatus> {
  return apiCall<TaskStatus>(`/projects/${projectId}/regenerate-asset/${assetId}`, {
    method: 'POST',
  })
}

/**
 * Get project assets (images, videos, etc.)
 */
export async function getProjectAssets(
  projectId: number, 
  assetType: string = 'image'
): Promise<Asset[]> {
  return apiCall<Asset[]>(`/projects/${projectId}/assets?asset_type=${assetType}`)
}

/**
 * Start video creation
 */
export async function createVideo(
  projectId: number,
  data: CreateVideoRequest
): Promise<TaskStatus> {
  return apiCall<TaskStatus>(`/projects/${projectId}/create-video`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Get task status
 */
export async function getTaskStatus(taskId: string): Promise<TaskStatus> {
  return apiCall<TaskStatus>(`/tasks/${taskId}/status`)
}

/**
 * Poll task status until completion
 */
export async function pollTaskStatus(
  taskId: string,
  onProgress?: (status: TaskStatus) => void,
  maxAttempts: number = 200, // Aumentato da 60 a 200 (10 minuti)
  interval: number = 3000
): Promise<TaskStatus> {
  let attempts = 0
  let lastProgress = -1
  let lastMessage = ''
  
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        attempts++
        const status = await getTaskStatus(taskId)
        
        // Reset timeout counter if progress changed or message changed (new image being generated)
        if (status.progress !== lastProgress || status.message !== lastMessage) {
          console.log(`Progress updated: ${lastProgress}% -> ${status.progress}% | Message: "${status.message}"`)
          attempts = 0  // Reset timeout counter
          lastProgress = status.progress || -1
          lastMessage = status.message || ''
        }
        
        if (onProgress) {
          onProgress(status)
        }
        
        if (status.status === 'completed') {
          resolve(status)
        } else if (status.status === 'failed') {
          reject(new Error(status.message || 'Task failed'))
        } else if (attempts >= maxAttempts) {
          reject(new Error(`Task timeout after ${Math.round(maxAttempts * interval / 1000 / 60)} minutes. Video processing may take longer than expected. Last progress: ${lastProgress}%`))
        } else {
          setTimeout(poll, interval)
        }
      } catch (error) {
        // Add retry logic for network errors
        if (attempts < maxAttempts) {
          console.warn(`Polling attempt ${attempts} failed, retrying...`, error)
          setTimeout(poll, interval)
        } else {
          reject(error)
        }
      }
    }
    
    poll()
  })
}

// Error handling utility
export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'APIError'
  }
} 
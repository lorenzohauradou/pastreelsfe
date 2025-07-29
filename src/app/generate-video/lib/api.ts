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
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  const response = await fetch(url, { ...defaultOptions, ...options })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(errorData.error || `API Error ${response.status}`)
  }
  
  return response.json()
}

// API Functions

/**
 * Get available options for creating a project
 */
export async function getAvailableOptions(): Promise<AvailableOptions> {
  return apiCall<AvailableOptions>('/projects/options')
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
  maxAttempts: number = 60,
  interval: number = 3000
): Promise<TaskStatus> {
  let attempts = 0
  
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        attempts++
        const status = await getTaskStatus(taskId)
        
        if (onProgress) {
          onProgress(status)
        }
        
        if (status.status === 'completed') {
          resolve(status)
        } else if (status.status === 'failed') {
          reject(new Error(status.message || 'Task failed'))
        } else if (attempts >= maxAttempts) {
          reject(new Error('Task polling timeout'))
        } else {
          setTimeout(poll, interval)
        }
      } catch (error) {
        reject(error)
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
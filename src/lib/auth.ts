import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar_url?: string
}

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }

  if (!session?.user) {
    return null
  }

  const user = session.user
  return {
    id: user.id,
    email: user.email!,
    name: user.user_metadata?.full_name || user.email!.split('@')[0],
    avatar_url: user.user_metadata?.avatar_url
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}

// Hook per ascoltare cambiamenti nello stato di autenticazione
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const authUser: AuthUser = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
        avatar_url: session.user.user_metadata?.avatar_url
      }
      callback(authUser)
    } else {
      callback(null)
    }
  })
}
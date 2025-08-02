"use client"

import { useState, useEffect } from 'react'
import { getCurrentUser, signOut, onAuthStateChange, AuthUser } from '@/src/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setError(null)
      } catch (err) {
        console.error('Auth check failed:', err)
        setUser(null)
        setError(err instanceof Error ? err.message : 'Authentication failed')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
    
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
      setError(null)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
      setError(null)
      return true
    } catch (err) {
      console.error('Sign out failed:', err)
      setError(err instanceof Error ? err.message : 'Sign out failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: !!user && !loading
  }
}
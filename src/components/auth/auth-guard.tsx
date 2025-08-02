"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/hooks/useAuth'

interface AuthGuardProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        if (!loading) {
            setIsInitialized(true)
            if (!user) {
                router.push('/login')
            }
        }
    }, [user, loading, router])

    if (!isInitialized || loading) {
        return fallback || (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/70">Checking authentication...</p>
                </div>
            </div>
        )
    }
    if (!user) {
        return null
    }
    return <>{children}</>
}
"use client"

import { useState, createContext, useContext } from 'react'

interface LogoutContextType {
    logout: () => void
}

const LogoutContext = createContext<LogoutContextType | null>(null)

export const useLogoutContext = () => {
    const context = useContext(LogoutContext)
    if (!context) {
        throw new Error('useLogoutContext must be used within LogoutGuard')
    }
    return context
}

interface LogoutGuardProps {
    onLogout: () => Promise<boolean>
    children: React.ReactNode
}

export default function LogoutGuard({ onLogout, children }: LogoutGuardProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        console.log('Starting logout...')
        setIsLoggingOut(true)

        try {
            const logoutSuccess = await onLogout()
            if (logoutSuccess) {
                window.location.href = '/'
            } else {
                setIsLoggingOut(false)
            }

        } catch (error) {
            console.error('Error during logout:', error)
            setIsLoggingOut(false)
        }
    }

    if (isLoggingOut) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/70">Signing out...</p>
                </div>
            </div>
        )
    }

    return (
        <LogoutContext.Provider value={{ logout: handleLogout }}>
            {children}
        </LogoutContext.Provider>
    )
}
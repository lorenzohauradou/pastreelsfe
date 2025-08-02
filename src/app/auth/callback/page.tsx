"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase"

export default function AuthCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()

                if (error) throw error

                if (session) {
                    router.push("/generate-video")
                } else {
                    router.push("/login")
                }
            } catch (error) {
                console.error("Error during auth callback:", error)
                router.push("/login")
            }
        }

        handleAuthCallback()
    }, [router])

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-white/70">Completing login...</p>
            </div>
        </div>
    )
}
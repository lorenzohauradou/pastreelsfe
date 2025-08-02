"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import AnimatedBackground from "@/src/components/landing/animated-background"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/src/lib/supabase"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [messageSent, setMessageSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    shouldCreateUser: true
                }
            })

            if (error) {
                setError(error.message)
            } else {
                setMessageSent(true)
                setEmail("")
            }
        } catch (error) {
            setError("An unexpected error occurred")
            console.error("Login error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            })

            if (error) {
                setError(error.message)
            }
        } catch (error) {
            setError("An unexpected error occurred")
            console.error("Google login error:", error)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 min-h-screen flex flex-col">
                <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image src="/images/prlogo.png" alt="Past Reels" width={32} height={32} />
                            <span className="text-lg sm:text-xl font-bold text-white">Past Reels</span>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md">
                        <div className="bg-black/40 border border-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl shadow-black/50">
                            <div className="text-center mb-8">
                                <div className="mb-6 relative">
                                    <div className="w-16 h-16 mx-auto">
                                        <Image
                                            src="/icons/world.png"
                                            alt="Past Reels World"
                                            width={64}
                                            height={64}
                                            className="animate-float"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                                    Welcome to Past Reels
                                </h1>
                                <p className="text-gray-300 text-lg">
                                    Enter your email to receive a magic link
                                </p>
                            </div>

                            {messageSent ? (
                                <div className="text-center p-6 space-y-4">
                                    <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Check your email!</h3>
                                    <p className="text-gray-400">
                                        We've sent you a magic link to sign in.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-white">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}`}
                                            required
                                            disabled={isLoading}
                                        />
                                        {error && (
                                            <p className="text-sm text-red-400 mt-1">{error}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending...
                                            </div>
                                        ) : (
                                            "Send Magic Link"
                                        )}
                                    </Button>
                                </form>
                            )}

                            {!messageSent && (
                                <>
                                    <div className="relative my-8">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/20"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-black/40 text-gray-400">or</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-full py-3 px-4 transition-all duration-300 hover:scale-[1.02] group"
                                    >
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="font-medium">Continue with Google</span>
                                    </button>

                                    <p className="text-center text-sm text-gray-400 mt-6">
                                        Don't have an account? One will be created for you.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
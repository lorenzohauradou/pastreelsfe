"use client"

import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/src/hooks/useAuth"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const heroButton = document.querySelector('section .bg-yellow-400')
      if (heroButton) {
        const heroButtonRect = heroButton.getBoundingClientRect()
        const headerHeight = 80 // Altezza approssimativa dell'header
        if (headerHeight > heroButtonRect.top) {
          setIsButtonHighlighted(true)
        } else {
          setIsButtonHighlighted(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className={`flex justify-center px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}>
        <div className={`bg-black/10 border border-white/20 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 shadow-lg backdrop-blur-sm transition-all duration-300 w-full max-w-3xl ${isScrolled
          ? 'rounded-2xl sm:rounded-3xl'
          : 'rounded-b-2xl sm:rounded-b-3xl'
          }`}>
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2 sm:space-x-3">
              <Image src="/images/prlogo.png" alt="Past Reels" width={32} height={32} className="sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl font-bold text-white">Past Reels</span>
            </a>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#pricing" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Pricing
              </a>
              <a href="/blog" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Blog
              </a>
              <div className="flex items-center space-x-2">
                <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Affiliate Program
                </a>
                <Badge className={`bg-yellow-300 text-black ${isButtonHighlighted ? 'bg-white' : 'bg-yellow-500'} text-xs font-semibold px-2 py-1`}>New</Badge>
              </div>
            </nav>

            <div className="flex items-center space-x-3">
              <a href={!loading && user ? "/generate-video" : "/login"}>
                <Button className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-all ${isButtonHighlighted
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 font-semibold duration-200 hover:scale-105 shadow-lg shadow-yellow-400/25 border-2 border-black'
                  : 'bg-white text-black hover:bg-white/90 font-medium duration-300'
                  }`}>
                  Get Started
                </Button>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Pricing
                </a>
                <a href="/blog" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Blog
                </a>
                <div className="flex items-center space-x-2">
                  <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                    Affiliate Program
                  </a>
                  <Badge className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1">New</Badge>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

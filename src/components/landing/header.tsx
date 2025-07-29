"use client"

import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className={`flex justify-center px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}>
        <div className={`bg-black/10 border border-white/20 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 shadow-lg backdrop-blur-sm transition-all duration-300 w-full max-w-7xl ${isScrolled
          ? 'rounded-2xl sm:rounded-3xl'
          : 'rounded-b-2xl sm:rounded-b-3xl'
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image src="/images/logormbg.png" alt="Past Reels" width={32} height={32} className="sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl font-bold text-white">Past Reels</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Pricing
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Blog
              </a>
              <div className="flex items-center space-x-2">
                <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Affiliate Program
                </a>
                <Badge className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1">New</Badge>
              </div>
            </nav>

            <div className="flex items-center space-x-3">
              <Button className="bg-white text-black hover:bg-white/90 font-medium px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base">
                Get Started
              </Button>

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
                <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
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

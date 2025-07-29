import { Button } from "../ui/button"
import { Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="sm:hidden space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/images/prlogo.png" alt="Past Reels" width={32} height={32} />
                <h3 className="text-lg font-bold text-white">Past Reels</h3>
              </div>
              <div className="text-white/60 text-sm">
                <p>Your time machine for viral videos.</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Stay updated</h4>
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-white/5 border border-white/20 rounded-full px-10 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <Button
                  size="sm"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-300 py-2 rounded-full font-medium text-sm"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Product</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Pricing</a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Blog</a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Contact</a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Legal</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Privacy</a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Terms</a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Refund</a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Social</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">Twitter</a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">LinkedIn</a>
                  <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">YouTube</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <Image src="/images/prlogo.png" alt="Past Reels" width={40} height={40} className="sm:w-12 sm:h-12" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Past Reels</h3>
            </div>
            <div className="text-white/60 text-sm">
              <p>Your time machine for viral videos. Create cinematic content from any era.</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Stay updated</h4>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/20 rounded-full px-10 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <Button
                  size="sm"
                  className="bg-yellow-400 text-black hover:bg-yellow-300 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/40">Get notified about new features and get 50% off on your first purchase</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <div className="space-y-3">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Pricing
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Blog
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Contact
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Affiliate Program
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <div className="space-y-3">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Refund Policy
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Social</h4>
            <div className="space-y-3">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 lg:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-white/60 text-sm">Copyright © 2025 Past Reels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

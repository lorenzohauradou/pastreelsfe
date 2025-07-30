import Image from "next/image"
import { Button } from "../../../components/ui/button"

export default function BlogFooter() {
    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Image src="/images/prlogo.png" alt="Past Reels" width={40} height={40} />
                        <span className="text-2xl font-bold text-white">Past Reels</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-8 text-sm">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Pricing
                        </a>
                        <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                            Blog
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Changelog
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Affiliate Program
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Academy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Help
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Status
                        </a>
                    </nav>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16.673 4.937c.703.326 1.238.885 1.593 1.604l.355-.151-.015-.1-.002-.012.04-.008.055-.013a1.627 1.627 0 00.86-.859c.088-.197.127-.407.113-.616-.013-.209-.088-.411-.216-.582a1.632 1.632 0 00-1.593-.604c-.264.027-.516.124-.735.283-.22.16-.398.375-.515.628l-.024.056zM9.5 12.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM6.333 2H17.667C20.5 2 22 3.5 22 6.333v11.334C22 20.5 20.5 22 17.667 22H6.333C3.5 22 2 20.5 2 17.667V6.333C2 3.5 3.5 2 6.333 2z" />
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-500 text-sm">
                            © 2024 Past Reels. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
"use client"

import { Star } from "lucide-react"
import Image from "next/image"

export function TrustedUsers() {
    return (
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 mt-20 sm:mt-28">
            <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                    <Image
                        src="/placeholder-user.jpg"
                        alt="User"
                        width={36}
                        height={36}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    />
                    <Image
                        src="/placeholder-user.jpg"
                        alt="User"
                        width={36}
                        height={36}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    />
                    <Image
                        src="/placeholder-user.jpg"
                        alt="User"
                        width={36}
                        height={36}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    />
                    <Image
                        src="/placeholder-user.jpg"
                        alt="User"
                        width={36}
                        height={36}
                        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    />
                </div>

                <div className="flex space-x-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base font-medium text-center">
                Trusted by 10,000+ creators
            </p>
        </div>
    )
} 
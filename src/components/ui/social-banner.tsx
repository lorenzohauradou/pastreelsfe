"use client"

import { Instagram, Twitter, Youtube, Facebook } from "lucide-react"
import Image from "next/image"

type SocialLink = {
    name: string
    href: string
    color: string
} & (
        | { icon: any; imageSrc?: never }
        | { icon?: never; imageSrc: string }
    )

// Ensure imageSrc is always defined when icon is not present
function isSocialLinkWithImage(social: SocialLink): social is SocialLink & { imageSrc: string } {
    return !social.icon && !!social.imageSrc
}

export function SocialBanner() {
    const socialLinks: SocialLink[] = [
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://www.instagram.com/past.reels/",
            color: "hover:text-pink-400"
        },
        {
            name: "TikTok",
            imageSrc: "/icons/tik-tok.png",
            href: "https://www.tiktok.com/@past.reels",
            color: "text-yellow-500"
        },
        {
            name: "YouTube",
            icon: Youtube,
            href: "https://www.youtube.com/@past.reels",
            color: "hover:text-red-400"
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: "https://x.com/past_reels",
            color: "hover:text-blue-400"
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://www.facebook.com/past.reels/",
            color: "hover:text-blue-600"
        }
    ]

    return (
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 mt-8 sm:mt-12">
            <div className="flex items-center space-x-10 sm:space-x-14">
                {socialLinks.map((social) => {
                    return (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-500 ${social.color} transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 ${social.icon ? 'scale-150' : ''}`}
                            aria-label={`Follow us on ${social.name}`}
                        >
                            {social.icon ? (
                                <social.icon />
                            ) : isSocialLinkWithImage(social) ? (
                                <Image
                                    src={social.imageSrc}
                                    alt={`${social.name} icon`}
                                    width={32}
                                    height={32}
                                    className="opacity-75 hover:text-purple-400 hover:scale-[0.7]"
                                />
                            ) : null}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
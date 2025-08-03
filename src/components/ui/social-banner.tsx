"use client"

import { Instagram, Twitter, Youtube, Linkedin, Facebook } from "lucide-react"

export function SocialBanner() {
    const socialLinks = [
        {
            name: "Instagram",
            icon: Instagram,
            href: "#",
            color: "hover:text-pink-400"
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: "#",
            color: "hover:text-blue-400"
        },
        {
            name: "YouTube",
            icon: Youtube,
            href: "#",
            color: "hover:text-red-400"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: "#",
            color: "hover:text-blue-500"
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: "#",
            color: "hover:text-blue-600"
        }
    ]

    return (
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 mt-8 sm:mt-12">
            <div className="flex items-center space-x-10 sm:space-x-14">
                {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                        <a
                            key={social.name}
                            href={social.href}
                            className={`text-gray-500 ${social.color} transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 scale-150`}
                            aria-label={`Follow us on ${social.name}`}
                        >
                            <IconComponent />
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
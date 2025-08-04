"use client"

type StructuredDataProps = {
    type: 'Organization' | 'WebSite' | 'SoftwareApplication' | 'VideoObject' | 'Article'
    data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": type,
        ...data
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData, null, 2),
            }}
        />
    )
}

// Componenti pre-configurati per il sito
export function OrganizationStructuredData() {
    return (
        <StructuredData
            type="Organization"
            data={{
                name: "Past Reels",
                description: "AI-powered video generator for creating cinematic historical videos",
                url: "https://pastreels.com",
                logo: "OpengraphImage.png",
                foundingDate: "2024",
                sameAs: [
                    "https://www.instagram.com/past.reels/",
                    "https://www.tiktok.com/@past.reels",
                    "https://www.youtube.com/@past.reels",
                    "https://x.com/past_reels",
                    "https://www.facebook.com/past.reels/"
                ],
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English", "Italian", "Spanish", "French"]
                }
            }}
        />
    )
}

export function WebSiteStructuredData() {
    return (
        <StructuredData
            type="WebSite"
            data={{
                name: "Past Reels",
                description: "Create cinematic historical videos with AI",
                url: "https://pastreels.com",
                potentialAction: {
                    "@type": "SearchAction",
                    target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://pastreels.com/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }
            }}
        />
    )
}

export function SoftwareApplicationStructuredData() {
    return (
        <StructuredData
            type="SoftwareApplication"
            data={{
                name: "Past Reels",
                description: "AI Video Generator for Creating Cinematic Historical Videos",
                applicationCategory: "MultimediaApplication",
                operatingSystem: "Web Browser",
                url: "https://pastreels.com",
                screenshot: "OpengraphImage.png",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    priceValidUntil: "2025-12-31",
                    availability: "https://schema.org/InStock"
                },
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.8",
                    ratingCount: "150",
                    bestRating: "5",
                    worstRating: "1"
                },
                author: {
                    "@type": "Organization",
                    name: "Past Reels"
                }
            }}
        />
    )
}
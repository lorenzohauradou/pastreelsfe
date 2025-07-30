import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Check, Sparkles, Zap, Crown } from "lucide-react"

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out time travel",
        icon: Sparkles,
        features: [
            "5 videos per month",
            "Max 15 seconds per video",
            "720p quality",
            "Past Reels logo",
            "Basic historical eras",
            "Community support"
        ],
        cta: "Start Free",
        popular: false,
        ctaLink: "/generate-video"
    },
    {
        name: "Starter",
        price: "$12.99",
        period: "per month",
        description: "For consistent time travelers",
        icon: Zap,
        features: [
            "20 videos per month",
            "Max 30 seconds per video",
            "1080p HD quality",
            "No Past Reels logo",
            "Text styling & effects",
            "All historical eras",
            "Priority generation",
            "Email support"
        ],
        cta: "Start Creating",
        popular: true,
        ctaLink: "/generate-video"
    },
    {
        name: "Creator",
        price: "$24.99",
        period: "per month",
        description: "For professional storytellers",
        icon: Crown,
        features: [
            "Everything in Starter, plus:",
            "40 videos per month",
            "Max 60 seconds per video",
            "Music & Sound Effects",
            "Custom branding options",
            "Auto Publish on social media",
            "Priority support"
        ],
        cta: "Go Pro",
        popular: false,
        ctaLink: "/generate-video"
    }
]

export default function PricingSection() {
    return (
        <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-4 sm:space-y-6 mb-16 sm:mb-20">
                    <Badge variant="outline" className="border-yellow-400/30 text-yellow-400 bg-yellow-400/10 font-medium inline-flex items-center text-sm">
                        <span className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                        Simple, Transparent Pricing
                    </Badge>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white/90 leading-tight">
                        Choose Your
                        <br />
                        <span className="text-yellow-400">Time Travel</span> Plan
                    </h2>

                    <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        From exploring history as a hobby to creating professional cinematic content.
                        Start free, upgrade when you're ready to travel further.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => {
                        const IconComponent = plan.icon

                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-6 sm:p-8 border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-yellow-400/50 ${plan.popular
                                    ? "bg-yellow-400/10 border-yellow-400/30 shadow-lg shadow-yellow-400/20"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                    }`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-yellow-400 text-black font-semibold px-4 py-1">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${plan.popular ? "bg-yellow-400/20" : "bg-white/10"
                                        }`}>
                                        <IconComponent className={`w-6 h-6 ${plan.popular ? "text-yellow-400" : "text-white/70"
                                            }`} />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-white/60 text-sm mb-4">{plan.description}</p>

                                    <div className="mb-4">
                                        <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                                        {plan.period !== "forever" && (
                                            <span className="text-white/60 text-sm ml-1">/{plan.period.split(" ")[1]}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-white/80 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <a href={plan.ctaLink} className="block">
                                    <Button
                                        className={`w-full py-3 font-semibold rounded-full transition-all duration-200 hover:scale-105 ${plan.popular
                                            ? "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-400/25"
                                            : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </a>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Note */}
                <div className="text-center mt-12 sm:mt-16">
                    <p className="text-white/60 text-sm">
                        All plans include access to our growing library of historical eras and cinematic styles.
                        <br />
                        <span className="text-yellow-400">No setup fees. Cancel anytime.</span>
                    </p>
                </div>
            </div>
        </section>
    )
}
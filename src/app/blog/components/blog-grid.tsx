import BlogCard from "./blog-card"

// Mock blog posts data - in a real app, this would come from a CMS or API
const featuredPosts = [
    {
        title: "The Art of Time Travel Video Creation",
        excerpt: "Explore how AI-powered video generation is revolutionizing the way we create period-accurate content, from the roaring 20s to ancient civilizations.",
        date: "Dec 15, 2024",
        category: "AI Innovation",
        image: "/images/brazil_prev.png",
        slug: "art-of-time-travel-video-creation"
    },
    {
        title: "From Script to Screen: Building Cinematic Videos with Past Reels",
        excerpt: "A comprehensive guide on how to transform your creative ideas into stunning historical videos that capture the essence of any era.",
        date: "Dec 12, 2024",
        category: "Tutorial",
        image: "/placeholder.jpg",
        slug: "script-to-screen-guide"
    }
]

const latestPosts = [
    {
        title: "5 Tips for Creating Authentic Period Aesthetics",
        excerpt: "Learn the secrets behind making your videos look genuinely historical, from color grading to period-accurate details.",
        date: "Dec 10, 2024",
        category: "Tips & Tricks",
        image: "/placeholder.jpg",
        slug: "authentic-period-aesthetics"
    },
    {
        title: "The Science Behind Historical Video Generation",
        excerpt: "Dive deep into the technology that powers our AI models and how they understand historical contexts and visual styles.",
        date: "Dec 8, 2024",
        category: "Technology",
        image: "/placeholder.jpg",
        slug: "science-historical-video-generation"
    },
    {
        title: "Viral Video Trends: What Works in 2024",
        excerpt: "Analyze the most successful historical videos of the year and discover the patterns that make content go viral.",
        date: "Dec 5, 2024",
        category: "Marketing",
        image: "/placeholder.jpg",
        slug: "viral-video-trends-2024"
    },
    {
        title: "Building Your Brand with Historical Storytelling",
        excerpt: "How businesses are using period-accurate videos to create memorable brand experiences and connect with audiences.",
        date: "Dec 2, 2024",
        category: "Business",
        image: "/placeholder.jpg",
        slug: "brand-historical-storytelling"
    },
    {
        title: "The Future of AI Video Generation",
        excerpt: "What's next for AI-powered video creation? We explore upcoming features and the future of automated content creation.",
        date: "Nov 28, 2024",
        category: "Future Tech",
        image: "/placeholder.jpg",
        slug: "future-ai-video-generation"
    },
    {
        title: "Case Study: How Past Reels Transformed a Marketing Campaign",
        excerpt: "Real-world success story of how one brand used historical video content to increase engagement by 300%.",
        date: "Nov 25, 2024",
        category: "Case Study",
        image: "/placeholder.jpg",
        slug: "marketing-campaign-case-study"
    }
]

export default function BlogGrid() {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Featured Posts */}
                <section className="mb-16">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {featuredPosts.map((post, index) => (
                            <BlogCard
                                key={post.slug}
                                {...post}
                                featured={true}
                            />
                        ))}
                    </div>
                </section>

                {/* Latest Posts */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Latest Posts</h2>
                        <button className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium">
                            View All →
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestPosts.map((post) => (
                            <BlogCard
                                key={post.slug}
                                {...post}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
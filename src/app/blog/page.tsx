import BlogHero from "./components/blog-hero"
import BlogGrid from "./components/blog-grid"
import BlogFooter from "./components/blog-footer"
import { blogMetadata } from './metadata'

export const metadata = blogMetadata

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black">
            <BlogHero />
            <main className="relative z-10">
                <BlogGrid />
            </main>
            <BlogFooter />
        </div>
    )
}
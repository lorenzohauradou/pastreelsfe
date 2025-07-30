import Image from "next/image"
import Link from "next/link"
import { Badge } from "../../../components/ui/badge"

interface BlogCardProps {
    title: string
    excerpt: string
    date: string
    category: string
    image: string
    slug: string
    featured?: boolean
}

export default function BlogCard({
    title,
    excerpt,
    date,
    category,
    image,
    slug,
    featured = false
}: BlogCardProps) {
    const cardClasses = featured
        ? "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-pink-500/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-[1.02]"
        : "group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"

    return (
        <Link href={`/blog/${slug}`}>
            <article className={cardClasses}>
                <div className="aspect-video relative overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <Badge className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold">
                        {category}
                    </Badge>
                </div>

                <div className="p-6">
                    <h3 className={`font-bold mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-200 ${featured ? 'text-xl text-white' : 'text-lg text-white'
                        }`}>
                        {title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <time className="text-gray-500 text-xs font-medium">
                            {date}
                        </time>
                        <span className="text-yellow-400 text-xs font-medium group-hover:text-yellow-300 transition-colors">
                            Read more →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}
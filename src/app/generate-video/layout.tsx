import { generateVideoMetadata } from './metadata'

export const metadata = generateVideoMetadata

export default function GenerateVideoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
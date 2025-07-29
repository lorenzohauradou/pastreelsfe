import Header from "../components/landing/header"
import HeroSection from "../components/landing/hero-section"
import FeaturesSection from "../components/landing/features-section"
import VideoExamplesSection from "../components/landing/video-examples-section"
import VideoCreationDemo from "../components/landing/video-creation-demo"
import CallToActionSection from "../components/landing/call-to-action-section"
import Footer from "../components/landing/footer"
import AnimatedBackground from "../components/landing/animated-background"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <VideoExamplesSection />
        <FeaturesSection />
        <VideoCreationDemo />
        <CallToActionSection />
        <Footer />
      </div>
    </div>
  )
}

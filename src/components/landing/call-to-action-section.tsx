import { Button } from "../ui/button"

export default function CallToActionSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 border border-white/10">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">Ready to Travel Through Time? ⏰</h2>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Create historically immersive videos that transport your audience to any era.
            </p>

            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105"
            >
              Start Your Time Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

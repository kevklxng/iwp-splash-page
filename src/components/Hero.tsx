import { Home } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-stone-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-950/90 to-stone-950" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-100/10 border border-warm-200/20 mb-8">
          <Home size={16} className="text-amber-200" />
          <span className="text-sm font-medium text-warm-200/90 tracking-wider uppercase">
            Custom Home Builders
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight">
          Templeton
          <br />
          <span className="text-amber-100/90">Custom Homes</span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-stone-300 font-light">
          Crafting exceptional homes with precision, integrity, and timeless design.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-sm transition-colors"
          >
            Start Your Project
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center justify-center px-8 py-4 border border-stone-500 text-stone-300 hover:bg-stone-800/50 font-medium rounded-sm transition-colors"
          >
            View Our Work
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-px bg-stone-500" />
      </div>
    </section>
  )
}

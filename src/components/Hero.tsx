import { Link } from 'react-router-dom'

const heroImage =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-stone-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/70 to-stone-900" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
          <span className="text-xs font-semibold text-white tracking-widest uppercase">
            Design-Build Custom Home Builders
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight">
          Templeton
          <br />
          <span className="text-white/90 italic">Custom Homes</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/80 font-light tracking-wide font-sans leading-relaxed">
          Setting the new standard for home construction.
          <br />
          Precision. Integrity. Timeless Design.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-900 font-medium rounded-sm hover:bg-stone-100 transition-colors"
          >
            Start Your Project
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-medium rounded-sm transition-colors"
          >
            View Our Work
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[10px] uppercase tracking-widest text-white/60">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}

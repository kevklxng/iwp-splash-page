import { Link } from 'react-router-dom'

const aboutImage =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'

const pills = [
  'Design-Build',
  'Owner-Led Builds',
  'White-Glove Service',
  'Newport Beach & Costa Mesa',
]

export default function HomeAbout() {
  return (
    <section className="py-24 bg-warm-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
              Meet Your Custom Home Builder
            </h2>
            <p className="mt-6 text-lg text-stone-700 leading-relaxed">
              Templeton Custom Homes is a design-build builder—we handle both design and construction
              under one roof. The owner is involved on every project from day one. You work directly
              with us—no sales team, no runaround—so your vision gets the attention it deserves. We
              bring white-glove service and transparent communication to every build, and we're proud
              to serve Newport Beach and Costa Mesa with custom homes, remodels, additions, and
              luxury estates.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
            >
              More About Us
            </Link>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm shadow-xl">
            <img
              src={aboutImage}
              alt="Custom home construction in Newport Beach and Costa Mesa"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {pills.map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white border border-stone-200 text-sm font-medium text-stone-600 shadow-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

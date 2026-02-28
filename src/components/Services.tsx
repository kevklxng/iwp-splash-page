import { Hammer, Pencil, Wrench } from 'lucide-react'

const services = [
  {
    icon: Pencil,
    title: 'Design & Planning',
    description:
      'Collaborative design process from initial concept through final blueprints. We help you visualize every detail before construction begins.',
  },
  {
    icon: Hammer,
    title: 'New Construction',
    description:
      'Full-service custom home building. From site preparation to final walkthrough, we manage every phase with meticulous attention.',
  },
  {
    icon: Wrench,
    title: 'Renovations & Additions',
    description:
      'Transform your existing space with thoughtful renovations or seamless additions that honor your home\'s character.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
            What We Build
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            From ground-up custom homes to transformative renovations, we deliver exceptional
            results tailored to your vision.
          </p>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="relative rounded-sm border border-warm-200 bg-warm-50/50 p-8 hover:border-stone-300 transition-colors"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-stone-900 text-amber-100">
                <item.icon size={28} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-4 text-stone-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

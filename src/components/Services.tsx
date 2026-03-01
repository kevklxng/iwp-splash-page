import { Link } from 'react-router-dom'
import { ArrowRight, Hammer, Pencil, Wrench } from 'lucide-react'

const services = [
  {
    icon: Pencil,
    title: 'Design & Planning',
    description:
      'As a design-build firm, we handle design and planning in-house—from initial concept through final blueprints—so you have one team from vision to keys.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    icon: Hammer,
    title: 'New Construction',
    description:
      'Full-service custom home building. From site preparation to final walkthrough, we manage every phase with meticulous attention.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    icon: Wrench,
    title: 'Renovations & Additions',
    description:
      'Transform your existing space with thoughtful renovations or seamless additions that honor your home\'s character.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
            What We Build
          </h2>
          <p className="mt-6 text-lg text-stone-700">
            From ground-up custom homes to transformative renovations, we deliver exceptional
            results tailored to your vision.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-sm bg-white/90 text-stone-900 shadow-md">
                  <item.icon size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-stone-700 leading-relaxed text-sm">{item.description}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

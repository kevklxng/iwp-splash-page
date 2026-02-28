import { Award, Users, Heart } from 'lucide-react'

const values = [
  {
    icon: Award,
    title: 'Craftsmanship',
    description: 'Every detail is executed with precision and care, from foundation to finish.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We work alongside you throughout the journey, ensuring your vision becomes reality.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'Honest communication, transparent pricing, and a commitment to excellence.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-warm-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
            Built on Tradition,<br />
            <span className="text-stone-600">Designed for Tomorrow</span>
          </h2>
          <p className="mt-6 text-lg text-stone-600 leading-relaxed">
            Templeton Custom Homes brings decades of experience and a passion for quality to every
            project. We believe a home should reflect the people who live in it—their style, their
            needs, their story. From concept to keys, we're with you every step of the way.
          </p>
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="group">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-stone-900 text-amber-100 group-hover:bg-amber-600 transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-2 text-stone-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

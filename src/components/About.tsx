const aboutImage =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every detail is executed with precision and care, from foundation to finish.',
  },
  {
    title: 'Partnership',
    description: 'We work alongside you throughout the journey, ensuring your vision becomes reality.',
  },
  {
    title: 'Integrity',
    description: 'Honest communication, transparent pricing, and a commitment to excellence.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-warm-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
              Built on Tradition,<br />
              <span className="text-stone-500">Designed for Tomorrow</span>
            </h2>
            <p className="mt-6 text-lg text-stone-700 leading-relaxed">
              Templeton Custom Homes is a design-build builder: we handle both design and construction
              under one roof. We bring a passion for quality to every project and believe a home
              should reflect the people who live in it—their style, their needs, their story. From
              concept to keys, we're with you every step of the way.
            </p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-sm">
            <img
              src={aboutImage}
              alt="Custom home construction"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="pl-6 border-l-4 border-blue-700 group-hover:border-blue-600 transition-colors"
            >
              <h3 className="font-serif text-xl font-semibold text-stone-900">
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

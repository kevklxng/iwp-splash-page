const testimonials = [
  {
    quote:
      'Working with Templeton Custom Homes was a seamless experience from start to finish. Their attention to detail and clear communication made our custom build stress-free.',
    author: 'Sarah Jenkins',
    location: 'Newport Beach',
    role: 'Custom Home Build',
  },
  {
    quote:
      "We couldn't be happier with our new home. The design-build approach meant one team, one vision, and a result that exceeded our expectations.",
    author: 'Michael & Lisa Chen',
    location: 'Costa Mesa',
    role: 'Full Renovation',
  },
  {
    quote:
      'Professional, transparent, and genuinely invested in getting it right. They treated our project like their own. Highly recommend.',
    author: 'David Thompson',
    location: 'Newport Coast',
    role: 'Estate Construction',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
            Client Stories
          </h2>
          <p className="mt-4 text-lg text-stone-600 font-light">
            Excellence is not just our standard, it&apos;s our signature.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="flex flex-col bg-white p-10 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300"
            >
              <blockquote className="flex-grow">
                <p className="font-serif text-xl text-stone-800 leading-relaxed italic">
                  &quot;{item.quote}&quot;
                </p>
              </blockquote>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <cite className="not-italic">
                  <span className="block font-medium text-stone-900 tracking-wide uppercase text-sm">
                    {item.author}
                  </span>
                  <span className="block mt-1 text-xs text-stone-500 font-medium tracking-widest uppercase">
                    {item.location} • {item.role}
                  </span>
                </cite>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

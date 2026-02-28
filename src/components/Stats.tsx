const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '200+', label: 'Homes Built' },
  { value: '100%', label: 'Client Satisfaction' },
]

export default function Stats() {
  return (
    <section className="bg-stone-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl sm:text-5xl font-light text-amber-100/90 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-stone-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

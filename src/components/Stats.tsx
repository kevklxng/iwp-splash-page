const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '200+', label: 'Homes Built' },
  { value: '100%', label: 'Client Satisfaction' },
]

export default function Stats() {
  return (
    <section className="bg-white border-b border-stone-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-12 px-6">
              <p className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-widest text-stone-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

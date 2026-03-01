import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'Free initial meeting to understand your vision, budget, and timeline. We listen first, then build a plan together.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our in-house design team develops your plans with you. We handle permits and approvals so you can focus on the dream.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Transparent construction with regular updates. The owner is on-site so decisions stay clear and on track.',
  },
  {
    number: '04',
    title: 'Move-In',
    description:
      "Final walkthrough, punch list, and keys in hand. We're here until you're completely satisfied.",
  },
]

export default function HomeProcess() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
            Our Process
          </h2>
          <p className="mt-6 text-lg text-stone-700">
            From first conversation to move-in day, we keep it simple and transparent.
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative p-8 rounded-sm bg-warm-50 border border-stone-100 shadow-sm hover:shadow-md transition-all">
              <p className="font-serif text-4xl font-light text-blue-700/40 tracking-tight">
                {step.number}
              </p>
              <h3 className="mt-4 font-serif text-xl font-medium text-stone-900">
                {step.title}
              </h3>
              <p className="mt-2 text-stone-700 leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white font-medium rounded-sm hover:bg-stone-800 transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  )
}

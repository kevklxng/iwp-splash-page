import { useState, FormEvent } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

// Get your access key at web3forms.com — enter joel@templetoncustomhomes.com to receive it by email
const WEB3FORMS_ACCESS_KEY = 'a78843d2-1b56-43cc-8a38-1d6408e8291f'

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'New Contact Form Submission - TCH Website',
      from_name: 'TCH Website Contact Form',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setSucceeded(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (succeeded) {
    return (
      <section id="contact" className="py-24 bg-warm-50 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
                Let's Build Together
              </h2>
              <p className="mt-6 text-lg text-stone-700 leading-relaxed">
                Ready to start your custom home journey? We'd love to hear about your vision. Reach
                out for a consultation—no obligation, just a conversation about what's possible.
              </p>
              <div className="mt-12 space-y-6">
                <a
                  href="mailto:joel@templetoncustomhomes.com"
                  className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm group-hover:border-stone-300 transition-colors">
                    <Mail size={20} />
                  </div>
                  <span>joel@templetoncustomhomes.com</span>
                </a>
                <a
                  href="tel:+19499332459"
                  className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm group-hover:border-stone-300 transition-colors">
                    <Phone size={20} />
                  </div>
                  <span>(949) 933-2459</span>
                </a>
                <div className="flex items-center gap-4 text-stone-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <span>Serving Newport Beach & Costa Mesa</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-8 lg:p-10 shadow-lg border border-stone-100 flex flex-col justify-center">
              <p className="font-serif text-2xl text-stone-900">
                Thank you for reaching out.
              </p>
              <p className="mt-2 text-stone-600">
                We've received your message and will get back to you soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-warm-50 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight">
              Let's Build Together
            </h2>
            <p className="mt-6 text-lg text-stone-700 leading-relaxed">
              Ready to start your custom home journey? We'd love to hear about your vision. Reach
              out for a consultation—no obligation, just a conversation about what's possible.
            </p>

            <div className="mt-12 space-y-6">
              <a
                href="mailto:joel@templetoncustomhomes.com"
                className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm group-hover:border-stone-300 transition-colors">
                  <Mail size={20} />
                </div>
                <span>joel@templetoncustomhomes.com</span>
              </a>
              <a
                href="tel:+19499332459"
                className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm group-hover:border-stone-300 transition-colors">
                  <Phone size={20} />
                </div>
                <span>(949) 933-2459</span>
              </a>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm">
                  <MapPin size={20} />
                </div>
                <span>Serving Newport Beach & Costa Mesa</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg bg-white p-8 lg:p-10 shadow-lg border border-stone-100">
            {error && (
              <div className="mb-4 p-3 rounded-sm bg-red-50 border border-red-200 text-red-700 text-sm">
                Something went wrong. Please try again or email us directly.
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 block w-full rounded-sm border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 block w-full rounded-sm border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2 block w-full rounded-sm border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-2 block w-full rounded-sm border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
                  placeholder="Describe your vision, timeline, or any questions..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 bg-stone-900 text-white font-medium rounded-sm hover:bg-stone-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

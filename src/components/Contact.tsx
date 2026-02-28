import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
              Let's Build Together
            </h2>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              Ready to start your custom home journey? We'd love to hear about your vision. Reach
              out for a consultation—no obligation, just a conversation about what's possible.
            </p>

            <div className="mt-12 space-y-6">
              <a
                href="mailto:info@templetoncustomhomes.com"
                className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-warm-100">
                  <Mail size={20} />
                </div>
                <span>info@templetoncustomhomes.com</span>
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-warm-100">
                  <Phone size={20} />
                </div>
                <span>(555) 123-4567</span>
              </a>
              <div className="flex items-center gap-4 text-stone-600">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-warm-100">
                  <MapPin size={20} />
                </div>
                <span>Serving the greater area</span>
              </div>
            </div>
          </div>

          <form className="rounded-lg bg-stone-900 p-8 lg:p-10 shadow-xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 block w-full rounded-sm border border-stone-600 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 block w-full rounded-sm border border-stone-600 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-200">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2 block w-full rounded-sm border border-stone-600 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-200">
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-2 block w-full rounded-sm border border-stone-600 bg-stone-800 px-4 py-3 text-white placeholder-stone-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="Describe your vision, timeline, or any questions..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-sm transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Our Process' },
    { to: '/gallery', label: 'Portfolio' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-stone-950 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Connect</p>
            <Link to="/" className="mt-4 block font-serif text-xl font-semibold text-white tracking-tight hover:text-amber-100 transition-colors">
              Templeton Custom Homes
            </Link>
            <p className="mt-2 text-sm text-stone-400">
              Crafting exceptional custom homes with precision and care.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Navigate</p>
            <nav className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-stone-400 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Visit</p>
            <div className="mt-4 space-y-3 text-sm text-stone-400">
              <a
                href="mailto:info@templetoncustomhomes.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail size={18} className="shrink-0" />
                info@templetoncustomhomes.com
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone size={18} className="shrink-0" />
                (555) 123-4567
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0" />
                Serving the greater area
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800">
          <p className="text-sm text-stone-500">
            © {currentYear} Templeton Custom Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-warm-50/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-sm bg-warm-50/95' : ''
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-semibold text-stone-900 tracking-tight">
            Templeton Custom Homes
          </Link>

          <div className="hidden md:flex md:items-center md:gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 -m-2 text-stone-600 hover:text-stone-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 bg-warm-50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-base font-medium ${isActive ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 bg-stone-900 text-white text-sm font-medium rounded-sm transition-colors w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

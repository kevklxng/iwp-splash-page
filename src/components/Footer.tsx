export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#" className="font-serif text-xl font-semibold text-white tracking-tight">
            Templeton Custom Homes
          </a>
          <nav className="flex gap-8">
            <a href="#about" className="text-sm text-stone-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="text-sm text-stone-400 hover:text-white transition-colors">
              Services
            </a>
            <a href="#gallery" className="text-sm text-stone-400 hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#contact" className="text-sm text-stone-400 hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-800 text-center md:text-left">
          <p className="text-sm text-stone-500">
            © {currentYear} Templeton Custom Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

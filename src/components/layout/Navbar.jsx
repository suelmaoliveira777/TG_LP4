import { useEffect, useState } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-bg/70 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" className="text-lg font-semibold uppercase tracking-[0.3em] text-text">
          Tiago Gago
        </a>
        {/* Margem proporcional à altura do ecrã, como a imagem da hero, para não ficar por cima da cabeça da viola */}
        <nav className="hidden items-center gap-6 text-sm text-text/80 md:flex lg:mr-[30vh]">
          <a href="#quem" className="transition hover:text-gold-light">Quem sou</a>
          <a href="#servicos" className="transition hover:text-gold-light">Serviços</a>
          <a href="#contacto" className="transition hover:text-gold-light">Contacto</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#quem-sou', label: 'Quem sou' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#madeiras', label: 'Madeiras' },
]

const CTA = { href: '#pedido', label: 'Fazer pedido' }

// Breakpoint a partir do qual o menu completo cabe ao lado do logo (xl do Tailwind)
const DESKTOP_MIN_WIDTH = 1280

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Com o menu móvel aberto: bloqueia o scroll da página, fecha com Esc e ao passar para desktop
  useEffect(() => {
    if (!open) return

    const handleKey = (event) => event.key === 'Escape' && setOpen(false)
    const handleResize = () => window.innerWidth >= DESKTOP_MIN_WIDTH && setOpen(false)

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    window.addEventListener('resize', handleResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  const close = () => setOpen(false)
  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        solid ? 'border-white/10 bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#inicio" onClick={close} className="text-base font-semibold uppercase tracking-[0.3em] text-text sm:text-lg">
          Tiago Gago
        </a>

        {/* No topo da página, a margem (proporcional à altura do ecrã, como a imagem da hero)
            afasta o menu da cabeça da viola; depois de rolar, o menu volta ao canto direito */}
        <nav
          aria-label="Principal"
          className={cn('hidden items-center gap-8 transition-[margin] duration-300 xl:flex', !scrolled && 'xl:mr-[30vh]')}
        >
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-text/80 transition hover:text-gold-light">
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href={CTA.href}>{CTA.label}</a>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movel"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-bg/60 text-text backdrop-blur transition hover:border-gold-light/60 xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="menu-movel" className="max-h-[calc(100svh-4.75rem)] overflow-y-auto border-t border-white/10 xl:hidden">
          <nav aria-label="Principal" className="mx-auto flex max-w-7xl flex-col px-6 pb-10 pt-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-white/10 py-5 font-display text-3xl text-text transition hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="lg" className="mt-8 w-full sm:w-auto sm:self-start">
              <a href={CTA.href} onClick={close}>
                {CTA.label}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar

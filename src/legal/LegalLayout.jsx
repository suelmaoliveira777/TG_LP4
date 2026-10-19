import { ArrowLeft } from 'lucide-react'
import CookieBanner from '@/components/ui/CookieBanner'
import { Dado, LinkExterno } from './components'

export const LEGAL_PAGES = [
  { href: '/politica-de-privacidade/', label: 'Política de Privacidade' },
  { href: '/termos-e-condicoes/', label: 'Termos e Condições' },
  { href: '/politica-de-cookies/', label: 'Política de Cookies' },
]

function LegalLayout({ titulo, children }) {
  const atual = window.location.pathname

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <a href="/" className="text-lg font-semibold uppercase tracking-[0.3em] text-text">
            Tiago Gago
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-text/80 transition hover:text-gold-light">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{titulo}</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted">
          Última atualização: <Dado campo="ultimaAtualizacao">data de publicação</Dado>
        </p>
        <article className="legal-prose mt-12">{children}</article>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_PAGES.map((page) => (
              <a
                key={page.href}
                href={page.href}
                aria-current={atual === page.href ? 'page' : undefined}
                className="transition hover:text-gold-light aria-[current=page]:text-gold-light"
              >
                {page.label}
              </a>
            ))}
            <LinkExterno href="https://www.livroreclamacoes.pt">Livro de Reclamações</LinkExterno>
          </nav>
          <p>© {new Date().getFullYear()} Tiago Gago Luthier</p>
        </div>
      </footer>

      <CookieBanner />
    </div>
  )
}

export default LegalLayout

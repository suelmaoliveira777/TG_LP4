import { MotionConfig, motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react'
import { SOCIAL_LINKS } from '@/config/contact'
import { LEGAL_PAGES, LIVRO_RECLAMACOES_URL } from '@/legal/legal-data'
import Logo from '../ui/Logo'
import SocialIcon from '../ui/SocialIcon'

const NAV_LINKS = [
  { href: '#quem-sou', label: 'Quem sou' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#pedido', label: 'Fazer pedido' },
]

// Assinatura gigante no fundo do footer: as letras sobem uma a uma quando aparece
const SIGNATURE = 'Tiago Gago'
const signature = { visible: { transition: { staggerChildren: 0.05 } } }
const letterIn = {
  hidden: { y: '60%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

// font-body: os h2 levam a fonte dos títulos por omissão; aqui são etiquetas
const columnTitle = 'font-body text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-light'

// Link com um traço dourado que cresce por baixo no hover
function FooterLink({ href, children, ...props }) {
  return (
    <a
      href={href}
      className="group/link relative inline-flex items-center gap-1.5 text-text/75 transition-colors duration-300 hover:text-text focus-visible:text-text focus-visible:outline-none"
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold-light transition-transform duration-300 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100"
      />
    </a>
  )
}

function Footer() {
  // Reabre o banner de cookies para mudar a escolha
  const openCookiePreferences = () => window.dispatchEvent(new Event('cookie-consent:open'))

  return (
    <MotionConfig reducedMotion="user">
      <footer className="relative overflow-hidden bg-bg px-6 pt-20 text-text sm:pt-24 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-gold-light/[0.08] blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            {...fadeUp}
            className="grid gap-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16"
          >
            {/* Identidade */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a
                href="#inicio"
                className="inline-block rounded-md transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                <Logo className="h-20 sm:h-24" sizes="(min-width: 640px) 240px, 200px" loading="lazy" />
              </a>
              <p className="mt-4 font-display text-xl font-normal text-gold-pale">Construção · Reparação · Setup</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-text/65">
                <MapPin className="h-4 w-4 text-gold-light" strokeWidth={1.5} aria-hidden="true" />
                Cascais, Portugal
              </p>
            </div>

            {/* Navegação rápida */}
            <nav aria-label="Navegação do rodapé">
              <h2 className={columnTitle}>Navegação</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Redes sociais */}
            <div>
              <h2 className={columnTitle}>Redes sociais</h2>
              {/* w-max centrado no telemóvel: os ícones alinham uns com os outros */}
              <ul className="mx-auto mt-5 w-max space-y-3 text-left sm:mx-0">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-left focus-visible:outline-none"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-text/80 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-gold-light/60 group-hover:bg-gold-light/10 group-hover:text-gold-light group-focus-visible:ring-2 group-focus-visible:ring-gold-light">
                        <SocialIcon name={social.id} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-text/90 transition-colors group-hover:text-text">{social.label}</span>
                        <span className="block text-xs text-muted">{social.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Linha final: direitos, autoria e links legais */}
          <div
            data-hide-whatsapp
            className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 py-8 text-center text-xs text-text/55 sm:mt-20 lg:flex-row lg:justify-between lg:text-left"
          >
            <div className="space-y-1">
              <p>© {new Date().getFullYear()} Tiago Gago Luthier. Todos os direitos reservados.</p>
              <p>Desenvolvido por weblygrow</p>
            </div>

            <nav aria-label="Informação legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {LEGAL_PAGES.map((page) => (
                <FooterLink key={page.href} href={page.href}>
                  {page.label}
                </FooterLink>
              ))}
              <FooterLink href={LIVRO_RECLAMACOES_URL} target="_blank" rel="noopener noreferrer">
                Livro de Reclamações
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </FooterLink>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="text-text/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-text hover:decoration-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                Preferências de cookies
              </button>
            </nav>

            <a
              href="#inicio"
              className="group inline-flex items-center gap-2 text-text/75 transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
            >
              Voltar ao topo
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-gold-light/60">
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* Assinatura: só decorativa, cortada no fundo da página */}
        <motion.p
          aria-hidden="true"
          variants={signature}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative -mb-[0.22em] select-none overflow-hidden whitespace-nowrap text-center font-display text-[min(16vw,16rem)] font-extralight leading-[0.85]"
        >
          {[...SIGNATURE].map((letter, index) => (
            <motion.span
              key={index}
              variants={letterIn}
              className="inline-block bg-gradient-to-b from-gold-light/45 via-gold-mid/20 to-transparent bg-clip-text text-transparent"
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </motion.p>
      </footer>
    </MotionConfig>
  )
}

export default Footer

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { WHATSAPP_URL } from '@/config/contact'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { trackWhatsApp } from '@/utils/analytics'
import WhatsAppIcon from './WhatsAppIcon'

// Atraso (ms) até o botão aparecer depois de a página carregar
const APPEAR_DELAY = 1200
// Verde oficial da marca WhatsApp
const WHATSAPP_GREEN = '#25D366'
// Altura (px) da faixa do fundo do ecrã ocupada pelo botão e pela sua margem
const BUTTON_ZONE = 110

// Botão fixo de WhatsApp, no canto inferior direito de todo o site.
// Esconde-se enquanto o banner de cookies está aberto, para não o tapar.
function WhatsAppButton() {
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  // O banner pode abrir antes de este componente ouvir o aviso: sem consentimento guardado, está aberto
  const [bannerOpen, setBannerOpen] = useState(() => {
    try {
      return !window.localStorage.getItem('cookie_consent')
    } catch {
      return false
    }
  })

  // Também se esconde com o menu móvel aberto
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), APPEAR_DELAY)
    const handleBanner = (event) => setBannerOpen(event.detail.visible)
    const handleMenu = (event) => setMenuOpen(event.detail.visible)
    window.addEventListener('cookie-banner:visibility', handleBanner)
    window.addEventListener('menu-movel:visibility', handleMenu)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('cookie-banner:visibility', handleBanner)
      window.removeEventListener('menu-movel:visibility', handleMenu)
    }
  }, [])

  // No telemóvel, esconde-se quando passa por cima de uma zona marcada com data-hide-whatsapp
  // (os botões do formulário de pedido), para não tapar o botão de envio
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [overActions, setOverActions] = useState(false)
  useEffect(() => {
    if (!isMobile) return
    let frame = 0
    const check = () => {
      frame = 0
      const zoneTop = window.innerHeight - BUTTON_ZONE
      setOverActions(
        [...document.querySelectorAll('[data-hide-whatsapp]')].some((element) => {
          const rect = element.getBoundingClientRect()
          return rect.bottom > zoneTop && rect.top < window.innerHeight
        }),
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [isMobile])

  return (
    <AnimatePresence>
      {ready && !bannerOpen && !menuOpen && !(isMobile && overActions) && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar por WhatsApp"
          onClick={() => trackWhatsApp('flutuante')}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-[60] flex items-center focus-visible:outline-none sm:bottom-6 sm:right-6"
        >
          {/* Etiqueta que desliza para fora no hover (só no desktop) */}
          <span className="pointer-events-none mr-3 hidden translate-x-2 whitespace-nowrap rounded-full border border-white/10 bg-bg/90 px-4 py-2 text-sm font-semibold text-text opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block">
            Falar por WhatsApp
          </span>
          <span
            style={{ backgroundColor: WHATSAPP_GREEN }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_28px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-text group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg"
          >
            {/* Onda discreta de tempos a tempos, a chamar a atenção sem incomodar */}
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
                transition={{ duration: 1.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.5 }}
                style={{ borderColor: WHATSAPP_GREEN }}
                className="absolute inset-0 rounded-full border"
              />
            )}
            <WhatsAppIcon className="h-7 w-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppButton

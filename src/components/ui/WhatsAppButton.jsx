import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { WHATSAPP_URL } from '@/config/contact'
import { trackWhatsApp } from '@/utils/analytics'
import WhatsAppIcon from './WhatsAppIcon'

// Atraso (ms) até o botão aparecer depois de a página carregar
const APPEAR_DELAY = 1200

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

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), APPEAR_DELAY)
    const handleBanner = (event) => setBannerOpen(event.detail.visible)
    window.addEventListener('cookie-banner:visibility', handleBanner)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('cookie-banner:visibility', handleBanner)
    }
  }, [])

  return (
    <AnimatePresence>
      {ready && !bannerOpen && (
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
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-pale via-gold-light to-gold-mid text-bg shadow-glow ring-1 ring-gold-pale/50 transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-text">
            {/* Onda discreta de tempos a tempos, a chamar a atenção sem incomodar */}
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
                transition={{ duration: 1.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.5 }}
                className="absolute inset-0 rounded-full border border-gold-light"
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

import { useRef } from 'react'
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/config/contact'
import { trackWhatsApp } from '@/utils/analytics'
import { trackSpotlight } from '@/utils/spotlight'
import WhatsAppIcon from '../ui/WhatsAppIcon'

// O texto entra palavra a palavra; a parte final fica a dourado
const TEXT = 'Seja uma construção de raiz, uma reparação urgente ou um setup antes do próximo concerto: estou disponível para ouvir o que precisas e dar-te'
const HIGHLIGHT = 'uma resposta honesta.'

const words = [
  ...TEXT.split(' ').map((word) => ({ word, gold: false })),
  ...HIGHLIGHT.split(' ').map((word) => ({ word, gold: true })),
]

const sentence = { visible: { transition: { staggerChildren: 0.045 } } }
const wordIn = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut', delay: 0.4 },
}

// Escurece a madeira à volta de um foco de luz que segue o rato (posição em --mx/--my, ver trackSpotlight).
// Sem rato, o foco fica ao centro, um pouco acima do meio.
const LANTERN = {
  background:
    'radial-gradient(38rem circle at var(--mx, 50%) var(--my, 42%), rgba(10,8,5,0.05), rgba(10,8,5,0.55) 55%, rgba(10,8,5,0.85) 90%)',
}

function CtaFinal() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // A madeira desliza mais devagar do que a página (parallax)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const woodY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="contacto"
        onPointerMove={trackSpotlight}
        className="relative isolate overflow-hidden bg-bg px-6 py-28 text-text sm:py-32 lg:px-10 lg:py-44"
      >
        {/* Fundo: pau-santo, escurecido, com um foco de luz que revela o veio */}
        <motion.img
          src="/madeiras/pau-santo.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={reduceMotion ? undefined : { y: woodY }}
          className="absolute inset-x-0 -top-[10%] -z-20 h-[120%] w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={LANTERN} />
        {/* Só as orlas fundem com as secções vizinhas; o meio deixa ver a madeira */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-transparent via-30% to-bg" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-transparent via-30% to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light/10 blur-[130px]"
        />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.h2
            variants={sentence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="font-display text-[2rem] font-semibold leading-[1.2] sm:text-5xl lg:text-6xl lg:leading-[1.15]"
          >
            {words.map(({ word, gold }, index) => (
              <span key={index}>
                <motion.span variants={wordIn} className={`inline-block ${gold ? 'text-gold-light' : ''}`}>
                  {word}
                </motion.span>{' '}
              </span>
            ))}
          </motion.h2>

          <motion.div {...fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href="#pedido">
                Fazer o meu pedido agora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-bg/40 backdrop-blur">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('cta_final')}>
                <WhatsAppIcon className="h-5 w-5" />
                Falar por WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default CtaFinal

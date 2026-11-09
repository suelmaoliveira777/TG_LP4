import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { workImageSrcSet } from '@/utils/workImage'

const FOCUSABLE = 'a[href], button:not([disabled]):not([tabindex="-1"])'
// Distância (px) que é preciso arrastar a foto para passar ao trabalho seguinte
const SWIPE_THRESHOLD = 60

const slide = {
  enter: (direction) => ({ opacity: 0, x: direction * 60, scale: 1.03 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction) => ({ opacity: 0, x: direction * -60, scale: 0.98 }),
}

// Vista ampliada de um trabalho: foto grande, descrição e pedido de orçamento.
// Navega com as setas (teclado, botões ou arrastar a foto), fecha com Esc ou no fundo.
function WorkLightbox({ works, index, onClose, onNavigate, onRequestQuote }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [direction, setDirection] = useState(1)
  const work = works[index]
  const titleId = `trabalho-${work.id}-titulo`

  const go = (step) => {
    setDirection(step)
    onNavigate((index + step + works.length) % works.length)
  }

  // Foco no botão de fechar ao abrir e de volta ao cartão ao fechar; Esc, setas e Tab preso dentro do diálogo
  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    return () => previous?.focus?.({ preventScroll: true })
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
      else if (event.key === 'Tab') {
        const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-bg/95 backdrop-blur-xl lg:overflow-hidden"
    >
      {/* Fundo clicável para fechar */}
      <button type="button" tabIndex={-1} aria-hidden="true" onClick={onClose} className="fixed inset-0 cursor-default" />

      <motion.div
        initial={{ clipPath: 'inset(8% 8% 8% 8% round 2rem)', opacity: 0 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)', opacity: 1 }}
        exit={{ clipPath: 'inset(8% 8% 8% 8% round 2rem)', opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none relative mx-auto flex min-h-full max-w-7xl flex-col gap-6 px-4 pb-8 pt-20 sm:px-6 lg:grid lg:h-full lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:px-10 lg:py-16"
      >
        {/* Foto: arrasta para o lado para mudar de trabalho */}
        <div className="pointer-events-auto relative h-[52svh] overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface sm:h-[60svh] lg:h-full">
          {/* A própria foto, desfocada, preenche as faixas à volta da foto inteira */}
          <AnimatePresence initial={false}>
            <motion.img
              key={work.id}
              src={`/portfolio/${work.image.slug}-sm.jpg`}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full scale-125 object-cover blur-3xl"
            />
          </AnimatePresence>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={work.id}
              src={`/portfolio/${work.image.slug}-lg.jpg`}
              srcSet={workImageSrcSet(work.image)}
              sizes="(min-width: 1024px) 60vw, 100vw"
              alt={work.alt}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, { offset }) => {
                if (offset.x < -SWIPE_THRESHOLD) go(1)
                else if (offset.x > SWIPE_THRESHOLD) go(-1)
              }}
              draggable={false}
              className="absolute inset-0 h-full w-full cursor-grab touch-pan-y select-none object-contain active:cursor-grabbing"
            />
          </AnimatePresence>
        </div>

        {/* Informação do trabalho */}
        <div className="pointer-events-auto flex flex-col">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-light">
                <span>{work.category}</span>
                <span aria-hidden="true" className="h-px w-8 bg-gold-light/50" />
                {/* lnum: algarismos alinhados, todos da mesma altura */}
                <span className="font-display text-sm tracking-[0.2em] text-text/60 [font-feature-settings:'lnum']">
                  {String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                </span>
              </div>

              <h3 id={titleId} className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
                {work.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-text/80">{work.description}</p>

              <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
                {work.details.map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-6 py-3">
                    <dt className="text-muted">{term}</dt>
                    <dd className="text-right text-text/90">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#pedido" onClick={(event) => onRequestQuote(event, work)}>
                Pedir orçamento
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Trabalho anterior">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Trabalho seguinte">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {work.credit && (
            <p className="mt-6 text-xs leading-5 text-muted">
              Foto de exemplo:{' '}
              <a href={work.credit.url} target="_blank" rel="noreferrer" className="underline decoration-muted/40 underline-offset-2 hover:text-text">
                {work.credit.author}
              </a>
              , {work.credit.license}, via Wikimedia Commons
            </p>
          )}
        </div>
      </motion.div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-bg/70 text-text backdrop-blur transition hover:border-gold-light/60 hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </motion.div>
  )
}

export default WorkLightbox

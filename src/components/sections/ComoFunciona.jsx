import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight, FileText, Handshake, MessageSquareText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SectionLabel from '../ui/SectionLabel'

const STEPS = [
  {
    id: 'descreve',
    icon: MessageSquareText,
    tag: 'Formulário ou WhatsApp',
    title: 'Descreve',
    description: 'Conta o que tens e o que precisas, pelo formulário ou por WhatsApp. Quanto mais detalhe, melhor.',
  },
  {
    id: 'orcamento',
    icon: FileText,
    tag: 'Orçamento gratuito',
    title: 'Orçamento claro',
    description: 'Analiso o teu pedido e devolvo-te um orçamento honesto. Sem surpresas, sem linguagem técnica que não percebas.',
  },
  {
    id: 'sim',
    icon: Handshake,
    tag: 'Acompanhas cada fase',
    title: 'Só começa com o teu sim',
    description: 'Nenhum trabalho arranca sem o teu acordo. E sabes sempre em que fase está o teu instrumento.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const GOLD = '#C8882A'
const GOLD_PALE = '#E2B568'

/* ---------- Geometria da corda ---------- */

// A corda passa pelo centro de cada marcador. No desktop (passos lado a lado) atravessa o ecrã de ponta a ponta;
// no telemóvel (passos empilhados) desce do topo ao fundo da lista. stops: fração da corda em cada ponto.
function measureString(flow, markers) {
  const box = flow.getBoundingClientRect()
  const centers = markers.map((marker) => {
    const rect = marker.getBoundingClientRect()
    return { x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top }
  })
  const horizontal = Math.abs(centers[1].x - centers[0].x) > Math.abs(centers[1].y - centers[0].y)
  const first = centers[0]
  const last = centers[centers.length - 1]
  const start = horizontal ? { x: -box.left, y: first.y } : { x: first.x, y: 0 }
  const end = horizontal ? { x: window.innerWidth - box.left, y: last.y } : { x: last.x, y: box.height }

  const points = [start, ...centers, end]
  const lengths = points.slice(1).map((point, i) => Math.hypot(point.x - points[i].x, point.y - points[i].y))
  const total = lengths.reduce((sum, length) => sum + length, 0)
  let travelled = 0
  const stops = [0, ...lengths.map((length) => (travelled += length) / total)]
  return { points, stops, horizontal }
}

function useStringGeometry(flowRef, markerRefs) {
  const [geometry, setGeometry] = useState(null)

  useLayoutEffect(() => {
    const flow = flowRef.current
    const update = () => setGeometry(measureString(flow, markerRefs.current))

    update()
    const observer = new ResizeObserver(update)
    observer.observe(flow)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [flowRef, markerRefs])

  return geometry
}

// Ponto da corda (em linha reta) a uma dada fração do comprimento
function pointAt({ points, stops }, fraction) {
  const i = Math.max(0, stops.findIndex((stop) => stop >= fraction) - 1)
  const span = stops[i + 1] - stops[i] || 1
  const t = Math.min(1, Math.max(0, (fraction - stops[i]) / span))
  return { x: points[i].x + (points[i + 1].x - points[i].x) * t, y: points[i].y + (points[i + 1].y - points[i].y) * t }
}

/* ---------- Um troço de corda entre dois pontos, que vibra quando é dedilhado ---------- */

function StringSegment({ from, to, range, progress, plucks, animated }) {
  // Deslocamento do meio do troço (perpendicular à corda): 0 em repouso, oscila ao dedilhar
  const offset = useMotionValue(0)
  const ends = useMotionValue({ from, to })
  useLayoutEffect(() => ends.set({ from, to }), [ends, from, to])

  const d = useTransform([offset, ends], ([amount, { from: a, to: b }]) => {
    const horizontal = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y)
    const cx = (a.x + b.x) / 2 + (horizontal ? 0 : amount)
    const cy = (a.y + b.y) / 2 + (horizontal ? amount : 0)
    return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
  })
  const drawn = useTransform(progress, range, [0, 1], { clamp: true })
  const drawnOpacity = useTransform(drawn, (value) => (value > 0.001 ? 1 : 0))

  // Dedilhar: impulso numa mola pouco amortecida, que oscila e assenta (amplitude proporcional ao comprimento)
  const pluck = () => {
    const length = Math.hypot(to.x - from.x, to.y - from.y)
    animate(offset, 0, { type: 'spring', velocity: Math.min(520, length * 1.1), stiffness: 520, damping: 6 })
  }

  // Vibra quando o ponto de luz chega ao fim do troço (ao descer) e quando o passo pede (hover)
  const previous = useRef(progress.get())
  useMotionValueEvent(progress, 'change', (value) => {
    if (animated && previous.current < range[1] && value >= range[1]) pluck()
    previous.current = value
  })
  const handledPlucks = useRef(plucks)
  useEffect(() => {
    if (plucks === handledPlucks.current) return
    handledPlucks.current = plucks
    if (animated) pluck()
  })

  return (
    <>
      {/* Corda em repouso: fina e com textura de corda enrolada */}
      <motion.path d={d} stroke="rgba(226,181,104,0.28)" strokeWidth="1.5" strokeDasharray="1.5 2.5" fill="none" />
      {/* Corda já percorrida: brilho largo e linha dourada */}
      <motion.path
        d={d}
        stroke={GOLD_PALE}
        strokeOpacity="0.16"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        style={animated ? { pathLength: drawn, opacity: drawnOpacity } : undefined}
      />
      <motion.path
        d={d}
        stroke="url(#corda-dourada)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={animated ? { pathLength: drawn, opacity: drawnOpacity } : undefined}
      />
    </>
  )
}

function GuitarString({ geometry, progress, plucks, animated }) {
  const { points, stops, horizontal } = geometry
  const head = useTransform(progress, (value) => pointAt(geometry, value))
  const headX = useTransform(head, (point) => point.x)
  const headY = useTransform(head, (point) => point.y)
  const headOpacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0])
  const start = points[0]
  const end = points[points.length - 1]

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        {/* userSpaceOnUse: numa linha reta a caixa do traço tem altura 0 e um gradiente relativo não aparecia */}
        <linearGradient id="corda-dourada" gradientUnits="userSpaceOnUse" x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="55%" stopColor={GOLD_PALE} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
        <radialGradient id="corda-luz">
          <stop offset="0%" stopColor={GOLD_PALE} stopOpacity="0.9" />
          <stop offset="100%" stopColor={GOLD_PALE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {points.slice(1).map((point, i) => (
        <StringSegment
          key={i}
          from={points[i]}
          to={point}
          range={[stops[i], stops[i + 1]]}
          progress={progress}
          plucks={plucks[i] ?? 0}
          animated={animated}
        />
      ))}

      {/* Ponto de luz que percorre a corda */}
      {animated && (
        <motion.g style={{ x: headX, y: headY, opacity: headOpacity }}>
          <circle r="16" fill="url(#corda-luz)" />
          <circle r="3.5" fill={GOLD_PALE} />
        </motion.g>
      )}

      {/* Nas pontas da corda no telemóvel, um remate discreto (no desktop as pontas saem do ecrã) */}
      {!horizontal && <circle cx={end.x} cy={end.y} r="3" fill={GOLD} opacity="0.6" />}
    </svg>
  )
}

/* ---------- Passos ---------- */

// Marcador do passo, como o ponto de madrepérola que marca os trastes na escala
function Marker({ ref, index, lit }) {
  return (
    <span
      ref={ref}
      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-display text-xl font-semibold transition-all duration-700 [font-feature-settings:'lnum'] ${
        lit
          ? 'border-gold-pale/80 bg-gradient-to-br from-gold-pale via-gold-light to-gold-mid text-bg shadow-glow'
          : 'border-white/15 bg-surface text-muted'
      }`}
    >
      {lit && (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-gold-light"
        />
      )}
      {String(index + 1).padStart(2, '0')}
    </span>
  )
}

function StepCard({ step, lit, onPluck }) {
  const { icon: Icon } = step

  return (
    <motion.article
      onPointerEnter={onPluck}
      animate={{ opacity: lit ? 1 : 0.35, y: lit ? 0 : 16 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-full overflow-hidden rounded-[1.75rem] border bg-bg/60 p-6 transition-colors duration-700 sm:p-8 ${
        lit ? 'border-gold-light/25' : 'border-white/10'
      }`}
    >
      {/* No desktop, etiqueta e título ao centro do cartão */}
      <div className="flex items-center gap-3 text-gold-light lg:justify-center">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] [text-wrap:balance] sm:tracking-[0.25em]">{step.tag}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-center">{step.title}</h3>
      <p className="mt-3 hyphens-auto text-justify text-[0.95rem] leading-7 text-text/80 lg:hyphens-manual lg:text-left">
        {step.description}
      </p>
    </motion.article>
  )
}

function ComoFunciona() {
  const reduceMotion = useReducedMotion()
  const animated = !reduceMotion
  const flowRef = useRef(null)
  const markerRefs = useRef([])
  const geometry = useStringGeometry(flowRef, markerRefs)

  // A corda desenha-se enquanto a lista de passos atravessa o ecrã
  const { scrollYProgress } = useScroll({ target: flowRef, offset: ['start 80%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  // Passos acesos: os marcadores por onde o ponto de luz já passou
  const [litCount, setLitCount] = useState(0)
  useMotionValueEvent(progress, 'change', (value) => {
    if (!geometry) return
    setLitCount(geometry.stops.slice(1, STEPS.length + 1).filter((stop) => value >= stop - 0.002).length)
  })

  // Passar o rato num passo faz vibrar o troço de corda que chega a ele
  const [plucks, setPlucks] = useState([])
  const pluck = (segment) =>
    setPlucks((current) => {
      const next = [...current]
      next[segment] = (next[segment] ?? 0) + 1
      return next
    })

  return (
    <MotionConfig reducedMotion="user">
      <section id="como-funciona" className="relative overflow-hidden bg-surface px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        {/* Brilho dourado discreto ao longo da corda */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gold-light/[0.06] blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Três passos, <span className="text-gold-light">sem surpresas</span>
            </h2>
          </motion.div>

          <div ref={flowRef} className="relative mt-14 sm:mt-16 lg:mt-20">
            {geometry && <GuitarString geometry={geometry} progress={progress} plucks={plucks} animated={animated} />}

            <ol className="relative grid gap-8 lg:grid-cols-3 lg:gap-8">
              {STEPS.map((step, index) => {
                const lit = !animated || index < litCount
                return (
                  <li key={step.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-4 sm:gap-6 lg:grid-cols-1 lg:gap-10">
                    <Marker
                      ref={(element) => {
                        markerRefs.current[index] = element
                      }}
                      index={index}
                      lit={lit}
                    />
                    <StepCard step={step} lit={lit} onPluck={() => animated && pluck(index)} />
                  </li>
                )
              })}
            </ol>
          </div>

          <motion.div {...fadeUp} className="mt-14 flex justify-center sm:mt-16">
            <Button asChild size="lg">
              <a href="#pedido">
                Pedir orçamento
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default ComoFunciona

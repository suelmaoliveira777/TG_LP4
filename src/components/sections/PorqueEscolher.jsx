import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { trackSpotlight } from '@/utils/spotlight'
import SectionLabel from '../ui/SectionLabel'

// Amostras da Xiloteca do Cirad (Wikimedia Commons, domínio público): as mesmas espécies da secção Madeiras
const WOODS = [
  { image: '/madeiras/abeto.jpg', name: 'Abeto europeu', species: 'Picea abies' },
  { image: '/madeiras/pau-santo.jpg', name: 'Pau-santo indiano', species: 'Dalbergia latifolia' },
  { image: '/madeiras/ebano.jpg', name: 'Ébano africano', species: 'Diospyros crassiflora' },
]
// Tempo (ms) que cada madeira fica à vista
const WOOD_INTERVAL = 4500

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

// Os cartões entram um a um, a subir e a ganhar foco
const grid = { visible: { transition: { staggerChildren: 0.12 } } }
const reveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

// Borda e brilho interior que seguem o rato (posição em --mx/--my, ver trackSpotlight)
const BORDER_GLOW = {
  background:
    'radial-gradient(26rem circle at var(--mx, 50%) var(--my, 50%), rgba(226,181,104,0.95), rgba(226,181,104,0.3) 40%, transparent 70%)',
}
const INNER_GLOW = {
  background: 'radial-gradient(28rem circle at var(--mx, 50%) var(--my, 50%), rgba(226,181,104,0.08), transparent 60%)',
}

function BentoCard({ className = '', innerClassName = '', onHoverChange, children }) {
  return (
    <motion.article
      variants={reveal}
      onPointerMove={trackSpotlight}
      onPointerEnter={() => onHoverChange?.(true)}
      onPointerLeave={() => onHoverChange?.(false)}
      className={`group relative rounded-[1.75rem] bg-white/10 p-px ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={BORDER_GLOW}
      />
      <div className={`relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] bg-bg ${innerClassName}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={INNER_GLOW}
        />
        {children}
      </div>
    </motion.article>
  )
}

function CardText({ title, children, className = '' }) {
  return (
    <div className={`relative z-10 ${className}`}>
      <span aria-hidden="true" className="text-lg text-gold-light">
        ✦
      </span>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-md hyphens-auto text-justify text-[0.95rem] leading-7 text-text/75 lg:hyphens-manual lg:text-left">
        {children}
      </p>
    </div>
  )
}

/* ---------- Madeiras selecionadas: as madeiras alternam em grande plano ---------- */

function WoodShowcase({ animated }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [active, setActive] = useState(0)

  // Avança sozinho só com o cartão à vista; escolher uma madeira reinicia a contagem
  useEffect(() => {
    if (!animated || !inView) return
    const timer = setTimeout(() => setActive((current) => (current + 1) % WOODS.length), WOOD_INTERVAL)
    return () => clearTimeout(timer)
  }, [animated, inView, active])

  // Carrega as outras madeiras de antemão, para a troca não piscar
  useEffect(() => {
    WOODS.forEach(({ image }) => {
      new Image().src = image
    })
  }, [])

  const wood = WOODS[active]

  return (
    <div ref={ref} className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.img
          key={wood.image}
          src={wood.image}
          alt=""
          aria-hidden="true"
          decoding="async"
          // Entra a desvanecer e aproxima-se devagar (efeito Ken Burns)
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: 'linear' } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/0" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 to-transparent" />

      {/* Nome da madeira à vista e escolha manual */}
      <div className="absolute right-5 top-5 z-10 flex flex-col items-end gap-3 sm:right-6 sm:top-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={wood.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="rounded-full border border-white/15 bg-bg/60 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-text backdrop-blur-md"
          >
            {wood.name} <em className="normal-case tracking-normal text-text/60">· {wood.species}</em>
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-1.5">
          {WOODS.map((option, index) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Mostrar ${option.name}`}
              aria-pressed={index === active}
              // Área de toque maior do que a barra visível
              className="group/dot flex h-6 items-center focus-visible:outline-none"
            >
              <span
                className={`block h-0.5 rounded-full transition-all duration-500 group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-gold-light ${
                  index === active ? 'w-8 bg-gold-pale' : 'w-4 bg-white/30 group-hover/dot:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Formação com mestres: número grande com reflexo dourado ---------- */

function ShimmerNumber({ animated, children }) {
  return (
    <motion.span
      animate={animated ? { backgroundPosition: ['130% 0%', '-30% 0%'] } : undefined}
      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.5 }}
      className="inline-block bg-[linear-gradient(110deg,#A0661A_20%,#E2B568_40%,#FFF1D6_50%,#E2B568_60%,#A0661A_80%)] bg-[length:250%_100%] bg-clip-text font-display text-[7rem] font-semibold leading-[0.85] text-transparent [font-feature-settings:'lnum'] sm:text-[8.5rem]"
    >
      {children}
    </motion.span>
  )
}

/* ---------- Respeito pela tradição: padrão de azulejo em traço dourado ---------- */

// Um azulejo = 72px: o padrão desliza na diagonal exatamente um azulejo por ciclo, por isso o laço não se nota
const TILE = 72

function AzulejoPattern({ animated }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 text-gold-light opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_75%)]"
    >
      <motion.svg
        animate={animated ? { x: [0, TILE], y: [0, TILE] } : undefined}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        className="absolute h-[calc(100%+144px)] w-[calc(100%+144px)]"
        style={{ left: -TILE, top: -TILE }}
      >
        <defs>
          <pattern id="azulejo" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="0.75">
              <rect width={TILE} height={TILE} />
              <path d="M36 6 L66 36 L36 66 L6 36 Z" />
              <circle cx="36" cy="36" r="12" />
              <path d="M36 25 Q39 33 47 36 Q39 39 36 47 Q33 39 25 36 Q33 33 36 25 Z" />
              {/* Quartos de círculo nos cantos: juntos, formam círculos nos encontros dos azulejos */}
              <circle cx="0" cy="0" r="14" />
              <circle cx={TILE} cy="0" r="14" />
              <circle cx="0" cy={TILE} r="14" />
              <circle cx={TILE} cy={TILE} r="14" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#azulejo)" />
      </motion.svg>
    </div>
  )
}

/* ---------- Entrega com garantia: selo do atelier a rodar ---------- */

const SEAL_RADIUS = 80

function Seal({ animated, fast }) {
  const rotate = useMotionValue(0)
  const speed = useRef(1)

  // Roda devagar; com o rato no cartão acelera e depois volta a abrandar suavemente
  useAnimationFrame((_, delta) => {
    if (!animated) return
    speed.current += ((fast ? 5 : 1) - speed.current) * 0.05
    rotate.set((rotate.get() + delta * 0.012 * speed.current) % 360)
  })

  return (
    <div className="relative aspect-square w-40 shrink-0 sm:w-48 lg:w-56" role="img" aria-label="Selo do atelier: verificado, testado, pronto a tocar">
      <motion.svg viewBox="0 0 200 200" style={{ rotate }} className="absolute inset-0 h-full w-full">
        <defs>
          <path id="selo-circulo" d={`M 100 100 m -${SEAL_RADIUS} 0 a ${SEAL_RADIUS} ${SEAL_RADIUS} 0 1 1 ${SEAL_RADIUS * 2} 0 a ${SEAL_RADIUS} ${SEAL_RADIUS} 0 1 1 -${SEAL_RADIUS * 2} 0`} />
        </defs>
        <text className="fill-gold-pale font-body text-[11px] font-semibold">
          {/* textLength: o texto ocupa a volta inteira, sem falha nem sobreposição */}
          <textPath href="#selo-circulo" textLength={2 * Math.PI * SEAL_RADIUS - 6} lengthAdjust="spacing">
            VERIFICADO ✦ TESTADO ✦ PRONTO A TOCAR ✦
          </textPath>
        </text>
      </motion.svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(200,136,42,0.35)" strokeWidth="1" />
        <circle cx="100" cy="100" r="64" fill="rgba(200,136,42,0.06)" stroke="rgba(200,136,42,0.45)" strokeWidth="1" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(200,136,42,0.2)" strokeWidth="0.75" strokeDasharray="2 3" />
        <text x="100" y="106" textAnchor="middle" className="fill-gold-pale font-display text-[42px] font-semibold">
          TG
        </text>
        <text x="100" y="126" textAnchor="middle" className="fill-muted font-body text-[8px] tracking-[0.3em]">
          LUTHIER
        </text>
      </svg>
    </div>
  )
}

function GuaranteeCard({ animated }) {
  const [hovered, setHovered] = useState(false)

  return (
    <BentoCard
      className="sm:col-span-2 lg:col-span-4"
      innerClassName="flex flex-col items-center gap-8 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10"
      onHoverChange={setHovered}
    >
      <CardText title="Entrega com garantia" className="order-last sm:order-first">
        Cada instrumento sai do meu atelier verificado, testado e pronto a tocar. Se surgir algum problema de construção,
        resolvo-o sem custo adicional.
      </CardText>
      <div className="relative z-10">
        <Seal animated={animated} fast={hovered} />
      </div>
    </BentoCard>
  )
}

function PorqueEscolher() {
  const reduceMotion = useReducedMotion()
  const animated = !reduceMotion

  return (
    <MotionConfig reducedMotion="user">
      <section id="porque" className="relative overflow-hidden bg-surface px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-gold-light/[0.07] blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <SectionLabel>Porque escolher-nos</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Feito por quem sabe.
              <br />
              <span className="text-gold-light">Feito para durar.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6"
          >
            <BentoCard
              className="sm:col-span-2 lg:col-span-4"
              innerClassName="flex min-h-[30rem] flex-col justify-end p-6 sm:p-8 lg:min-h-[28rem] lg:p-10"
            >
              <WoodShowcase animated={animated} />
              <CardText title="Madeiras selecionadas">
                Só trabalho com madeiras de qualidade comprovada: algumas com anos de secagem, escolhidas a dedo para cada
                tipo de instrumento e som desejado.
              </CardText>
            </BentoCard>

            <BentoCard className="lg:col-span-2" innerClassName="flex min-h-[24rem] flex-col justify-between gap-8 p-6 sm:p-8">
              <div className="relative z-10 text-center lg:text-left">
                <ShimmerNumber animated={animated}>2+</ShimmerNumber>
                <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-muted">anos com mestres</p>
              </div>
              <CardText title="Formação com mestres">
                Mais de dois anos de aprendizagem intensiva com luthiers experientes em Portugal. Cada técnica foi aprendida na
                prática, ao lado de quem sabe.
              </CardText>
            </BentoCard>

            <BentoCard className="lg:col-span-2" innerClassName="flex min-h-[24rem] flex-col justify-end p-6 sm:p-8">
              <AzulejoPattern animated={animated} />
              <CardText title="Respeito pela tradição">
                A lutheria portuguesa tem raízes profundas. O meu trabalho honra essa herança, com técnicas tradicionais e
                materiais que resistem ao tempo.
              </CardText>
            </BentoCard>

            <GuaranteeCard animated={animated} />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default PorqueEscolher

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { rememberService } from '@/utils/rememberService'
import { trackSpotlight } from '@/utils/spotlight'
import { workImageSrcSet } from '@/utils/workImage'
import SectionLabel from '../ui/SectionLabel'
import WorkLightbox from '../ui/WorkLightbox'

// FOTOS E TEXTOS DE EXEMPLO, a substituir pelos trabalhos reais do Tiago.
// Fotos do Wikimedia Commons com licenças CC BY / CC BY-SA, que obrigam a creditar o autor: o crédito (`credit`)
// aparece na vista ampliada. Para trocar uma foto: pôr <slug>-sm.jpg (lado maior ~900px) e <slug>-lg.jpg
// (lado maior ~1600px) em public/portfolio/, atualizar width/height (da -lg) e smWidth, e apagar `credit`.
// service: serviço pré-selecionado no formulário quando se pede orçamento a partir deste trabalho.
const WORKS = [
  {
    id: 'guitarra-portuguesa-coimbra',
    title: 'Guitarra portuguesa',
    category: 'Restauro',
    service: 'reparacao',
    summary: 'Tampo recolado e verniz recuperado',
    description:
      'Chegou com o tampo a descolar junto ao cavalete e o verniz gasto por muitos anos de fado. Recolei o tampo, consolidei as fissuras e recuperei o verniz sem lhe apagar a história.',
    details: [
      ['Instrumento', 'Guitarra portuguesa de Coimbra'],
      ['Trabalho', 'Colagem do tampo, fissuras e verniz'],
    ],
    image: { slug: 'guitarra-portuguesa', width: 1063, height: 1600, smWidth: 598, position: '50% 35%' },
    alt: 'Guitarra portuguesa em madeira clara sobre fundo escuro',
    credit: {
      author: 'Tiago J. G. Fernandes',
      license: 'CC BY 2.0',
      url: 'https://commons.wikimedia.org/wiki/File:Guitarra_Portuguesa_(7183952672).jpg',
    },
  },
  {
    id: 'guitarra-acustica-setup',
    title: 'Guitarra acústica',
    category: 'Setup',
    service: 'setup',
    summary: 'Trastos nivelados e ação regulada',
    description:
      'Os trastos gastos faziam trastejar as notas a meio do braço. Nivelei e poli os trastos, regulei a ação e a intonação: hoje toca leve e afinada em toda a escala.',
    details: [
      ['Instrumento', 'Guitarra acústica de cordas de aço'],
      ['Trabalho', 'Trastos, ação e intonação'],
    ],
    image: { slug: 'trastos', width: 1600, height: 1071, smWidth: 900, position: '50% 50%' },
    alt: 'Pormenor dos trastos e da escala de uma guitarra',
    credit: {
      author: 'Zozimus Fernandes',
      license: 'CC BY-SA 3.0',
      url: 'https://commons.wikimedia.org/wiki/File:A_guitar_fret_board.JPG',
    },
  },
  {
    id: 'guitarra-romantica',
    title: 'Guitarra romântica',
    category: 'Construção',
    service: 'construcao',
    summary: 'Construída de raiz, ao estilo do séc. XIX',
    description:
      'Uma guitarra inspirada nos modelos oitocentistas: corpo pequeno, som íntimo e muito equilibrado. Tampo em abeto, fundo e ilhargas em pau-santo, roseta e filetes embutidos à mão.',
    details: [
      ['Instrumento', 'Guitarra romântica'],
      ['Madeiras', 'Abeto, pau-santo e ébano'],
    ],
    image: { slug: 'guitarra-romantica', width: 1102, height: 1600, smWidth: 620, position: '50% 40%' },
    alt: 'Guitarra romântica com roseta ornamentada e cavalete em bigode',
    credit: {
      author: 'Tony 1212',
      license: 'CC BY-SA 4.0',
      url: 'https://commons.wikimedia.org/wiki/File:2021_(1834_Martin_replica)_guitar_by_Dan_Kellaway.jpg',
    },
  },
  {
    id: 'guitarra-manouche',
    title: 'Guitarra manouche',
    category: 'Restauro',
    service: 'reparacao',
    summary: 'Instrumento de família, de volta ao palco',
    description:
      'Uma guitarra com décadas de música, guardada anos numa arrecadação. Tratei as fissuras, revi o braço e as mecânicas e mantive o verniz original: as marcas do tempo fazem parte dela.',
    details: [
      ['Instrumento', 'Guitarra manouche antiga'],
      ['Trabalho', 'Fissuras, braço e mecânicas'],
    ],
    image: { slug: 'guitarra-antiga', width: 1600, height: 1075, smWidth: 900, position: '40% 50%' },
    alt: 'Guitarra manouche antiga com boca oval, em luz quente',
    credit: {
      author: 'Dejan Krsmanovic',
      license: 'CC BY 2.0',
      url: 'https://commons.wikimedia.org/wiki/File:Old_Gypsy_Acoustic_Guitar_(43120253700).jpg',
    },
  },
  {
    id: 'cavaquinho',
    title: 'Cavaquinho',
    category: 'Construção',
    service: 'construcao',
    summary: 'Roseta embutida à mão',
    description:
      'Um cavaquinho construído à medida, com a roseta desenhada e embutida à mão, peça a peça. Pequeno no tamanho, grande na voz: brilhante, com projeção e muito ritmo.',
    details: [
      ['Instrumento', 'Cavaquinho'],
      ['Pormenor', 'Roseta em embutidos de madeira'],
    ],
    image: { slug: 'cavaquinho', width: 1600, height: 1067, smWidth: 900, position: '50% 50%' },
    alt: 'Pormenor da roseta e da boca de um cavaquinho',
    credit: {
      author: 'Guus Prick',
      license: 'CC BY-SA 3.0',
      url: 'https://commons.wikimedia.org/wiki/File:Cavaquinho_close_up.jpg',
    },
  },
  {
    id: 'guitarra-portuguesa-lisboa',
    title: 'Guitarra portuguesa de Lisboa',
    category: 'Reparação',
    service: 'reparacao',
    summary: 'Carrilhão revisto e afinado',
    description:
      'O carrilhão, o leque de mecânicas da guitarra portuguesa, estava preso e a afinação não segurava. Desmontei, limpei e ajustei cada mecânica e afinei o instrumento por completo.',
    details: [
      ['Instrumento', 'Guitarra portuguesa de Lisboa'],
      ['Trabalho', 'Revisão do carrilhão e afinação'],
    ],
    image: { slug: 'carrilhao', width: 1600, height: 1064, smWidth: 900, position: '35% 50%' },
    alt: 'Carrilhão em leque de uma guitarra portuguesa',
    credit: {
      author: 'Feliciano Guimarães',
      license: 'CC BY 3.0',
      url: 'https://commons.wikimedia.org/wiki/File:Portuguese_Guitar_(168896343).jpeg',
    },
  },
  {
    id: 'guitarra-classica',
    title: 'Guitarra clássica',
    category: 'Setup',
    service: 'setup',
    summary: 'Osso de cavalete talhado à medida',
    description:
      'Um osso novo para o cavalete, talhado à mão e ajustado à altura certa: as cordas ganharam sustentação e a ação ficou confortável em toda a escala.',
    details: [
      ['Instrumento', 'Guitarra clássica'],
      ['Trabalho', 'Novo osso de cavalete e regulação'],
    ],
    image: { slug: 'cavalete', width: 1600, height: 1272, smWidth: 900, position: '50% 50%' },
    alt: 'Cavalete e osso de uma guitarra clássica',
    credit: {
      author: 'Dirkjot',
      license: 'CC BY-SA 3.0',
      url: 'https://commons.wikimedia.org/wiki/File:Classical_Guitar_Bridge_Bone.jpg',
    },
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

// Curva das revelações (entra depressa, assenta devagar)
const EASE_REVEAL = [0.76, 0, 0.24, 1]
// Margem lateral dos cartões no desktop, alinhada com o conteúdo das outras secções (px-10 + max-w-7xl ao centro).
// A percentagem é da largura do painel, que ao contrário de 100vw não inclui a barra de scroll.
const DESKTOP_GUTTER = 'max(2.5rem, calc((100% - 80rem) / 2))'

const pad = (number) => String(number).padStart(2, '0')

function Heading() {
  return (
    <>
      <SectionLabel>Portfólio</SectionLabel>
      <h2 id="trabalhos-titulo" className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
        Trabalhos <span className="text-gold-light">realizados</span>
      </h2>
    </>
  )
}

// Contador "03 / 07" com o número a rolar quando muda
function Counter({ active }) {
  return (
    <p className="flex items-baseline gap-2 font-display text-lg text-text/60 [font-feature-settings:'lnum']" aria-hidden="true">
      <span className="relative inline-flex h-[1.4em] w-[1.3em] justify-center overflow-hidden text-2xl font-semibold text-gold-pale">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={active}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: EASE_REVEAL }}
          >
            {pad(active + 1)}
          </motion.span>
        </AnimatePresence>
      </span>
      / {pad(WORKS.length)}
    </p>
  )
}

function ProgressBar({ progress, className = '' }) {
  return (
    <div className={`h-px overflow-hidden bg-white/15 ${className}`}>
      <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-gold-light to-gold-pale" />
    </div>
  )
}

// Etiqueta do tipo de trabalho e número do trabalho, no topo dos cartões
function CardTop({ work, index }) {
  return (
    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
      <span className="rounded-full border border-white/15 bg-bg/50 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-text backdrop-blur-md">
        {work.category}
      </span>
      {/* Número só em contorno; lnum: a Cormorant usa algarismos antigos por defeito */}
      <span className="font-display text-5xl font-semibold leading-none text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] [-webkit-text-stroke:1px_rgba(226,181,104,0.8)] [font-feature-settings:'lnum']">
        {pad(index + 1)}
      </span>
    </div>
  )
}

function CardBottom({ work }) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
      <h3 className="font-display text-[1.75rem] font-semibold leading-tight xl:text-4xl">{work.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-text/75">{work.summary}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
        Ver trabalho
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </div>
  )
}

// Cartão final: convite a pedir orçamento
function QuoteCard({ className = '' }) {
  return (
    <div
      className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-gold-light/25 bg-gradient-to-br from-gold-light/15 via-surface to-bg p-7 sm:p-8 lg:p-10 ${className}`}
    >
      <span aria-hidden="true" className="font-display text-6xl leading-none text-gold-light/40">
        ✦
      </span>
      <div>
        <p className="font-display text-3xl font-semibold leading-tight lg:text-4xl">
          O teu instrumento pode ser o <span className="text-gold-light">próximo</span>.
        </p>
        <Button asChild className="mt-7">
          <a href="#pedido">
            Pedir orçamento
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  )
}

// As fotos vêm de fontes diferentes: um tom quente comum dá-lhes unidade; no hover a foto volta à cor original
const PHOTO_GRADE = '[filter:sepia(0.25)_saturate(0.85)_contrast(1.05)] transition-[filter] duration-700 group-hover:[filter:none]'

const SPOTLIGHT = {
  background: 'radial-gradient(26rem circle at var(--mx, 50%) var(--my, 50%), rgba(226,181,104,0.18), transparent 60%)',
}

/* ---------- Desktop: a secção fixa-se e o scroll vertical faz deslizar os trabalhos na horizontal ---------- */

// Revelação em cortina, da direita para a esquerda, quando o cartão entra no ecrã. O clip-path fica num
// elemento interior: o Chrome conta-o no cálculo de visibilidade e, aplicado ao próprio cartão, um cartão
// ainda "fechado" nunca contaria como visível e a revelação nunca começaria.
const curtain = {
  hidden: { clipPath: 'inset(0% 0% 0% 100% round 1.75rem)' },
  visible: { clipPath: 'inset(0% 0% 0% 0% round 1.75rem)', transition: { duration: 1.1, ease: EASE_REVEAL } },
}

function PinnedCard({ work, index, parallax, onOpen, onHover }) {
  const portrait = work.image.height > work.image.width

  return (
    <motion.button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onOpen(index)}
      onPointerMove={trackSpotlight}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`group relative h-full shrink-0 cursor-none rounded-[1.75rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        portrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
      }`}
    >
      <motion.div
        variants={curtain}
        className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface transition-colors duration-500 group-hover:border-gold-light/40"
      >
        {/* Zoom no hover (CSS) por fora, parallax do scroll (framer) por dentro */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <motion.img
            src={`/portfolio/${work.image.slug}-lg.jpg`}
            srcSet={workImageSrcSet(work.image)}
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={work.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ x: parallax, objectPosition: work.image.position }}
            className={`absolute inset-y-0 left-[-8%] h-full w-[116%] max-w-none object-cover ${PHOTO_GRADE}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-bg/10" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={SPOTLIGHT} />
        <CardTop work={work} index={index} />
        <CardBottom work={work} />
      </motion.div>
    </motion.button>
  )
}

function PinnedGallery({ onOpen }) {
  const runwayRef = useRef(null)
  const panelRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const distanceValue = useMotionValue(0)
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)

  // Distância a percorrer na horizontal = largura dos cartões que não cabem no ecrã.
  // A secção fica com essa altura extra, que é o scroll vertical que a faz deslizar.
  useLayoutEffect(() => {
    const track = trackRef.current
    const panel = panelRef.current
    const update = () => {
      const value = Math.max(0, track.offsetWidth - panel.clientWidth)
      setDistance(value)
      distanceValue.set(value)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(track)
    observer.observe(panel)
    return () => observer.disconnect()
  }, [distanceValue])

  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.35 })
  const x = useTransform([progress, distanceValue], ([value, total]) => -value * total)
  const parallax = useTransform(progress, [0, 1], ['-7%', '7%'])
  // Os cartões inclinam ligeiramente com a velocidade do scroll e endireitam quando ele para
  const velocity = useVelocity(scrollYProgress)
  const skewX = useSpring(useTransform(velocity, [-0.6, 0, 0.6], [4, 0, -4], { clamp: true }), {
    stiffness: 300,
    damping: 50,
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) =>
    setActive(Math.min(WORKS.length - 1, Math.floor(value * WORKS.length))),
  )

  // Cursor "Ver" que segue o rato sobre os cartões
  const cursorX = useSpring(0, { stiffness: 500, damping: 40 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 })
  const moveCursor = (event) => {
    cursorX.set(event.clientX)
    cursorY.set(event.clientY)
  }

  return (
    <div ref={runwayRef} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div ref={panelRef} onPointerMove={moveCursor} className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-10 pt-28">
        {/* Brilho dourado discreto por trás dos cartões */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-1/2 h-[40rem] w-[60rem] -translate-y-1/2 rounded-full bg-gold-light/[0.07] blur-[140px]"
        />

        <div className="relative px-10">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-10">
            <motion.div {...fadeUp}>
              <Heading />
            </motion.div>
            <motion.div {...fadeUp} className="flex w-56 flex-col items-end gap-3 pb-2">
              <Counter active={active} />
              <ProgressBar progress={progress} className="w-full" />
            </motion.div>
          </div>
        </div>

        <div className="relative mt-10 min-h-0 flex-1">
          <motion.div
            ref={trackRef}
            style={{ x, skewX, paddingLeft: DESKTOP_GUTTER, paddingRight: '2.5rem' }}
            className="absolute inset-y-0 left-0 flex w-max gap-8"
          >
            {WORKS.map((work, index) => (
              <PinnedCard
                key={work.id}
                work={work}
                index={index}
                parallax={parallax}
                onOpen={onOpen}
                onHover={setHovering}
              />
            ))}
            <QuoteCard className="h-full w-[24rem]" />
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="pointer-events-none fixed left-0 top-0 z-20 -ml-[2.75rem] -mt-[2.75rem] flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-gold-light/90 text-xs font-semibold uppercase tracking-[0.2em] text-bg shadow-glow backdrop-blur-sm"
      >
        Ver
      </motion.div>
    </div>
  )
}

/* ---------- Telemóvel e tablet: carrossel de deslizar com o dedo ---------- */

function SwipeCard({ work, index, scrollerRef, onOpen, animated }) {
  const cardRef = useRef(null)
  // O cartão ao centro fica maior e a foto desliza um pouco mais devagar do que o cartão
  const { scrollXProgress } = useScroll({
    container: scrollerRef,
    target: cardRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const imageX = useTransform(scrollXProgress, [0, 1], ['-9%', '9%'])

  return (
    <motion.button
      ref={cardRef}
      type="button"
      data-card
      aria-haspopup="dialog"
      onClick={() => onOpen(index)}
      style={animated ? { scale } : undefined}
      className="group relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-light sm:w-[22rem] lg:w-[26rem]"
    >
      <motion.img
        src={`/portfolio/${work.image.slug}-sm.jpg`}
        srcSet={workImageSrcSet(work.image)}
        sizes="(min-width: 640px) 26rem, 78vw"
        alt={work.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ x: animated ? imageX : 0, objectPosition: work.image.position }}
        className={`absolute inset-y-0 left-[-10%] h-full w-[120%] max-w-none object-cover ${PHOTO_GRADE}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10" />
      <CardTop work={work} index={index} />
      <CardBottom work={work} />
    </motion.button>
  )
}

function SwipeGallery({ onOpen, animated }) {
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollXProgress } = useScroll({ container: scrollerRef })

  // Há mais um cartão no fim (pedir orçamento); o contador fica no último trabalho
  useMotionValueEvent(scrollXProgress, 'change', (value) =>
    setActive(Math.min(WORKS.length - 1, Math.round(value * WORKS.length))),
  )

  const step = (direction) => {
    const scroller = scrollerRef.current
    const card = scroller.querySelector('[data-card]')
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0
    scroller.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: animated ? 'smooth' : 'auto' })
  }

  return (
    <div className="py-20 sm:py-24">
      <motion.div {...fadeUp} className="px-6 text-center">
        <Heading />
      </motion.div>

      {/* Os cartões param ao centro; o espaço lateral deixa ver um pouco dos vizinhos */}
      <div
        ref={scrollerRef}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[11vw] pb-4 pt-2 [scrollbar-width:none] sm:mt-14 sm:px-[calc(50vw-11rem)] lg:px-[calc(50vw-13rem)] [&::-webkit-scrollbar]:hidden"
      >
        {WORKS.map((work, index) => (
          <SwipeCard
            key={work.id}
            work={work}
            index={index}
            scrollerRef={scrollerRef}
            onOpen={onOpen}
            animated={animated}
          />
        ))}
        <QuoteCard className="aspect-[4/5] w-[78vw] snap-center sm:w-[22rem] lg:w-[26rem]" />
      </div>

      <div className="mx-auto mt-6 flex max-w-md items-center gap-5 px-6">
        <Counter active={active} />
        <ProgressBar progress={scrollXProgress} className="flex-1" />
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => step(-1)} aria-label="Trabalho anterior">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => step(1)} aria-label="Trabalho seguinte">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Trabalhos() {
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  // Sem animações (preferência do sistema), o desktop também usa o carrossel
  const pinned = isDesktop && !reduceMotion
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null
  const scrollAfterCloseRef = useRef(null)

  // Com a vista ampliada aberta a página não faz scroll. Se fechou para pedir orçamento, desce até ao formulário.
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      const target = scrollAfterCloseRef.current
      scrollAfterCloseRef.current = null
      if (target) document.querySelector(target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [isOpen, reduceMotion])

  const requestQuote = (event, work) => {
    event.preventDefault()
    rememberService(work.service)
    scrollAfterCloseRef.current = '#pedido'
    setOpenIndex(null)
  }

  return (
    <MotionConfig reducedMotion="user">
      <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="relative bg-bg text-text">
        {pinned ? <PinnedGallery onOpen={setOpenIndex} /> : <SwipeGallery onOpen={setOpenIndex} animated={!reduceMotion} />}
      </section>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <WorkLightbox
              key="lightbox"
              works={WORKS}
              index={openIndex}
              onClose={() => setOpenIndex(null)}
              onNavigate={setOpenIndex}
              onRequestQuote={requestQuote}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </MotionConfig>
  )
}

export default Trabalhos

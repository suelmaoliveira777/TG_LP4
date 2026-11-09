import { useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { rememberService } from '@/utils/rememberService'
import SectionLabel from '../ui/SectionLabel'

// Fotos: amostras da Xiloteca do Cirad (Wikimedia Commons, domínio público), exceto o pau-ferro (ver `credit`).
// O cipreste e o pau-ferro usam fotos de espécies próximas: ver docs/COPY.md.
const GROUPS = [
  {
    id: 'tampos',
    label: 'Tampos',
    woods: [
      {
        name: 'Abeto europeu',
        species: 'Picea abies',
        image: '/madeiras/abeto.jpg',
        description:
          'A madeira clássica dos grandes mestres. O abeto produz um som de grande projeção, com trebles cristalinos, graves quentes e uma resposta dinâmica que cresce com o tempo. Um instrumento com tampo de abeto toca melhor aos 20 anos do que no primeiro dia, e pode manter o seu esplendor por mais de um século.',
        traitsLabel: 'Carácter sonoro',
        traits: ['Projeção', 'Brilho', 'Sustain longo'],
      },
      {
        name: 'Cedro vermelho do Canadá',
        species: 'Thuja plicata',
        image: '/madeiras/cedro-vermelho.jpg',
        description:
          'Mais macio e responsivo do que o abeto, o cedro responde imediatamente ao toque mais leve. O seu som é quente, rico em harmónicos e imediato, sem necessidade de “abertura”. Ideal para guitarristas de dedilhado e para quem quer profundidade sonora desde o primeiro acorde.',
        traitsLabel: 'Carácter sonoro',
        traits: ['Calor', 'Profundidade', 'Resposta imediata'],
      },
    ],
  },
  {
    id: 'fundos',
    label: 'Fundos e ilhargas',
    woods: [
      {
        name: 'Pau-santo indiano',
        species: 'Dalbergia latifolia',
        image: '/madeiras/pau-santo.jpg',
        description:
          'O par perfeito para os tampos de abeto. O pau-santo devolve ao som toda a complexidade que o tampo gera: graves poderosos, médios definidos e agudos brilhantes. É a escolha canónica da lutheria clássica por uma razão simples: funciona.',
        traitsLabel: 'Carácter sonoro',
        traits: ['Equilíbrio', 'Brilho', 'Reverberação rica'],
      },
      {
        name: 'Mogno africano',
        species: 'Khaya ivorensis',
        image: '/madeiras/mogno-africano.jpg',
        description:
          'Quente, sustentado e com uma profundidade de médios que nenhuma outra madeira replica. O mogno é a escolha dos instrumentos que soam como se tivessem décadas de história. Visualmente elegante, com grão suave e tom avermelhado característico.',
        traitsLabel: 'Carácter sonoro',
        traits: ['Calor', 'Médios cantantes', 'Carácter vintage'],
      },
      {
        name: 'Cipreste',
        species: 'Cupressus sempervirens',
        image: '/madeiras/cipreste.jpg',
        description:
          'A madeira da tradição ibérica. Leve, seca e percussiva, o cipreste é a escolha histórica para a viola campaniça, o flamenco e os instrumentos de corda regionais portugueses. Produz um ataque rápido, presença imediata e um timbre com identidade inconfundível.',
        traitsLabel: 'Carácter sonoro',
        traits: ['Seco', 'Percussivo', 'Presença ibérica'],
      },
    ],
  },
  {
    id: 'bracos',
    label: 'Braços',
    woods: [
      {
        name: 'Mogno hondurenho',
        species: 'Swietenia macrophylla',
        image: '/madeiras/mogno-hondurenho.jpg',
        description:
          'Estável, leve e de fácil conformação, o mogno hondurenho é a referência para braços de guitarra clássica e acústica de qualidade. A sua rigidez controlada traduz-se num sustain equilibrado e numa sensação ao toque que se torna familiar rapidamente.',
      },
      {
        name: 'Cedro',
        species: 'Cedrus sp.',
        image: '/madeiras/cedro.jpg',
        description:
          'Uma alternativa nobre ao mogno, com excelente estabilidade dimensional e resposta acústica própria. Muito usado na lutheria ibérica e latino-americana pela sua leveza e consistência.',
      },
    ],
  },
  {
    id: 'escala',
    label: 'Escala e cavalete',
    woods: [
      {
        name: 'Ébano africano',
        species: 'Diospyros crassiflora',
        image: '/madeiras/ebano.jpg',
        description:
          'A madeira mais densa e precisa da lutheria. O ébano confere ao instrumento um ataque limpo, um sustain suave e uma durabilidade praticamente inabalável. Ao toque, a sensação é de precisão absoluta. Visualmente, é a linha negra que define o instrumento.',
        traitsLabel: 'Carácter',
        traits: ['Firmeza', 'Precisão', 'Acabamento premium'],
      },
      {
        name: 'Pau-ferro',
        species: 'Libidibia ferrea',
        image: '/madeiras/pau-ferro.jpg',
        description:
          'A alternativa sustentável ao ébano, com propriedades acústicas muito semelhantes. Som denso, firme e consistente, com um visual expressivo de tons castanhos intercalados. Cada vez mais valorizado pelos construtores conscientes da origem dos materiais.',
        traitsLabel: 'Carácter',
        traits: ['Solidez', 'Sustentabilidade', 'Sonoridade densa'],
        credit: {
          author: 'Vojtěch Zavadil',
          license: 'CC BY-SA 4.0',
          url: 'https://commons.wikimedia.org/wiki/File:9489b-Machaerium_scleroxylon_(Caviuna).jpg',
        },
      },
    ],
  },
]

// Colunas no desktop conforme o número de madeiras do grupo
const COLUMNS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' }

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const panel = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
const cardIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/* ---------- Cartão: a madeira de fundo inclina-se atrás do rato, com um reflexo de verniz ---------- */

// Inclinação máxima (graus) quando o rato está num canto do cartão
const MAX_TILT = 7

function WoodCard({ wood, interactive }) {
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const springX = useSpring(pointerX, { stiffness: 180, damping: 22 })
  const springY = useSpring(pointerY, { stiffness: 180, damping: 22 })
  const rotateY = useTransform(springX, [0, 1], [-MAX_TILT, MAX_TILT])
  const rotateX = useTransform(springY, [0, 1], [MAX_TILT, -MAX_TILT])
  // O reflexo anda ao contrário do rato, como a luz numa superfície envernizada
  const glareX = useTransform(springX, [0, 1], ['85%', '15%'])
  const glareY = useTransform(springY, [0, 1], ['85%', '15%'])
  const glare = useMotionTemplate`radial-gradient(38rem circle at ${glareX} ${glareY}, rgba(255,240,214,0.28), rgba(255,240,214,0.06) 35%, transparent 60%)`

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }

  return (
    <motion.article
      variants={cardIn}
      onPointerMove={interactive ? handleMove : undefined}
      onPointerLeave={interactive ? handleLeave : undefined}
      style={interactive ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className="group relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-gold-light/40 sm:min-h-[36rem]"
    >
      {/* A madeira de fundo */}
      <img
        src={wood.image}
        alt={`Amostra de ${wood.name.toLowerCase()} (${wood.species})`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
      />
      {/* Escurece de baixo para cima: madeira à vista no topo, texto legível em baixo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg from-25% via-bg/85 via-55% to-bg/0" />
      {interactive && (
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <div className="relative p-6 sm:p-8">
        <h3 className="font-display text-3xl font-semibold leading-tight sm:text-[2rem]">{wood.name}</h3>
        <p className="mt-1 font-display text-lg font-light italic text-gold-pale">{wood.species}</p>
        <p className="mt-4 hyphens-auto text-justify text-[0.92rem] leading-7 text-text/80 lg:hyphens-manual lg:text-left">
          {wood.description}
        </p>

        {wood.traits && (
          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-light">{wood.traitsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {wood.traits.map((trait) => (
                <li key={trait} className="rounded-full border border-gold-light/25 bg-gold-light/10 px-3 py-1 text-xs text-text/90">
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        )}

        {wood.credit && (
          <p className="mt-4 text-[0.65rem] text-muted">
            Foto:{' '}
            <a href={wood.credit.url} target="_blank" rel="noreferrer" className="underline decoration-muted/40 underline-offset-2 hover:text-text">
              {wood.credit.author}
            </a>
            , {wood.credit.license}
          </p>
        )}
      </div>
    </motion.article>
  )
}

/* ---------- Separadores dos grupos ---------- */

function GroupTabs({ active, onChange }) {
  const tabRefs = useRef([])

  // Setas esquerda/direita mudam de separador (padrão de acessibilidade dos tabs)
  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = (active + step + GROUPS.length) % GROUPS.length
    onChange(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Partes do instrumento"
      onKeyDown={handleKeyDown}
      // py-4/-my-4: espaço para o brilho da pílula, que de outro modo é cortado pelo scroll horizontal;
      // scroll-px-6: os separadores param com a mesma margem lateral do resto da página
      className="-mx-6 -my-4 flex snap-x scroll-px-6 gap-2 overflow-x-auto px-6 py-4 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 lg:justify-start [&::-webkit-scrollbar]:hidden"
    >
      {GROUPS.map((group, index) => {
        const selected = index === active
        return (
          <button
            key={group.id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`madeiras-tab-${group.id}`}
            aria-selected={selected}
            aria-controls={`madeiras-painel-${group.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(index)}
            className={`relative shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              selected ? 'border-transparent text-bg' : 'border-white/15 text-text/75 hover:border-gold-light/40 hover:text-text'
            }`}
          >
            {/* A pílula dourada desliza de um separador para o outro */}
            {selected && (
              <motion.span
                layoutId="madeiras-tab"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-gold-light to-gold-mid shadow-glow"
              />
            )}
            <span className="relative">
              {group.label}
              <span className={`ml-2 font-display text-xs [font-feature-settings:'lnum'] ${selected ? 'text-bg/70' : 'text-muted'}`}>
                {String(group.woods.length).padStart(2, '0')}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Madeiras() {
  const reduceMotion = useReducedMotion()
  // Inclinação e reflexo só com rato (em ecrãs táteis não há "hover") e sem "reduzir movimento"
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const interactive = canHover && !reduceMotion
  const [active, setActive] = useState(0)
  const group = GROUPS[active]

  return (
    <MotionConfig reducedMotion="user">
      <section id="madeiras" className="relative overflow-hidden bg-surface px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-gold-light/[0.07] blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Cabeçalho: título à esquerda e introdução à direita no desktop */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <motion.div {...fadeUp} className="text-center lg:text-left">
              <SectionLabel>As matérias-primas</SectionLabel>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl">
                A madeira certa <span className="font-normal italic text-gold-light">muda tudo.</span>
              </h2>
              <p className="mt-4 font-display text-2xl font-light italic text-gold-pale sm:text-3xl">Começa pelo som. Termina na alma.</p>
            </motion.div>
            <motion.p
              {...fadeUp}
              className="mx-auto max-w-2xl hyphens-auto text-justify text-base leading-8 text-text/75 sm:text-lg lg:mx-0 lg:hyphens-manual lg:text-left"
            >
              Antes de existir qualquer instrumento, existe uma escolha. A escolha da madeira define o carácter sonoro, a
              resposta tátil, a durabilidade e a beleza de tudo o que será construído. No meu atelier, cada madeira é
              selecionada individualmente, peça a peça, com critérios acústicos e estéticos que não se negociam.
            </motion.p>
          </div>

          <motion.div {...fadeUp} className="mt-12 sm:mt-14">
            <GroupTabs active={active} onChange={setActive} />
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group.id}
              role="tabpanel"
              id={`madeiras-painel-${group.id}`}
              aria-labelledby={`madeiras-tab-${group.id}`}
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6 ${COLUMNS[group.woods.length]}`}
            >
              {group.woods.map((wood) => (
                <WoodCard key={wood.name} wood={wood} interactive={interactive} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Fecho: pedido de aconselhamento */}
          <motion.div
            {...fadeUp}
            className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-10 text-center sm:mt-16"
          >
            <p className="max-w-2xl font-display text-2xl leading-snug [text-wrap:balance] sm:text-3xl">
              Queres saber que madeiras fazem sentido para o teu instrumento?{' '}
              <span className="font-normal italic text-gold-light">Fala comigo.</span>
            </p>
            <Button asChild size="lg">
              <a href="#pedido" onClick={() => rememberService('construcao')}>
                Pedir aconselhamento
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Madeiras

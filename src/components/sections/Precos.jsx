import { useEffect, useRef, useState } from 'react'
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Guitar, Paintbrush, SlidersHorizontal, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackSpotlight } from '@/utils/spotlight'
import SectionLabel from '../ui/SectionLabel'

// PREÇOS FICTÍCIOS, só para o design: substituir pelos valores reais do Tiago.
// price: valor em euros (null = sob orçamento); from: mostra "desde" antes do valor.
const CATEGORIES = [
  {
    id: 'setup',
    icon: SlidersHorizontal,
    title: 'Setup & Regulação',
    description: 'Para o instrumento tocar como deve.',
    items: [
      { name: 'Setup completo', detail: 'Ação, intonação, tensor do braço, limpeza e cordas novas', price: 65, from: true },
      { name: 'Regulação do tensor do braço', detail: 'Correção da curvatura do braço', price: 25 },
      { name: 'Pestana nova em osso', detail: 'Talhada à mão e ajustada à altura certa', price: 55 },
      { name: 'Osso de cavalete novo', detail: 'Com compensação, para afinar em toda a escala', price: 45 },
      { name: 'Troca de cordas e limpeza', detail: 'Cordas não incluídas', price: 20 },
    ],
  },
  {
    id: 'reparacao',
    icon: Wrench,
    title: 'Reparação',
    description: 'Para devolver ao instrumento o que perdeu.',
    items: [
      { name: 'Nivelamento e polimento de trastos', detail: 'Inclui setup completo', price: 110, from: true },
      { name: 'Substituição total de trastos', detail: 'Trastos novos, nivelados e polidos', price: 240, from: true },
      { name: 'Colagem de cavalete', detail: 'Remoção, limpeza e nova colagem', price: 90, from: true },
      { name: 'Reparação de fissuras', detail: 'Tampo, fundo ou ilhargas, com reforço interior', price: 80, from: true },
      { name: 'Colagem de cabeça partida', detail: 'Com reforço e retoque de verniz', price: 150, from: true },
    ],
  },
  {
    id: 'restauro',
    icon: Paintbrush,
    title: 'Restauro',
    description: 'Para instrumentos com história.',
    items: [
      { name: 'Retoque de verniz', detail: 'Zonas gastas, riscos e pequenas falhas', price: 120, from: true },
      { name: 'Envernizamento a goma-laca', detail: 'Acabamento tradicional, aplicado à mão', price: 480, from: true },
      { name: 'Restauro completo', detail: 'Instrumentos antigos, de herança ou de coleção', price: null },
    ],
  },
  {
    id: 'construcao',
    icon: Guitar,
    title: 'Construção',
    description: 'Feito à medida, do zero ao acabamento.',
    featured: true,
    items: [
      { name: 'Guitarra clássica', detail: 'Madeiras à escolha, braço e escala à medida', price: 2400, from: true },
      { name: 'Guitarra portuguesa', detail: 'De Coimbra ou de Lisboa', price: 2900, from: true },
      { name: 'Viola campaniça', detail: 'Construção tradicional alentejana', price: 1700, from: true },
      { name: 'Cavaquinho', detail: 'Com roseta embutida à mão', price: 750, from: true },
    ],
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const grid = { visible: { transition: { staggerChildren: 0.12 } } }
const cardIn = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06, delayChildren: 0.2 } },
}
const rowIn = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Borda que se ilumina onde está o rato (posição em --mx/--my, ver trackSpotlight)
const BORDER_GLOW = {
  background:
    'radial-gradient(24rem circle at var(--mx, 50%) var(--my, 50%), rgba(226,181,104,0.85), rgba(226,181,104,0.2) 40%, transparent 70%)',
}

// useGrouping 'always': em pt-PT os números de 4 algarismos não levam separador ("2400"); numa tabela "2 400" lê-se melhor
const formatEuros = (value) => Math.round(value).toLocaleString('pt-PT', { useGrouping: 'always' })

// Valor que conta de 0 até ao preço quando entra no ecrã
function PriceValue({ value, animated }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [shown, setShown] = useState(animated ? 0 : value)

  useEffect(() => {
    if (!animated || !inView) return
    const controls = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: setShown })
    return () => controls.stop()
  }, [animated, inView, value])

  return (
    <span ref={ref} className="tabular-nums [font-feature-settings:'lnum']">
      {formatEuros(shown)}
    </span>
  )
}

// Texto do preço para leitores de ecrã (a contagem animada é só visual)
const priceText = (item) =>
  item.price === null ? 'Sob orçamento' : `${item.from ? 'desde ' : ''}${formatEuros(item.price)} euros`

function Price({ item, animated }) {
  if (item.price === null) {
    return <span className="font-display text-lg italic text-gold-pale">Sob orçamento</span>
  }
  return (
    <span className="inline-flex items-baseline gap-1.5">
      {item.from && <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">desde</span>}
      <span className="font-display text-2xl font-semibold text-gold-pale sm:text-[1.7rem]">
        <PriceValue value={item.price} animated={animated} />
      </span>
      <span className="text-sm text-gold-light">€</span>
    </span>
  )
}

function PriceCard({ category, animated }) {
  const { icon: Icon } = category

  return (
    <motion.article
      variants={cardIn}
      onPointerMove={trackSpotlight}
      className={`group relative rounded-[1.75rem] p-px ${category.featured ? 'bg-gold-light/40' : 'bg-white/10'}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={BORDER_GLOW}
      />
      <div
        className={`relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] p-6 sm:p-8 lg:p-10 ${
          category.featured ? 'bg-gradient-to-br from-[#1d1408] via-bg to-bg' : 'bg-bg'
        }`}
      >
        {category.featured && (
          <span className="absolute right-6 top-6 rounded-full border border-gold-light/40 bg-gold-light/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-gold-light sm:right-8 sm:top-8">
            Feito à medida
          </span>
        )}

        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-light/30 bg-gold-light/10 text-gold-light">
            <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{category.title}</h3>
            <p className="mt-0.5 text-sm text-text/60">{category.description}</p>
          </div>
        </div>

        <table className="mt-8 w-full border-collapse text-left">
          <caption className="sr-only">Preços de {category.title}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Serviço</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item) => (
              <motion.tr key={item.name} variants={rowIn} className="group/row border-t border-white/[0.07] first:border-t-0">
                <th scope="row" className="relative py-4 align-top font-normal">
                  {/* Barra dourada que cresce à esquerda no hover */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-1/2 h-0 w-px -translate-y-1/2 bg-gold-light transition-all duration-300 group-hover/row:h-3/5 sm:-left-8 lg:-left-10"
                  />
                  {/* Nome, linha pontilhada e preço na mesma linha, como numa carta: o pontilhado vai
                      sempre até ao preço. O preço visível fica aqui; o da célula ao lado é para leitores de ecrã. */}
                  <span className="flex items-baseline gap-3">
                    <span className="text-[0.98rem] font-semibold text-text transition-colors duration-300 group-hover/row:text-gold-pale">
                      {item.name}
                    </span>
                    <span aria-hidden="true" className="mb-1 min-w-6 flex-1 border-b border-dotted border-gold-light/30" />
                    <span aria-hidden="true" className="whitespace-nowrap">
                      <Price item={item} animated={animated} />
                    </span>
                  </span>
                  {item.detail && <span className="mt-1 block text-[0.82rem] leading-5 text-text/55">{item.detail}</span>}
                </th>
                <td className="w-0 p-0">
                  <span className="sr-only">{priceText(item)}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.article>
  )
}

function Precos() {
  const reduceMotion = useReducedMotion()
  const animated = !reduceMotion

  return (
    <MotionConfig reducedMotion="user">
      <section id="precos" className="relative overflow-hidden bg-bg px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-[36rem] w-[36rem] rounded-full bg-gold-light/[0.07] blur-[140px]"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Cabeçalho: título à esquerda e introdução à direita no desktop */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <motion.div {...fadeUp} className="text-center lg:text-left">
              <SectionLabel>Preços</SectionLabel>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
                Valores claros, <span className="text-gold-light">antes de começar.</span>
              </h2>
            </motion.div>
            <motion.p
              {...fadeUp}
              className="mx-auto max-w-2xl hyphens-auto text-justify text-base leading-8 text-text/75 sm:text-lg lg:mx-0 lg:hyphens-manual lg:text-left"
            >
              Uma referência para os trabalhos mais pedidos. Cada instrumento é único: o valor final depende do estado e do tipo
              de instrumento, e fica sempre fechado no orçamento, antes de qualquer intervenção.
            </motion.p>
          </div>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-6"
          >
            {CATEGORIES.map((category) => (
              <PriceCard key={category.id} category={category} animated={animated} />
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-12 flex flex-col items-center gap-6 text-center sm:mt-14 lg:flex-row lg:justify-between lg:text-left"
          >
            <p className="max-w-xl text-sm leading-6 text-text/55">
              Valores indicativos, em euros. O orçamento é gratuito e nenhum trabalho começa sem o teu acordo.
            </p>
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

export default Precos

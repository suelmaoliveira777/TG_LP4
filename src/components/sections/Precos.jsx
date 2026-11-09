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
    return <span className="font-display text-lg font-semibold italic text-gold-dark">Sob orçamento</span>
  }
  return (
    <span className="inline-flex items-baseline gap-1.5">
      {item.from && <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#7A6446]">desde</span>}
      <span className="font-display text-2xl font-bold text-gold-dark sm:text-[1.7rem]">
        <PriceValue value={item.price} animated={animated} />
      </span>
      <span className="text-sm font-semibold text-gold-mid">€</span>
    </span>
  )
}

// Cartões em creme, como o papel de uma carta: o mesmo tom do texto do site, mais claro no topo.
// A Construção, em destaque, leva um creme mais dourado.
const PAPER = 'bg-gradient-to-b from-[#F5EDE0] to-text'
const PAPER_FEATURED = 'bg-gradient-to-b from-[#FAEBCB] to-[#EFD8A8]'

function PriceCard({ category, animated }) {
  const { icon: Icon } = category

  return (
    <motion.article
      variants={cardIn}
      onPointerMove={trackSpotlight}
      className={`group relative rounded-[1.75rem] p-px shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] ${
        category.featured ? 'bg-gold-light' : 'bg-white/20'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={BORDER_GLOW}
      />
      <div
        className={`relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] p-6 text-bg sm:p-8 lg:p-10 ${
          category.featured ? PAPER_FEATURED : PAPER
        }`}
      >
        {/* Ícone do serviço em marca de água, no canto de baixo */}
        <Icon
          aria-hidden="true"
          strokeWidth={1}
          className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-gold-dark/[0.07] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105"
        />

        {category.featured && (
          <span className="absolute right-6 top-6 rounded-full bg-gold-bright px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-bg shadow-[0_6px_16px_-6px_rgba(107,63,10,0.6)] sm:right-8 sm:top-8">
            Feito à medida
          </span>
        )}

        <div className="relative flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bg text-gold-bright shadow-[0_8px_20px_-8px_rgba(10,8,5,0.6)]">
            <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{category.title}</h3>
            <p className="mt-0.5 text-sm text-[#5E4C34]">{category.description}</p>
          </div>
        </div>

        <table className="relative mt-8 w-full border-collapse text-left">
          <caption className="sr-only">Preços de {category.title}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Serviço</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item) => (
              <motion.tr key={item.name} variants={rowIn} className="group/row border-t border-gold-dark/15 first:border-t-0">
                <th scope="row" className="relative py-4 align-top font-normal">
                  {/* Barra dourada que cresce à esquerda no hover */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-gold-mid transition-all duration-300 group-hover/row:h-3/5 sm:-left-8 lg:-left-10"
                  />
                  {/* Nome, linha pontilhada e preço na mesma linha, como numa carta: o pontilhado vai
                      sempre até ao preço. O preço visível fica aqui; o da célula ao lado é para leitores de ecrã. */}
                  <span className="flex items-baseline gap-3">
                    <span className="text-[0.98rem] font-bold text-bg transition-colors duration-300 group-hover/row:text-gold-dark">
                      {item.name}
                    </span>
                    <span aria-hidden="true" className="mb-1 min-w-6 flex-1 border-b-2 border-dotted border-gold-mid/35" />
                    <span aria-hidden="true" className="whitespace-nowrap">
                      <Price item={item} animated={animated} />
                    </span>
                  </span>
                  {item.detail && <span className="mt-1 block text-[0.82rem] leading-5 text-[#5E4C34]">{item.detail}</span>}
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
              className="mx-auto max-w-2xl text-center text-base leading-8 text-text/75 [text-wrap:balance] sm:text-lg lg:mx-0 lg:text-left"
            >
              Valores indicativos. O orçamento é gratuito e nenhum trabalho começa sem o teu acordo.
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

          <motion.div {...fadeUp} className="mt-12 flex justify-center sm:mt-14">
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

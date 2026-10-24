import { useLayoutEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Guitar, SlidersHorizontal, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SectionLabel from '../ui/SectionLabel'

// glow: posição horizontal do brilho dourado no fundo de cada cartão
const SERVICES = [
  {
    id: 'construcao',
    icon: Guitar,
    title: 'Construção personalizada',
    description:
      'Criamos juntos o instrumento dos teus sonhos. Escolhes a madeira, o perfil do braço, a escala, os acessórios. Eu construo, com rigor e paciência, do zero ao acabamento final.',
    items: [
      'Guitarras clássicas e acústicas',
      'Violas campaniças e tradicionais',
      'Instrumentos personalizados à medida',
      'Acompanhamento em todas as fases do processo',
    ],
    glow: '15%',
  },
  {
    id: 'reparacao',
    icon: Wrench,
    title: 'Reparação & Restauro',
    description:
      'O teu instrumento tem história? Eu ajudo-o a continuar a contá-la. Desde reparações simples até restauros complexos de instrumentos antigos e de família.',
    items: [
      'Colagem de tampos, fundos e ilhargas',
      'Substituição e nivelamento de trastos',
      'Reparação de cravelhas, cavaletes e cabeças',
      'Restauro de verniz e acabamentos',
      'Instrumentos de herança ou coleção',
    ],
    glow: '50%',
  },
  {
    id: 'setup',
    icon: SlidersHorizontal,
    title: 'Setup & Regulação',
    description:
      'Um bom instrumento mal regulado não dá o seu melhor. O setup profissional transforma a tua experiência de tocar — torna tudo mais fácil, mais expressivo, mais teu.',
    items: [
      'Regulação de ação e altura das cordas',
      'Intonação e afinação por trastos',
      'Ajuste do tensor do braço (truss rod)',
      'Lubrificação e ajuste de cravelhas e mecânicas',
      'Revisão geral pré-gravação ou pré-concerto',
    ],
    glow: '85%',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

// Guarda o serviço escolhido para o formulário o pré-selecionar (implementado na fase do formulário)
function rememberService(id) {
  try {
    window.sessionStorage.setItem('servico_pretendido', id)
  } catch {
    // Sem armazenamento disponível (modo privado, etc.): o formulário abre sem pré-seleção
  }
}

// Altura da navbar fixa (py-4 + botão h-11), em rem
const NAVBAR_HEIGHT = 4.75

// Posição em que o cartão fica fixado. O ideal é logo abaixo do título fixado, um pouco abaixo do cartão anterior
// (deixando ver a borda dos que ficam por baixo). Se o cartão não couber no ecrã a partir daí, fixa-se
// encostado ao fundo: assim o botão "Pedir orçamento" fica sempre visível antes de o seguinte o cobrir.
function useStickyTop(ref, titleRef, index, enabled) {
  const [top, setTop] = useState(null)

  useLayoutEffect(() => {
    if (!enabled || !ref.current || !titleRef.current) return

    const element = ref.current
    const title = titleRef.current
    const update = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
      const preferred = (NAVBAR_HEIGHT + 0.5 + index * 1.25) * rem + title.offsetHeight
      const fitsOnScreen = window.innerHeight - element.offsetHeight - rem
      setTop(Math.min(preferred, fitsOnScreen))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    observer.observe(title)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [ref, titleRef, index, enabled])

  return top
}

function ServiceCard({ service, index, total, progress, stacked, titleRef }) {
  const { icon: Icon } = service
  const cardRef = useRef(null)
  const top = useStickyTop(cardRef, titleRef, index, stacked)

  // Efeito de pilha: cada cartão encolhe ligeiramente à medida que os seguintes lhe passam por cima
  const targetScale = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div ref={cardRef} className={stacked ? 'sticky' : 'h-full'} style={stacked && top !== null ? { top } : undefined}>
      <motion.article
        style={stacked ? { scale, transformOrigin: 'top center' } : undefined}
        initial={stacked ? false : { opacity: 0, y: 32 }}
        whileInView={stacked ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: stacked ? 0 : index * 0.12 }}
        className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] transition-colors duration-500 lg:hover:border-gold-light/40"
      >
        {/* Fundo: brilho dourado (mais intenso no hover) e seis cordas, para o vidro ter o que refletir */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-80 transition-opacity duration-700 lg:group-hover:opacity-100"
          style={{
            background: `radial-gradient(110% 65% at ${service.glow} 0%, rgba(200,136,42,0.38), rgba(107,63,10,0.12) 45%, transparent 75%)`,
          }}
        />
        <div aria-hidden="true" className="absolute inset-y-0 right-8 -z-10 flex w-28 justify-between">
          {Array.from({ length: 6 }, (_, string) => (
            <span key={string} className="w-px bg-gradient-to-b from-gold-pale/40 via-gold-light/15 to-transparent" />
          ))}
        </div>

        {/* Número do serviço */}
        <div className="flex items-center gap-4 px-6 pb-5 pt-6">
          {/* lnum: a Cormorant usa algarismos antigos por defeito ("oI" em vez de "01") */}
          <span className="font-display text-4xl font-semibold leading-none text-gold-pale [font-feature-settings:'lnum']">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-gold-light/60 to-transparent" />
        </div>

        {/* Painel de vidro com o conteúdo */}
        <div className="mx-3 mb-3 flex flex-1 flex-col rounded-[1.5rem] border border-white/15 bg-bg/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150 sm:p-7">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-light/30 bg-gold-light/10 text-gold-light">
              <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]">{service.title}</h3>
          </div>

          <p className="mt-4 hyphens-auto text-justify text-[0.95rem] leading-7 text-text/80 sm:mt-5 lg:hyphens-manual lg:text-left">
            {service.description}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 sm:mt-6 sm:space-y-3 sm:pt-6">
            {service.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-text/85">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 sm:pt-8">
            <Button asChild className="w-full">
              <a href="#pedido" onClick={() => rememberService(service.id)}>
                Pedir orçamento
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function Servicos() {
  const listRef = useRef(null)
  const titleRef = useRef(null)
  const reduceMotion = useReducedMotion()
  // Pilha só no telemóvel/tablet e com altura suficiente para o cartão caber fixado no ecrã
  const canStack = useMediaQuery('(max-width: 1023px) and (min-height: 640px)')
  const stacked = canStack && !reduceMotion

  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] })

  return (
    <MotionConfig reducedMotion="user">
      {/* overflow-clip (e não hidden) para não anular o position: sticky dos cartões */}
      <section id="servicos" className="relative overflow-clip bg-bg px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        {/* Brilho dourado discreto por trás dos cartões, para o vidro ter o que refletir */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="text-center">
            <SectionLabel>Serviços</SectionLabel>
          </motion.div>

          {/* Na pilha, o título fica fixado por baixo da navbar e os cartões empilham-se por baixo dele */}
          <div
            ref={titleRef}
            className={
              stacked
                ? 'sticky z-10 -mx-6 mt-2 bg-bg px-6 py-4 text-center'
                : 'mt-6 text-center'
            }
            style={stacked ? { top: `${NAVBAR_HEIGHT}rem` } : undefined}
          >
            <motion.h2 {...fadeUp} className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              O que faço <span className="text-gold-light">por ti</span>
            </motion.h2>
          </div>

          <div
            ref={listRef}
            className={`flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8 ${stacked ? 'mt-6' : 'mt-14 sm:mt-16'}`}
          >
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                total={SERVICES.length}
                progress={scrollYProgress}
                stacked={stacked}
                titleRef={titleRef}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default Servicos

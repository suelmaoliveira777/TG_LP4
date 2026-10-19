import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SectionLabel from '../ui/SectionLabel'

const bullets = [
  'Avaliação honesta antes de qualquer intervenção.',
  'Orçamento claro e sem surpresas.',
  'Resposta pessoal em tempo útil.',
  'Trabalho feito com madeira e técnicas escolhidas com cuidado.',
]

function Beneficios() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const items = ref.current.querySelectorAll('.benefit-item')
    gsap.fromTo(
      items,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => gsap.killTweensOf(items)
  }, [])

  return (
    <section className="bg-surface px-6 py-24 text-text lg:px-10">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionLabel>Benefícios</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            O atelier que cuida do instrumento desde o primeiro diagnóstico.
          </h2>
        </div>
        <div className="space-y-4 rounded-[1.5rem] border border-gold-light/20 bg-bg/80 p-8">
          {bullets.map((bullet, index) => (
            <div key={bullet} className="benefit-item flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
              <span className="mt-1 h-3 w-3 rounded-full bg-gold-light" />
              <p className="text-lg leading-8 text-muted">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Beneficios

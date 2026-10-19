import { MotionConfig, motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

function QuemSou() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="quem-sou" className="bg-surface px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* No telemóvel a foto vem depois do texto; a partir de lg fica à esquerda */}
          <motion.figure {...fadeUp} className="order-last lg:order-first">
            <div className="rounded-[2rem] border border-gold-light/20 bg-bg/70 p-3 shadow-[0_0_60px_rgba(0,0,0,0.25)] sm:p-4">
              <img
                src="/tiago-portrait-1200.jpg"
                srcSet="/tiago-portrait-800.jpg 800w, /tiago-portrait-1200.jpg 1200w"
                sizes="(min-width: 1024px) 50vw, 100vw"
                width="1200"
                height="1200"
                alt="Tiago Gago a trabalhar o braço de uma guitarra no atelier"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-[1.5rem] object-cover object-[35%_center] lg:aspect-[4/5]"
              />
            </div>
          </motion.figure>

          {/* Até lg: etiqueta e título centrados, texto justificado (com hifenização para evitar buracos entre palavras) */}
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <SectionLabel>Quem sou</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Das mãos de
              <br />
              <span className="text-gold-light">quem sabe</span>
            </h2>
            <div className="mt-8 space-y-5 hyphens-auto text-justify text-base leading-8 text-text/80 sm:text-lg lg:hyphens-manual lg:text-left">
              <p>
                Num instrumento, a diferença não está só na marca nem no preço. Está também em quem o fez e em quem o cuida — e
                isso pode transformar completamente o som e a experiência de quem toca.
              </p>
              <p>
                Sou o <strong className="font-semibold text-text">Tiago Gago dos Santos</strong> e aprendi lutheria com quem
                realmente sabe: mestres portugueses com décadas de experiência na construção e reparação de instrumentos de corda
                tradicionais.
              </p>
              <p>
                Hoje, no meu atelier em Cascais, construo, reparo e afino instrumentos de músicos que chegam de todo o país.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default QuemSou

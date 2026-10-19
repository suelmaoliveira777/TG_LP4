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

          <motion.div {...fadeUp} className="max-w-2xl">
            <SectionLabel>Quem sou</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Das mãos de
              <br />
              <span className="text-gold-light">quem sabe</span>
            </h2>
            <p className="mt-8 text-lg leading-8 text-text/90 sm:text-xl sm:leading-9">
              Num instrumento, a diferença não está só na marca nem no preço. Está também em quem o fez e em quem o cuida — e
              isso pode transformar completamente o som e a experiência de quem toca.
            </p>
            <p className="mt-6 text-base leading-8 text-text/75 sm:text-lg">
              Aprendi lutheria com quem realmente sabe: mestres portugueses com décadas de experiência na construção e reparação de
              instrumentos de corda tradicionais.
            </p>
            <p className="mt-4 text-base leading-8 text-text/75 sm:text-lg">
              Hoje, no meu atelier em Cascais, recebo instrumentos de músicos de todo o país.
            </p>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default QuemSou

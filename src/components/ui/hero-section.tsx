import React from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Cta {
  label: string
  href: string
}

interface HeroSectionProps {
  id?: string
  title: React.ReactNode
  description: string
  primaryCta: Cta
  secondaryCta?: Cta
  /** Imagem completa (1672×941), usada a partir de lg */
  imageUrl: string
  /** Recorte só com a guitarra (590×941), usado até lg */
  mobileImageUrl: string
  imageAlt?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const HeroSection = ({
  id,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageUrl,
  mobileImageUrl,
  imageAlt = '',
  className,
}: HeroSectionProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <section id={id} className={cn('relative w-full overflow-hidden bg-bg text-text', className)}>
        {/* Até lg: só a guitarra, ancorada em baixo à direita. A guitarra está na diagonal (braço à direita,
            corpo em baixo), o que deixa livre o canto superior esquerdo para o texto. A altura acompanha a
            largura do ecrã (140vw) para manter essa relação, com limite pela altura em ecrãs baixos.
            A partir de lg: imagem completa, do topo (por trás do menu) até à base, encostada à direita.
            Em lg (1024–1279px) desloca-se 3% para a direita, para a margem vazia da imagem, afastando-se do texto
            sem chegar ao botão do menu.
            O fundo das duas imagens já é da cor do site, por isso não há emenda. */}
        <div className="absolute inset-0 lg:flex lg:justify-end">
          <picture className="contents">
            <source media="(max-width: 1023px)" srcSet={mobileImageUrl} width={590} height={941} />
            <motion.img
              src={imageUrl}
              alt={imageAlt}
              width={1672}
              height={941}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              fetchPriority="high"
              className="absolute bottom-0 right-[-5vw] h-[min(140vw,72svh)] w-auto max-w-none max-[379px]:h-[min(128vw,72svh)] lg:static lg:h-full lg:shrink-0 lg:translate-x-[3%] xl:translate-x-0"
            />
          </picture>
        </div>
        {/* Até lg: escurece ligeiramente a esquerda, onde o texto pode tocar no corpo da guitarra em ecrãs pequenos.
            Em lg: escurece mais, porque o texto se cruza com a guitarra. Em xl já não se cruzam. */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent lg:from-bg lg:via-bg/60 xl:hidden" />

        <motion.div
          className="relative mx-auto flex min-h-svh max-w-7xl items-start px-6 pb-16 pt-24 sm:pt-28 lg:items-center lg:px-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex w-full flex-col items-start text-left lg:max-w-xl xl:max-w-2xl">
            {/* Título em toda a largura: no topo a guitarra ainda não começou */}
            <motion.h1
              variants={itemVariants}
              className="bg-gradient-to-b from-gold-pale to-gold-light bg-clip-text pb-2 font-display text-[clamp(1.85rem,8.6vw,2.15rem)] font-semibold leading-[1.1] text-transparent sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {title}
            </motion.h1>
            {/* Até lg: coluna de 60% da largura, ao lado do braço da guitarra. Em lg mais estreito que o título,
                para não tocar no corpo da guitarra */}
            <motion.p
              variants={itemVariants}
              className="mt-4 w-[60vw] text-[0.95rem] leading-6 text-text/80 sm:mt-6 sm:text-lg sm:leading-relaxed lg:w-auto lg:max-w-[26rem] xl:max-w-xl"
            >
              {description}
            </motion.p>
            {/* Até sm: botões empilhados com a mesma largura (a do maior) */}
            <motion.div variants={itemVariants} className="mt-6 inline-flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="w-full px-6 sm:w-auto sm:px-8">
                <a href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              {secondaryCta && (
                <Button asChild size="lg" variant="outline" className="w-full bg-bg/70 px-6 backdrop-blur-sm sm:w-auto sm:px-8">
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}

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
  imageUrl: string
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
  imageAlt = '',
  className,
}: HeroSectionProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <section id={id} className={cn('relative w-full overflow-hidden bg-bg text-text', className)}>
        {/* Até lg: a imagem preenche a hero e é enquadrada na viola.
            A partir de lg: imagem inteira, do topo (por trás do menu) até à base, encostada à direita.
            O fundo da imagem já é da cor do site, por isso não há emenda. */}
        <div className="absolute inset-0 flex justify-end">
          <motion.img
            src={imageUrl}
            alt={imageAlt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            fetchPriority="high"
            className="h-full w-full object-cover object-[82%_center] lg:w-auto lg:max-w-none lg:shrink-0 lg:object-contain"
          />
        </div>
        {/* Legibilidade do texto: escurece tudo no telemóvel e só a esquerda em ecrãs médios.
            Em xl o texto já não se cruza com a viola. */}
        <div className="absolute inset-0 bg-bg/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-bg lg:via-bg/60 lg:to-transparent xl:hidden" />

        <motion.div
          className="relative mx-auto flex min-h-svh max-w-7xl items-center px-6 pb-16 pt-28 lg:px-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex w-full max-w-2xl flex-col items-center text-center max-lg:mx-auto lg:max-w-xl lg:items-start lg:text-left xl:max-w-2xl">
            <motion.h1
              variants={itemVariants}
              className="bg-gradient-to-b from-gold-pale to-gold-light bg-clip-text pb-2 font-display text-[2.15rem] font-semibold leading-[1.1] text-transparent sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {title}
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 max-w-xl text-base leading-relaxed text-text/80 sm:text-lg">
              {description}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
            >
              <Button asChild size="lg">
                <a href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              {secondaryCta && (
                <Button asChild size="lg" variant="outline">
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

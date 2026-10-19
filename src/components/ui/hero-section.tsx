import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FinancialHeroProps {
  title: React.ReactNode
  description: string
  buttonText: string
  buttonLink: string
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

export const FinancialHero = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt = '',
  className,
}: FinancialHeroProps) => {
  return (
    <section className={cn('relative w-full overflow-hidden bg-bg text-text', className)}>
      {/* Imagem inteira, do topo da página (por trás do menu) até à base da hero; o fundo dela já é da cor do site */}
      <div className="absolute inset-0 flex justify-end">
        <motion.img
          src={imageUrl}
          alt={imageAlt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full w-auto max-w-none"
        />
      </div>
      {/* No mobile o texto passa por cima da guitarra, por isso escurece */}
      <div className="absolute inset-0 bg-bg/60 lg:hidden" />

      <motion.div
        className="relative container mx-auto flex min-h-screen items-center px-6 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
          <motion.h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" variants={itemVariants}>
            {title}
          </motion.h1>
          <motion.p className="mt-6 max-w-xl text-lg text-muted" variants={itemVariants}>
            {description}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <a
                href={buttonLink}
                target={buttonLink.startsWith('#') ? undefined : '_blank'}
                rel={buttonLink.startsWith('#') ? undefined : 'noopener noreferrer'}
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

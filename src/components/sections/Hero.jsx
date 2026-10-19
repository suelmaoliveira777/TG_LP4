import { FinancialHero } from '@/components/ui/hero-section'

function Hero() {
  return (
    <FinancialHero
      title={
        <>
          Cada instrumento começa numa ideia.
          <br />
          Acaba nas suas mãos.
        </>
      }
      description="Construção artesanal, reparação especializada e set up profissional de instrumentos de corda. Feito com calma, precisão e respeito pela madeira."
      buttonText="Orçamento gratuito"
      buttonLink="#contacto"
      imageUrl="/hero_TG.png"
      imageAlt="Viola artesanal em madeira clara sobre fundo escuro"
      className="bg-bg text-text"
    />
  )
}

export default Hero

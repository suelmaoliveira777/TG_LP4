import { HeroSection } from '@/components/ui/hero-section'

function Hero() {
  return (
    <HeroSection
      id="inicio"
      title={
        <>
          Guitarras Artesanais
          <br />
          com Excelência Sonora
        </>
      }
      description="Construção, reparação e setup de guitarras, violas e instrumentos de corda. Feitos com madeiras selecionadas, técnica apurada e respeito pela tradição artesanal portuguesa."
      primaryCta={{ label: 'Pedir orçamento', href: '#pedido' }}
      secondaryCta={{ label: 'Ver serviços', href: '#servicos' }}
      imageUrl="/hero_TG.jpg"
      mobileImageUrl="/hero_TG-guitarra.jpg"
      imageAlt="Viola campaniça artesanal em madeira clara sobre fundo escuro"
    />
  )
}

export default Hero

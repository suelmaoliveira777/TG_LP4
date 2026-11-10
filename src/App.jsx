import { Fragment, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import QuemSou from './components/sections/QuemSou'
import Servicos from './components/sections/Servicos'
import ComoFunciona from './components/sections/ComoFunciona'
import Trabalhos from './components/sections/Trabalhos'
import Madeiras from './components/sections/Madeiras'
import Precos from './components/sections/Precos'
import FormularioPedido from './components/sections/FormularioPedido'
import Footer from './components/layout/Footer'
import CookieBanner from './components/ui/CookieBanner'
import WhatsAppButton from './components/ui/WhatsAppButton'
import SectionDivider from './components/ui/SectionDivider'
import { useGTM } from './hooks/useGTM'
import { useMetaPixel } from './hooks/useMetaPixel'
import { useUTM } from './hooks/useUTM'
import { schemaData } from './utils/schema'

// Ordem das secções da página; entre cada uma é colocado o separador ✦
const SECTIONS = [Hero, QuemSou, Servicos, ComoFunciona, Trabalhos, Madeiras, Precos, FormularioPedido]

function App() {
  const [consent, setConsent] = useState(() => window.localStorage.getItem('cookie_consent') || 'essential')
  const { trackEvent: trackGTM } = useGTM(consent === 'all')
  const { trackEvent: trackPixel } = useMetaPixel(consent === 'all')
  useUTM()

  useEffect(() => {
    const stored = window.localStorage.getItem('cookie_consent')
    if (stored) setConsent(stored)
  }, [])

  useEffect(() => {
    if (consent === 'all') {
      trackGTM('page_view')
      trackPixel('PageView')
    }
  }, [consent, trackGTM, trackPixel])
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-bg text-text">
        <Helmet>
          <title>Tiago Gago Luthier | Construção e Reparação de Instrumentos em Cascais</title>
          <meta name="description" content="Luthier artesanal em Cascais, Lisboa. Construção, reparação e set up profissional de instrumentos de corda. Formado com mestres portugueses. Orçamento gratuito." />
          <meta name="keywords" content="luthier cascais, luthier lisboa, reparação guitarra lisboa, construção instrumentos cordas, set up guitarra portugal, viola campanica" />
          <link rel="canonical" href="https://tiagogagoluthier.pt" />
          <meta property="og:title" content="Tiago Gago Luthier" />
          <meta property="og:description" content="Luthieria artesanal em Cascais. Construção, reparação e set up de instrumentos de corda." />
          <meta property="og:image" content="/og-image.jpg" />
          <meta property="og:url" content="https://tiagogagoluthier.pt" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_PT" />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        </Helmet>

        <Navbar />
        <main>
          {SECTIONS.map((Section, index) => (
            <Fragment key={index}>
              {index > 0 && <SectionDivider />}
              <Section />
            </Fragment>
          ))}
        </main>

        <SectionDivider />
        <Footer />

        <WhatsAppButton />
        <CookieBanner />
      </div>
    </HelmetProvider>
  )
}

export default App

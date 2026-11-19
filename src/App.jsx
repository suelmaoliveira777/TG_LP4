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
        {/* Título, descrição e tags de partilha estão no index.html (os robôs de partilha não correm JS) */}
        <Helmet>
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

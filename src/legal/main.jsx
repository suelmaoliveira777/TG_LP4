import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/globals.css'
import './legal.css'
import LegalLayout from './LegalLayout'
import Privacidade from './content/Privacidade'
import Termos from './content/Termos'
import Cookies from './content/Cookies'

// Cada página legal tem o seu HTML (para ter URL, título e meta description próprios)
// e indica no <body data-page> qual destes conteúdos mostrar.
const PAGES = {
  privacidade: { titulo: 'Política de Privacidade', Conteudo: Privacidade },
  termos: { titulo: 'Termos e Condições', Conteudo: Termos },
  cookies: { titulo: 'Política de Cookies', Conteudo: Cookies },
}

const { titulo, Conteudo } = PAGES[document.body.dataset.page]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalLayout titulo={titulo}>
      <Conteudo />
    </LegalLayout>
  </StrictMode>,
)

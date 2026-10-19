import { LEGAL } from './legal-data'

// Mostra o valor de LEGAL[campo] ou um marcador bem visível enquanto estiver por preencher
export function Dado({ campo, children }) {
  const valor = LEGAL[campo]
  if (valor !== null && valor !== undefined && valor !== '') return <>{valor}</>
  return (
    <mark className="rounded bg-gold-light/20 px-1.5 py-0.5 text-gold-light" title={`legal-data.js → ${campo}`}>
      [{children}]
    </mark>
  )
}

export function Secao({ titulo, children }) {
  return (
    <section className="legal-section">
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}

export function LinkExterno({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export function abrirPreferenciasCookies() {
  window.dispatchEvent(new Event('cookie-consent:open'))
}

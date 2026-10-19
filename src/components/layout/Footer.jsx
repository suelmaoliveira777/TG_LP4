import SectionLabel from '../ui/SectionLabel'

function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/10 bg-bg px-6 py-20 text-text lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-gold-light/20 bg-surface/70 p-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Contacto</SectionLabel>
          <h2 className="mt-6 font-display text-3xl sm:text-4xl">Vamos encontrar o melhor caminho para o teu instrumento.</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted">Escreve por WhatsApp ou pelo formulário e eu respondo pessoalmente.</p>
        </div>
        <a href="https://wa.me/351XXXXXXXXX" onClick={() => window.gtag?.('event', 'generate_lead', { source: 'whatsapp' })} className="inline-flex items-center justify-center rounded-full border border-gold-light/60 bg-gradient-to-r from-gold-light to-gold-mid px-6 py-3 font-semibold uppercase tracking-[0.2em] text-bg transition hover:brightness-110">
          Falar no WhatsApp
        </a>
      </div>
    </footer>
  )
}

export default Footer

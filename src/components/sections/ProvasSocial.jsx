import SectionLabel from '../ui/SectionLabel'
import RosetaSeparator from '../ui/RosetaSeparator'

const proofs = [
  'Músicos que vinham com instrumentos difíceis de resolver e saíam com confiança.' ,
  'Acompanhamento próximo, sem linguagem técnica excessiva e sem promessas vazias.',
  'Trabalhos feitos com atenção aos mínimos detalhes — acção, afinação, madeira e som.',
]

function ProvasSocial() {
  return (
    <section className="bg-bg px-6 py-24 text-text lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold-light/20 bg-surface/80 p-10 shadow-[0_0_60px_rgba(0,0,0,0.2)] lg:p-16">
        <div className="max-w-3xl">
          <SectionLabel>Prova social</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            O trabalho fala por si. E mais importante: fala ao ouvido de quem toca.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Muitos instrumentos chegam a este atelier já com um problema claro. O valor está em perceber se vale a pena reparar, o que é necessário mudar e como fazer com honestidade.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {proofs.map((item) => (
            <div key={item} className="rounded-[1.25rem] border border-white/10 bg-bg/80 p-6 text-base leading-8 text-muted">
              {item}
            </div>
          ))}
        </div>
        <RosetaSeparator />
      </div>
    </section>
  )
}

export default ProvasSocial

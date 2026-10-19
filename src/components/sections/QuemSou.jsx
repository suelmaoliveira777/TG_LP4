import RosetaSeparator from '../ui/RosetaSeparator'
import SectionLabel from '../ui/SectionLabel'
import portrait from '/tiago-portrait.jpeg'

function QuemSou() {
  return (
    <section id="quem" className="bg-surface px-6 py-24 text-text lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal rounded-[2rem] border border-gold-light/20 bg-bg/70 p-4 shadow-[0_0_60px_rgba(0,0,0,0.2)]">
          <img src={portrait} alt="Tiago Gago no atelier" loading="lazy" className="h-[480px] w-full rounded-[1.5rem] object-cover" />
        </div>
        <div className="max-w-2xl">
          <SectionLabel>Quem sou</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight text-text sm:text-5xl">
            O som certo não nasce por acaso. Nasce com atenção.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Aprendi lutheria com mestres portugueses e trabalho cada instrumento como uma peça única. A diferença está na forma como escuto, avalio e ajusto — sem pressa, sem truques.
          </p>
          <p className="mt-4 text-lg leading-8 text-muted">
            Em Cascais, recebo instrumentos de músicos de todo o país e torno o processo simples, claro e honesto.
          </p>
          <RosetaSeparator />
        </div>
      </div>
    </section>
  )
}

export default QuemSou

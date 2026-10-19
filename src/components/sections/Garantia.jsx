import SectionLabel from '../ui/SectionLabel'

function Garantia() {
  return (
    <section className="bg-bg px-6 py-24 text-text lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold-light/20 bg-gradient-to-br from-surface/90 to-bg p-10 lg:p-16">
        <div className="max-w-3xl">
          <SectionLabel>Garantia</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            O trabalho fica seguro porque é feito com transparência e cuidado.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Se o resultado não estiver de acordo com o que foi combinado, diz-me. O mais importante é que o instrumento volte a soar como merece e que o processo fique claro do início ao fim.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Garantia

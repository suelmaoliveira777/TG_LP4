import SectionLabel from '../ui/SectionLabel'

const objections = [
  {
    title: '“Não vale a pena reparar”',
    body: 'Se não fizer sentido, digo-o antes de arrancar qualquer trabalho. O objetivo é proteger o teu instrumento e o teu orçamento.',
  },
  {
    title: '“Não sei se o problema é grave”',
    body: 'A primeira avaliação é simples: descreve o que notas, e eu explico o que pode estar a acontecer e o que é mais sensato fazer.',
  },
  {
    title: '“Vai demorar demasiado”',
    body: 'O tempo depende do trabalho, mas a prioridade é fazer bem. Sem pressa desnecessária e sem improvisos.',
  },
]

function Objecoes() {
  return (
    <section className="bg-surface px-6 py-24 text-text lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionLabel>Objeções</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            As dúvidas mais comuns são justamente as que merecem resposta clara.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {objections.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-gold-light/20 bg-bg/80 p-8">
              <h3 className="font-display text-2xl text-text">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Objecoes

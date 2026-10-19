import AccordionItem from '../ui/AccordionItem'
import SectionLabel from '../ui/SectionLabel'

const faqs = [
  {
    question: 'Quanto tempo demora uma avaliação?',
    answer: 'Depende do tipo de intervenção e do estado do instrumento. Em muitos casos, consigo dar uma primeira resposta em poucos dias.',
  },
  {
    question: 'Posso enviar um instrumento de fora de Cascais?',
    answer: 'Sim. O processo pode ser feito por mensagem, telefone ou WhatsApp, com indicação clara do que pretendes e das melhores formas de envio.',
  },
  {
    question: 'O que acontece se não valer a pena reparar?',
    answer: 'Digo-to com honestidade. Se o investimento não fizer sentido, não te faço perder tempo nem dinheiro.',
  },
]

function Faq() {
  return (
    <section className="bg-surface px-6 py-24 text-text lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            As perguntas que costumam surgir antes de começar.
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((item) => (
            <AccordionItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq

import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import RosetaSeparator from '../ui/RosetaSeparator'

const services = [
  {
    title: 'Construção artesanal',
    text: 'Instrumentos de raiz, com madeiras escolhidas a dedo e técnicas tradicionais portuguesas.',
  },
  {
    title: 'Reparação especializada',
    text: 'Trastes, almas, cravelheiras, tampos e braços — tudo avaliado antes de qualquer intervenção.',
  },
  {
    title: 'Set up profissional',
    text: 'Ajuste fino de acção, curvatura do braço, altura da corda e afinação para um som mais vivo.',
  },
]

function Servicos() {
  return (
    <section id="servicos" className="bg-bg px-6 py-24 text-text lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Serviços</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Construção, reparação e set up sem ruído — só técnica e cuidado.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Cada instrumento é tratado como uma peça única. A primeira conversa já define o caminho certo.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="reveal rounded-[1.5rem] border border-gold-light/20 bg-surface/80 p-8 shadow-[0_0_40px_rgba(0,0,0,0.18)]"
              initial={{ opacity: 0, y: 24 }}
              whileHover={{ y: -6, borderColor: '#C8882A', boxShadow: '0 20px 50px rgba(200,136,42,0.16)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="mb-6 h-12 w-12 rounded-full border border-gold-light/30 bg-gold-light/10" />
              <h3 className="font-display text-2xl text-text">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{service.text}</p>
            </motion.article>
          ))}
        </div>
        <RosetaSeparator />
      </div>
    </section>
  )
}

export default Servicos

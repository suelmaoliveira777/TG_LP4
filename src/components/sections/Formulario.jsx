import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import SectionLabel from '../ui/SectionLabel'
import Button from '../ui/legacy-button'
import { useGTM } from '../../hooks/useGTM'
import { useMetaPixel } from '../../hooks/useMetaPixel'

function Formulario() {
  const [status, setStatus] = useState('idle')
  const consent = typeof window !== 'undefined' ? window.localStorage.getItem('cookie_consent') : 'essential'
  const { trackEvent: trackGTM } = useGTM(consent === 'all')
  const { trackEvent: trackPixel } = useMetaPixel(consent === 'all')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const utmData = useMemo(() => {
    if (typeof window === 'undefined') return {}
    const stored = sessionStorage.getItem('utm_data')
    return stored ? JSON.parse(stored) : {}
  }, [])

  const onSubmit = async (data) => {
    setStatus('loading')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
          ...data,
          ...utmData,
        }),
      })

      if (!response.ok) throw new Error('Erro no envio')

      setStatus('success')
      trackGTM('form_submit', { method: 'web3forms' })
      trackPixel('Lead')
      reset()
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="bg-bg px-6 py-24 text-text lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-gold-light/20 bg-surface/80 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div>
          <SectionLabel>Pedido</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            Diz-me o que tens em mente e eu digo-te o melhor caminho.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Escreve o que precisas, o instrumento envolvido e o que queres melhorar. Respondo pessoalmente com clareza.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-[1.5rem] border border-white/10 bg-bg/70 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-muted">Nome</label>
              <input {...register('name', { required: 'Nome obrigatório', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none ring-0" />
              {errors.name && <p className="mt-2 text-sm text-gold-light">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-muted">Email</label>
              <input {...register('email', { required: 'Email obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' } })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none ring-0" />
              {errors.email && <p className="mt-2 text-sm text-gold-light">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-muted">Tipo de serviço</label>
            <select {...register('service')} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none">
              <option value="Construção">Construção</option>
              <option value="Reparação">Reparação</option>
              <option value="Set up">Set up</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-muted">Mensagem</label>
            <textarea {...register('message', { required: 'Mensagem obrigatória', minLength: { value: 20, message: 'Mínimo 20 caracteres' } })} rows="5" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none" />
            {errors.message && <p className="mt-2 text-sm text-gold-light">{errors.message.message}</p>}
          </div>

          <label className="flex items-start gap-3 text-sm leading-7 text-muted">
            <input type="checkbox" {...register('consent', { required: 'Aceita a política de privacidade' })} className="mt-2" />
            <span>Autorizo o tratamento dos meus dados para responder ao pedido.</span>
          </label>
          {errors.consent && <p className="text-sm text-gold-light">{errors.consent.message}</p>}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'A enviar...' : 'Enviar pedido'}
          </Button>

          {status === 'success' && <p className="text-sm text-gold-light">Mensagem enviada com sucesso. Respondo brevemente.</p>}
          {status === 'error' && <p className="text-sm text-gold-light">Não foi possível enviar. Envia mensagem por WhatsApp.</p>}
        </form>
      </div>
    </section>
  )
}

export default Formulario

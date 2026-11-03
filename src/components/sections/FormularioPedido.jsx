import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/config/contact'
import { trackLead, trackWhatsApp } from '@/utils/analytics'
import { readRememberedService } from '@/utils/rememberService'
import { EnvioNaoConfigurado, submitPedido } from '@/utils/submitPedido'
import { CONTACT_FIELDS, SERVICES, SERVICE_FIELDS, STEPS } from '../pedido/fields'
import { ConsentField, Suggestions, TextField, YesNoField } from '../pedido/controls'
import PhotoUpload from '../pedido/PhotoUpload'
import SectionLabel from '../ui/SectionLabel'
import WhatsAppIcon from '../ui/WhatsAppIcon'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

// Cada passo entra pelo lado para onde se avança
const stepMotion = {
  enter: (direction) => ({ opacity: 0, x: direction * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction * -40 }),
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Regras de validação de um campo (mensagens em português, na voz do site)
const rulesFor = (field) => ({
  required: field.required ? `Preenche o campo “${field.label.toLowerCase()}”.` : false,
  ...(field.type === 'email' ? { pattern: { value: EMAIL_PATTERN, message: 'Confirma o email: parece ter um erro.' } } : {}),
  ...(field.name === 'nome' ? { minLength: { value: 2, message: 'Escreve o teu nome.' } } : {}),
})

// Campos validados ao passar de cada passo
const fieldsOfStep = (step, service) => {
  if (step === 0) return ['servico']
  if (step === 1) return SERVICE_FIELDS[service].filter((field) => field.type !== 'photos').map((field) => `${service}.${field.name}`)
  return [...CONTACT_FIELDS.map((field) => field.name), 'consentimento']
}

// Dados enviados: rótulos legíveis como nomes, para o email do pedido se ler sem tradução
function buildPayload(values) {
  const service = SERVICES.find((item) => item.id === values.servico)
  const details = values[values.servico] ?? {}
  const utm = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('utm_data') ?? '{}')
    } catch {
      return {}
    }
  })()

  return {
    'Tipo de serviço': service.title,
    ...Object.fromEntries(
      SERVICE_FIELDS[values.servico].filter((field) => field.type !== 'photos').map((field) => [field.label, details[field.name]]),
    ),
    ...Object.fromEntries(CONTACT_FIELDS.map((field) => [field.label, values[field.name]])),
    Consentimento: 'Aceite',
    ...utm,
    Página: window.location.href,
  }
}

/* ---------- Progresso ---------- */

// Desktop: lista vertical de passos, com marcadores como os do "Como funciona"
function StepList({ step }) {
  return (
    <ol className="relative mt-10 space-y-6">
      {/* Linha entre o primeiro e o último marcador; a parte dourada cresce até ao passo atual */}
      <span aria-hidden="true" className="absolute bottom-5 left-5 top-5 w-px bg-white/10" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-5 left-5 top-5 w-px origin-top bg-gradient-to-b from-gold-light to-gold-pale"
        initial={false}
        animate={{ scaleY: Math.min(1, step / (STEPS.length - 1)) }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {STEPS.map((item, index) => {
        const done = index < step
        const active = index === step
        return (
          <li key={item.id} className="relative flex items-center gap-4" aria-current={active ? 'step' : undefined}>
            <span
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-base font-semibold transition-all duration-500 [font-feature-settings:'lnum'] ${
                done || active
                  ? 'border-gold-pale/80 bg-gradient-to-br from-gold-pale via-gold-light to-gold-mid text-bg shadow-glow'
                  : 'border-white/15 bg-surface text-muted'
              }`}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : String(index + 1).padStart(2, '0')}
            </span>
            <span>
              <span className={`block font-display text-xl transition-colors duration-500 ${active ? 'text-text' : 'text-text/55'}`}>
                {item.title}
              </span>
              <span className="block text-xs text-muted">{item.description}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

// Telemóvel: três segmentos
function StepBar({ step }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {STEPS.map((item, index) => (
        <span key={item.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="block h-full origin-left rounded-full bg-gradient-to-r from-gold-light to-gold-pale"
            initial={false}
            animate={{ scaleX: index <= step ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      ))}
    </div>
  )
}

// Resumo vivo do que já foi preenchido
function Summary({ service, instrument }) {
  const serviceTitle = SERVICES.find((item) => item.id === service)?.title
  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-bg/50 p-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-light">O teu pedido</p>
      <dl className="mt-3 space-y-2 text-sm">
        {[
          ['Serviço', serviceTitle],
          ['Instrumento', instrument],
        ].map(([term, value]) => (
          <div key={term} className="flex justify-between gap-4">
            <dt className="text-muted">{term}</dt>
            <dd className={`truncate text-right ${value ? 'text-text' : 'text-text/30'}`}>{value || 'Por indicar'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ---------- Estados finais ---------- */

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="status"
      className="flex flex-col items-center py-10 text-center sm:py-16"
    >
      <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#C8882A"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M25 41 L35 51 L56 30"
          fill="none"
          stroke="#E2B568"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
        />
      </svg>
      <h3 className="mt-8 font-display text-4xl font-semibold">Obrigado!</h3>
      <p className="mt-3 max-w-sm text-base leading-7 text-text/80">Recebi o teu pedido e responderei em até 48 horas.</p>
      <Button type="button" variant="outline" className="mt-8" onClick={onReset}>
        Fazer outro pedido
      </Button>
    </motion.div>
  )
}

function SendProblem({ notConfigured }) {
  return (
    <div role="alert" className="mt-6 rounded-xl border border-red-300/30 bg-red-400/10 p-4 text-sm leading-6 text-text/85">
      <p>
        {notConfigured
          ? 'O envio do formulário ainda não está ativo. Entretanto, fala comigo por WhatsApp.'
          : 'Não foi possível enviar o pedido. Tenta de novo ou fala comigo por WhatsApp.'}
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp('formulario')}
        className="mt-2 inline-flex items-center gap-2 font-semibold text-gold-pale underline decoration-gold-light/40 underline-offset-4"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Falar por WhatsApp
      </a>
    </div>
  )
}

/* ---------- Formulário ---------- */

function FormularioPedido() {
  const reduceMotion = useReducedMotion()
  const cardRef = useRef(null)
  const headingRef = useRef(null)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [photos, setPhotos] = useState([])
  // idle | sending | success | error | not-configured
  const [status, setStatus] = useState('idle')

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched', defaultValues: { servico: '' } })

  const service = watch('servico')
  const instrument = service ? watch(`${service}.instrumento`) : ''
  const consentChecked = watch('consentimento')

  // Pré-seleciona o serviço do botão em que se clicou (antes ou depois de a página carregar)
  useEffect(() => {
    const select = (id) => SERVICES.some((item) => item.id === id) && setValue('servico', id, { shouldValidate: true })
    select(readRememberedService())
    const handle = (event) => select(event.detail)
    window.addEventListener('servico-pretendido', handle)
    return () => window.removeEventListener('servico-pretendido', handle)
  }, [setValue])

  // Ao mudar de passo: foco no título do passo e o cartão à vista
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    const top = cardRef.current?.getBoundingClientRect().top ?? 0
    if (top < 80) cardRef.current.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [step, reduceMotion])

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const goNext = async () => {
    const valid = await trigger(fieldsOfStep(step, service), { shouldFocus: true })
    if (valid) goTo(step + 1)
  }

  const send = async (values) => {
    // Campo-isco: só os robôs o preenchem; fingimos sucesso sem enviar
    if (values.website) {
      setStatus('success')
      return
    }
    setStatus('sending')
    try {
      await submitPedido(
        buildPayload(values),
        values.servico === 'reparacao' ? photos.map((photo) => photo.file) : [],
      )
      setStatus('success')
      trackLead('formulario')
    } catch (error) {
      setStatus(error instanceof EnvioNaoConfigurado ? 'not-configured' : 'error')
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (step < STEPS.length - 1) goNext()
    else handleSubmit(send)(event)
  }

  const startOver = () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.url))
    setPhotos([])
    reset({ servico: '' })
    setStatus('idle')
    setDirection(-1)
    setStep(0)
  }

  const errorOf = (path) => path.split('.').reduce((node, key) => node?.[key], errors)?.message

  // Regista o campo e, se já estiver a mostrar um erro, volta a validá-lo a cada alteração:
  // o erro desaparece assim que o campo fica certo, sem ser preciso sair dele
  const field = (path, rules) => {
    const registration = register(path, rules)
    return {
      ...registration,
      onChange: async (event) => {
        await registration.onChange(event)
        if (errorOf(path)) trigger(path)
      },
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section id="pedido" className="relative overflow-hidden bg-surface px-6 py-20 text-text sm:py-24 lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-gold-light/[0.07] blur-[140px]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Coluna da esquerda: título, texto, passos e resumo (fixa no desktop) */}
          <motion.div {...fadeUp} className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
            <SectionLabel>Pedido</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
              O teu instrumento está por construir. Ou por recuperar. <span className="text-gold-light">Começa aqui.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl hyphens-auto text-justify text-base leading-8 text-text/75 lg:mx-0 lg:hyphens-manual lg:text-left">
              Diz-me o que tens em mente e eu digo-te o melhor caminho. Preenche o formulário abaixo com os detalhes do teu
              projeto. Quanto mais informação deres, mais preciso será o orçamento.
            </p>
            <div className="hidden lg:block">
              <StepList step={status === 'success' ? STEPS.length : step} />
              <Summary service={service} instrument={instrument} />
            </div>
          </motion.div>

          {/* Cartão do formulário */}
          <motion.div
            {...fadeUp}
            ref={cardRef}
            className="scroll-mt-24 self-start rounded-[2rem] border border-white/10 bg-bg/70 p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-8 lg:p-10"
          >
            {status === 'success' ? (
              <SuccessState onReset={startOver} />
            ) : (
              <form onSubmit={onSubmit} noValidate aria-labelledby="pedido-passo">
                <div className="lg:hidden">
                  <StepBar step={step} />
                </div>
                <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-gold-light lg:mt-0">
                  Passo {step + 1} de {STEPS.length}
                </p>
                <h3
                  id="pedido-passo"
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-2 font-display text-3xl font-semibold leading-tight outline-none sm:text-4xl"
                >
                  {STEPS[step].title}
                </h3>

                {/* Campo-isco contra spam: invisível para pessoas */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="pedido-website">Não preencher</label>
                  <input id="pedido-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>

                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepMotion}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8"
                  >
                    {step === 0 && (
                      <fieldset>
                        <legend className="sr-only">Tipo de serviço</legend>
                        <div className="grid gap-3">
                          {SERVICES.map((item) => {
                            const { icon: Icon } = item
                            const selected = service === item.id
                            return (
                              <label key={item.id} className="relative block cursor-pointer">
                                <input
                                  type="radio"
                                  value={item.id}
                                  className="peer sr-only"
                                  {...field('servico', { required: 'Escolhe o tipo de serviço.' })}
                                />
                                <span
                                  className={`flex items-center gap-4 rounded-2xl border p-4 transition duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-light sm:p-5 ${
                                    selected
                                      ? 'border-gold-light/70 bg-gradient-to-r from-gold-light/15 to-transparent'
                                      : 'border-white/10 hover:border-gold-light/40 hover:bg-white/[0.03]'
                                  }`}
                                >
                                  <span
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
                                      selected
                                        ? 'border-gold-light bg-gold-light text-bg'
                                        : 'border-gold-light/30 bg-gold-light/10 text-gold-light'
                                    }`}
                                  >
                                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block font-display text-xl font-semibold sm:text-2xl">{item.title}</span>
                                    <span className="block text-sm text-text/60">{item.description}</span>
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                                      selected ? 'border-gold-light bg-gold-light text-bg' : 'border-white/20'
                                    }`}
                                  >
                                    {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                  </span>
                                </span>
                              </label>
                            )
                          })}
                        </div>
                        {errors.servico && (
                          <p role="alert" className="mt-3 text-sm text-red-300">
                            {errors.servico.message}
                          </p>
                        )}
                      </fieldset>
                    )}

                    {step === 1 && service && (
                      <div className="grid gap-6 sm:grid-cols-2">
                        {SERVICE_FIELDS[service].map((config) => {
                          const path = `${service}.${config.name}`
                          const id = `pedido-${service}-${config.name}`
                          const span = config.half ? '' : 'sm:col-span-2'
                          if (config.type === 'photos') {
                            return (
                              <div key={path} className={span}>
                                <PhotoUpload id={id} label={config.label} photos={photos} onChange={setPhotos} />
                              </div>
                            )
                          }
                          if (config.type === 'yesno') {
                            return (
                              <div key={path} className={span}>
                                <YesNoField id={id} field={config} registration={register(path)} current={watch(path)} />
                              </div>
                            )
                          }
                          return (
                            <div key={path} className={span}>
                              <TextField id={id} field={config} registration={field(path, rulesFor(config))} error={errorOf(path)}>
                                {config.suggestions && (
                                  <Suggestions
                                    options={config.suggestions}
                                    current={watch(path)}
                                    onPick={(value) => setValue(path, value, { shouldValidate: Boolean(errorOf(path)), shouldDirty: true })}
                                  />
                                )}
                              </TextField>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {step === 2 && (
                      <div className="grid gap-6 sm:grid-cols-2">
                        {CONTACT_FIELDS.map((config) => (
                          <div key={config.name} className={config.half ? '' : 'sm:col-span-2'}>
                            <TextField
                              id={`pedido-${config.name}`}
                              field={config}
                              registration={field(config.name, rulesFor(config))}
                              error={errorOf(config.name)}
                            />
                          </div>
                        ))}
                        <div className="sm:col-span-2">
                          <ConsentField
                            registration={field('consentimento', { required: 'Para enviar o pedido, aceita a Política de Privacidade.' })}
                            checked={consentChecked}
                            error={errors.consentimento?.message}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {(status === 'error' || status === 'not-configured') && <SendProblem notConfigured={status === 'not-configured'} />}

                {/* Ações (o botão flutuante de WhatsApp esconde-se quando isto está à vista no telemóvel) */}
                <div data-hide-whatsapp className="mt-10 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
                  {step > 0 ? (
                    <Button type="button" variant="ghost" onClick={() => goTo(step - 1)}>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Voltar
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button type="submit" size="lg" disabled={status === 'sending'} className="min-w-44">
                    {step < STEPS.length - 1 ? (
                      <>
                        Continuar
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    ) : status === 'sending' ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />A enviar...
                      </>
                    ) : (
                      <>
                        Enviar pedido
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

export default FormularioPedido

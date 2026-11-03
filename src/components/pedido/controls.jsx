import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

export const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[0.95rem] text-text outline-none transition duration-300 placeholder:text-text/30 hover:border-white/20 focus:border-gold-light/70 focus:bg-white/[0.05] focus:ring-4 focus:ring-gold-light/10 aria-[invalid=true]:border-red-400/60'

function ErrorMessage({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-red-300"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// Rótulo sempre visível (o placeholder é só um exemplo), com a indicação de obrigatório ou opcional
function Label({ htmlFor, label, required, as: Tag = 'label' }) {
  return (
    <Tag
      {...(Tag === 'label' ? { htmlFor } : {})}
      className="mb-2 flex items-baseline justify-between gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text/75"
    >
      <span>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-gold-light">
            *
          </span>
        )}
      </span>
      {!required && <span className="text-[0.72rem] font-normal normal-case tracking-normal text-muted">Opcional</span>}
    </Tag>
  )
}

export function TextField({ id, field, registration, error, children }) {
  const Control = field.type === 'textarea' ? 'textarea' : 'input'
  return (
    <div>
      <Label htmlFor={id} label={field.label} required={field.required} />
      <Control
        id={id}
        type={field.type === 'textarea' ? undefined : field.type ?? 'text'}
        rows={field.type === 'textarea' ? 4 : undefined}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete ?? 'off'}
        inputMode={field.inputMode}
        aria-required={field.required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-erro` : undefined}
        className={`${inputClass} ${field.type === 'textarea' ? 'min-h-28 resize-y leading-7' : ''}`}
        {...registration}
      />
      {children}
      <ErrorMessage id={`${id}-erro`} message={error} />
    </div>
  )
}

// Respostas rápidas: preenchem o campo com um toque
export function Suggestions({ options, current, onPick }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = current === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => onPick(option)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1 text-xs transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
              active
                ? 'border-gold-light/60 bg-gold-light/15 text-gold-pale'
                : 'border-white/10 text-text/60 hover:border-gold-light/40 hover:text-text'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export function YesNoField({ id, field, registration, current }) {
  return (
    <fieldset>
      <Label as="legend" label={field.label} required={field.required} />
      <div className="flex gap-2">
        {['Sim', 'Não'].map((option) => (
          <label key={option} className="relative">
            <input type="radio" value={option} id={`${id}-${option}`} className="peer sr-only" {...registration} />
            <span
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-light ${
                current === option
                  ? 'border-gold-light/60 bg-gold-light/15 text-gold-pale'
                  : 'border-white/10 text-text/70 hover:border-gold-light/40 hover:text-text'
              }`}
            >
              {current === option && <Check className="h-4 w-4" aria-hidden="true" />}
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function ConsentField({ registration, checked, error }) {
  return (
    <div>
      <label className="group flex cursor-pointer items-start gap-3.5 text-sm leading-6 text-text/75">
        <input
          type="checkbox"
          className="peer sr-only"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'consentimento-erro' : undefined}
          {...registration}
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-light ${
            checked ? 'border-gold-light bg-gold-light text-bg' : 'border-white/25 group-hover:border-gold-light/60'
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
        <span>
          Li e aceito a{' '}
          <a
            href="/politica-de-privacidade/"
            target="_blank"
            rel="noopener"
            className="text-gold-light underline decoration-gold-light/40 underline-offset-4 hover:decoration-gold-light"
          >
            Política de Privacidade
          </a>{' '}
          e autorizo o tratamento dos meus dados para responder ao meu pedido.
        </span>
      </label>
      <ErrorMessage id="consentimento-erro" message={error} />
    </div>
  )
}

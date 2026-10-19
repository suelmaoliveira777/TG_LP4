import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = window.localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const saveConsent = (value) => {
    window.localStorage.setItem('cookie_consent', value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] rounded-[1.5rem] border border-gold-light/30 bg-bg/95 p-6 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:inset-x-auto md:right-6 md:w-[420px]">
      <p className="text-base leading-8 text-text">
        Usamos cookies para melhorar o funcionamento do site e medir a performance. Escolhe a tua preferência.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => saveConsent('all')} size="sm">Aceitar todos</Button>
        <button type="button" onClick={() => saveConsent('essential')} className="rounded-full border border-white/10 px-4 py-2 text-sm uppercase tracking-[0.18em] text-muted">
          Só essenciais
        </button>
      </div>
    </div>
  )
}

export default CookieBanner

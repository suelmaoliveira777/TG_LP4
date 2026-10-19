export const trackCTA = (label) => {
  if (typeof window === 'undefined') return
  const consent = window.localStorage.getItem('cookie_consent')
  if (!consent || consent === 'essential') return

  window.gtag?.('event', 'cta_click', { label })
  window.fbq?.('trackCustom', 'CTA', { label })
}

export const trackLead = (source) => {
  if (typeof window === 'undefined') return
  const consent = window.localStorage.getItem('cookie_consent')
  if (!consent || consent === 'essential') return

  window.gtag?.('event', 'generate_lead', { source })
  window.fbq?.('track', 'Lead', { source })
}

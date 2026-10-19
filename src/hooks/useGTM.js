import { useEffect } from 'react'

const GA4_ID = 'G-XXXXXXXXXX'

export function useGTM(consent) {
  useEffect(() => {
    if (!consent || typeof window === 'undefined') return

    window.dataLayer = window.dataLayer || []
    window.gtag?.('config', GA4_ID, { send_page_view: true })
    window.gtag?.('event', 'page_view')
  }, [consent])

  const trackEvent = (event, params = {}) => {
    if (!consent || typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', event, params)
  }

  return { trackEvent }
}

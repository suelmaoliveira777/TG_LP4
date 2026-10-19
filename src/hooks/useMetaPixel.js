import { useEffect } from 'react'

const META_PIXEL_ID = 'XXXXXXXXXXXXXXXXX'

export function useMetaPixel(consent) {
  useEffect(() => {
    if (!consent || typeof window === 'undefined' || !window.fbq) return

    window.fbq('init', META_PIXEL_ID, {})
    window.fbq('track', 'PageView')
  }, [consent])

  const trackEvent = (event, data = {}) => {
    if (!consent || typeof window === 'undefined' || !window.fbq) return
    window.fbq('track', event, data)
  }

  return { trackEvent }
}

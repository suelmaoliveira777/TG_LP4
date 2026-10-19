import { useEffect } from 'react'

export function useUTM() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const utmData = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
    }

    sessionStorage.setItem('utm_data', JSON.stringify(utmData))
  }, [])

  return () => {
    if (typeof window === 'undefined') return
    const saved = sessionStorage.getItem('utm_data')
    return saved ? JSON.parse(saved) : {}
  }
}

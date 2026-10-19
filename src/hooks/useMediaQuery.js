import { useSyncExternalStore } from 'react'

// Devolve true enquanto a media query corresponder ao ecrã, e atualiza ao redimensionar
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

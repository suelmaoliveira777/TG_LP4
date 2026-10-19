import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll(options.selector || '.reveal')

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: index * (options.stagger || 0.12),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [ref, options.selector, options.stagger])
}

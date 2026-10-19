import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function RosetaSeparator() {
  const lineRef = useRef(null)

  useEffect(() => {
    if (!lineRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'center' }, { scaleX: 1, duration: 0.8, ease: 'power3.out' })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="flex items-center justify-center gap-4 py-6" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-light/70" />
      <span ref={lineRef} className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-light/50 bg-surface/80 text-gold-light shadow-[0_0_18px_rgba(200,136,42,0.16)]">
        ✦
      </span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-light/70" />
    </div>
  )
}

export default RosetaSeparator

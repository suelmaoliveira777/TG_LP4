import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-display text-xl text-text">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl text-gold-light"
        >
          ⌄
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-base leading-8 text-muted">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default AccordionItem

import { motion } from 'framer-motion'

function Button({ children, href, className = '', variant = 'primary', size = 'md', as: Component = href ? 'a' : 'button', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full border font-body font-semibold tracking-[0.16em] uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-light/60'
  const variants = {
    primary: 'border-gold-light/70 bg-gradient-to-r from-gold-light to-gold-mid text-bg shadow-[0_0_30px_rgba(200,136,42,0.22)]',
    secondary: 'border-white/15 bg-white/5 text-text backdrop-blur-sm',
  }
  const sizes = {
    sm: 'px-4 py-2 text-[0.7rem]',
    md: 'px-6 py-3 text-[0.75rem]',
    lg: 'px-7 py-3.5 text-[0.8rem]',
  }

  const sharedProps = {
    whileHover: { scale: 1.04, filter: 'brightness(1.1)' },
    whileTap: { scale: 0.97 },
    className: `${base} ${variants[variant]} ${sizes[size]} ${className}`,
    onClick: (event) => {
      props.onClick?.(event)
      if (typeof window !== 'undefined') {
        window.gtag?.('event', 'cta_click', { label: children?.toString?.() || 'button' })
      }
    },
    ...props,
  }

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" {...sharedProps}>
      {children}
    </motion.button>
  )
}

export default Button

function SectionLabel({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-gold-light/20 bg-gold-light/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-light ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
      {children}
    </span>
  )
}

export default SectionLabel

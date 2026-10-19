import RosetaSeparator from './RosetaSeparator'

// Separador entre secções: fica sobre a linha de fronteira, metade em cada secção,
// por isso funciona com qualquer combinação de fundos (bg / surface)
function SectionDivider() {
  return (
    <div className="relative z-10 h-0" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 -translate-y-1/2">
        <RosetaSeparator />
      </div>
    </div>
  )
}

export default SectionDivider

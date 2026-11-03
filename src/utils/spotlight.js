// Guarda a posição do rato dentro do elemento (--mx, --my), para um brilho em radial-gradient a seguir o cursor
export function trackSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

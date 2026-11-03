// Contacto por WhatsApp: o número fica só aqui (botão flutuante e CTA final usam este link).
// NÚMERO POR DEFINIR: substituir pelo número do Tiago, com indicativo e sem espaços nem "+" (ex.: 351912345678).
export const WHATSAPP_NUMBER = '351XXXXXXXXX'

export const WHATSAPP_MESSAGE = 'Olá Tiago, vim através do site e gostaria de falar sobre o meu instrumento.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// Redes sociais (footer). URLS POR CONFIRMAR: deduzidas dos nomes da copy; confirmar com o Tiago.
export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', handle: '@tiagogagoluthier', url: 'https://www.instagram.com/tiagogagoluthier/' },
  { id: 'facebook', label: 'Facebook', handle: '/tiagogagoluthier', url: 'https://www.facebook.com/tiagogagoluthier' },
  { id: 'youtube', label: 'YouTube', handle: 'Tiago Gago Luthier', url: 'https://www.youtube.com/@tiagogagoluthier' },
]

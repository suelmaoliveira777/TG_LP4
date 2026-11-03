// Envio do pedido. O endereço vem de VITE_PEDIDO_ENDPOINT (definido no alojamento), e recebe um
// multipart/form-data com os campos, as fotos ("fotos", até 5) e a origem da visita (UTM).
// Ver docs/COPY.md, Decisões técnicas: a opção recomendada é uma função no Cloudflare Pages com Resend.
const ENDPOINT = import.meta.env.VITE_PEDIDO_ENDPOINT

export class EnvioNaoConfigurado extends Error {}

export const envioConfigurado = Boolean(ENDPOINT)

export async function submitPedido(fields, photos = []) {
  if (!ENDPOINT) throw new EnvioNaoConfigurado('O envio do formulário ainda não está ligado')

  const body = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== '') body.append(key, value)
  }
  photos.forEach((photo) => body.append('fotos', photo, photo.name))

  const response = await fetch(ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Erro no envio (${response.status})`)
}

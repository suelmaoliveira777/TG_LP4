// Guarda o serviço escolhido para o formulário o pré-selecionar.
// O evento avisa o formulário, que já está montado na página quando se clica num botão de pedido.
export function rememberService(id) {
  try {
    window.sessionStorage.setItem('servico_pretendido', id)
  } catch {
    // Sem armazenamento disponível (modo privado, etc.): o formulário recebe o serviço só pelo evento
  }
  window.dispatchEvent(new CustomEvent('servico-pretendido', { detail: id }))
}

export function readRememberedService() {
  try {
    return window.sessionStorage.getItem('servico_pretendido')
  } catch {
    return null
  }
}

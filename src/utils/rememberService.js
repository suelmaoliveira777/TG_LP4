// Guarda o serviço escolhido para o formulário o pré-selecionar (implementado na fase do formulário)
export function rememberService(id) {
  try {
    window.sessionStorage.setItem('servico_pretendido', id)
  } catch {
    // Sem armazenamento disponível (modo privado, etc.): o formulário abre sem pré-seleção
  }
}

// Páginas legais, usadas no footer do site e no das próprias páginas legais
export const LEGAL_PAGES = [
  { href: '/politica-de-privacidade/', label: 'Política de Privacidade' },
  { href: '/termos-e-condicoes/', label: 'Termos e Condições' },
  { href: '/politica-de-cookies/', label: 'Política de Cookies' },
]

// Livro de Reclamações Eletrónico: link obrigatório para quem presta serviços a consumidores (DL 74/2017)
export const LIVRO_RECLAMACOES_URL = 'https://www.livroreclamacoes.pt'

// Dados usados nas páginas legais. Cada valor a null aparece destacado nas páginas
// como "por preencher" — nenhum pode ficar a null quando o site for publicado.
export const LEGAL = {
  responsavel: 'Tiago Gago dos Santos', // Confirmar que é o nome que consta no registo fiscal (NIF)
  nif: null,
  morada: null, // Morada do atelier, com código postal
  email: null, // Email para pedidos e para exercício de direitos RGPD
  telefone: null,
  alojamento: 'Vercel Inc. (EUA)', // Atualizar se o site mudar de alojamento
  servicoFormulario: null, // Serviço que recebe o formulário (definido na fase do formulário)
  prazoPedidosMeses: 12, // Conservação de pedidos que não deram origem a trabalho
  validadeOrcamentoDias: 30,
  garantiaServicosMeses: null, // Garantia sobre reparações e setups
  regimeIva: null, // Ex.: "IVA incluído à taxa legal" ou "Isento ao abrigo do art. 53.º do CIVA"
  sinalConstrucao: null, // Ex.: "30%"
  prazoLevantamentoDias: 90,
  foro: null, // Ex.: "Comarca de Lisboa Oeste"
  entidadeRAL: null, // Entidade de resolução alternativa de litígios a que o Tiago adere
  ultimaAtualizacao: null, // Data de publicação, ex.: "1 de dezembro de 2026"
}

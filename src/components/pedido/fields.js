import { Guitar, SlidersHorizontal, Wrench } from 'lucide-react'

// Tipos de serviço (passo 1). Os ids são os mesmos que os botões de pedido guardam (rememberService).
export const SERVICES = [
  { id: 'construcao', icon: Guitar, title: 'Construção de raiz', description: 'Um instrumento feito para ti, do zero.' },
  { id: 'reparacao', icon: Wrench, title: 'Reparação / Restauro', description: 'Devolver ao instrumento o que perdeu.' },
  { id: 'setup', icon: SlidersHorizontal, title: 'Setup & Regulação', description: 'Para tocar como deve.' },
]

// Campos do passo 2, conforme o serviço. type: text (por omissão), textarea, yesno ou photos.
// suggestions: respostas rápidas que preenchem o campo com um toque.
export const SERVICE_FIELDS = {
  construcao: [
    {
      name: 'instrumento',
      label: 'Tipo de instrumento',
      placeholder: 'Ex: Guitarra clássica, Viola campaniça, Guitarra acústica...',
      required: true,
    },
    {
      name: 'madeiraTampo',
      label: 'Madeira preferida para o tampo',
      placeholder: 'Ex: Abeto, Cedro... (ou "não sei, preciso de ajuda")',
      suggestions: ['Abeto', 'Cedro', 'Não sei, preciso de ajuda'],
    },
    {
      name: 'madeiraFundo',
      label: 'Madeira para fundo e ilhargas',
      placeholder: 'Ex: Pau-santo, Mogno... (ou "não sei")',
      suggestions: ['Pau-santo', 'Mogno', 'Cipreste', 'Não sei'],
    },
    { name: 'escala', label: 'Escala desejada (cm)', placeholder: 'Ex: 65 cm (padrão clássico)', half: true },
    { name: 'estilo', label: 'Estilo musical principal', placeholder: 'Ex: Clássico, Folk, Flamenco, Jazz...', half: true },
    { name: 'orcamento', label: 'Orçamento indicativo (€)', placeholder: 'Ex: 800 € a 1200 €' },
    {
      name: 'observacoes',
      label: 'Observações / referências',
      placeholder: 'Descreve o som que procuras, instrumentos de referência, etc.',
      type: 'textarea',
    },
  ],
  reparacao: [
    { name: 'instrumento', label: 'Tipo de instrumento', placeholder: 'Ex: Guitarra acústica, Viola beiroa...', required: true },
    {
      name: 'problema',
      label: 'Descreve o problema',
      placeholder: 'Ex: Tampo descolado, trasto levantado, cravelha partida...',
      type: 'textarea',
      required: true,
    },
    { name: 'valorSentimental', label: 'O instrumento tem valor sentimental ou histórico?', type: 'yesno' },
    { name: 'fotos', label: 'Fotos do instrumento', type: 'photos' },
    { name: 'observacoes', label: 'Observações adicionais', placeholder: 'Qualquer detalhe que consideres relevante', type: 'textarea' },
  ],
  setup: [
    {
      name: 'instrumento',
      label: 'Tipo de instrumento',
      placeholder: 'Ex: Guitarra elétrica, Viola, Guitarra clássica...',
      required: true,
    },
    {
      name: 'problema',
      label: 'Problema principal',
      placeholder: 'Ex: Ação muito alta, afinação instável, zumbidos nos trastos...',
      required: true,
    },
    { name: 'prazo', label: 'Quando precisas do instrumento de volta?', placeholder: 'Ex: Tenho concerto em 2 semanas' },
    { name: 'observacoes', label: 'Observações', placeholder: 'Detalha o que sentes ao tocar: o que não está certo', type: 'textarea' },
  ],
}

// Campos do passo 3 (contacto)
export const CONTACT_FIELDS = [
  { name: 'nome', label: 'Nome completo', placeholder: 'Ex: João Silva', autoComplete: 'name', required: true },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Ex: joao@email.com',
    type: 'email',
    autoComplete: 'email',
    inputMode: 'email',
    required: true,
  },
  { name: 'telefone', label: 'Telefone / WhatsApp', placeholder: 'Ex: +351 9XX XXX XXX', type: 'tel', autoComplete: 'tel', half: true },
  { name: 'localidade', label: 'Localidade', placeholder: 'Ex: Lisboa, Porto, Cascais...', autoComplete: 'address-level2', half: true },
]

export const STEPS = [
  { id: 'servico', title: 'Serviço', description: 'O que precisas' },
  { id: 'instrumento', title: 'O instrumento', description: 'Os detalhes do projeto' },
  { id: 'contacto', title: 'Contacto', description: 'Como te respondo' },
]

export const MAX_PHOTOS = 5

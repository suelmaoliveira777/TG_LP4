import { abrirPreferenciasCookies, LinkExterno, Secao } from '../components'

const COOKIES = [
  {
    nome: 'cookie_consent',
    fornecedor: 'Este site',
    finalidade: 'Guarda a sua escolha sobre cookies, para não voltar a perguntar em cada visita.',
    duracao: 'Até ser apagado no navegador (armazenamento local)',
    categoria: 'Necessário',
  },
  {
    nome: 'utm_data',
    fornecedor: 'Este site',
    finalidade: 'Regista a origem da visita (campanha ou rede social) para a associar ao pedido enviado pelo formulário.',
    duracao: 'Até fechar o separador (armazenamento de sessão)',
    categoria: 'Funcional',
  },
  {
    nome: '_ga, _ga_*',
    fornecedor: 'Google Analytics',
    finalidade: 'Estatísticas anónimas de utilização: páginas vistas, tempo de visita, origem do tráfego.',
    duracao: '2 anos',
    categoria: 'Análise',
  },
  {
    nome: '_fbp',
    fornecedor: 'Meta Pixel',
    finalidade: 'Medir os resultados das campanhas no Facebook e Instagram.',
    duracao: '3 meses',
    categoria: 'Marketing',
  },
]

function Cookies() {
  return (
    <>
      <Secao titulo="1. O que são cookies">
        <p>
          Cookies são pequenos ficheiros de texto que um site guarda no seu dispositivo quando o visita. Esta política aplica-se também a
          tecnologias semelhantes, como o armazenamento local e de sessão do navegador, aqui designadas em conjunto por “cookies”.
        </p>
      </Secao>

      <Secao titulo="2. Que cookies são usados">
        <p>
          <strong>Necessários</strong> — indispensáveis ao funcionamento do site. Não exigem consentimento.
        </p>
        <p>
          <strong>Funcionais</strong> — guardam informação que melhora o serviço, como a origem da visita associada ao seu pedido.
        </p>
        <p>
          <strong>Análise e marketing</strong> — só são ativados se escolher “Aceitar todos”. Se escolher “Só essenciais”, não são
          instalados.
        </p>
        <div className="legal-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Fornecedor</th>
                <th>Finalidade</th>
                <th>Duração</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie) => (
                <tr key={cookie.nome}>
                  <td className="whitespace-nowrap font-mono text-xs">{cookie.nome}</td>
                  <td>{cookie.fornecedor}</td>
                  <td>{cookie.finalidade}</td>
                  <td>{cookie.duracao}</td>
                  <td>{cookie.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>

      <Secao titulo="3. Como gerir as suas preferências">
        <p>Pode alterar a sua escolha a qualquer momento:</p>
        <p>
          <button
            type="button"
            onClick={abrirPreferenciasCookies}
            className="rounded-full border border-gold-light/50 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-light transition hover:bg-gold-light/10"
          >
            Alterar preferências de cookies
          </button>
        </p>
        <p>
          Pode também apagar ou bloquear cookies nas definições do navegador:{' '}
          <LinkExterno href="https://support.google.com/chrome/answer/95647">Chrome</LinkExterno>,{' '}
          <LinkExterno href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac">Safari</LinkExterno>,{' '}
          <LinkExterno href="https://support.mozilla.org/pt-PT/kb/limpar-cookies-e-dados-de-sites-no-firefox">Firefox</LinkExterno>,{' '}
          <LinkExterno href="https://support.microsoft.com/pt-pt/microsoft-edge">Edge</LinkExterno>. Bloquear os cookies necessários pode
          afetar o funcionamento do site.
        </p>
      </Secao>

      <Secao titulo="4. Mais informação">
        <p>
          O tratamento dos dados recolhidos através de cookies segue a <a href="/politica-de-privacidade/">Política de Privacidade</a>,
          onde encontra também os seus direitos e a forma de os exercer.
        </p>
      </Secao>
    </>
  )
}

export default Cookies

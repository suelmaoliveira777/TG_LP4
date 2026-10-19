import { Dado, LinkExterno, Secao } from '../components'
import { LEGAL } from '../legal-data'

function Privacidade() {
  return (
    <>
      <Secao titulo="1. Quem é o responsável pelos seus dados">
        <p>
          O responsável pelo tratamento dos dados pessoais recolhidos neste site é <strong><Dado campo="responsavel">nome completo</Dado></strong>,
          que exerce a atividade de luthier sob a designação comercial Tiago Gago Luthier, com o NIF <Dado campo="nif">NIF</Dado> e
          morada em <Dado campo="morada">morada do atelier</Dado>.
        </p>
        <p>
          Para qualquer questão sobre esta política ou sobre os seus dados, pode contactar através do email{' '}
          <Dado campo="email">email de contacto</Dado>.
        </p>
      </Secao>

      <Secao titulo="2. Que dados são recolhidos">
        <h3>Quando faz um pedido</h3>
        <p>Ao preencher o formulário de pedido, são recolhidos:</p>
        <ul>
          <li>dados de identificação e contacto: nome, email, telefone e localidade;</li>
          <li>informação sobre o serviço pretendido e o instrumento, incluindo descrições, preferências, orçamento indicativo e prazos;</li>
          <li>fotografias do instrumento, quando decide enviá-las;</li>
          <li>a origem da visita (por exemplo, a campanha ou rede social através da qual chegou ao site), quando disponível.</li>
        </ul>

        <h3>Quando contacta por WhatsApp</h3>
        <p>
          São tratados o seu número de telefone, nome de perfil e o conteúdo das mensagens que enviar. O WhatsApp é um serviço da
          WhatsApp Ireland Limited, sujeito à respetiva política de privacidade.
        </p>

        <h3>Quando navega no site</h3>
        <p>
          Com o seu consentimento, são usados cookies de análise e de marketing. Os detalhes estão na{' '}
          <a href="/politica-de-cookies/">Política de Cookies</a>.
        </p>
      </Secao>

      <Secao titulo="3. Para que são usados e com que fundamento">
        <div className="legal-table">
          <table>
            <thead>
              <tr>
                <th>Finalidade</th>
                <th>Fundamento legal (RGPD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Responder ao seu pedido e preparar o orçamento</td>
                <td>Diligências pré-contratuais a seu pedido — art. 6.º, n.º 1, al. b)</td>
              </tr>
              <tr>
                <td>Executar o serviço contratado e comunicar consigo durante o trabalho</td>
                <td>Execução de contrato — art. 6.º, n.º 1, al. b)</td>
              </tr>
              <tr>
                <td>Faturação e cumprimento de obrigações fiscais e contabilísticas</td>
                <td>Obrigação legal — art. 6.º, n.º 1, al. c)</td>
              </tr>
              <tr>
                <td>Perceber por que canais chegam os pedidos, para melhorar a comunicação</td>
                <td>Interesse legítimo — art. 6.º, n.º 1, al. f)</td>
              </tr>
              <tr>
                <td>Estatísticas de utilização do site e medição de campanhas</td>
                <td>Consentimento — art. 6.º, n.º 1, al. a)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Os seus dados não são vendidos nem usados para decisões automatizadas ou definição de perfis com efeitos jurídicos.</p>
      </Secao>

      <Secao titulo="4. Durante quanto tempo são guardados">
        <ul>
          <li>
            <strong>Pedidos que não dão origem a trabalho:</strong> até {LEGAL.prazoPedidosMeses} meses após o último contacto, sendo
            depois eliminados, incluindo as fotografias.
          </li>
          <li>
            <strong>Clientes:</strong> durante a relação comercial e o período de garantia do trabalho realizado.
          </li>
          <li>
            <strong>Documentos de faturação:</strong> pelo prazo exigido pela legislação fiscal, atualmente de 10 anos.
          </li>
          <li>
            <strong>Dados recolhidos por cookies:</strong> pelos prazos indicados na <a href="/politica-de-cookies/">Política de Cookies</a>.
          </li>
        </ul>
      </Secao>

      <Secao titulo="5. Com quem são partilhados">
        <p>
          Os dados só são partilhados com prestadores de serviços que os tratam por conta do responsável e segundo as suas instruções
          (subcontratantes), na medida do necessário:
        </p>
        <ul>
          <li>alojamento do site: {LEGAL.alojamento};</li>
          <li>receção e envio dos pedidos do formulário: <Dado campo="servicoFormulario">serviço do formulário</Dado>;</li>
          <li>estatísticas e medição de campanhas, apenas com consentimento: Google Ireland Limited (Google Analytics) e Meta Platforms Ireland Limited (Meta Pixel);</li>
          <li>contabilidade e faturação, quando há um serviço contratado.</li>
        </ul>
        <p>Os dados podem ainda ser comunicados a autoridades públicas quando a lei o exija.</p>
      </Secao>

      <Secao titulo="6. Transferências para fora da União Europeia">
        <p>
          Alguns destes prestadores têm sede ou servidores nos Estados Unidos. Nesses casos, a transferência é feita ao abrigo do Quadro de
          Privacidade de Dados UE-EUA (EU-US Data Privacy Framework) ou de cláusulas contratuais-tipo aprovadas pela Comissão Europeia,
          que garantem um nível de proteção adequado.
        </p>
      </Secao>

      <Secao titulo="7. Os seus direitos">
        <p>Nos termos do RGPD, pode a qualquer momento:</p>
        <ul>
          <li>aceder aos seus dados e obter uma cópia;</li>
          <li>pedir a correção de dados inexatos ou incompletos;</li>
          <li>pedir o apagamento dos dados, quando não exista obrigação legal de os conservar;</li>
          <li>pedir a limitação do tratamento ou opor-se ao tratamento baseado em interesse legítimo;</li>
          <li>receber os dados que forneceu num formato estruturado (portabilidade);</li>
          <li>retirar o consentimento, sem que isso afete a licitude do tratamento feito até então.</li>
        </ul>
        <p>
          Para exercer estes direitos, envie um email para <Dado campo="email">email de contacto</Dado>. A resposta é dada no prazo máximo
          de um mês.
        </p>
        <p>
          Tem também o direito de apresentar reclamação à autoridade de controlo, a Comissão Nacional de Proteção de Dados (CNPD), em{' '}
          <LinkExterno href="https://www.cnpd.pt">www.cnpd.pt</LinkExterno>.
        </p>
      </Secao>

      <Secao titulo="8. Segurança">
        <p>
          São adotadas medidas técnicas e organizativas adequadas para proteger os seus dados contra perda, acesso não autorizado ou
          divulgação, incluindo a transmissão cifrada (HTTPS) de toda a informação enviada através do site.
        </p>
      </Secao>

      <Secao titulo="9. Menores">
        <p>
          Os serviços destinam-se a maiores de 18 anos. Pedidos relativos a menores devem ser feitos pelos pais ou representantes legais.
        </p>
      </Secao>

      <Secao titulo="10. Alterações a esta política">
        <p>
          Esta política pode ser atualizada para refletir alterações legais ou nos serviços. A versão em vigor é sempre a publicada nesta
          página, com a data da última atualização indicada no topo.
        </p>
      </Secao>
    </>
  )
}

export default Privacidade

import { Dado, LinkExterno, Secao } from '../components'
import { LEGAL } from '../legal-data'

function Termos() {
  return (
    <>
      <Secao titulo="1. Identificação">
        <p>
          Este site é propriedade de <strong><Dado campo="responsavel">nome completo</Dado></strong>, que exerce a atividade de luthier
          sob a designação comercial Tiago Gago Luthier, com o NIF <Dado campo="nif">NIF</Dado> e morada em{' '}
          <Dado campo="morada">morada do atelier</Dado> (adiante, “Tiago Gago Luthier”).
        </p>
        <p>
          Contactos: <Dado campo="email">email de contacto</Dado> · <Dado campo="telefone">telefone</Dado>.
        </p>
      </Secao>

      <Secao titulo="2. Âmbito">
        <p>
          Estes termos regulam a utilização do site e os pedidos de orçamento feitos através dele. Cada trabalho de construção, reparação
          ou setup rege-se, além disto, pelas condições específicas do orçamento aceite pelo cliente. Em caso de divergência, prevalece o
          orçamento aceite.
        </p>
      </Secao>

      <Secao titulo="3. Utilização do site">
        <p>
          A informação publicada tem caráter informativo e não constitui uma proposta contratual. Preços, prazos e características de cada
          trabalho só são definidos no orçamento.
        </p>
        <p>
          Ao usar o site, compromete-se a fornecer informação verdadeira e a não o utilizar para fins ilícitos ou que prejudiquem o seu
          funcionamento.
        </p>
      </Secao>

      <Secao titulo="4. Pedidos de orçamento">
        <ul>
          <li>Os pedidos de orçamento são gratuitos e sem compromisso.</li>
          <li>A resposta é dada, em regra, no prazo de 48 horas úteis.</li>
          <li>
            Salvo indicação em contrário, cada orçamento é válido por {LEGAL.validadeOrcamentoDias} dias a contar da data de envio.
          </li>
          <li>
            Nas reparações, o orçamento baseia-se na informação e nas fotografias enviadas. Se a observação do instrumento revelar danos
            não visíveis, é apresentado um orçamento revisto antes de qualquer trabalho adicional.
          </li>
        </ul>
      </Secao>

      <Secao titulo="5. Aceitação e início dos trabalhos">
        <p>
          Nenhum trabalho é iniciado sem a aceitação expressa do orçamento pelo cliente, por escrito (email ou mensagem). Nos trabalhos de
          construção, o início está sujeito ao pagamento de um sinal de <Dado campo="sinalConstrucao">percentagem do sinal</Dado> do valor
          total.
        </p>
      </Secao>

      <Secao titulo="6. Prazos">
        <p>
          Os prazos indicados nos orçamentos são estimativas de boa-fé. O trabalho artesanal depende, entre outros fatores, da secagem das
          madeiras e da disponibilidade de materiais. Qualquer atraso relevante é comunicado ao cliente logo que seja conhecido.
        </p>
      </Secao>

      <Secao titulo="7. Preços e pagamento">
        <p>
          Os preços são os indicados no orçamento aceite. <Dado campo="regimeIva">regime de IVA</Dado>. Os métodos e momentos de pagamento
          são indicados no orçamento.
        </p>
      </Secao>

      <Secao titulo="8. Entrega e levantamento dos instrumentos">
        <ul>
          <li>
            Os instrumentos são entregues e levantados no atelier, salvo acordo em contrário. Os custos e riscos do envio por transportadora
            são da responsabilidade do cliente, que deve assegurar embalagem e seguro adequados.
          </li>
          <li>
            Durante o trabalho, o instrumento é guardado com o cuidado devido. Para instrumentos de valor elevado, recomenda-se que o
            cliente mantenha um seguro próprio.
          </li>
          <li>
            Concluído o trabalho, o cliente é avisado e deve levantar o instrumento no prazo de {LEGAL.prazoLevantamentoDias} dias. Findo
            esse prazo, podem ser cobrados custos de armazenamento, comunicados previamente.
          </li>
        </ul>
      </Secao>

      <Secao titulo="9. Garantia">
        <p>
          Os instrumentos construídos de raiz beneficiam da garantia legal de conformidade prevista no Decreto-Lei n.º 84/2021, de 18 de
          outubro, pelo prazo de 3 anos a contar da entrega, quando o cliente é consumidor. Qualquer defeito de construção que surja nesse
          período é corrigido sem custos.
        </p>
        <p>
          As reparações e os setups têm uma garantia de <Dado campo="garantiaServicosMeses">número de meses</Dado> meses sobre o trabalho
          executado.
        </p>
        <p>A garantia não cobre:</p>
        <ul>
          <li>o desgaste normal resultante do uso, como cordas, trastos e acabamentos;</li>
          <li>danos causados por quedas, impactos, humidade ou temperatura inadequadas, ou por transporte;</li>
          <li>intervenções feitas por terceiros após a entrega.</li>
        </ul>
      </Secao>

      <Secao titulo="10. Direito de livre resolução">
        <p>
          Quando o contrato é celebrado à distância, o consumidor pode, em regra, resolvê-lo no prazo de 14 dias, nos termos do
          Decreto-Lei n.º 24/2014, de 14 de fevereiro. Este direito não se aplica, nos termos do artigo 17.º desse diploma:
        </p>
        <ul>
          <li>a instrumentos construídos de acordo com as especificações do cliente ou claramente personalizados;</li>
          <li>
            a serviços integralmente executados, quando a execução começou com o consentimento prévio e expresso do consumidor e o
            reconhecimento de que perde esse direito após a execução completa.
          </li>
        </ul>
      </Secao>

      <Secao titulo="11. Propriedade intelectual">
        <p>
          Os textos, fotografias, logótipos e restantes conteúdos do site pertencem a Tiago Gago Luthier ou são usados com autorização. Não
          podem ser reproduzidos sem consentimento prévio por escrito.
        </p>
      </Secao>

      <Secao titulo="12. Dados pessoais">
        <p>
          O tratamento dos dados pessoais é descrito na <a href="/politica-de-privacidade/">Política de Privacidade</a> e na{' '}
          <a href="/politica-de-cookies/">Política de Cookies</a>.
        </p>
      </Secao>

      <Secao titulo="13. Reclamações e resolução de litígios">
        <p>
          Pode apresentar reclamação no Livro de Reclamações Eletrónico, em{' '}
          <LinkExterno href="https://www.livroreclamacoes.pt">www.livroreclamacoes.pt</LinkExterno>.
        </p>
        <p>
          Em caso de litígio de consumo, o consumidor pode recorrer à entidade de resolução alternativa de litígios{' '}
          <Dado campo="entidadeRAL">entidade RAL</Dado>. A lista completa destas entidades está disponível no Portal do Consumidor, em{' '}
          <LinkExterno href="https://www.consumidor.gov.pt">www.consumidor.gov.pt</LinkExterno>.
        </p>
      </Secao>

      <Secao titulo="14. Lei aplicável e foro">
        <p>
          Estes termos regem-se pela lei portuguesa. Para a resolução de litígios é competente o foro da{' '}
          <Dado campo="foro">comarca</Dado>, sem prejuízo das normas legais imperativas de proteção do consumidor.
        </p>
      </Secao>

      <Secao titulo="15. Alterações">
        <p>
          Estes termos podem ser atualizados. Aplica-se a cada trabalho a versão em vigor na data de aceitação do respetivo orçamento.
        </p>
      </Secao>
    </>
  )
}

export default Termos

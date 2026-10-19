# Copy do site — Tiago Gago Luthier

Fonte única do texto e da estrutura do novo site. Cada secção será refeita a partir daqui (copy e design), uma de cada vez.

- **Estado:** versão revista, a enviar ao cliente para aprovação.
- **Idioma:** português europeu.
- **Voz:** ver [Voz e tom](#voz-e-tom).
- **Ordem de trabalho:** todas as secções primeiro → aprovação do cliente → formulário por último.
- **Alterações à copy original:** todas registadas em [Registo de alterações](#registo-de-alterações), para o cliente as poder rever.

---

## Voz e tom

**Site — primeira pessoa do singular, tratamento por tu.**
O Tiago é um artesão que trabalha sozinho e a copy promete “acesso direto a mim, do início ao fim”. Falar na primeira pessoa (“faço”, “construo”, “analiso”) cumpre essa promessa logo na leitura e é a voz da maioria dos ateliers de lutheria de autor. O plural (“Quem Somos”) sugere uma equipa que não existe, e a terceira pessoa (“O Tiago analisa”) cria distância. O “tu” mantém-se: é próximo, comum entre músicos e coerente com toda a copy entregue.

**Páginas legais — impessoal e formal.** É a norma em documentos legais e evita ambiguidade jurídica.

**Botões:** verbo no infinitivo, com maiúscula inicial (“Pedir orçamento”, “Ver serviços”).

---

## Regras de design

- **Separador entre secções:** a roseta ✦ (`ui/RosetaSeparator.jsx`) fica entre todas as secções, sobre a linha de fronteira. É colocada automaticamente em `App.jsx` (`ui/SectionDivider.jsx`), por isso uma secção nova recebe-a sem código extra.
- **Telemóvel e tablet (até `lg`):** etiqueta e título centrados, texto corrido justificado com hifenização. A partir de `lg`, tudo alinhado à esquerda.

---

## Mapa de secções

| #  | Secção                   | Âncora           | Componente atual           | Estado              |
| -- | ------------------------ | ---------------- | -------------------------- | ------------------- |
| —  | Navbar                   | —                | `layout/Navbar.jsx`        | Feito, por aprovar  |
| 1  | Hero                     | `#inicio`        | `sections/Hero.jsx`        | Feito, por aprovar  |
| 2  | Quem sou                 | `#quem-sou`      | `sections/QuemSou.jsx`     | Feito, por aprovar  |
| 3  | Serviços                 | `#servicos`      | `sections/Servicos.jsx`    | Por refazer         |
| 4  | Como funciona            | `#como-funciona` | — (novo)                   | Por fazer           |
| 5  | Porque escolher          | `#porque`        | `sections/Beneficios.jsx`  | Por refazer         |
| 6  | Madeiras                 | `#madeiras`      | — (novo)                   | Por fazer           |
| 7  | CTA final                | `#contacto`      | — (novo)                   | Por fazer           |
| 8  | Formulário de pedido     | `#pedido`        | `sections/Formulario.jsx`  | **Fase final**      |
| 9  | Footer                   | —                | `layout/Footer.jsx`        | Por refazer         |
| —  | WhatsApp flutuante       | —                | — (novo)                   | Por fazer           |
| —  | Páginas legais           | ver abaixo       | `src/legal/`               | Feitas, por preencher |

**Saem do site** (não constam da nova estrutura): `ProvasSocial.jsx`, `Objecoes.jsx`, `Garantia.jsx`, `Faq.jsx`. Só são apagados quando a nova versão estiver no ar.

---

## Contacto: regra geral

Todo o contacto passa por **dois canais apenas**:

1. **Formulário de pedido** (`#pedido`), que é o destino de todos os botões de ação.
2. **Botão flutuante de WhatsApp**, sempre visível.

Não há email, telefone nem outros formulários espalhados pelo site. Isto concentra os pedidos num só sítio e facilita medir de onde vêm.

---

## Navbar

**Menu**

- Quem sou → `#quem-sou`
- Serviços → `#servicos`
- Como funciona → `#como-funciona`
- Madeiras → `#madeiras`

**CTA:** Fazer pedido → `#pedido`

> **Design:** botão dourado, canto superior direito.
> **Implementação:** no telemóvel, menu hambúrguer com os mesmos itens e o CTA em destaque. Hoje os links simplesmente desaparecem.

---

## 1. Hero

**Título**

> Guitarras Artesanais
> com Excelência Sonora

**Subtítulo**

> Construção, reparação e setup de guitarras, violas e instrumentos de corda. Feitos com madeiras selecionadas, técnica apurada e respeito pela tradição artesanal portuguesa.

**CTA principal:** Pedir orçamento → `#pedido`
**CTA secundário:** Ver serviços → `#servicos`

> **Design:** imagem de destaque da viola campaniça (`public/hero_TG.png`). Fundo escuro, tipografia serifada dourada.

---

## 2. Quem sou

**Título**

> Das mãos de
> quem sabe

**Texto**

> Num instrumento, a diferença não está só na marca nem no preço. Está também em quem o fez e em quem o cuida — e isso pode transformar completamente o som e a experiência de quem toca.
>
> Sou o **Tiago Gago dos Santos** e aprendi lutheria com quem realmente sabe: mestres portugueses com décadas de experiência na construção e reparação de instrumentos de corda tradicionais.
>
> Hoje, no meu atelier em Cascais, construo, reparo e afino instrumentos de músicos que chegam de todo o país.

---

## 3. Serviços

**Título**

> O que faço por ti

**Introdução**

> Três formas de trabalharmos juntos — cada uma com a mesma dedicação:

### 🎸 Construção personalizada

> Criamos juntos o instrumento dos teus sonhos. Escolhes a madeira, o perfil do braço, a escala, os acessórios. Eu construo, com rigor e paciência, do zero ao acabamento final.

- Guitarras clássicas e acústicas
- Violas campaniças e tradicionais
- Instrumentos personalizados à medida
- Acompanhamento em todas as fases do processo

### 🔧 Reparação & Restauro

> O teu instrumento tem história? Eu ajudo-o a continuar a contá-la. Desde reparações simples até restauros complexos de instrumentos antigos e de família.

- Colagem de tampos, fundos e ilhargas
- Substituição e nivelamento de trastos
- Reparação de cravelhas, cavaletes e cabeças
- Restauro de verniz e acabamentos
- Instrumentos de herança ou coleção

### ⚙️ Setup & Regulação

> Um bom instrumento mal regulado não dá o seu melhor. O setup profissional transforma a tua experiência de tocar — torna tudo mais fácil, mais expressivo, mais teu.

- Regulação de ação e altura das cordas
- Intonação e afinação por trastos
- Ajuste do tensor do braço (truss rod)
- Lubrificação e ajuste de cravelhas e mecânicas
- Revisão geral pré-gravação ou pré-concerto

**CTA em cada serviço:** Pedir orçamento → `#pedido`

> **Implementação:** o botão de cada cartão abre o formulário com o tipo de serviço correspondente já selecionado (`#pedido?servico=construcao`, etc.).

---

## 4. Como funciona

**01 — Descreve**

> Conta o que tens e o que precisas — pelo formulário ou por WhatsApp. Quanto mais detalhe, melhor.

**02 — Orçamento claro**

> Analiso o teu pedido e devolvo-te um orçamento honesto. Sem surpresas, sem linguagem técnica que não percebas.

**03 — Só começa com o teu sim**

> Nenhum trabalho arranca sem o teu acordo. E sabes sempre em que fase está o teu instrumento.

---

## 5. Porque escolher Tiago Gago

**Título**

> Feito por quem sabe. Feito para durar.

**✦ Madeiras selecionadas**

> Só trabalho com madeiras de qualidade comprovada — algumas com anos de secagem, escolhidas a dedo para cada tipo de instrumento e som desejado.

**✦ Formação com mestres**

> Mais de dois anos de aprendizagem intensiva com luthiers experientes em Portugal. Cada técnica foi aprendida na prática, ao lado de quem sabe.

**✦ Um instrumento, uma atenção**

> Não trabalho em série. Quando aceito o teu projeto, ele passa a ser o meu projeto. Tens acesso direto a mim, do início ao fim.

**✦ Respeito pela tradição**

> A lutheria portuguesa tem raízes profundas. O meu trabalho honra essa herança — com técnicas tradicionais e materiais que resistem ao tempo.

**✦ Entrega com garantia**

> Cada instrumento sai do meu atelier verificado, testado e pronto a tocar. Se surgir algum problema de construção, resolvo-o sem custo adicional.

> **Coerência legal:** esta promessa está detalhada na secção 9 dos Termos e Condições (garantia legal de 3 anos, com as exclusões habituais).

---

## 6. Madeiras

**Eyebrow:** As matérias-primas

**Título**

> A madeira certa muda tudo.

**Subtítulo**

> Começa pelo som. Termina na alma.

**Introdução**

> Antes de existir qualquer instrumento, existe uma escolha. A escolha da madeira define o carácter sonoro, a resposta tátil, a durabilidade e a beleza de tudo o que será construído. No meu atelier, cada madeira é selecionada individualmente, peça a peça, com critérios acústicos e estéticos que não se negociam.

### Tampos (soundboards)

**Abeto Europeu** *(Picea abies)*

> A madeira clássica dos grandes mestres. O abeto produz um som de grande projeção, com trebles cristalinos, graves quentes e uma resposta dinâmica que cresce com o tempo. Um instrumento com tampo de abeto toca melhor aos 20 anos do que no primeiro dia, e pode manter o seu esplendor por mais de um século.

Carácter sonoro: projeção, brilho, sustain longo

**Cedro Vermelho do Canadá** *(Thuja plicata)*

> Mais macio e responsivo do que o abeto, o cedro responde imediatamente ao toque mais leve. O seu som é quente, rico em harmónicos e imediato, sem necessidade de “abertura”. Ideal para guitarristas de dedilhado e para quem quer profundidade sonora desde o primeiro acorde.

Carácter sonoro: calor, profundidade, resposta imediata

### Fundos e ilhargas

**Pau-Santo Indiano** *(Dalbergia latifolia)*

> O par perfeito para os tampos de abeto. O pau-santo devolve ao som toda a complexidade que o tampo gera: graves poderosos, médios definidos e agudos brilhantes. É a escolha canónica da lutheria clássica por uma razão simples: funciona.

Carácter sonoro: equilíbrio, brilho, reverberação rica

**Mogno Africano** *(Khaya ivorensis)*

> Quente, sustentado e com uma profundidade de médios que nenhuma outra madeira replica. O mogno é a escolha dos instrumentos que soam como se tivessem décadas de história. Visualmente elegante, com grão suave e tom avermelhado característico.

Carácter sonoro: calor, médios cantantes, carácter vintage

**Cipreste** *(Cupressus sempervirens)*

> A madeira da tradição ibérica. Leve, seca e percussiva, o cipreste é a escolha histórica para a viola campaniça, o flamenco e os instrumentos de corda regionais portugueses. Produz um ataque rápido, presença imediata e um timbre com identidade inconfundível.

Carácter sonoro: seco, percussivo, presença ibérica

### Braços

**Mogno Hondurenho** *(Swietenia macrophylla)*

> Estável, leve e de fácil conformação, o mogno hondurenho é a referência para braços de guitarra clássica e acústica de qualidade. A sua rigidez controlada traduz-se num sustain equilibrado e numa sensação ao toque que se torna familiar rapidamente.

**Cedro** *(Cedrus sp.)*

> Uma alternativa nobre ao mogno, com excelente estabilidade dimensional e resposta acústica própria. Muito usado na lutheria ibérica e latino-americana pela sua leveza e consistência.

### Escala e cavalete

**Ébano Africano** *(Diospyros crassiflora)*

> A madeira mais densa e precisa da lutheria. O ébano confere ao instrumento um ataque limpo, um sustain suave e uma durabilidade praticamente inabalável. Ao toque, a sensação é de precisão absoluta. Visualmente, é a linha negra que define o instrumento.

Carácter: firmeza, precisão, acabamento premium

**Pau-Ferro** *(Libidibia ferrea)*

> A alternativa sustentável ao ébano, com propriedades acústicas muito semelhantes. Som denso, firme e consistente, com um visual expressivo de tons castanhos intercalados. Cada vez mais valorizado pelos construtores conscientes da origem dos materiais.

Carácter: solidez, sustentabilidade, sonoridade densa

### Fecho da secção

> Todas as madeiras utilizadas no atelier provêm de fornecedores com certificação de origem e rastreabilidade. A escolha sustentável não é apenas uma posição ética, é uma garantia de qualidade que protege o trabalho e quem o encomenda.

**CTA**

> Queres saber que madeiras fazem sentido para o teu instrumento? Fala comigo.

**Botão:** Pedir aconselhamento → `#pedido?servico=construcao`

> **Porquê o formulário:** os campos de madeira da construção já aceitam “não sei, preciso de ajuda”. O pedido chega com o contexto todo (instrumento, estilo, orçamento) e a resposta pode ser concreta.
> **Implementação:** são 10 madeiras em 4 grupos. Para não criar uma secção interminável, mostrar por separadores (Tampos · Fundos e ilhargas · Braços · Escala e cavalete) ou em grelha de cartões.

---

## 7. CTA final

**Texto**

> Seja uma construção de raiz, uma reparação urgente ou um setup antes do próximo concerto — estou disponível para ouvir o que precisas e dar-te uma resposta honesta.

**CTA principal:** Fazer o meu pedido agora → `#pedido`
**CTA secundário:** Falar por WhatsApp → mesmo link do botão flutuante

> **Design:** fundo escuro com textura de madeira. Tipografia dourada. Máximo impacto visual.

---

## WhatsApp flutuante

Botão fixo no canto inferior direito, visível em todo o site principal.

- **Link:** `https://wa.me/351XXXXXXXXX?text=<mensagem codificada>`. O número fica numa única constante no código.
- **Mensagem pré-preenchida:** “Olá Tiago, vim através do site e gostaria de falar sobre o meu instrumento.”
- **Acessibilidade:** `aria-label="Falar por WhatsApp"`.
- **Medição:** clique registado como evento `whatsapp_click`, só com consentimento de cookies.
- **Design:** não pode tapar o banner de cookies nem o botão de envio do formulário no telemóvel.

---

## 8. Formulário de pedido — fase final

> Implementado **depois** da aprovação do cliente. A copy fica já fechada aqui.

**Título**

> O teu instrumento está por construir. Ou por recuperar. Começa aqui.

**Texto**

> Diz-me o que tens em mente e eu digo-te o melhor caminho. Preenche o formulário abaixo com os detalhes do teu projeto. Quanto mais informação deres, mais preciso será o orçamento.

### Campos comuns

| Campo               | Placeholder                    |
| ------------------- | ------------------------------ |
| Nome completo       | Ex: João Silva                 |
| Email               | Ex: joao@email.com             |
| Telefone / WhatsApp | Ex: +351 9XX XXX XXX           |
| Localidade          | Ex: Lisboa, Porto, Cascais...  |

**Tipo de serviço** (seleção única)

- 🎸 Construção de raiz
- 🔧 Reparação / Restauro
- ⚙️ Setup & Regulação

> **Implementação:** os campos seguintes aparecem conforme o tipo de serviço escolhido.

### Se Construção

| Campo                           | Placeholder                                                        |
| ------------------------------- | ------------------------------------------------------------------ |
| Tipo de instrumento             | Ex: Guitarra clássica, Viola campaniça, Guitarra acústica...       |
| Madeira preferida para o tampo  | Ex: Abeto, Cedro... (ou "não sei, preciso de ajuda")               |
| Madeira para fundo e ilhargas   | Ex: Pau-santo, Mogno... (ou "não sei")                             |
| Escala desejada (cm)            | Ex: 65 cm (padrão clássico)                                        |
| Estilo musical principal        | Ex: Clássico, Folk, Flamenco, Jazz...                              |
| Orçamento indicativo (€)        | Ex: 800 € – 1200 €                                                 |
| Observações / referências       | Descreve o som que procuras, instrumentos de referência, etc.      |

### Se Reparação

| Campo                                               | Placeholder / tipo                                                   |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| Tipo de instrumento                                 | Ex: Guitarra acústica, Viola beiroa...                               |
| Descreve o problema                                 | Ex: Tampo descolado, trasto levantado, cravelha partida...           |
| Instrumento tem valor sentimental ou histórico?     | Sim / Não                                                            |
| Fotos do instrumento                                | Upload — até 5 imagens                                               |
| Observações adicionais                              | Qualquer detalhe que consideres relevante                            |

### Se Setup

| Campo                                    | Placeholder                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| Tipo de instrumento                      | Ex: Guitarra elétrica, Viola, Guitarra clássica...                       |
| Problema principal                       | Ex: Ação muito alta, afinação instável, zumbidos nos trastos...          |
| Quando precisas do instrumento de volta? | Ex: Tenho concerto em 2 semanas                                          |
| Observações                              | Detalha o que sentes ao tocar — o que não está certo                     |

### Consentimento (obrigatório pelo RGPD)

> Li e aceito a [Política de Privacidade](/politica-de-privacidade/) e autorizo o tratamento dos meus dados para responder ao meu pedido.

**Botão:** Enviar pedido

**Mensagem de confirmação**

> Obrigado! Recebi o teu pedido e responderei em até 48 horas.

> **Implementação:** redirecionamento para página de obrigado (opcional, mas recomendado: permite medir conversões em campanhas).

---

## 9. Footer

**Coluna 1 — Identidade**

> TIAGO GAGO LUTHIER
> Construção · Reparação · Setup
> Cascais, Portugal

**Coluna 2 — Navegação rápida**

- Quem sou → `#quem-sou`
- Serviços → `#servicos`
- Como funciona → `#como-funciona`
- Fazer pedido → `#pedido`

**Coluna 3 — Redes sociais**

- Instagram: @tiagogagoluthier
- Facebook: /tiagogagoluthier
- YouTube: Tiago Gago Luthier

**Linha final**

> © 2026 Tiago Gago Luthier. Todos os direitos reservados.
> Desenvolvido por weblygrow

**Links legais:** [Política de Privacidade](/politica-de-privacidade/) · [Termos e Condições](/termos-e-condicoes/) · [Política de Cookies](/politica-de-cookies/) · [Livro de Reclamações](https://www.livroreclamacoes.pt)

> **Obrigatório:** o link para o Livro de Reclamações Eletrónico tem de estar visível no site de qualquer empresa que preste serviços a consumidores em Portugal (Decreto-Lei n.º 74/2017).

---

## Páginas legais

Já criadas como páginas próprias, com URL, título e meta description individuais:

| Página                   | URL                          | Conteúdo                              |
| ------------------------ | ---------------------------- | ------------------------------------- |
| Política de Privacidade  | `/politica-de-privacidade/`  | `src/legal/content/Privacidade.jsx`   |
| Termos e Condições       | `/termos-e-condicoes/`       | `src/legal/content/Termos.jsx`        |
| Política de Cookies      | `/politica-de-cookies/`      | `src/legal/content/Cookies.jsx`       |

- **Dados do Tiago:** preenchem-se num só ficheiro, `src/legal/legal-data.js`. Enquanto um campo estiver vazio, aparece destacado a dourado nas páginas, para não passar despercebido.
- **Banner de cookies:** passou a ter link “Saber mais” para a Política de Cookies e pode ser reaberto a partir dela (botão “Alterar preferências de cookies”).
- **Revisão:** os textos seguem o RGPD e a legislação portuguesa de consumo. São uma base sólida, mas devem ser validados por um jurista antes da publicação, sobretudo as secções de garantia, livre resolução e foro dos Termos.

---

## Decisões técnicas

### Alojamento — mudar antes de publicar

O plano gratuito da Vercel (Hobby) é **só para uso pessoal e não comercial**. Os termos dizem expressamente que um site que anuncia serviços, ou que foi pago para ser feito, conta como comercial. Este site está nos dois casos. Para continuar na Vercel seria preciso o plano Pro (20 $/mês).

**Recomendação:** passar para o **Cloudflare Pages**, gratuito e sem restrição de uso comercial. Liga-se ao mesmo repositório do GitHub e faz deploy automático a cada envio, tal como a Vercel. O projeto já está preparado: as páginas legais usam pastas com `index.html`, que funcionam em qualquer alojamento sem configuração.

### Formulário (fase final)

| Opção | Custo | Fotos | Avaliação |
| ----- | ----- | ----- | --------- |
| **Cloudflare Pages Functions + Resend + Turnstile** | Gratuito (Resend: 3000 emails/mês, 100/dia) | Sim, como anexo do email | **Recomendada** |
| Netlify Forms | Gratuito | Sim (máx. ~8 MB por envio) | Boa alternativa, mais simples, mas obriga a alojar na Netlify |
| Web3Forms (atual) | Gratuito até 250/mês | **Não** (só no Pro, 149 $/ano) | Não serve para o upload de fotos |
| Formspree | Gratuito até 50/mês | Não no plano gratuito | Limite muito baixo |

**Porquê a recomendada:**
- **Profissional:** os emails saem do domínio do Tiago (ex.: `pedidos@tiagogagoluthier.pt`), sem marca de terceiros.
- **Confirmação ao cliente:** quem faz o pedido recebe automaticamente a confirmação “Recebi o teu pedido…”.
- **Fotos:** chegam como anexos. São comprimidas no navegador antes do envio, para não pesar.
- **Anti-spam:** Cloudflare Turnstile, gratuito e sem os puzzles do reCAPTCHA.
- **Sem dependências frágeis:** fica tudo no mesmo alojamento e sem limites de envios relevantes para este volume.
- **Requisito:** é preciso ter o domínio `tiagogagoluthier.pt` registado, para validar o envio de emails no Resend.

---

## Pontos a decidir

### Antes de publicar

1. **Número de WhatsApp** do Tiago, para o botão flutuante e o CTA final.
2. **URLs reais das redes sociais** (Instagram, Facebook, YouTube) e do site da weblygrow.
3. **Dados para as páginas legais** (`src/legal/legal-data.js`): nome completo, NIF, morada, email, telefone, regime de IVA, percentagem do sinal, garantia de reparações e setups, foro e entidade de resolução alternativa de litígios. Para a entidade RAL, os candidatos prováveis são o CNIACC (âmbito nacional) e o Centro de Arbitragem de Conflitos de Consumo de Lisboa. A competência territorial para Cascais tem de ser confirmada no Portal do Consumidor.
4. **Domínio:** confirmar se `tiagogagoluthier.pt` já está registado. É usado no SEO, nas páginas legais e no envio de emails.
5. **Alojamento:** aprovar a mudança para o Cloudflare Pages (ver [Decisões técnicas](#decisões-técnicas)).
6. **Google Analytics e Meta Pixel:** os IDs no código são marcadores (`G-XXXXXXXXXX`) e os scripts nem chegam a ser carregados. Ativar os dois com as contas do Tiago, ou retirá-los do código e da Política de Cookies.

### Confirmar com o Tiago

7. **Setup de guitarras elétricas.** O formulário dá “Guitarra elétrica” como exemplo, mas os Serviços não falam em elétricas.
8. **“Fornecedores com certificação de origem e rastreabilidade”** (Madeiras): tem de corresponder à prática real, porque é uma promessa comercial.
9. **Nome da agência:** “weblygrow” ou “Weblygrow”?

---

## Registo de alterações

Alterações feitas à copy original entregue pelo cliente.

| Onde | Original | Agora | Motivo |
| ---- | -------- | ----- | ------ |
| Navbar, Footer, Secção 2 | Quem Somos | Quem sou | Voz na primeira pessoa do singular |
| Navbar | Pedido · Contacto | Madeiras | “Pedido” repetia o CTA “Fazer pedido”, e “Contacto” deixou de ter destino próprio |
| Navbar | Fazer Pedido | Fazer pedido | Uniformização dos botões |
| Hero | Ver instrumentos | Pedir orçamento → `#pedido` | Não existe galeria de instrumentos; o CTA principal leva ao pedido |
| Hero | solicitar orçamento | Ver serviços → `#servicos` | Evita dois botões iguais lado a lado |
| Secção 2, 1.º parágrafo | A diferença não está só na marca… quem os fez e em quem os cuida, isto pode… | Num instrumento, a diferença… quem o fez e em quem o cuida — e isso pode… | “os” não tinha a que se referir; vírgula a unir duas frases |
| Secção 2, 2.º parágrafo | O Tiago Gago aprendeu lutheria… | Sou o Tiago Gago dos Santos e aprendi lutheria… | Voz na primeira pessoa; apresenta o nome completo |
| Secção 2, 3.º parágrafo | Hoje, em Cascais, recebe instrumentos de músicos de todo o país. | Hoje, no meu atelier em Cascais, construo, reparo e afino instrumentos de músicos que chegam de todo o país. | Destaca o atelier e resume os três serviços |
| Secção 4, passo 02 | O Tiago analisa e devolve | Analiso o teu pedido e devolvo-te | Voz na primeira pessoa |
| Secção 6, introdução | No atelier Tiago Gago | No meu atelier | Voz na primeira pessoa |
| Secção 6, Cipreste · Formulário · Hero | campanica | campaniça | Grafia correta |
| Secção 6, Ébano | uma sustain suave | um sustain suave | Coerência com “sustain longo” e “um sustain equilibrado” |
| Secção 6, botão | Fazer uma pergunta | Pedir aconselhamento → formulário | Todo o contacto passa pelo formulário ou pelo WhatsApp |
| Secção 7, CTA secundário | Falar com o Tiago | Falar por WhatsApp | O botão diz o canal; voz na primeira pessoa |
| Formulário | — | Caixa de consentimento | Obrigatória pelo RGPD |
| Footer | Política de Cookies (RGPD) | + Livro de Reclamações | Obrigatório por lei (DL 74/2017) |
| Footer, navegação | Pedido · Contacto | Como funciona · Fazer pedido | Coerência com a navbar |

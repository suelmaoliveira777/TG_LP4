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
  - **Exceção — Hero:** texto à esquerda e guitarra à direita. O título ocupa o topo em toda a largura; o subtítulo e os botões ficam numa coluna de 60% ao lado do braço da guitarra. Imagem própria para telemóvel: `public/hero_TG-guitarra.jpg`.

---

## Mapa de secções

| #   | Secção               | Âncora           | Componente atual              | Estado                                         |
| --- | -------------------- | ---------------- | ----------------------------- | ---------------------------------------------- |
| —   | Navbar               | —                | `layout/Navbar.jsx`           | Feito, por aprovar                             |
| 1   | Hero                 | `#inicio`        | `sections/Hero.jsx`           | Feito, por aprovar                             |
| 2   | Quem sou             | `#quem-sou`      | `sections/QuemSou.jsx`        | Feito, por aprovar                             |
| 3   | Serviços             | `#servicos`      | `sections/Servicos.jsx`       | Feito, por aprovar                             |
| 4   | Como funciona        | `#como-funciona` | `sections/ComoFunciona.jsx`   | Feito, por aprovar                             |
| 5   | Trabalhos realizados | `#trabalhos`     | `sections/Trabalhos.jsx`      | Feito, por aprovar (fotos e textos de exemplo) |
| 6   | Madeiras             | `#madeiras`      | `sections/Madeiras.jsx`       | Feito, por aprovar                             |
| 7   | Preços               | `#precos`        | `sections/Precos.jsx`         | Feito, por aprovar (preços fictícios)          |
| 8   | CTA final            | `#contacto`      | `sections/CtaFinal.jsx`       | Feito, por aprovar                             |
| 9   | Formulário de pedido | `#pedido`        | `sections/FormularioPedido.jsx` | Feito, por aprovar (falta ligar o envio)     |
| 10  | Footer               | —                | `layout/Footer.jsx`           | Feito, por aprovar (confirmar redes sociais)   |
| —   | WhatsApp flutuante   | —                | `ui/WhatsAppButton.jsx`       | Feito, por aprovar (falta o número)            |
| —   | Páginas legais       | ver abaixo       | `src/legal/`                  | Feitas, por preencher                          |

**Secções antigas já apagadas** (não constam da nova estrutura): Prova social, Objeções, Garantia, FAQ, o formulário antigo (“Pedido”) e o bloco “Contacto” que fazia de footer. O formulário e o footer já foram refeitos a partir desta copy.

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
- Portfólio → `#trabalhos`
- Madeiras → `#madeiras`
- Preços → `#precos`

**CTA:** Fazer pedido → `#pedido`

> No telemóvel, o botão flutuante de WhatsApp esconde-se enquanto o menu está aberto.

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

> **Implementação:** o botão de cada cartão leva a `#pedido` e guarda o serviço em `sessionStorage` (`servico_pretendido` = `construcao` | `reparacao` | `setup`). Na fase do formulário, este lê o valor e pré-seleciona o tipo de serviço.
>
> **Design:** cada cartão tem um fundo escuro com um brilho dourado e seis linhas finas a lembrar cordas, com o conteúdo num painel de vidro (glassmorphism). No telemóvel, o título “O que faço por ti” fixa-se por baixo da navbar e os cartões empilham-se por baixo dele ao fazer scroll: cada um fixa-se e o seguinte desliza por cima. Se um cartão não couber no ecrã por baixo do título, encolhe ligeiramente (até 75%) para o número e o botão ficarem ambos visíveis. No fim, o título sai junto com o último cartão. A página mede o ecrã (com as barras do browser visíveis): se mesmo assim os cartões não couberem, não há pilha nem título fixo.
>
> **Imagens das madeiras** (`public/madeiras/`): amostras de referência da Xiloteca do Cirad, publicadas no Wikimedia Commons em **domínio público** (não exigem atribuição). Espécies: _Picea abies_, _Dalbergia latifolia_, _Diospyros crassiflora_. Já não são usadas nos Serviços; ficam guardadas para a secção Madeiras.

---

## 4. Como funciona

**Etiqueta:** Como funciona

**Título** (novo, por aprovar)

> Três passos, sem surpresas

**01. Descreve** · etiqueta: Formulário ou WhatsApp

> Conta o que tens e o que precisas, pelo formulário ou por WhatsApp. Quanto mais detalhe, melhor.

**02. Orçamento claro** · etiqueta: Orçamento gratuito

> Analiso o teu pedido e devolvo-te um orçamento honesto. Sem surpresas, sem linguagem técnica que não percebas.

**03. Só começa com o teu sim** · etiqueta: Acompanhas cada fase

> Nenhum trabalho arranca sem o teu acordo. E sabes sempre em que fase está o teu instrumento.

**CTA:** Pedir orçamento → `#pedido`

> **Design:** um fluxograma em que a linha é uma corda de guitarra. No desktop atravessa o ecrã de ponta a ponta e os três passos ficam lado a lado; no telemóvel a corda desce na vertical, ao lado dos passos. Com o scroll, um ponto de luz percorre a corda e deixa-a dourada; cada passo tem um marcador redondo, como os pontos que marcam os trastes na escala, que acende quando a luz chega, e nesse momento a corda vibra como se fosse dedilhada. No desktop, passar o rato num passo também faz vibrar a corda. Os passos ainda por chegar ficam esbatidos. Com “reduzir movimento” ativo no sistema, a corda aparece já desenhada e os passos acesos.
>
> **Etiquetas dos passos:** são novas. “Orçamento gratuito” repete o que já diz a descrição do site para o Google; confirmar com o cliente.

---

## 5. Trabalhos realizados (Portfólio)

> **Fotos e textos de exemplo.** Os sete trabalhos abaixo servem só para mostrar o design e **têm de ser substituídos pelos trabalhos reais do Tiago antes de o site ir para o ar**: as fotos são de outros instrumentos e os textos foram escritos para preencher. Para cada trabalho são precisos: uma foto (de preferência sobre fundo escuro), o tipo de trabalho, o nome do instrumento, uma frase curta, uma descrição de 2–3 frases e dois detalhes.

**Etiqueta:** Portfólio

**Título**

> Trabalhos realizados

**Trabalhos (exemplo)**

| #   | Tipo       | Instrumento                   | Frase curta                               |
| --- | ---------- | ----------------------------- | ----------------------------------------- |
| 01  | Restauro   | Guitarra portuguesa           | Tampo recolado e verniz recuperado        |
| 02  | Setup      | Guitarra acústica             | Trastos nivelados e ação regulada         |
| 03  | Construção | Guitarra romântica            | Construída de raiz, ao estilo do séc. XIX |
| 04  | Restauro   | Guitarra manouche             | Instrumento de família, de volta ao palco |
| 05  | Construção | Cavaquinho                    | Roseta embutida à mão                     |
| 06  | Reparação  | Guitarra portuguesa de Lisboa | Carrilhão revisto e afinado               |
| 07  | Setup      | Guitarra clássica             | Osso de cavalete talhado à medida         |

As descrições completas estão em `sections/Trabalhos.jsx`.

**Cartão final**

> O teu instrumento pode ser o próximo.

**CTA:** Pedir orçamento → `#pedido` (no cartão final e em cada trabalho ampliado; a partir de um trabalho, o formulário pré-seleciona o serviço correspondente)

> **Design:** no desktop a secção fixa-se no ecrã e o scroll vertical faz deslizar os trabalhos na horizontal, com contador e barra de progresso. Cada cartão revela-se em cortina ao entrar, a foto tem parallax, os cartões inclinam ligeiramente com a velocidade do scroll, e no hover há um brilho que segue o rato e um cursor “Ver”. As fotos têm um tom quente comum, que no hover volta à cor original. No telemóvel e tablet é um carrossel de deslizar com o dedo, com o cartão central maior. Ao tocar num trabalho abre a vista ampliada (foto grande, descrição, detalhes, setas, deslizar, Esc para fechar). Com “reduzir movimento” ativo no sistema, o desktop usa também o carrossel.
>
> **Fotos de exemplo** (`public/portfolio/`): Wikimedia Commons, licenças CC BY e CC BY-SA, que obrigam a creditar o autor. O crédito aparece na vista ampliada de cada trabalho e desaparece quando a foto é substituída (apagar `credit` no trabalho). Para trocar uma foto: `<slug>-sm.jpg` (lado maior ~900px) e `<slug>-lg.jpg` (lado maior ~1600px).

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

**Abeto Europeu** _(Picea abies)_

> A madeira clássica dos grandes mestres. O abeto produz um som de grande projeção, com trebles cristalinos, graves quentes e uma resposta dinâmica que cresce com o tempo. Um instrumento com tampo de abeto toca melhor aos 20 anos do que no primeiro dia, e pode manter o seu esplendor por mais de um século.

Carácter sonoro: projeção, brilho, sustain longo

**Cedro Vermelho do Canadá** _(Thuja plicata)_

> Mais macio e responsivo do que o abeto, o cedro responde imediatamente ao toque mais leve. O seu som é quente, rico em harmónicos e imediato, sem necessidade de “abertura”. Ideal para guitarristas de dedilhado e para quem quer profundidade sonora desde o primeiro acorde.

Carácter sonoro: calor, profundidade, resposta imediata

### Fundos e ilhargas

**Pau-Santo Indiano** _(Dalbergia latifolia)_

> O par perfeito para os tampos de abeto. O pau-santo devolve ao som toda a complexidade que o tampo gera: graves poderosos, médios definidos e agudos brilhantes. É a escolha canónica da lutheria clássica por uma razão simples: funciona.

Carácter sonoro: equilíbrio, brilho, reverberação rica

**Mogno Africano** _(Khaya ivorensis)_

> Quente, sustentado e com uma profundidade de médios que nenhuma outra madeira replica. O mogno é a escolha dos instrumentos que soam como se tivessem décadas de história. Visualmente elegante, com grão suave e tom avermelhado característico.

Carácter sonoro: calor, médios cantantes, carácter vintage

**Cipreste** _(Cupressus sempervirens)_

> A madeira da tradição ibérica. Leve, seca e percussiva, o cipreste é a escolha histórica para a viola campaniça, o flamenco e os instrumentos de corda regionais portugueses. Produz um ataque rápido, presença imediata e um timbre com identidade inconfundível.

Carácter sonoro: seco, percussivo, presença ibérica

### Braços

**Mogno Hondurenho** _(Swietenia macrophylla)_

> Estável, leve e de fácil conformação, o mogno hondurenho é a referência para braços de guitarra clássica e acústica de qualidade. A sua rigidez controlada traduz-se num sustain equilibrado e numa sensação ao toque que se torna familiar rapidamente.

**Cedro** _(Cedrus sp.)_

> Uma alternativa nobre ao mogno, com excelente estabilidade dimensional e resposta acústica própria. Muito usado na lutheria ibérica e latino-americana pela sua leveza e consistência.

### Escala e cavalete

**Ébano Africano** _(Diospyros crassiflora)_

> A madeira mais densa e precisa da lutheria. O ébano confere ao instrumento um ataque limpo, um sustain suave e uma durabilidade praticamente inabalável. Ao toque, a sensação é de precisão absoluta. Visualmente, é a linha negra que define o instrumento.

Carácter: firmeza, precisão, acabamento premium

**Pau-Ferro** _(Libidibia ferrea)_

> A alternativa sustentável ao ébano, com propriedades acústicas muito semelhantes. Som denso, firme e consistente, com um visual expressivo de tons castanhos intercalados. Cada vez mais valorizado pelos construtores conscientes da origem dos materiais.

Carácter: solidez, sustentabilidade, sonoridade densa

### Fecho da secção

> Todas as madeiras utilizadas no atelier provêm de fornecedores com certificação de origem e rastreabilidade. A escolha sustentável não é apenas uma posição ética, é uma garantia de qualidade que protege o trabalho e quem o encomenda.

**CTA**

> Queres saber que madeiras fazem sentido para o teu instrumento? Fala comigo.

**Botão:** Pedir aconselhamento → `#pedido`, com `servico_pretendido` = `construcao` (mesmo mecanismo dos cartões de Serviços)

> **Porquê o formulário:** os campos de madeira da construção já aceitam “não sei, preciso de ajuda”. O pedido chega com o contexto todo (instrumento, estilo, orçamento) e a resposta pode ser concreta.
> **Implementação:** são 9 madeiras em 4 grupos. Para não criar uma secção interminável, mostrar por separadores (Tampos · Fundos e ilhargas · Braços · Escala e cavalete) ou em grelha de cartões.
>
> **Design:** cabeçalho editorial (título e subtítulo à esquerda, introdução à direita no desktop) e separadores para os 4 grupos, com uma pílula dourada que desliza entre eles (também funcionam com as setas do teclado). Cada madeira é um cartão com a própria madeira como fundo: à vista no topo, a escurecer para o texto em baixo, com o carácter sonoro em etiquetas. No desktop, o cartão inclina-se em 3D atrás do rato e um reflexo percorre a madeira como luz sobre verniz; em ecrãs táteis e com “reduzir movimento” ativo, os cartões ficam parados. No fim, a nota sobre a origem das madeiras e o pedido de aconselhamento.
>
> **Fotos** (`public/madeiras/`): amostras da Xiloteca do Cirad (Wikimedia Commons, domínio público), exceto o pau-ferro. Duas são de espécies próximas e devem ser trocadas por fotos das madeiras reais do atelier:
>
> - **Cipreste:** não há amostra livre de *Cupressus sempervirens*; a foto é de *Tetraclinis articulata*, um cipreste mediterrânico da mesma família.
> - **Pau-ferro:** a foto é de *Machaerium scleroxylon* (Vojtěch Zavadil, CC BY-SA 4.0, com crédito no cartão). Na lutheria, “pau-ferro” costuma ser precisamente esta espécie; *Libidibia ferrea*, a que está na copy, é outra árvore com o mesmo nome popular no Brasil. Confirmar com o Tiago qual usa.

---

## 7. Preços

> **Secção nova, com preços fictícios.** Os valores abaixo só servem para o design e **têm de ser substituídos pelos preços reais do Tiago antes de o site ir para o ar** (`sections/Precos.jsx`, lista `CATEGORIES`).

**Etiqueta:** Preços

**Título**

> Valores claros, antes de começar.

**Introdução**

> Uma referência para os trabalhos mais pedidos. Cada instrumento é único: o valor final depende do estado e do tipo de instrumento, e fica sempre fechado no orçamento, antes de qualquer intervenção.

**Setup & Regulação** · Para o instrumento tocar como deve.

| Serviço                      | Pormenor                                                 | Preço (fictício) |
| ---------------------------- | -------------------------------------------------------- | ---------------- |
| Setup completo               | Ação, intonação, tensor do braço, limpeza e cordas novas | desde 65 €       |
| Regulação do tensor do braço | Correção da curvatura do braço                           | 25 €             |
| Pestana nova em osso         | Talhada à mão e ajustada à altura certa                  | 55 €             |
| Osso de cavalete novo        | Com compensação, para afinar em toda a escala            | 45 €             |
| Troca de cordas e limpeza    | Cordas não incluídas                                     | 20 €             |

**Reparação** · Para devolver ao instrumento o que perdeu.

| Serviço                            | Pormenor                                        | Preço (fictício) |
| ---------------------------------- | ----------------------------------------------- | ---------------- |
| Nivelamento e polimento de trastos | Inclui setup completo                           | desde 110 €      |
| Substituição total de trastos      | Trastos novos, nivelados e polidos              | desde 240 €      |
| Colagem de cavalete                | Remoção, limpeza e nova colagem                 | desde 90 €       |
| Reparação de fissuras              | Tampo, fundo ou ilhargas, com reforço interior  | desde 80 €       |
| Colagem de cabeça partida          | Com reforço e retoque de verniz                 | desde 150 €      |

**Restauro** · Para instrumentos com história.

| Serviço                    | Pormenor                                       | Preço (fictício) |
| -------------------------- | ---------------------------------------------- | ---------------- |
| Retoque de verniz          | Zonas gastas, riscos e pequenas falhas         | desde 120 €      |
| Envernizamento a goma-laca | Acabamento tradicional, aplicado à mão         | desde 480 €      |
| Restauro completo          | Instrumentos antigos, de herança ou de coleção | Sob orçamento    |

**Construção** (em destaque: “Feito à medida”) · Feito à medida, do zero ao acabamento.

| Serviço             | Pormenor                                     | Preço (fictício) |
| ------------------- | -------------------------------------------- | ---------------- |
| Guitarra clássica   | Madeiras à escolha, braço e escala à medida  | desde 2 400 €    |
| Guitarra portuguesa | De Coimbra ou de Lisboa                      | desde 2 900 €    |
| Viola campaniça     | Construção tradicional alentejana            | desde 1 700 €    |
| Cavaquinho          | Com roseta embutida à mão                    | desde 750 €      |

**Nota final**

> Valores indicativos, em euros. O orçamento é gratuito e nenhum trabalho começa sem o teu acordo.

**CTA:** Pedir orçamento → `#pedido`

> **Design:** como a carta de um restaurante de alta cozinha: quatro cartões, um por tipo de serviço, com cada serviço ligado ao preço por uma linha pontilhada. A Construção fica em destaque, com borda dourada e a etiqueta “Feito à medida”. Os preços contam até ao valor quando aparecem no ecrã; cada linha ilumina-se no hover e a borda do cartão acende onde está o rato. As tabelas são tabelas HTML reais, legíveis por leitores de ecrã.
>
> **Por confirmar:** se os preços incluem IVA (depende do regime de IVA do Tiago, ver Pontos a decidir) e “O orçamento é gratuito”.

---

## 8. CTA final

**Texto**

> Seja uma construção de raiz, uma reparação urgente ou um setup antes do próximo concerto: estou disponível para ouvir o que precisas e dar-te uma resposta honesta.

**CTA principal:** Fazer o meu pedido agora → `#pedido`
**CTA secundário:** Falar por WhatsApp → mesmo link do botão flutuante

> **Design:** fundo escuro com textura de madeira. Tipografia dourada. Máximo impacto visual.
>
> **Implementação:** o texto é o título da secção, em letra grande, e entra palavra a palavra; “uma resposta honesta.” fica a dourado. O fundo é pau-santo escurecido, com parallax ao fazer scroll e um foco de luz que segue o rato e revela o veio da madeira (no telemóvel o foco fica ao centro).

---

## WhatsApp flutuante

Botão fixo no canto inferior direito, visível em todo o site principal.

- **Link:** `https://wa.me/351XXXXXXXXX?text=<mensagem codificada>`. O número fica numa única constante no código.
- **Mensagem pré-preenchida:** “Olá Tiago, vim através do site e gostaria de falar sobre o meu instrumento.”
- **Acessibilidade:** `aria-label="Falar por WhatsApp"`.
- **Medição:** clique registado como evento `whatsapp_click`, só com consentimento de cookies.
- **Design:** não pode tapar o banner de cookies nem o botão de envio do formulário no telemóvel.

> **Implementação:** `ui/WhatsAppButton.jsx`, com o número e a mensagem em `src/config/contact.js` (o número ainda é um marcador, ver Pontos a decidir). Círculo no verde oficial do WhatsApp (#25D366) com o logótipo a branco e uma onda discreta de tempos a tempos; no desktop, ao passar o rato, aparece a etiqueta “Falar por WhatsApp”. Esconde-se enquanto o banner de cookies está aberto. Falta garantir que não tapa o botão de envio do formulário, quando este for feito.

---

## 9. Formulário de pedido — fase final

> **Feito** (`sections/FormularioPedido.jsx`, campos em `pedido/fields.js`). **Falta ligar o envio:** ver “Envio” no fim desta secção.

**Etiqueta:** Pedido

**Título**

> O teu instrumento está por construir. Ou por recuperar. Começa aqui.

**Texto**

> Diz-me o que tens em mente e eu digo-te o melhor caminho. Preenche o formulário abaixo com os detalhes do teu projeto. Quanto mais informação deres, mais preciso será o orçamento.

### Campos comuns

| Campo               | Placeholder                   |
| ------------------- | ----------------------------- |
| Nome completo       | Ex: João Silva                |
| Email               | Ex: joao@email.com            |
| Telefone / WhatsApp | Ex: +351 9XX XXX XXX          |
| Localidade          | Ex: Lisboa, Porto, Cascais... |

**Tipo de serviço** (seleção única)

- Construção de raiz · Um instrumento feito para ti, do zero.
- Reparação / Restauro · Devolver ao instrumento o que perdeu.
- Setup & Regulação · Para tocar como deve.

> Os emojis da copy original deram lugar aos ícones do site (guitarra, chave, reguladores), e cada opção ganhou uma frase curta.

> **Implementação:** os campos seguintes aparecem conforme o tipo de serviço escolhido.

### Se Construção

| Campo                          | Placeholder                                                   |
| ------------------------------ | ------------------------------------------------------------- |
| Tipo de instrumento            | Ex: Guitarra clássica, Viola campaniça, Guitarra acústica...  |
| Madeira preferida para o tampo | Ex: Abeto, Cedro... (ou "não sei, preciso de ajuda")          |
| Madeira para fundo e ilhargas  | Ex: Pau-santo, Mogno... (ou "não sei")                        |
| Escala desejada (cm)           | Ex: 65 cm (padrão clássico)                                   |
| Estilo musical principal       | Ex: Clássico, Folk, Flamenco, Jazz...                         |
| Orçamento indicativo (€)       | Ex: 800 € a 1200 €                                            |
| Observações / referências      | Descreve o som que procuras, instrumentos de referência, etc. |

### Se Reparação

| Campo                                           | Placeholder / tipo                                         |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Tipo de instrumento                             | Ex: Guitarra acústica, Viola beiroa...                     |
| Descreve o problema                             | Ex: Tampo descolado, trasto levantado, cravelha partida... |
| Instrumento tem valor sentimental ou histórico? | Sim / Não                                                  |
| Fotos do instrumento                            | Upload — até 5 imagens                                     |
| Observações adicionais                          | Qualquer detalhe que consideres relevante                  |

### Se Setup

| Campo                                    | Placeholder                                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| Tipo de instrumento                      | Ex: Guitarra elétrica, Viola, Guitarra clássica...              |
| Problema principal                       | Ex: Ação muito alta, afinação instável, zumbidos nos trastos... |
| Quando precisas do instrumento de volta? | Ex: Tenho concerto em 2 semanas                                 |
| Observações                              | Detalha o que sentes ao tocar: o que não está certo             |

### Consentimento (obrigatório pelo RGPD)

> Li e aceito a [Política de Privacidade](/politica-de-privacidade/) e autorizo o tratamento dos meus dados para responder ao meu pedido.

**Botão:** Enviar pedido

**Mensagem de confirmação**

> Obrigado! Recebi o teu pedido e responderei em até 48 horas.

> **Implementação:** redirecionamento para página de obrigado (opcional, mas recomendado: permite medir conversões em campanhas).
>
> **Como ficou:**
>
> - **Três passos:** Serviço → O instrumento → Contacto. Começa pelo mais fácil e deixa os dados pessoais para o fim, quando a pessoa já investiu no pedido. Cada passo é validado antes de avançar, com mensagens claras junto ao campo; o erro desaparece assim que o campo fica certo.
> - **Desktop:** à esquerda, o título, os passos (marcadores dourados que se acendem, como no “Como funciona”) e um resumo vivo do pedido (serviço e instrumento); à direita, o cartão do formulário. **Telemóvel:** barra de três segmentos no topo do cartão.
> - **Pré-seleção:** os botões de pedido dos Serviços, dos Trabalhos e das Madeiras já escolhem o serviço no formulário.
> - **Campos:** rótulo sempre visível (o placeholder é só o exemplo), indicação de obrigatório ou opcional. São obrigatórios o serviço, o tipo de instrumento, o problema (reparação e setup), o nome, o email e o consentimento. Nas madeiras da construção há respostas rápidas (“Abeto”, “Não sei, preciso de ajuda”…).
> - **Fotos (reparação):** arrastar e largar ou escolher, até 5, com pré-visualização. São comprimidas no navegador (lado maior 1600 px, JPEG) antes do envio: uma foto de telemóvel fica com 200 a 500 KB.
> - **Anti-spam:** um campo-isco invisível. Quando houver alojamento definitivo, juntar o Cloudflare Turnstile (ver Decisões técnicas).
> - **Confirmação:** a mensagem acima, no lugar do formulário, com o botão “Fazer outro pedido”; o envio é registado como `generate_lead`, só com consentimento de cookies. A página de obrigado fica para quando o envio estiver ligado.
> - **Botão de WhatsApp:** no telemóvel, esconde-se quando os botões do formulário estão no fundo do ecrã, para não tapar o “Enviar pedido”.
>
> **Envio:** o formulário envia para o endereço definido em `VITE_PEDIDO_ENDPOINT` (variável de ambiente do alojamento), como `multipart/form-data`, com os campos pelos nomes legíveis (“Tipo de instrumento”, “Email”…), as fotos (`fotos`) e a origem da visita (UTM). **Enquanto essa variável não existir, o envio não está ativo**: ao carregar em “Enviar pedido” aparece “O envio do formulário ainda não está ativo. Entretanto, fala comigo por WhatsApp.” Falta criar o serviço que recebe o pedido e envia o email (recomendado: Cloudflare Pages Functions + Resend, ver Decisões técnicas), o que depende do alojamento e do domínio.

---

## 10. Footer

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
>
> **Implementação** (`layout/Footer.jsx`): as três colunas acima (no telemóvel, empilhadas ao centro), a linha final com os links legais e, no fundo, a assinatura “Tiago Gago” em letra gigante dourada, a esbater, que sobe letra a letra quando aparece. Na linha final juntou-se “Preferências de cookies” (reabre o banner, como pede o RGPD) e “Voltar ao topo”. O ano do © atualiza-se sozinho. As redes sociais têm ícones e o nome de utilizador; os links estão em `src/config/contact.js` e **foram deduzidos dos nomes da copy: confirmar** (ver Pontos a decidir). “Desenvolvido por weblygrow” fica sem link até haver o site da weblygrow.

---

## Páginas legais

Já criadas como páginas próprias, com URL, título e meta description individuais:

| Página                  | URL                         | Conteúdo                            |
| ----------------------- | --------------------------- | ----------------------------------- |
| Política de Privacidade | `/politica-de-privacidade/` | `src/legal/content/Privacidade.jsx` |
| Termos e Condições      | `/termos-e-condicoes/`      | `src/legal/content/Termos.jsx`      |
| Política de Cookies     | `/politica-de-cookies/`     | `src/legal/content/Cookies.jsx`     |

- **Dados do Tiago:** preenchem-se num só ficheiro, `src/legal/legal-data.js`. Enquanto um campo estiver vazio, aparece destacado a dourado nas páginas, para não passar despercebido.
- **Banner de cookies:** passou a ter link “Saber mais” para a Política de Cookies e pode ser reaberto a partir dela (botão “Alterar preferências de cookies”).
- **Revisão:** os textos seguem o RGPD e a legislação portuguesa de consumo. São uma base sólida, mas devem ser validados por um jurista antes da publicação, sobretudo as secções de garantia, livre resolução e foro dos Termos.

---

## Decisões técnicas

### Alojamento — mudar antes de publicar

O plano gratuito da Vercel (Hobby) é **só para uso pessoal e não comercial**. Os termos dizem expressamente que um site que anuncia serviços, ou que foi pago para ser feito, conta como comercial. Este site está nos dois casos. Para continuar na Vercel seria preciso o plano Pro (20 $/mês).

**Recomendação:** passar para o **Cloudflare Pages**, gratuito e sem restrição de uso comercial. Liga-se ao mesmo repositório do GitHub e faz deploy automático a cada envio, tal como a Vercel. O projeto já está preparado: as páginas legais usam pastas com `index.html`, que funcionam em qualquer alojamento sem configuração.

### Formulário (fase final)

| Opção                                               | Custo                                       | Fotos                          | Avaliação                                                     |
| --------------------------------------------------- | ------------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| **Cloudflare Pages Functions + Resend + Turnstile** | Gratuito (Resend: 3000 emails/mês, 100/dia) | Sim, como anexo do email       | **Recomendada**                                               |
| Netlify Forms                                       | Gratuito                                    | Sim (máx. ~8 MB por envio)     | Boa alternativa, mais simples, mas obriga a alojar na Netlify |
| Web3Forms (o do formulário antigo)                  | Gratuito até 250/mês                        | **Não** (só no Pro, 149 $/ano) | Não serve para o upload de fotos                              |
| Formspree                                           | Gratuito até 50/mês                         | Não no plano gratuito          | Limite muito baixo                                            |

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

1. **Número de WhatsApp** do Tiago, para o botão flutuante e o CTA final (constante `WHATSAPP_NUMBER` em `src/config/contact.js`).
2. **URLs reais das redes sociais** (Instagram, Facebook, YouTube) e do site da weblygrow. As das redes estão em `SOCIAL_LINKS`, em `src/config/contact.js`, deduzidas dos nomes da copy.
3. **Dados para as páginas legais** (`src/legal/legal-data.js`): nome completo, NIF, morada, email, telefone, regime de IVA, percentagem do sinal, garantia de reparações e setups, foro e entidade de resolução alternativa de litígios. Para a entidade RAL, os candidatos prováveis são o CNIACC (âmbito nacional) e o Centro de Arbitragem de Conflitos de Consumo de Lisboa. A competência territorial para Cascais tem de ser confirmada no Portal do Consumidor.
4. **Domínio:** confirmar se `tiagogagoluthier.pt` já está registado. É usado no SEO, nas páginas legais e no envio de emails.
5. **Alojamento:** aprovar a mudança para o Cloudflare Pages (ver [Decisões técnicas](#decisões-técnicas)).
6. **Google Analytics e Meta Pixel:** os IDs no código são marcadores (`G-XXXXXXXXXX`) e os scripts nem chegam a ser carregados. Ativar os dois com as contas do Tiago, ou retirá-los do código e da Política de Cookies.
7. **Preços reais** (secção Preços): os atuais são fictícios. Indicar também se incluem IVA.

### Confirmar com o Tiago

8. **Setup de guitarras elétricas.** O formulário dá “Guitarra elétrica” como exemplo, mas os Serviços não falam em elétricas.
9. **“Fornecedores com certificação de origem e rastreabilidade”** (Madeiras): tem de corresponder à prática real, porque é uma promessa comercial.
10. **Nome da agência:** “weblygrow” ou “Weblygrow”?

---

## Registo de alterações

Alterações feitas à copy original entregue pelo cliente.

| Onde                                   | Original                                                                     | Agora                                                                                                        | Motivo                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Navbar, Footer, Secção 2               | Quem Somos                                                                   | Quem sou                                                                                                     | Voz na primeira pessoa do singular                                                |
| Navbar                                 | Pedido · Contacto                                                            | Madeiras                                                                                                     | “Pedido” repetia o CTA “Fazer pedido”, e “Contacto” deixou de ter destino próprio |
| Navbar                                 | Fazer Pedido                                                                 | Fazer pedido                                                                                                 | Uniformização dos botões                                                          |
| Hero                                   | Ver instrumentos                                                             | Pedir orçamento → `#pedido`                                                                                  | Não existe galeria de instrumentos; o CTA principal leva ao pedido                |
| Hero                                   | solicitar orçamento                                                          | Ver serviços → `#servicos`                                                                                   | Evita dois botões iguais lado a lado                                              |
| Secção 2, 1.º parágrafo                | A diferença não está só na marca… quem os fez e em quem os cuida, isto pode… | Num instrumento, a diferença… quem o fez e em quem o cuida — e isso pode…                                    | “os” não tinha a que se referir; vírgula a unir duas frases                       |
| Secção 2, 2.º parágrafo                | O Tiago Gago aprendeu lutheria…                                              | Sou o Tiago Gago dos Santos e aprendi lutheria…                                                              | Voz na primeira pessoa; apresenta o nome completo                                 |
| Secção 2, 3.º parágrafo                | Hoje, em Cascais, recebe instrumentos de músicos de todo o país.             | Hoje, no meu atelier em Cascais, construo, reparo e afino instrumentos de músicos que chegam de todo o país. | Destaca o atelier e resume os três serviços                                       |
| Secção 4, passo 02                     | O Tiago analisa e devolve                                                    | Analiso o teu pedido e devolvo-te                                                                            | Voz na primeira pessoa                                                            |
| Secção 4, passo 01                     | o que precisas — pelo formulário                                             | o que precisas, pelo formulário                                                                              | Sem travessões no site (pedido do cliente)                                        |
| Secção 4                               | —                                                                            | Título “Três passos, sem surpresas” e etiquetas dos passos                                                   | A secção não tinha título                                                         |
| Secção 5, título                       | Portfólio                                                                    | Trabalhos realizados                                                                                         | Pedido do cliente; “Portfólio” fica como etiqueta                                 |
| Secção 6, nomes das madeiras           | Abeto Europeu, Pau-Santo Indiano…                                            | Abeto europeu, Pau-santo indiano…                                                                            | Em português, só a primeira palavra leva maiúscula                                |
| Secção 6, introdução                   | No atelier Tiago Gago                                                        | No meu atelier                                                                                               | Voz na primeira pessoa                                                            |
| Secção 6, Cipreste · Formulário · Hero | campanica                                                                    | campaniça                                                                                                    | Grafia correta                                                                    |
| Secção 6, Ébano                        | uma sustain suave                                                            | um sustain suave                                                                                             | Coerência com “sustain longo” e “um sustain equilibrado”                          |
| Secção 6, botão                        | Fazer uma pergunta                                                           | Pedir aconselhamento → formulário                                                                            | Todo o contacto passa pelo formulário ou pelo WhatsApp                            |
| Secção 7                               | —                                                                            | Secção Preços (nova)                                                                                         | Pedido do cliente; preços fictícios até haver os reais                            |
| Secção 8, texto                        | antes do próximo concerto — estou disponível                                 | antes do próximo concerto: estou disponível                                                                  | Sem travessões no site (pedido do cliente)                                        |
| Secção 8, CTA secundário               | Falar com o Tiago                                                            | Falar por WhatsApp                                                                                           | O botão diz o canal; voz na primeira pessoa                                       |
| Formulário                             | —                                                                            | Caixa de consentimento                                                                                       | Obrigatória pelo RGPD                                                             |
| Formulário, tipo de serviço            | 🎸 🔧 ⚙️ antes de cada opção                                                    | Ícones do site e uma frase curta por opção                                                                   | Coerência com o design do site                                                    |
| Formulário, setup, observações         | Detalha o que sentes ao tocar — o que não está certo                         | Detalha o que sentes ao tocar: o que não está certo                                                          | Sem travessões no site (pedido do cliente)                                        |
| Formulário, orçamento indicativo       | Ex: 800 € – 1200 €                                                           | Ex: 800 € a 1200 €                                                                                           | Sem travessões no site (pedido do cliente)                                        |
| Footer                                 | Política de Cookies (RGPD)                                                   | + Livro de Reclamações                                                                                       | Obrigatório por lei (DL 74/2017)                                                  |
| Footer, navegação                      | Pedido · Contacto                                                            | Como funciona · Fazer pedido                                                                                 | Coerência com a navbar                                                            |

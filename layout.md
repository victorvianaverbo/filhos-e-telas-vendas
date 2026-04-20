# Layout — Desafio de 5 Dias: Meus Filhos Sem Tela

Especificação detalhada de cada seção da landing page. Este documento é a bíblia da construção — deve ser executado pixel a pixel.

---

## Linguagem Visual Global (base herdada do Hero aprovado)

### Paleta (CSS custom properties — já definidas em [style.css](style.css))

| Token            | Hex / Valor                | Uso                                        |
|------------------|----------------------------|---------------------------------------------|
| `--teal`         | `#1E3D3B`                  | Fundo dominante, títulos                    |
| `--teal-deep`    | `#122826`                  | Sombras, backgrounds escuros extras         |
| `--teal-mid`     | `#2A524F`                  | Cards escuros, gradiente                    |
| `--teal-light`   | `#356563`                  | Tipografia em fundo claro, kickers          |
| `--sage`         | `#9CB89A`                  | CTA, acentos, headline italic, selos        |
| `--sage-light`   | `#C5D8C3`                  | Marcações, tags em dark                     |
| `--sage-glow`    | `rgba(156,184,154,.15)`    | Halos, backgrounds de selos                 |
| `--cream`        | `#F5F1E8`                  | Superfícies calorosas pontuais              |
| `--cream-soft`   | `#FAF7F0`                  | Fundo body / seções claras                  |
| `--gray-dark`    | `#2C2C2C`                  | Body text default                           |
| `--gray-soft`    | `#6B7B6A`                  | Body text sobre cream                       |
| `--accent`       | `#D4A95E`                  | Dourado sóbrio para preços/urgência         |
| `--accent-glow`  | `rgba(212,169,94,.18)`     | Halo sobre o acento dourado                 |

### Tipografia
- **Display:** Fraunces (serif variável, opsz 9..144, ital + soft) — via Google Fonts, já carregada
- **Body:** Outfit (300, 400, 500, 600, 700) — via Google Fonts
- **Mono (novo, usado em preços/dados):** não carregar fonte extra — usar Fraunces em tabular (via `font-variant-numeric: tabular-nums`)

### Easing padrão
- **Normal:** `cubic-bezier(.2, .7, .2, 1)` (ease-out suave, caráter editorial)
- **Destaque:** `cubic-bezier(.16, 1, .3, 1)` (ease-out dramático, usado em reveals)
- **Retorno:** `cubic-bezier(.4, 0, .2, 1)` (linear-out-slow-in — hover reversal)

### Grid / Container
- Container máximo: `1280px` no Hero e seções institucionais; `1100px` em seções de conteúdo denso; `840px` em seções tipográficas.
- Gutter lateral: `clamp(1.25rem, 4vw, 3rem)`.
- Vertical padding padrão entre seções: `clamp(4rem, 10vw, 8rem)`.

### Animações globais
- **Reveal on scroll:** `opacity 0 → 1`, `translateY(28px) → 0`, duração `800ms`, easing `cubic-bezier(.16, 1, .3, 1)`, trigger quando o elemento entra a 20% da viewport (IntersectionObserver `rootMargin: "0px 0px -20% 0px"`).
- **Stagger:** 80–120ms entre filhos irmãos quando aplicável.
- **Prefers-reduced-motion:** desabilita todas as animações (já incluído no CSS base).

### Regras de consistência
- Cada seção deve declarar background e contraste de forma clara; alternância `teal → cream` reforça ritmo narrativo.
- Toda seção tem `anchor id` para navegação programática (ex: `#dor`, `#oferta`).
- CTAs usam SEMPRE: `background var(--sage)`, `color var(--teal)`, `border-radius 16px`, shimmer overlay no hover.

---

## Seção 1 (Dobra 1) — HERO — JÁ CONSTRUÍDA

### Arquétipo e Constraints
- **Arquétipo:** Editorial Split Assimétrico (1.4fr esquerda / 1fr direita no desktop)
- **Constraints:** Headline >100px (Tipografia), Color Blocking teal/cream (Cor), Glassmorphism no card (Efeitos), Magnetic CTA + shimmer (Interação)
- **Justificativa:** página de vendas precisa de impacto emocional imediato + oferta visível acima da dobra; split assimétrico resolve ambos sem parecer template SaaS.

### Conteúdo
Implementado conforme [copy.md](copy.md) Dobra 1. Incluir tag "DESAFIO DE 5 DIAS", headline "Meus filhos / *sem* tela.", lede, 4 bullets "Mesmo que...", card à direita com mockup + 3 selos + CTA + micro-copy.

### Observações de refinamento para o desenvolvimento completo
- Adicionar `aria-label` no eyebrow para leitores de tela.
- Confirmar que o CTA direciona para `#oferta` (Dobra 9) via scroll suave.

---

## Seção 2 (Dobra 2) — ESTATÍSTICAS DA CRISE — JÁ CONSTRUÍDA

### Arquétipo e Constraints
- **Arquétipo:** Offset Grid Triádico (3 colunas em desktop, card central deslocado 24px para baixo)
- **Constraints:** Números gigantes em serif thin (Tipografia), Clip-path diagonal na transição do Hero (Layout), Card invertido no centro (Color Blocking), Hover Lift nos cards (Interação)
- **Justificativa:** estatísticas pedem ritmo visual que não seja "3 cards iguais"; o offset vertical do card central quebra a simetria e destaca o dado mais impactante (94%).

### Observações de refinamento
- Adicionar animação `count-up` no número `40%` do primeiro card quando entrar na viewport (0 → 40 em 1.2s, easing `cubic-bezier(.16, 1, .3, 1)`).
- Mesma técnica para `94%` e `9→44%`, com stagger de 150ms entre eles.

---

## Seção 3 (Dobra 3) — CONEXÃO COM A DOR

### Arquétipo e Constraints
- **Arquétipo:** Broken Grid / Diálogo Tipográfico (falas espalhadas em grade assimétrica com deslocamentos manuais)
- **Constraints:** Aspas oversized decorativas (Tipografia), Rotação sutil em cards (Layout), Mouse parallax leve (Interação), Noise texture (Efeitos)
- **Justificativa:** quatro falas internas da mãe funcionam melhor como "pensamentos flutuantes" do que como lista; a irregularidade da grade cria a sensação emocional de pensamentos invasivos.

### Conteúdo
**Intro (pré-título):** `Eu sei...`
**Parágrafo de conexão:** `Você ama seu filho e faz tudo por ele. Mas toda vez que tenta tirar o celular, a situação explode — e você fica sem saber o que fazer, não é mesmo?`
**Ponte:** `Por isso, toda vez você pensa:`

**4 falas (cards):**
1. 😩 "Quando peço para desligar, ele chora, grita e vira outra pessoa. Parece que tirei uma droga dele."
2. 😔 "Já tentei combinados, timer, tudo. Nada funciona."
3. 😰 "Tenho medo de estar causando um dano que não tem mais volta."
4. 😤 "Meu filho só fica bem na frente da tela. Quando desliga, é briga na certa."

**Fechamento:** `Isso só acontece porque você não tem acesso a um protocolo médico estruturado e validado para saber exatamente o que fazer quando seu filho entra em crise com a tela!`

### Layout
- `background: var(--cream)` — tom mais quente que a Dobra 2, cria variação emocional
- Container: `max-width: 1100px; margin: 0 auto`
- Padding: `clamp(5rem, 10vw, 8rem) clamp(1.25rem, 4vw, 3rem)`
- Estrutura vertical:
  - **Bloco de intro** (topo, alinhado à esquerda com indent de 8%): `Eu sei...` → `parágrafo` → `ponte`.
  - **Área das 4 falas:** grid CSS com posicionamento irregular — desktop usa `grid-template-columns: repeat(12, 1fr); grid-auto-rows: auto;` com cada card ocupando `grid-column: span 5` ou `span 6` e offsets via `margin-top` individuais (-20px, 40px, 0, 60px em sequência) para criar cascata irregular.
  - **Bloco de fechamento** (base, centralizado, max-width 720px).

### Tipografia
- **"Eu sei..."** — Fraunces italic 300, `clamp(2rem, 4.5vw, 3.5rem)`, `line-height: 1`, `color: var(--teal-light)`, opacity `.55`, `letter-spacing: -.02em`. Atua como susurro.
- **Parágrafo de conexão** — Outfit 400, `clamp(1.15rem, 1.6vw, 1.45rem)`, `line-height: 1.5`, `color: var(--teal)`, `max-width: 680px`, `margin-top: 1.25rem`.
- **Ponte** — Outfit 500, `1rem`, letter-spacing `.02em`, `color: var(--gray-soft)`, `margin-top: 2rem`.
- **Texto das falas** — Fraunces 400 italic, `clamp(1rem, 1.45vw, 1.3rem)`, `line-height: 1.45`, `color: var(--teal)`.
- **Emoji** — font-size `2.2rem`, posicionado absolute no canto superior-esquerdo do card, com `transform: translate(-30%, -40%) rotate(-8deg)`.
- **Fechamento** — Fraunces 500, `clamp(1.3rem, 2.2vw, 1.8rem)`, `line-height: 1.35`, `color: var(--teal)`, com palavra "protocolo médico" em `var(--sage)` + underline animado ao entrar na viewport (ver Animações).

### Cores
- Fundo seção: `#F5F1E8` (cream)
- Cards de fala: `background: rgba(255,255,255,.7)`, `backdrop-filter: blur(8px)`, `border: 1px solid rgba(30,61,59,.08)`, `border-radius: 20px`
- Card hover: `background: #FFFFFF`, `border-color: rgba(156,184,154,.4)`, `box-shadow: 0 30px 60px -20px rgba(30,61,59,.18)`

### Elementos Visuais
- **Aspas decorativas:** cada card tem uma aspas gigante em Fraunces italic 400, `font-size: 8rem`, `color: var(--sage)`, `opacity: .18`, posicionada `top: -20px; left: -10px; line-height: 1`. Pointer-events none.
- **Noise overlay** no fundo da seção: `position: absolute; inset: 0; background-image: url("data:image/svg+xml,...feturbulence..."); opacity: .06; mix-blend-mode: multiply; pointer-events: none;`
- **Linha decorativa vertical** conectando o "Eu sei..." ao primeiro card: 1px de espessura, gradiente `var(--sage) 0% → transparent 100%`, altura 120px.

### Animações
- **Intro** — reveal on scroll padrão, sem stagger interno.
- **Cards** — reveal on scroll COM stagger de 120ms, mas cada card entra com leve rotação diferente:
  - Card 1: `rotate(-1.5deg)` final
  - Card 2: `rotate(1deg)` final
  - Card 3: `rotate(-.5deg)` final
  - Card 4: `rotate(1.8deg)` final
  - Transição: `transform 900ms cubic-bezier(.16, 1, .3, 1)`, `opacity 900ms`
- **Underline na palavra "protocolo médico"** do fechamento: `background: linear-gradient(var(--sage), var(--sage)) left bottom / 0% 3px no-repeat;`, animação `background-size: 100% 3px` em `800ms cubic-bezier(.16,1,.3,1)` quando a seção atinge 60% de visibilidade.

### Interatividade
- **Hover em card:**
  - `transform: translateY(-6px) rotate(0deg) scale(1.015)` — card se endireita ao hover
  - Transition `400ms cubic-bezier(.16, 1, .3, 1)`
  - Aspas decorativas animam: `opacity .18 → .35`, `transform: scale(1.15)`
- **Mouse parallax global** na seção: quando o usuário move o mouse, cards se deslocam com `translate3d()` proporcional à posição do cursor (max 8px). Usa `requestAnimationFrame` para suavidade. Desabilitado em touch devices via `@media (hover: none)`.

### Responsividade
- **<640px:** cards em coluna única, stack vertical, sem offsets, `gap: 1rem`. Aspas decorativas reduzem para `5rem`. Parallax desativado.
- **640–899px:** grid 2 colunas, `gap: 1.25rem`, offsets reduzidos pela metade.
- **≥900px:** grid 12 colunas com offsets completos (descrito acima).
- **≥1200px:** adicionar um `span 4` extra no card 3 para maior irregularidade.

---

## Seção 4 (Dobra 4) — APRESENTAÇÃO DA SOLUÇÃO

### Arquétipo e Constraints
- **Arquétipo:** Type Hero / Poster Tipográfico (título monumental ocupa toda a largura, demais elementos orbitam)
- **Constraints:** Headline fullbleed extremo (Tipografia), Gradiente mesh teal (Cor), Selos flutuantes com float-loop (Movimento), Clip-path reveal no título (Efeitos)
- **Justificativa:** este é o momento de virada (problema → solução). Precisa de peso visual máximo. Um poster tipográfico em teal é o oposto visual da Dobra 3 (cream + irregularidade) — reforçando a ideia de "ordem e clareza chegaram".

### Conteúdo
- **Linha superior (kicker):** `É por isso que você precisa do`
- **Título gigante:** `DESAFIO DE 5 DIAS: MEUS FILHOS SEM TELA`
- **Subheadline:** `Esse é o protocolo médico que vai te ajudar a reconquistar o controle das telas — ainda esta semana!`
- **4 selos flutuantes:**
  - ✅ Protocolo Verstehen de 5 Dias
  - ✅ Baseado em neurociência real
  - ✅ Criado por médico psiquiatra
  - ✅ Acesso imediato ao ebook + aula
- **Imagem:** mockup do ebook + print da aula lado a lado (placeholder estruturado com dois `<div>` estilizados até receber o asset real).

### Layout
- `background: var(--teal)`, seção ocupa `min-height: 100vh`.
- Container centralizado, max-width `1280px`, padding vertical `clamp(6rem, 12vw, 10rem)`.
- Estrutura vertical (flex column, gap 4rem):
  1. Kicker centralizado.
  2. Título gigante em 2 linhas forçadas: "DESAFIO DE 5 DIAS" / "MEUS FILHOS SEM TELA".
  3. Subheadline centralizada max-width 720px.
  4. Mockup duplo (ebook + aula) centralizado.
  5. Selos dispostos em linha (desktop) / grid 2x2 (mobile).

### Tipografia
- **Kicker:** Outfit 400, `.9rem`, uppercase, `letter-spacing: .3em`, `color: var(--sage-light)`, `opacity: .7`.
- **Título:** Fraunces 500, `clamp(2.5rem, 10vw, 8.5rem)`, `line-height: .92`, `letter-spacing: -.03em`, `color: var(--white)`. Primeira linha em peso 400, segunda linha em peso 600 italic com `color: var(--sage)` — cria hierarquia dentro do próprio título.
- **Subheadline:** Fraunces italic 300, `clamp(1.1rem, 1.6vw, 1.5rem)`, `line-height: 1.5`, `color: rgba(245,241,232,.8)`.
- **Selos:** Outfit 500, `.95rem`, `letter-spacing: 0`, `color: var(--sage-light)`.

### Cores
- Background: gradiente mesh (`var(--teal)` dominante + blobs radiais de `var(--teal-mid)`, `var(--teal-deep)` e `rgba(212,169,94,.05)`).
- Check icon nos selos: círculo `#9CB89A` com check branco dentro.
- Subheadline: `rgba(245,241,232,.8)`.

### Elementos Visuais
- **Mesh gradient animado:** 4 blobs radiais que deslocam posição em loop lento (30s). Implementação: pseudo-elementos absolutos com `filter: blur(80px)`, `transform` animado via keyframes.
- **Mockup ebook:** retângulo 3:4 estilizado como livro (mesma lógica do Hero, escala 1.8x).
- **Mockup aula:** retângulo 16:9 ao lado, com overlay de play button central + timeline barra inferior decorativa.
- **Linha vertical divisória** entre ebook e aula: `1px`, `height: 60%`, `background: linear-gradient(transparent, var(--sage) 50%, transparent)`.
- **Marca d'água textual gigante** atrás do título: `"VERSTEHEN"` em Fraunces 200 italic, `font-size: 18vw`, `color: rgba(156,184,154,.04)`, posicionada absolute `top: 20%`, `letter-spacing: .15em`, pointer-events none.

### Animações
- **Entrada do título (scroll trigger):**
  - Linha 1 faz reveal via `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` em 900ms, ease `cubic-bezier(.16, 1, .3, 1)`.
  - Linha 2 faz o mesmo, mas da direita pra esquerda (`inset(0 0 0 100%) → inset(0 0 0 0)`), delay 300ms.
- **Subheadline:** fade + translateY(16px) em 700ms, delay 700ms.
- **Mockup duplo:** entra com `scale(.92) opacity 0 → scale(1) opacity 1`, 800ms, delay 900ms. Ebook entra pela esquerda (`translateX(-20px)`), aula pela direita (`translateX(20px)`).
- **Selos:** stagger de 100ms cada, fade + translateY(12px), 600ms.
- **Float-loop nos selos:** após entrada, cada selo tem animação infinita `translateY(0 → -4px → 0)` em 3s ease-in-out, com offsets de delay individuais (0s, 0.7s, 1.4s, 2.1s) para não sincronizar.
- **Mesh gradient:** animação `moveBlob` 30s infinite alternate.

### Interatividade
- **Hover nos selos:** check icon escala `1 → 1.15`, `background: var(--sage-light)` no círculo, em 300ms. Texto do selo ganha `color: var(--white)`.
- **Parallax no mockup duplo:** scroll parallax de -30px em scroll-linked animation (`animation-timeline: view()`, `animation-range: entry 0% cover 50%`) para dar profundidade.

### Responsividade
- **<640px:** título quebra em 3 linhas automáticas, selos em 1 coluna, mockup empilhado (ebook em cima, aula embaixo). Mesh gradient com menos blur para performance.
- **640–899px:** mockup lado a lado, selos em 2x2.
- **≥900px:** layout completo descrito acima.
- **≥1400px:** título atinge `8.5rem`, aumenta gap interno.

---

## Seção 5 (Dobra 5) — COMO FUNCIONA (4 PASSOS)

### Arquétipo e Constraints
- **Arquétipo:** Storytelling Scroll Vertical com Timeline Conectora
- **Constraints:** Linha vertical animada via SVG stroke-draw (Movimento), Sticky heading enquanto passos rolam (Layout), Number gigante em serif (Tipografia), Progressive Reveal (Foco)
- **Justificativa:** 4 passos em cards lado a lado seriam genéricos. Apresentá-los como jornada scroll-driven reforça a ideia de "processo passo a passo" e ocupa o olho do leitor por mais tempo.

### Conteúdo
- **Título:** `Esses são os 4 passos para você usar o Desafio de 5 Dias: Meus Filhos Sem Tela`
- **Linha de urgência:** `⏱️ Tudo isso ainda esta semana!`
- **Passo 01:** 📥 `Acesse o ebook e a aula do Dr. Adriano imediatamente após a compra.`
- **Passo 02:** 📖 `Leia o Protocolo Verstehen em menos de 1 hora — linguagem simples, sem jargão médico.`
- **Passo 03:** ✅ `Aplique o passo a passo com seu filho ainda hoje — do Método do Semáforo ao Pacto de Autonomia.`
- **Passo 04:** 🎉 `Pronto! Em 5 dias, veja seu filho responder diferente quando você pedir para desligar a tela.`

### Layout
- `background: var(--cream-soft)`.
- Padding vertical `clamp(5rem, 10vw, 8rem)`.
- Container `max-width: 1200px`, display grid em desktop (`grid-template-columns: 380px 1fr`, `gap: 80px`).
- **Coluna esquerda (sticky):** título + urgência, `position: sticky; top: 120px;`, max-width 380px.
- **Coluna direita:** lista de passos com timeline vertical.

### Timeline
- Uma linha vertical à esquerda da coluna de passos: `width: 2px`, `background: var(--sage-light)`. Animada via SVG para draw progressivo com `stroke-dashoffset` controlado pelo scroll da seção (scroll-linked animation usando `animation-timeline: scroll()` ou IntersectionObserver fallback).
- Cada passo tem um círculo número na posição `left: -9px` relativo à linha — círculo de 40px, `background: var(--cream-soft)`, `border: 2px solid var(--sage)`, número dentro em Fraunces 600 cor `var(--teal)`.

### Tipografia
- **Título (coluna esquerda):** Fraunces 500, `clamp(1.8rem, 3.5vw, 2.8rem)`, `line-height: 1.1`, `color: var(--teal)`, `letter-spacing: -.02em`.
- **Urgência:** Outfit 500, `.95rem`, `color: var(--accent)` (dourado), com relógio emoji à esquerda.
- **"Passo 01" etc.:** Outfit 500, `.78rem`, uppercase, `letter-spacing: .25em`, `color: var(--sage)`.
- **Descrição do passo:** Fraunces 400, `clamp(1.2rem, 1.8vw, 1.5rem)`, `line-height: 1.4`, `color: var(--teal)`.
- **Emoji:** tamanho `1.6em`, alinhado ao lado do número do passo.

### Cores
- Fundo: `var(--cream-soft)`
- Timeline: `var(--sage-light)` default, `var(--sage)` na parte preenchida
- Círculos de passo: `background var(--cream-soft)`, `border var(--sage)`, `color var(--teal)`

### Elementos Visuais
- **Número gigante de fundo** atrás de cada passo: o dígito (1, 2, 3, 4) em Fraunces 200, `font-size: 18rem`, `color: rgba(156,184,154,.08)`, posicionado absolute à direita de cada passo. Pointer-events none.
- **Linha conectora SVG:** stroke animado com `stroke-dasharray` e `stroke-dashoffset` controlados por scroll.

### Animações
- **Desenho da linha:** `stroke-dashoffset` vai de `1 → 0` proporcional ao progresso do scroll pela seção. Cada vez que um círculo de passo entra na viewport (via IntersectionObserver), ele muda seu border para `var(--sage)` sólido e o número interno ganha `background: var(--sage); color: var(--white);` com transição 400ms ease.
- **Reveal dos passos:** stagger manual — cada passo entra quando seu círculo é atingido. Transição `opacity 0 → 1`, `translateX(30px) → 0`, 700ms.
- **Urgência (⏱️):** rotação sutil no emoji `rotate(-8deg ↔ 8deg)` em loop 4s ease-in-out para chamar atenção.

### Interatividade
- **Hover no passo:** card cresce `scale(1.015)`, `background: var(--white)`, `box-shadow: 0 20px 40px -15px rgba(30,61,59,.12)`, border-radius 16px. O círculo número aumenta `scale(1.1)` e ganha `box-shadow: 0 0 0 8px var(--sage-glow)`.
- **Click no passo:** sem ação (conteúdo informativo).

### Responsividade
- **<900px:** coluna esquerda deixa de ser sticky, vira bloco no topo. Passos em coluna única, timeline mantida à esquerda dos passos. Número de fundo reduz para `12rem`.
- **≥900px:** layout split sticky descrito acima.
- **≥1200px:** aumentar gap interno entre passos para 5rem.

---

## Seção 6 (Dobra 6) — STACK DE VALOR (O QUE VOCÊ RECEBE)

### Arquétipo e Constraints
- **Arquétipo:** Bento Box Assimétrico (6 itens principais + 2 bônus em grid irregular com tamanhos variados)
- **Constraints:** Cards com tamanhos heterogêneos (Layout), Label numerado editorial (Tipografia), Border-gradient animada no hover (Interação), Featured item destacado em teal (Color Blocking)
- **Justificativa:** 8 itens em lista vertical seria monótono; bento box assimétrico trata hierarquia visual — o Ebook principal ganha tamanho maior, os dois bônus ficam em destaque separado na parte inferior.

### Conteúdo
- **Título:** `Veja tudo que você vai receber dentro do Desafio de 5 Dias: Meus Filhos Sem Tela`
- **6 itens principais:**
  1. **Ebook Filhos e Telas** — `O manual completo do Dr. Adriano Alves com a neurociência do vício digital traduzida em linguagem simples. Você vai entender o que acontece no cérebro do seu filho — e exatamente o que fazer para mudar isso.`
  2. **Protocolo Verstehen de 5 Dias** — `O passo a passo clínico para realizar um detox digital e resetar a neuroquímica do seu filho. Cada dia tem uma ação específica — é só seguir.`
  3. **Método do Semáforo** — `A arquitetura de rotina que organiza o dia do seu filho em prioridades claras: o que é inegociável, o que é obrigação e quando a tela pode entrar — sem guerra.`
  4. **Pacto de Autonomia** — `Um modelo de pacto pronto para imprimir e assinar com seu filho. Ele aprende que tela é privilégio — e você para de ser a vilã da história.`
  5. **Ritual do Pôr do Sol Digital** — `Um guia prático para as 2 horas antes do sono — garantindo mais melatonina, melhor descanso e mais foco no dia seguinte.`
  6. **Técnicas de Mediação de Crise** — `Estratégias de Comunicação Não Violenta para o momento exato em que você tira a tela e ele explode. Sem gritos, sem culpa, sem briga.`
- **Destaque transição:** `AINDA NÃO ACABOU! Você também vai receber:`
- **Bônus:**
  - **Bônus 01 — Diferenciação por Gênero** — `Como o vício afeta meninos e meninas de formas diferentes — e o que fazer em cada caso.`
  - **Bônus 02 — Mentor IA Verstehen** — `Acesso ao assistente de inteligência artificial treinado com o método do Dr. Adriano. Disponível 24h via WhatsApp para tirar suas dúvidas táticas no dia a dia — quando você mais precisar.`

### Layout
- Background: `var(--cream-soft)` com camada teal diagonal nos primeiros 8%.
- Container `max-width: 1280px`.
- Padding `clamp(6rem, 12vw, 10rem) clamp(1.25rem, 4vw, 3rem)`.
- Título em topo centralizado max-width 840px, `margin-bottom: 4rem`.
- **Grid dos 6 itens (bento):** desktop `grid-template-columns: repeat(6, 1fr); grid-auto-rows: minmax(220px, auto);`
  - Item 1 (Ebook): `grid-column: span 4; grid-row: span 2` — card dominante em teal
  - Item 2 (Protocolo): `span 2; row span 1`
  - Item 3 (Semáforo): `span 2; row span 1`
  - Item 4 (Pacto): `span 3; row span 1`
  - Item 5 (Pôr do Sol): `span 3; row span 1`
  - Item 6 (Mediação de Crise): `span 6; row span 1` (full-width editorial)
- **Bloco de transição** "AINDA NÃO ACABOU": centralizado, `margin: 4rem auto`, com linha decorativa horizontal antes e depois.
- **Bônus:** grid `repeat(2, 1fr)` com cards distintos dos demais (ver Elementos Visuais).

### Tipografia
- **Título:** Fraunces 400 italic, `clamp(1.8rem, 4vw, 3rem)`, `line-height: 1.15`, `color: var(--teal)`, center-aligned.
- **Numeração editorial** em cada card: `01`, `02`, ... em Fraunces 300, `1.2rem`, `color: var(--sage)`, `letter-spacing: .2em`.
- **Nome do item:** Fraunces 500, `clamp(1.3rem, 1.8vw, 1.7rem)`, `line-height: 1.2`, `color: var(--teal)` (ou `var(--white)` no card teal).
- **Descrição:** Outfit 400, `.95rem`, `line-height: 1.6`, `color: var(--gray-soft)` (ou `rgba(245,241,232,.8)` no card teal).
- **"AINDA NÃO ACABOU!"** — Fraunces 600 italic, `clamp(1.4rem, 2.5vw, 2rem)`, `color: var(--accent)`, center.
- **Nome do bônus** ("Bônus 01 — ..."): Outfit 600, `.85rem`, uppercase, `letter-spacing: .2em`, `color: var(--accent)`.

### Cores
- Cards default: `background: var(--white)`, `border: 1px solid rgba(30,61,59,.06)`.
- Card dominante (Ebook): `background: var(--teal)`, texto em `var(--white)`/`var(--sage-light)`.
- Cards bônus: `background: linear-gradient(145deg, var(--cream), #EFE7D4)`, `border: 1px solid var(--accent-glow)`.
- Hover borders: gradiente animado sage → accent.

### Elementos Visuais
- Cada card tem um **glyph decorativo** no canto superior direito — pictograma minimalista em linha (1.5px stroke) temático:
  - Ebook: livro aberto
  - Protocolo: 5 pontos conectados (calendário de 5 dias)
  - Semáforo: 3 círculos empilhados
  - Pacto: folha com linha de assinatura
  - Pôr do Sol Digital: sol meio-poente
  - Mediação: balão de fala com onda
  - Bônus 01: símbolos ♂ ♀ estilizados
  - Bônus 02: chip/circuito estilizado
- Glyph stroke-color: `var(--sage)` (ou `var(--sage-light)` no card teal, `var(--accent)` nos bônus).
- **Linha decorativa** na transição "AINDA NÃO ACABOU!": SVG de ornamento tipográfico (flourish), cor `var(--accent)`, 120px de largura, desenhada com stroke-draw ao entrar na viewport.

### Animações
- **Reveal dos cards:** stagger 80ms conforme ordem do grid, fade + translateY(24px), 700ms ease.
- **Glyph draw:** `stroke-dasharray` animado quando o card entra em viewport, 900ms com delay +300ms após o reveal do card.
- **Flourish da transição:** stroke-draw 1.2s com delay 200ms após entrar na viewport.
- **AINDA NÃO ACABOU!:** entra com leve shake rotation `rotate(-2deg ↔ 2deg ↔ 0deg)` em 600ms após fade-in, para chamar atenção.

### Interatividade
- **Hover em card:**
  - `transform: translateY(-4px)`, `box-shadow: 0 30px 60px -20px rgba(30,61,59,.15)`, 400ms ease
  - Border ganha gradiente animado (implementação com pseudo-elemento + `mask-composite`): conic-gradient gira 360° em 2s loop
  - Glyph escala `1 → 1.1` e rotaciona `0 → 5deg`
- **Card dominante (Ebook)** hover: `transform: translateY(-6px) scale(1.01)`, glow ao redor `box-shadow: 0 40px 80px -20px rgba(30,61,59,.35), 0 0 0 1px var(--sage)`.

### Responsividade
- **<640px:** todos os cards `span 1` em coluna única, exceto item 1 e 6 que mantêm destaque via `padding` maior. Bônus em coluna única.
- **640–899px:** grid 2 colunas simples. Card dominante `span 2 row 2`, demais `span 1`. Mediação volta a `span 2`.
- **≥900px:** bento completo descrito acima.

---

## Seção 7 (Dobra 7) — PARA QUEM É

### Arquétipo e Constraints
- **Arquétipo:** Split Vertical com Retrato Editorial (esquerda com imagem/ilustração, direita com lista qualificadora)
- **Constraints:** Checkmarks com desenho custom animado (Movimento), Lista com separadores horizontais (Layout), Mask-image em imagem à esquerda (Efeitos), Cursor spotlight (Interação)
- **Justificativa:** a seção "para quem é" precisa de ressonância emocional. Split com retrato emocional (mãe com filho) à esquerda + lista à direita cria conexão humana sem ser o template "3 cards com ícones".

### Conteúdo
- **Título:** `O Desafio de 5 Dias: Meus Filhos Sem Tela é para você, mãe (ou pai) que...`
- **6 marcadores:**
  1. Sente que perdeu o filho para uma tela e não sabe mais como reconquistar a atenção dele.
  2. Já tentou combinados, timer e conversas — e nada funcionou por mais de dois dias.
  3. Fica sem chão quando pede para desligar e ele explode, chora ou te ignora completamente.
  4. Tem medo de estar causando um dano irreversível no desenvolvimento do seu filho.
  5. Quer impor limites de tela com autoridade — sem se sentir a vilã da história.
  6. Está sozinha nisso e precisa de um protocolo médico claro para agir ainda esta semana.

### Layout
- `background: var(--teal)`, seção em dark mode.
- Container `max-width: 1280px`, `padding: clamp(5rem, 10vw, 9rem) clamp(1.25rem, 4vw, 3rem)`.
- Grid desktop: `grid-template-columns: .85fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: center;`
- **Esquerda:** bloco de imagem/ilustração com proporção 4:5, max-width 440px.
- **Direita:** título + 6 itens.

### Tipografia
- **Título:** Fraunces 400, `clamp(1.8rem, 3.2vw, 2.6rem)`, `line-height: 1.2`, `color: var(--white)`. Palavra "mãe (ou pai)" em italic sage.
- **Itens da lista:** Outfit 400, `clamp(1rem, 1.3vw, 1.15rem)`, `line-height: 1.55`, `color: rgba(245,241,232,.85)`.
- **Check icon:** circulo 24px sage claro, com SVG checkmark 1.5px stroke. Separado do texto por 16px.
- **Separadores horizontais** entre itens: `1px`, `background: rgba(197,216,195,.12)`, `margin: 1.2rem 0`.

### Cores
- Fundo: `var(--teal)`
- Imagem: tratada com mask-image + duotone (ver Elementos Visuais)
- Check: `var(--sage)` → hover `var(--white)` (com leve glow)

### Elementos Visuais
- **Imagem à esquerda:** placeholder estilizado (até imagem real). Implementar como `<div>` com gradient complex layered: silhueta de mãe com filho usando linhas decorativas abstratas; combinação `radial-gradient` + `mask-image` com SVG mask orgânico (blob). Border-radius `50% 40% 60% 45%` (blob shape).
- Aplicar duotone via `filter: grayscale(1) sepia(1) hue-rotate(130deg) saturate(2)` para puxar tudo ao teal/sage quando houver imagem real.
- **Cursor spotlight** na área da lista: círculo radial de luz segue o cursor (`radial-gradient(circle 200px at Xpx Ypx, rgba(156,184,154,.12), transparent)`), sobreposto via pseudo-elemento com `pointer-events: none`.
- **Linha vertical decorativa** à direita dos checks, conectando todos os itens: SVG dashed line em sage-light com opacity .3, desenhada via stroke-dash.

### Animações
- **Reveal da imagem:** fade + clip-path reveal (`circle(0% at 50% 50%) → circle(100% at 50% 50%)`), 1.2s ease.
- **Reveal dos itens:** stagger 150ms, fade + translateX(-16px), 600ms.
- **Check draw:** quando cada item entra, o SVG checkmark desenha via `stroke-dashoffset` em 400ms com delay de 200ms após reveal do item.
- **Cursor spotlight:** atualização em `requestAnimationFrame`, sem trigger — vive enquanto seção está em viewport.

### Interatividade
- **Hover em item:** background do item vira `rgba(156,184,154,.06)`, border-left 2px sage aparece, texto shift de 6px para direita — tudo em 300ms ease.
- **Hover no check icon:** escala `1 → 1.15`, glow `0 0 0 8px rgba(156,184,154,.15)`, 300ms.
- **Cursor spotlight:** segue cursor em toda a seção, desaparece (fade out 400ms) quando o cursor sai da seção.

### Responsividade
- **<900px:** imagem vai para o topo, max-height 320px, lista abaixo. Cursor spotlight desativado.
- **≥900px:** split descrito acima.

---

## Seção 8 (Dobra 8) — RECAPITULANDO / EMPILHAMENTO DE PREÇOS

### Arquétipo e Constraints
- **Arquétipo:** Ledger / Planilha Editorial (lista com valores em coluna alinhada, riscado dramático no total)
- **Constraints:** Tabular numerals com alinhamento preciso (Tipografia), Linha divisória entre itens com dash pattern (Layout), Riscado dramático no total (Efeitos), Contagem de itens animada (Movimento)
- **Justificativa:** o stack de preços precisa de autoridade visual — um ledger editorial (inspirado em extratos bancários premium) dá peso institucional ao total, em contraste com o design flutuante das seções anteriores.

### Conteúdo
- **Título:** `RECAPITULANDO...`
- **Subtítulo:** `Veja tudo o que você vai receber no Desafio de 5 Dias: Meus Filhos Sem Tela`
- **8 itens com valores:**
  - 📘 Ebook Filhos e Telas — R$ 97,00
  - 📋 Protocolo Verstehen de 5 Dias — R$ 17,00
  - 🚦 Método do Semáforo — R$ 27,00
  - 📝 Pacto de Autonomia — R$ 27,00
  - 🌅 Ritual do Pôr do Sol Digital — R$ 27,00
  - 🧠 Técnicas de Mediação de Crise — R$ 27,00
  - 👦👧 Diferenciação por Gênero — R$ 17,00
  - 🤖 Mentor IA Verstehen — Suporte 24h via WhatsApp — R$ 197,00
- **Linha de total:** `Tudo isso deveria custar: ~~R$ 436,00~~`
- **Ponte:** `Mas hoje você tem acesso ao Desafio de 5 Dias: Meus Filhos Sem Tela junto com todos os bônus por apenas:`

### Layout
- `background: var(--cream-soft)`.
- Container `max-width: 840px` (mais estreito — peso editorial).
- Padding `clamp(5rem, 10vw, 8rem) clamp(1.25rem, 4vw, 3rem)`.
- Estrutura vertical centralizada:
  1. Título + subtítulo (centro).
  2. Tabela ledger: flex column, cada linha com `display: flex; justify-content: space-between; align-items: baseline; padding: 1.25rem 0; border-bottom: 1px dashed rgba(30,61,59,.15);`.
  3. Linha de total (especial, sem dashed, com linha dupla sólida).
  4. Ponte em Fraunces italic abaixo.

### Tipografia
- **"RECAPITULANDO..."** — Outfit 500, `.9rem`, uppercase, `letter-spacing: .35em`, `color: var(--sage)`.
- **Subtítulo:** Fraunces 400, `clamp(1.4rem, 2.5vw, 2rem)`, `line-height: 1.3`, `color: var(--teal)`.
- **Itens (esquerda):** Outfit 400, `clamp(1rem, 1.3vw, 1.1rem)`, `color: var(--teal)`. Emoji com `font-size: 1.25em` e margin-right 12px.
- **Valores (direita):** Fraunces 500, mesma altura, `tabular-nums`, `color: var(--teal)`.
- **Valor "Mentor IA"** recebe destaque: `color: var(--accent)` e label "SUPORTE 24h" em micro Outfit 600 `.7rem` uppercase abaixo do nome.
- **Total (esquerda):** Outfit 500, `1.1rem`, `color: var(--gray-soft)`.
- **Total (direita, riscado):** Fraunces 600, `clamp(2rem, 4vw, 3rem)`, com `text-decoration: line-through`, `text-decoration-color: var(--accent)`, `text-decoration-thickness: 3px`, `color: var(--teal)`.
- **Ponte:** Fraunces italic 400, `clamp(1.15rem, 1.6vw, 1.4rem)`, `line-height: 1.5`, `color: var(--teal-light)`, center.

### Cores
- Dashes das linhas: `rgba(30,61,59,.15)`
- Hover: background linha vira `rgba(156,184,154,.06)`
- Risco: `var(--accent)`

### Elementos Visuais
- **Linha dupla sólida** acima do total: `border-top: 2px solid var(--teal); border-bottom: 1px solid var(--teal);` com 4px de gap entre elas (usar pseudo-elemento).
- **Selo "VALOR REAL" carimbado** sobre o total: rotate(-8deg), Outfit 700, `.8rem`, uppercase, border 2px accent, padding 4px 10px, color accent. Posicionado absolute à direita do riscado.

### Animações
- **Itens entram em sequência:** stagger 80ms, fade + translateX(-20px para items, +20px para valores), simulando uma "lista sendo preenchida em tempo real".
- **Contagem dos valores:** quando cada linha entra, o valor anima de `R$ 0` até o valor real (em 600ms, função de easing `ease-out`), usando tabular-nums para não dar jitter.
- **Riscado do total:** line-through começa invisível (`text-decoration: none` → `line-through` aplicado via pseudo-elemento com width animado: linha horizontal que desenha de 0 → 100% em 800ms com delay de 400ms após o total entrar).
- **Selo "VALOR REAL":** entra com `scale(0) rotate(-45deg) → scale(1) rotate(-8deg)`, 500ms bounce (`cubic-bezier(.34, 1.56, .64, 1)`), delay 1200ms.

### Interatividade
- **Hover em linha:** background `rgba(156,184,154,.06)`, `padding-left: 12px`, 250ms ease.
- Sem outras interações.

### Responsividade
- **<640px:** itens quebram em 2 linhas (nome em cima, valor embaixo alinhado à direita), ou usar font menor `0.95rem`. Selo "VALOR REAL" reduz para `.7rem`.
- **≥640px:** layout inline descrito acima.

---

## Seção 9 (Dobra 9) — OFERTA PRINCIPAL + CTA

### Arquétipo e Constraints
- **Arquétipo:** Hero Dominante / Spotlight centralizado com card de oferta em destaque
- **Constraints:** Headline monumental com preço (Tipografia), Background com spotlight radial (Foco), Pulse no CTA (Movimento), Conic gradient border no card (Efeitos)
- **Justificativa:** é o momento da decisão. O olho precisa ser totalmente capturado pelo preço e CTA. Spotlight centralizado isola a oferta do ruído.

### Conteúdo
- **Imagem:** mockup do produto (ebook + aula em destaque).
- **Preço anterior:** `De ~~R$ 436,00~~ por:`
- **Preço principal:** `12x de R$ 6,89`
- **Preço à vista:** `ou R$ 67,00 à vista`
- **CTA:** `QUERO RECONQUISTAR MEU FILHO AGORA`
- **Selos:** `🔒 Compra Segura · ✅ Satisfação Garantida · 🔐 Privacidade Protegida`

### Layout
- `background: var(--teal)` com spotlight radial central.
- `min-height: 95vh`, flex center.
- Container `max-width: 720px`, center.
- Estrutura vertical:
  1. Mockup topo (max-width 320px).
  2. Preço anterior (pequeno).
  3. Preço principal (monumental).
  4. Preço à vista.
  5. CTA gigante.
  6. Selos em linha.

### Tipografia
- **Preço anterior:** Outfit 400, `1rem`, `color: rgba(245,241,232,.6)`. "R$ 436,00" riscado em `var(--accent)`.
- **Preço principal:** Fraunces 400, `clamp(3rem, 8vw, 6.5rem)`, `line-height: .9`, `letter-spacing: -.03em`, `color: var(--white)`. "12x de" em peso 300, "R$ 6,89" em peso 500 + `color: var(--sage)`.
- **Preço à vista:** Fraunces italic 300, `clamp(1.2rem, 2vw, 1.6rem)`, `color: var(--sage-light)`, opacidade .75.
- **CTA:** Outfit 700, `clamp(1rem, 1.4vw, 1.2rem)`, uppercase, `letter-spacing: .08em`.
- **Selos:** Outfit 400, `.85rem`, `color: rgba(197,216,195,.7)`, separadores ponto médio em sage.

### Cores
- Fundo: teal + spotlight
- Mockup: gradiente teal-mid → teal-deep com overlay sage
- CTA: `background: var(--sage)`, `color: var(--teal)`, hover `background: var(--sage-light)` + lift + shimmer

### Elementos Visuais
- **Spotlight central:** pseudo-elemento com `radial-gradient(ellipse 900px 600px at 50% 50%, rgba(156,184,154,.2), transparent 70%)`, pulsando lentamente (scale 1 ↔ 1.05 em 6s loop).
- **Mockup:** reaproveita componente da seção 4, mas centralizado e ampliado.
- **CTA border-conic:** conic-gradient girando atrás do CTA via pseudo-elemento `::before` com `mask-composite: xor`, criando border animada (rotação 4s infinite linear).
- **Partículas sutis** flutuantes ao redor do CTA: 8 pontos sage com 2px, animação `float` 8s com delays variados.

### Animações
- **Entrada:** fade + scale(.95 → 1) em 900ms para toda a seção quando entra na viewport.
- **CTA pulse:** `box-shadow: 0 0 0 0 rgba(156,184,154,.5) → 0 0 0 20px transparent` em 2s loop infinito.
- **Preço principal:** letras individuais (split via JS) com stagger 40ms, cada uma fade + translateY(12px).

### Interatividade
- **Hover CTA:**
  - `transform: translateY(-3px) scale(1.02)`
  - `box-shadow: 0 20px 50px -10px rgba(156,184,154,.6)`
  - Shimmer pass-through (0 → 100% translateX em 600ms)
  - 300ms ease
- **Click CTA:** scale(.98) no active, fallback de loading "PROCESSANDO..." (para quando integrar Hotmart).
- **Selos:** hover revela tooltip (Outfit .75rem) com explicação adicional.

### Responsividade
- **<640px:** preço principal reduz para `3rem`, CTA full-width, selos quebram em 2 linhas.
- **≥640px:** layout descrito acima.

---

## Seção 10 (Dobra 10) — DUAS OPÇÕES (CONTRASTE)

### Arquétipo e Constraints
- **Arquétipo:** Split Diagonal / Before-After Editorial
- **Constraints:** Divisor diagonal clip-path (Layout), Palette duality vermelho/sage (Cor), Lista com ícones contrastantes (Tipografia), Reveal sequencial em cada lado (Movimento)
- **Justificativa:** contraste entre "com/sem produto" pede divisão visual forte. Split diagonal (não vertical reto — para fugir do template) reforça a dualidade narrativa.

### Conteúdo
- **Título:** `Agora, você tem duas opções:`
- **Opção 1 — ❌ Sem o Desafio:**
  - Ignorar tudo o que você viu aqui.
  - Continuar no improviso — tentando de tudo sem resultado.
  - Assistir seu filho se afastar cada vez mais atrás de uma tela.
  - Continuar sentindo culpa, impotência e medo de que já seja tarde demais.
- **Opção 2 — ✅ Com o Desafio:**
  - Seguir o Protocolo Verstehen passo a passo — sem improvisação.
  - Aplicar o Método do Semáforo e o Pacto de Autonomia ainda esta semana.
  - Ver seu filho responder diferente quando você pedir para desligar a tela.
  - Voltar a se sentir no controle — e reconectar com o filho que você ama.

### Layout
- `background: var(--cream-soft)`.
- Container `max-width: 1280px`, padding `clamp(6rem, 12vw, 10rem) clamp(1.25rem, 4vw, 3rem)`.
- Título centralizado no topo, `margin-bottom: 4rem`.
- **Split diagonal:** grid `grid-template-columns: 1fr 1fr; gap: 0` com `clip-path` aplicado — lado esquerdo tem `clip-path: polygon(0 0, 95% 0, 85% 100%, 0 100%)`, lado direito `clip-path: polygon(15% 0, 100% 0, 100% 100%, 5% 100%)`, sobrepostos criando bevel diagonal.

### Tipografia
- **Título:** Fraunces 400, `clamp(1.6rem, 3vw, 2.4rem)`, center, `color: var(--teal)`.
- **Label "Opção 1"/"Opção 2":** Outfit 500, `.8rem`, uppercase, `letter-spacing: .3em`.
- **Headline de cada opção:** Fraunces 500, `clamp(1.2rem, 2vw, 1.6rem)`, `line-height: 1.25`.
- **Itens:** Outfit 400, `.95rem`, `line-height: 1.55`, com ícone inline (✕ ou ✓) em círculo 20px.

### Cores
- **Lado esquerdo (Sem):** `background: #2B1F1F` (marrom-grafite fosco, não cor vibrante — tom de "peso"), texto `#D4C7C7`, ícones ✕ em `#B85C5C`.
- **Lado direito (Com):** `background: var(--teal)`, texto `var(--sage-light)`, ícones ✓ em `var(--sage)`.

### Elementos Visuais
- **Ícones ✕ e ✓:** SVG custom 2px stroke, em círculos com border 1.5px.
- **Linha divisória diagonal:** 2px em `var(--accent)` marcando o limite diagonal entre os dois lados.
- **Ruído/grain** no lado "Sem" para dar sensação de peso/imobilidade.
- **Partículas positivas** no lado "Com" — pequenos pontos sage flutuando suavemente.

### Animações
- **Entrada:** lado esquerdo entra de `translateX(-30px)`, lado direito de `translateX(30px)`, ambos fade, 900ms ease. Stagger: esquerdo 0ms, direito 200ms (Com chega "depois" narrativamente).
- **Itens:** stagger 120ms dentro de cada coluna.
- **Ícones:** drawing SVG stroke em 500ms após reveal do item.

### Interatividade
- **Hover em item:** background do item `rgba(255,255,255,.04)`, item shift 4px lateral.
- **Hover no lado direito** amplifica o brilho (spotlight aumenta, partículas aceleram).

### Responsividade
- **<768px:** split vira stack vertical (sem diagonal), gap 2rem entre eles. Cada lado ocupa full-width.
- **≥768px:** diagonal split descrito acima.

---

## Seção 11 (Dobra 11) — AUTORIDADE (INSTITUTO VERSTEHEN)

### Arquétipo e Constraints
- **Arquétipo:** Editorial Quote / Photo Essay Framed
- **Constraints:** Blockquote tipográfico oversized (Tipografia), Imagem com moldura duotone (Efeitos), Linha vertical decorativa (Layout), Selos finais em linha com separador ornamental (Movimento)
- **Justificativa:** seção de autoridade não pode parecer "sobre nós" corporativo. Tratar como página de revista editorial (aspas grandes + texto de substância) projeta gravidade institucional.

### Conteúdo
- **Título:** `Quem está por trás desse protocolo?`
- **Subtítulo:** `Instituto Verstehen`
- **Descrição:** `O Instituto Verstehen nasceu com uma missão clara: traduzir a neurociência em ferramentas práticas para famílias reais. Com anos de atuação clínica em psiquiatria e saúde mental infantil, o Instituto Verstehen desenvolveu protocolos usados no atendimento de centenas de famílias que enfrentavam exatamente o que você está vivendo hoje.`
- **Parágrafo 2:** `O Desafio de 5 Dias: Meus Filhos Sem Tela não é um achismo. É o resultado de anos dentro do consultório — ouvindo mães, observando crianças e testando o que realmente funciona.`
- **Selos finais:**
  - 🔬 Baseado em neurociência clínica
  - 👨‍👩‍👧 Desenvolvido para famílias reais
  - ✅ Aplicado e validado em atendimento presencial

### Layout
- `background: var(--cream)`.
- Container `max-width: 1100px`.
- Padding `clamp(5rem, 10vw, 8rem) clamp(1.25rem, 4vw, 3rem)`.
- Grid desktop: `grid-template-columns: .9fr 1.1fr; gap: clamp(3rem, 5vw, 5rem);`.
- **Esquerda:** imagem/ilustração do instituto (placeholder: edifício estilizado + logo).
- **Direita:** texto editorial.
- Selos finais: row abaixo do grid, `display: flex; justify-content: center; gap: 2rem;` com separadores ornamentais (SVG dots) entre selos.

### Tipografia
- **Título (kicker):** Outfit 500, `.85rem`, uppercase, `letter-spacing: .25em`, `color: var(--teal-light)`.
- **"Instituto Verstehen"** — Fraunces 500, `clamp(2rem, 4.5vw, 3.5rem)`, `line-height: 1`, `letter-spacing: -.02em`, `color: var(--teal)`. Com SVG flourish decorativo abaixo (ornamental divider ~140px).
- **Descrição:** Fraunces 400, `clamp(1.1rem, 1.4vw, 1.25rem)`, `line-height: 1.65`, `color: var(--teal-mid)`.
- **Parágrafo 2:** Fraunces italic 400, mesma tipografia, opacity .85.
- **Selos finais:** Outfit 500, `.95rem`, `color: var(--teal)`, emoji à esquerda (tamanho 1.4em).

### Cores
- Fundo cream warm
- Imagem duotone teal/sage
- Selos: fundo cream, border 1px `rgba(30,61,59,.1)`, border-radius 999px, padding `.6rem 1.2rem`

### Elementos Visuais
- **Imagem:** placeholder estruturado — retângulo 4:5 com linhas arquitetônicas de edifício clínico em SVG + logo circular do Instituto flutuando no canto. Tratamento duotone teal/sage.
- **Moldura da imagem:** `box-shadow: 20px 20px 0 var(--sage)` (offset sombra sólida sage, estilo revista) + border 1px `var(--teal)`.
- **Ornamental divider:** SVG flourish editorial (linha + ponto + linha com curva) de 140px, cor `var(--sage)`, posicionado abaixo do "Instituto Verstehen".
- **Aspas decorativas gigantes** atrás dos parágrafos: " " em Fraunces 200 italic, `font-size: 15rem`, `color: rgba(156,184,154,.1)`, absolute.

### Animações
- **Imagem:** entrada com clip-path reveal horizontal, 1.2s ease.
- **Título:** letter-by-letter stagger 50ms.
- **Ornamental divider:** stroke-draw em 900ms.
- **Parágrafos:** fade + translateY(16px), 700ms, stagger 200ms.
- **Selos finais:** entram com pop scale (0 → 1) e stagger 150ms, bounce easing.

### Interatividade
- **Hover nos selos:** background vira `var(--sage-glow)`, border vira `var(--sage)`, transform `translateY(-3px)`, 300ms.

### Responsividade
- **<900px:** imagem no topo, texto abaixo. Moldura offset reduz para `8px 8px`.
- **≥900px:** grid descrito acima.

---

## Seção 12 (Dobra 12) — CTA FINAL (REPETIÇÃO DA DOBRA 9)

### Arquétipo e Constraints
- **Arquétipo:** Minimalist Restatement — MESMO layout da Dobra 9, mas com variação sutil para não parecer exato clone
- **Constraints:** Background com textura diferente (Efeitos), Headline adicional de urgência (Tipografia), Animação intensificada no CTA (Movimento), Preço com conta regressiva simbólica (Interação)
- **Justificativa:** regra do "variedade obrigatória" não se aplica aqui — é decisão de copy conhecida: repetir a oferta depois de autoridade é formulístico de vendas. Mas deve haver variação visual suficiente para não parecer copy-paste.

### Conteúdo
Idêntico à Dobra 9 (ver Seção 9 acima). Adicionar um pequeno kicker no topo:
- **Kicker extra:** `Última chance de começar ainda esta semana`

### Variações visuais em relação à Dobra 9
- **Background:** em vez de spotlight central, usar um gradiente vertical (`linear-gradient(180deg, var(--teal-deep) 0%, var(--teal) 50%, var(--teal-deep) 100%)`) com grain intensificado.
- **CTA:** pulse mais intenso (`scale 1 → 1.02 → 1` em 2s, `box-shadow` pulse com 25px de spread).
- **Mockup:** posicionado à esquerda do preço (horizontal em desktop) em vez de acima, reforçando variação.
- **Kicker de urgência** no topo em `var(--accent)` com leve shake animation ao entrar na viewport.

### Tudo mais idêntico à Seção 9.

---

## Seção 13 (Dobra 13) — FAQ

### Arquétipo e Constraints
- **Arquétipo:** Kinetic Accordion Editorial (accordion com animações sofisticadas e tipografia editorial, longe do template básico)
- **Constraints:** Headline inicial cada pergunta em serif grande (Tipografia), Indicador "+/−" animado com morph (Movimento), Background da pergunta ativa muda (Cor), Altura animada com easing não-linear (Efeitos)
- **Justificativa:** FAQ genérico com accordion básico é proibido pelo workflow. Transformar cada pergunta em um "capítulo editorial" com morph animado eleva.

### Conteúdo
- **Título:** `Ainda tem dúvidas? Veja as perguntas mais frequentes:`
- **7 perguntas:**
  1. Como vou receber o produto após a compra?
  2. Funciona no celular?
  3. Preciso ter conhecimento em psiquiatria ou neurociência para aplicar?
  4. E se eu comprar e não gostar?
  5. A compra é segura?
  6. Funciona mesmo que meu filho seja muito resistente?
  7. E se eu estiver sozinha nisso, sem apoio do parceiro?

(Respostas conforme [copy.md](copy.md) Dobra 13.)

### Layout
- `background: var(--cream-soft)`.
- Container `max-width: 900px`.
- Padding `clamp(5rem, 10vw, 8rem) clamp(1.25rem, 4vw, 3rem)`.
- Título centralizado, `margin-bottom: 4rem`.
- Lista de itens empilhados, gap 1rem.

### Item structure
- Cada item: `<details>` ou implementação manual com `button + panel`.
- Estado padrão: `padding: 1.75rem 2rem`, `background: transparent`, `border-bottom: 1px solid rgba(30,61,59,.12)` (sem border-radius, editorial flat).
- Estado aberto: `background: var(--white)`, `border-radius: 20px`, `border-bottom: 1px solid transparent`, `box-shadow: 0 20px 40px -20px rgba(30,61,59,.1)`, padding cresce para `2rem 2rem 2.5rem`.

### Tipografia
- **Título:** Fraunces 400 italic, `clamp(1.6rem, 3vw, 2.2rem)`, center, `color: var(--teal)`.
- **Pergunta:** Fraunces 500, `clamp(1.1rem, 1.5vw, 1.3rem)`, `line-height: 1.35`, `color: var(--teal)`.
- **Resposta:** Outfit 400, `1rem`, `line-height: 1.65`, `color: var(--gray-soft)`, max-width 720px.
- **Indicador +/−:** SVG custom 24px, stroke 2px sage.

### Cores
- Border default: `rgba(30,61,59,.12)`
- Hover: `background: rgba(156,184,154,.04)`
- Aberto: `background: var(--white)`, `shadow: 0 20px 40px -20px rgba(30,61,59,.1)`

### Animações
- **Abertura:** altura animada com `grid-template-rows: 0fr → 1fr` (técnica CSS moderna pra altura dinâmica sem JS de medição), 500ms `cubic-bezier(.2, .7, .2, 1)`.
- **Morph +/−:** SVG com duas linhas (horizontal e vertical). A vertical anima `scaleY(1 → 0)` em 300ms ease. Simples mas elegante.
- **Transition de background/shadow/border-radius:** 400ms ease em sincronia com o height.
- **Resposta fade-in:** opacity 0 → 1 com delay 150ms após abertura começar.

### Interatividade
- **Hover:** background leve sage, cursor pointer, indicador +/− escala 1.1.
- **Click:** toggle open/close. Apenas 1 FAQ aberto por vez (accordion único). Quando outro abre, o anterior fecha em 400ms.
- **Keyboard:** Tab para navegar, Enter/Space para abrir.

### Responsividade
- **<640px:** padding reduz para `1.5rem 1.25rem`, pergunta tipo `1rem`, resposta `.92rem`.

---

## Seção 14 (Dobra 14) — RODAPÉ

### Arquétipo e Constraints
- **Arquétipo:** Minimal Dark End (fundo teal escuro, tipografia mínima, encerramento discreto)
- **Constraints:** Centralized minimal (Densidade), Linha superior decorativa (Layout), Logo sutil (Tipografia), Hover underline animado nos links (Interação)
- **Justificativa:** rodapé não é lugar de floreio. Minimalismo em teal fecha a página com gravidade.

### Conteúdo
- `© 2025 Instituto Verstehen. Todos os direitos reservados.`
- `Este produto é distribuído pela plataforma Hotmart. Ao realizar a compra, você concorda com os termos de uso e política de privacidade da plataforma.`
- Links: "Termos de uso" | "Política de privacidade" | "Contato" (mesmo que placeholders).

### Layout
- `background: var(--teal-deep)`, cor texto `var(--sage-light)`.
- Padding `3rem clamp(1.25rem, 4vw, 3rem)`.
- Center-aligned, flex column com gap .75rem.
- Linha superior: 1px linear-gradient(90deg, transparent, var(--sage), transparent) 50% visibility.

### Tipografia
- **Logo text "Instituto Verstehen":** Fraunces 500 italic, `1.1rem`, `letter-spacing: .02em`, `color: var(--sage)`.
- **Copyright:** Outfit 400, `.85rem`, `color: rgba(197,216,195,.6)`.
- **Hotmart note:** Outfit 300, `.75rem`, `color: rgba(197,216,195,.45)`, max-width 640px.
- **Links:** Outfit 400, `.8rem`, `color: rgba(197,216,195,.65)`, com separador "·" em sage.

### Animações
- **Reveal:** fade ao entrar na viewport, 800ms.
- **Linha decorativa superior:** width animada 0 → 100% em 1.2s (draw horizontal).

### Interatividade
- **Hover links:** underline animado (`background-position` em `linear-gradient`) em 300ms, `color: var(--sage-light)`.

### Responsividade
- Mantém centralização em todos os breakpoints. Links quebram em múltiplas linhas em <480px.

---

## Resumo Geral — Variedade de Arquétipos por Seção

| # | Seção                    | Arquétipo                                | Constraint Principal         |
|---|--------------------------|------------------------------------------|------------------------------|
| 1 | Hero                     | Editorial Split Assimétrico              | Headline >100px              |
| 2 | Estatísticas             | Offset Grid Triádico                     | Card central invertido       |
| 3 | Dor                      | Broken Grid / Diálogo Tipográfico        | Mouse parallax               |
| 4 | Solução                  | Type Hero / Poster Tipográfico           | Clip-path reveal             |
| 5 | 4 Passos                 | Storytelling Scroll + Timeline           | SVG stroke-draw              |
| 6 | Stack de Valor           | Bento Box Assimétrico                    | Border-gradient conic        |
| 7 | Para Quem É              | Split Vertical + Retrato Editorial       | Cursor spotlight             |
| 8 | Empilhamento de Preços   | Ledger / Planilha Editorial              | Counter animation + riscado  |
| 9 | Oferta Principal         | Hero Dominante / Spotlight Central       | Pulse CTA + conic border     |
| 10| Contraste                | Split Diagonal / Before-After            | Clip-path diagonal           |
| 11| Autoridade               | Editorial Quote / Photo Essay            | Moldura offset sólido        |
| 12| CTA Final                | Minimalist Restatement (variação da 9)   | Kicker de urgência           |
| 13| FAQ                      | Kinetic Accordion Editorial              | Height grid morph            |
| 14| Rodapé                   | Minimal Dark End                         | Linha gradient               |

---

## Destaques — Elementos Mais Surpreendentes Planejados

1. **Dobra 3:** falas em grid quebrado com rotações individuais e mouse parallax leve — sensação de pensamentos invasivos.
2. **Dobra 4:** marca d'água "VERSTEHEN" gigante em 18vw atrás do título + mesh gradient animado em loop 30s.
3. **Dobra 5:** timeline SVG com stroke-draw sincronizado ao scroll, números gigantes em 18rem de fundo, círculos que mudam de estado conforme progresso.
4. **Dobra 6:** bento box com card dominante do Ebook em teal + border-gradient conic animada em 2s girando no hover.
5. **Dobra 7:** cursor spotlight radial seguindo o mouse sobre a lista — transforma a leitura em experiência.
6. **Dobra 8:** counter animation simulando ledger sendo preenchido em tempo real + selo "VALOR REAL" carimbado com bounce.
7. **Dobra 10:** split diagonal em clip-path com partículas sage apenas no lado "Com" — narrativa visual.
8. **Dobra 11:** moldura da imagem com box-shadow offset sólido em sage — estilo revista impressa premium.
9. **Dobra 13:** FAQ com altura animada via `grid-template-rows 0fr→1fr` + morph +/− simples e elegante.

---

## Próxima etapa

Quando a especificação estiver aprovada, use `/desenvolver` para construir a página completa. A partir do aprovado, o desenvolvimento implementará cada seção fiel ao valor exato descrito aqui.

# Sinfonia das Gemas / Gems Symphony 💎🎵

Um puzzle de combinação de joias (estilo *Match-3*) sonoro e totalmente focado em acessibilidade. Construído nativamente para ser 100% jogável por pessoas cegas ou com baixa visão, o jogo utiliza feedback em áudio contínuo, navegação otimizada e compatibilidade fluida com leitores de tela.

🔗 **[Jogar agora](https://concego.github.io/sinfonia-das-gemas/)**

---

## 🎮 Funcionalidades Principais

### Acessibilidade
- **Tabuleiro com notação de xadrez:** Cada célula é anunciada com coordenada (A1, B2...) pelo leitor de tela.
- **Estrutura de grade acessível:** O tabuleiro usa `<table>` com `role="grid"` para que TalkBack e NVDA anunciem linha e coluna automaticamente.
- **Leitura de tela dinâmica:** `aria-live` anuncia seleções, resultados de jogadas, pontuações, vidas e status do tabuleiro no tempo certo.
- **Persistência de foco:** Após cada jogada, o foco retorna à coordenada da última gema movida — o jogador nunca perde o contexto.
- **Gema Bônus identificada:** O `aria-label` inclui a palavra "bônus" na gema especial da fase, sem depender de ícones visuais.
- **Gema Brilhante anunciada:** Quando uma gema dourada está ativa, o leitor de tela anuncia "[nome] brilhante". O sufixo é removido automaticamente quando ela some.
- **Botão "Entrar no Tabuleiro":** Garante foco programático no tabuleiro para dispositivos com controle físico (ex.: Retroid Pocket).

### Mecânicas de Jogo
- **Movimento livre:** Trocar gemas adjacentes sem formar trinca é permitido — a troca acontece, mas custa 1 vida. A estratégia fica na mão do jogador.
- **Aviso de distância:** Tentar mover gemas não adjacentes emite dois tons descendentes como aviso, sem penalidade.
- **Combos em cascata:** Após uma trinca, novas combinações formadas pela gravidade geram combo com multiplicador de pontos.
- **Gema Bônus:** Uma gema aleatória vale o dobro de pontos a cada fase.
- **5 Níveis progressivos:** O tabuleiro vai de 4×4 até 8×8, com mais tipos de gemas a cada fase.

### Gemas Especiais

Cada dificuldade adiciona um conjunto de gemas com comportamento único:

| Gema | Dificuldade | Comportamento |
|---|---|---|
| ✨ **Dourada** | Todas | Aparece por chance (15%) a cada turno. Vale 2× pontos. Se não for eliminada na jogada seguinte, volta ao normal. |
| ⭐ **Coringa** | Médio e Difícil | Combina com qualquer grupo de gemas, mas a trinca inteira vale apenas 70% dos pontos. |
| ✖ **Amaldiçoada** | Difícil | Tocar desconta 1 vida e cancela a seleção imediatamente. |
| ? **Assombrada** | Difícil | Ao ser trocada, embaralha o tabuleiro inteiro e verifica novos matches automaticamente. |

### Sistema de Dificuldades

| Dificuldade | Recuperação de Vida | Gemas Especiais |
|---|---|---|
| Fácil | Combo (mais de uma trinca no mesmo turno) recupera 1 vida | Dourada |
| Médio | Combinação incluindo a Gema Bônus recupera 1 vida | Dourada + Coringa |
| Difícil | Sem recuperação de vidas | Dourada + Coringa + Amaldiçoada + Assombrada |

### Controles

**📱 Celular (TalkBack)**
- Deslize para navegar entre as gemas
- Toque duplo para selecionar e confirmar a troca

**💻 Computador (NVDA e outros leitores)**
- **Setas direcionais** — navegam célula a célula; o foco para na borda
- **Enter / Espaço** — seleciona e confirma a gema
- **S** — anuncia a pontuação atual
- **L** — anuncia as vidas restantes
- **Q** — sai da partida e volta ao menu

> **Usuários de NVDA:** Ative o **modo de foco** (Insert+Espaço) para que as setas e os atalhos funcionem no tabuleiro.

**🎮 Dispositivos com controle físico (ex.: Retroid Pocket)**
- Use o botão **"Entrar no Tabuleiro"** antes de iniciar a navegação — ele força o foco programático no tabuleiro, contornando a restrição de foco automático dos navegadores mobile.
- Após entrar, navegue normalmente com o direcional e confirme com o botão de ação.

### Áudio
- **Mapeamento sonoro sem arquivos externos:** Cada gema emite uma frequência musical única sintetizada em tempo real via *Web Audio API*.
- **Sons distintos por evento:** Acerto, erro, distância e combo têm sons diferentes.
- **Sons das gemas especiais:** Coringa (tons ascendentes), Amaldiçoada (grave distorcido), Assombrada (acorde dissonante), Dourada (ding agudo brilhante).

### Outros
- **Suporte bilíngue:** Português (Brasil) e English — textos, menus e anúncios de leitor de tela são trocados dinamicamente.
- **Arquivo único:** Sem dependências externas, sem build. Abre direto no navegador.
- **SVGs inline:** Todas as gemas (normais e especiais) usam formas geométricas puras sem dependência de fontes ou arquivos externos.

---

## 🛠️ Tecnologias

- **HTML5** — Estrutura semântica com ARIA para tecnologias assistivas
- **CSS3** — Design responsivo de alto contraste, foco customizado
- **JavaScript (Vanilla)** — Algoritmos de matriz, gravidade, combos em cascata e gerenciamento de estado
- **Web Audio API** — Sintetização de osciladores para feedback sonoro

---

## 📥 Como Rodar Localmente

```bash
git clone https://github.com/concego/sinfonia-das-gemas.git
cd sinfonia-das-gemas
# Abra o index.html em qualquer navegador moderno
```

---

## 📦 Histórico de Versões

| Versão | Destaque |
|---|---|
| v0.6.0 | Gemas Especiais (Dourada, Coringa, Amaldiçoada, Assombrada), sons próprios, volume dobrado |
| v0.5.2 | Gemas com SVG inline — projeto se torna arquivo único sem dependências |
| v0.5.1 | "Como Jogar" reestruturado em seções por dispositivo |
| v0.5.0 | Atalhos de teclado S/L/Q e nota de modo de foco NVDA |
| v0.4.0 | Movimento livre com custo de vida e som de distância |
| v0.3.0 | Tabuleiro acessível com estrutura de tabela |
| v0.2.0 | Sons e deploy estável |

---

**Desenvolvido por Anderson Carvalho | Eu Concego Jogar 🐉**

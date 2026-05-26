# Sinfonia das Gemas 💎🎵

Um puzzle de combinação de joias (estilo *Match-3*) sonoro e totalmente focado em acessibilidade. Desenvolvido para ser plenamente jogável por pessoas cegas ou com baixa visão, o jogo utiliza feedback em áudio contínuo, navegação otimizada por teclado, toques na tela e compatibilidade nativa com leitores de tela.

## 🌟 Funcionalidades

* **Compatibilidade Mobile:** Totalmente jogável no celular! O layout se adapta a telas menores e a interação funciona de forma nativa com leitores de tela móveis (como TalkBack e VoiceOver).
* **Navegação Espacial Acessível:** Movimentação fluida pelo tabuleiro utilizando as setas do teclado (no PC) ou exploração por toque (no celular), garantindo que o foco não se perca durante as jogadas e recarregamentos da tela.
* **Mapeamento Sonoro:** Cada tipo de joia emite uma frequência musical única via *Web Audio API*, permitindo o reconhecimento rápido das peças pela audição.
* **Leitura de Tela Dinâmica:** Utiliza a região `aria-live` para anunciar seleções, movimentos inválidos, combos, pontuação e status de vida de forma clara e não intrusiva.
* **Sistema de Combos e Vidas:** Reações em cadeia geram multiplicadores de pontos. Fazer mais de uma trinca no mesmo turno recupera vidas perdidas, recompensando o pensamento estratégico.
* **Progressão:** 4 níveis de dificuldade, expandindo o tabuleiro de 4x4 até 12x12, com sorteio de joias com pontuação bônus a cada partida.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica construída para facilitar a interceptação por tecnologias assistivas.
* **CSS3:** Design responsivo que se adapta a PCs e celulares, estilização de alto contraste e feedback visual, evitando *layout shifts* que poderiam confundir a navegação.
* **JavaScript (Vanilla):** Lógica principal, algoritmos de matrizes, controle da gravidade das gemas e sistema de pontuação.
* **Web Audio API:** Sintetização em tempo real de osciladores para os sons das joias, alertas de erro e melodias de match.

## 🎮 Como Jogar

**No Computador:**
1. Inicie o jogo selecionando a dificuldade no menu principal.
2. **Navegue pelo tabuleiro** usando as **Setas Direcionais** do teclado. A grade utiliza um sistema prático de coordenadas (A1, B2, etc.).
3. **Selecione uma joia** pressionando `Enter` ou `Espaço`.
4. **Vá até uma joia vizinha** (horizontal ou vertical) e pressione `Enter` ou `Espaço` novamente para realizar a troca.

**No Celular:**
1. Explore o tabuleiro deslizando o dedo pela tela ou varrendo os elementos para ouvir as coordenadas e as joias.
2. Dê um **duplo toque** para selecionar uma joia.
3. Foque na joia vizinha e dê outro **duplo toque** para confirmar a troca de posições.

**Regras Gerais:**
* Forme linhas ou colunas de 3 ou mais joias iguais para pontuar. Cuidado: movimentos que não formam combinações custam 1 vida!
* Atinja a meta de pontos do nível antes de perder suas 5 vidas.

## 🚀 Como Rodar o Projeto

Como a aplicação é construída puramente com tecnologias web nativas, não há necessidade de instalar dependências complexas.

1. Faça o clone do repositório:
   ```bash
   git clone [https://github.com/concego/sinfonia-das-gemas.git](https://github.com/concego/sinfonia-das-gemas.git)

# Sinfonia das Gemas / Gems Symphony 💎🎵

Um puzzle de combinação de joias (estilo *Match-3*) sonoro e totalmente focado em acessibilidade. Construído nativamente para ser 100% jogável por pessoas cegas ou com baixa visão, o jogo utiliza feedback em áudio contínuo, navegação otimizada e compatibilidade fluida com leitores de tela.

## 🌟 Novidades da Versão Atual

* **Suporte Bilíngue:** Jogue totalmente em Português (Brasil) ou English. Textos, alertas de leitores de tela, nomes das gemas e menus são alterados dinamicamente sem recarregar a página.
* **Sistema de Dificuldades:**
  * **Fácil:** Fazer mais de uma trinca no mesmo turno (Combos) recupera 1 vida.
  * **Médio:** Fazer combinações incluindo a Gema Bônus da fase recupera 1 vida.
  * **Difícil:** O desafio definitivo, sem recuperação de vidas durante a partida.

## 🎮 Funcionalidades Principais

* **Compatibilidade Mobile e PC:** O layout se adapta a qualquer tela e a interação funciona de forma nativa tanto no teclado numérico/setas quanto no toque (TalkBack, VoiceOver).
* **Mapeamento Sonoro sem Arquivos Externos:** Cada tipo de joia emite uma frequência musical única sintetizada em tempo real via *Web Audio API*, permitindo o reconhecimento rápido das peças pela audição, garantindo um código leve e de arquivo único.
* **Leitura de Tela Dinâmica:** O uso estratégico de `aria-live` anuncia seleções, movimentos inválidos, pontuações e status do tabuleiro de forma limpa e no tempo certo.
* **Progressão Estratégica:** 5 níveis de dificuldade progressiva, expandindo o tabuleiro de 4x4 até 8x8 e adicionando mais tipos de gemas.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica rigorosa para facilitar a interceptação por tecnologias assistivas.
* **CSS3:** Design responsivo de alto contraste e foco customizado que evita *layout shifts* prejudiciais à navegação.
* **JavaScript (Vanilla):** Algoritmos de matrizes, controle de gravidade das gemas, verificação de combos em cascata e gerenciamento de estado.
* **Web Audio API:** Sintetização de osciladores no navegador para alertas e melodias musicais correspondentes a cada gema.

## 🚀 Como Jogar

**No Computador:**
1. **Navegue pelo tabuleiro** usando as **Setas Direcionais** do teclado. O jogo utiliza o sistema de notação de xadrez (A1, B2, etc.).
2. **Selecione uma joia** pressionando `Enter` ou `Espaço`.
3. **Mova o foco até uma joia vizinha** (horizontal ou vertical) e pressione `Enter` ou `Espaço` novamente para realizar a troca.

**No Celular:**
1. Deslize o dedo pela tela ou faça o gesto de varredura para explorar e ouvir as joias e suas coordenadas.
2. Dê um **duplo toque** para selecionar a primeira gema.
3. Foque na joia adjacente e dê outro **duplo toque** para confirmar a troca.

**Regras Gerais:**
* Combine 3 ou mais joias iguais em linha ou coluna para ganhar pontos.
* Movimentos que não resultam em combinação descontam 1 vida!
* Fique de olho na Gema Bônus de cada fase: ela vale o dobro de pontos.
* Cumpra a meta de pontuação antes de perder suas 5 vidas.

## 📥 Como Rodar o Projeto

Como a aplicação é construída puramente com tecnologias web nativas em um arquivo único, não é necessário instalar dependências ou rodar servidores complexos.

1. Faça o clone do repositório:
   ```bash
   git clone https://github.com/concego/sinfonia-das-gemas.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador moderno.

---
**Desenvolvido por Anderson Carvalho | Eu Concego Jogar 🐉**

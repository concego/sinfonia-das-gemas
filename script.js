let idiomaAtual = 'pt-BR';
        const TEXTOS = {
            'pt-BR': {
                titulo: "Sinfonia das Gemas", creditos: "Desenvolvido por", feedback: "Feedback para:",
                subtitulo: "Um puzzle de combinação de joias sonoro e acessível.",
                lblNivel: "Escolha o nível para jogar:", lblDificuldade: "Dificuldade:",
                optFacil: "Fácil (Mais vidas)", optMedio: "Médio (Vidas na gema bônus)", optDificil: "Difícil (Sem bônus de vida)",
                btnIniciar: "Iniciar Partida", btnAjuda: "Como Jogar", btnIdioma: "Trocar Idioma / Change Language",
                vitoriaTitulo: "Nível Concluído!", vitoriaResumo: "Você atingiu a meta de pontuação.",
                btnProximo: "Avançar para Próxima Fase", btnMenu: "Voltar ao Menu Principal",
                gameoverTitulo: "Fim de Jogo!", gameoverResumo: "Suas vidas acabaram neste nível.",
                btnTentarNovamente: "Tentar Novamente", ajudaTitulo: "Como Jogar Sinfonia das Gemas",
                ajudaP1: "Combine joias iguais na horizontal ou vertical para marcar pontos!",
                ajudaItems: [
                    "<strong>O Tabuleiro:</strong> Notação de xadrez (A1, B2...). Cada gema tem um som único.",
                    "<strong>Navegação:</strong> Use as <strong>setas do teclado</strong>.",
                    "<strong>Como Mover:</strong> Selecione uma joia e toque em uma vizinha para trocar.",
                    "<strong>Sistema de Vidas:</strong> Você tem 5 vidas. Movimentos inválidos custam 1 vida.",
                    "<strong>Dificuldades:</strong> Fácil (Combos dão vida), Médio (Gema Bônus dá vida), Difícil (Sem bônus).",
                    "<strong>Desafios:</strong> Uma gema aleatória vale o DOBRO a cada nível!"
                ],
                btnFechar: "Fechar Instruções", statusNivel: "Nível", statusTabuleiro: "Tabuleiro",
                statusBonus: "Bônus: Nenhum", statusBonusAtivo: "💎 Desafio: {gema} vale o DOBRO!",
                statusPontos: "Pontos", statusVidas: "Vidas", btnAbandonar: "Sair do Jogo",
                msgCombo: " Combo! Recuperou 1 vida.", msgGemaBonus: " Gema Bônus! Recuperou 1 vida.",
                msgFinal: "Finalizado! {trincas} trincas. Mais {pontos} pontos. Total: {total} de {meta}.",
                gemas: ["Rubi", "Safira", "Esmeralda", "Ônix", "Topázio", "Diamante"]
            },
            'en-US': {
                titulo: "Gems Symphony", creditos: "Developed by", feedback: "Feedback to:",
                subtitulo: "A sonic and accessible gem-matching puzzle.",
                lblNivel: "Choose level:", lblDificuldade: "Difficulty:",
                optFacil: "Easy (More lives)", optMedio: "Medium (Lives on bonus gem)", optDificil: "Hard (No bonus)",
                btnIniciar: "Start Match", btnAjuda: "How to Play", btnIdioma: "Change Language / Trocar Idioma",
                vitoriaTitulo: "Level Completed!", vitoriaResumo: "You reached the target score.",
                btnProximo: "Go to Next Level", btnMenu: "Back to Main Menu",
                gameoverTitulo: "Game Over!", gameoverResumo: "Your lives are over.",
                btnTentarNovamente: "Try Again", ajudaTitulo: "How to Play Gems Symphony",
                ajudaP1: "Match identical gems to score points!",
                ajudaItems: [
                    "<strong>The Board:</strong> Chess notation (A1, B2...). Each gem has a unique sound.",
                    "<strong>Navigation:</strong> Use the <strong>arrow keys</strong>.",
                    "<strong>How to Move:</strong> Select a gem and touch a neighbor to swap.",
                    "<strong>Life System:</strong> You have 5 lives. Invalid moves cost 1 life.",
                    "<strong>Difficulty:</strong> Easy (Combos give lives), Medium (Bonus Gem gives lives), Hard (No bonus).",
                    "<strong>Challenges:</strong> One random gem is worth DOUBLE each level!"
                ],
                btnFechar: "Close Instructions", statusNivel: "Level", statusTabuleiro: "Board",
                statusBonus: "Bonus: None", statusBonusAtivo: "💎 Challenge: {gema} worth DOUBLE!",
                statusPontos: "Score", statusVidas: "Lives", btnAbandonar: "Quit Game",
                msgCombo: " Combo! Recovered 1 life.", msgGemaBonus: " Bonus Gem! Recovered 1 life.",
                msgFinal: "Finished! {trincas} matches. {pontos} more points. Total: {total} of {meta}.",
                gemas: ["Ruby", "Sapphire", "Emerald", "Onyx", "Topaz", "Diamond"]
            }
        };

        const CONFIG_NIVEIS = [
            { nivel: 1, tamanho: 4, meta: 300, tipos: 4 },
            { nivel: 2, tamanho: 6, meta: 400, tipos: 4 },
            { nivel: 3, tamanho: 7, meta: 600, tipos: 5 },
            { nivel: 4, tamanho: 7, meta: 800, tipos: 5 },
            { nivel: 5, tamanho: 8, meta: 1000, tipos: 6 }
        ];

        const GEMAS = [
            { id: 0, nome: "Rubi", cor: "#ff4d4d", nota: 261.63, img: "assets/ruby.png" },
            { id: 1, nome: "Safira", cor: "#4d79ff", nota: 293.66, img: "assets/sapphire.png" },
            { id: 2, nome: "Esmeralda", cor: "#4dff88", nota: 329.63, img: "assets/emerald.png" },
            { id: 3, nome: "Ônix", cor: "#a6a6a6", nota: 349.23, img: "assets/onyx.png" },
            { id: 4, nome: "Topázio", cor: "#ffcc00", nota: 392.00, img: "assets/topaz.png" },
            { id: 5, nome: "Diamante", cor: "#ffffff", nota: 440.00, img: "assets/diamond.png" }
        ];

        let nivelIdx = 0;
        let dificuldade = "facil";
        let pontuacao = 0;
        let vidas = 5;
        let joiaBonusId = -1;
        let matrizGemas = [];
        let gemaSelecionada = null;
        let jogoAtivo = false;
        let bloqueado = false;
        let totalTrincasNoTurno = 0;
        let totalPontosNoTurno = 0;
        let multiplicadorCombo = 1;
        let atingiuBonusNoTurno = false;
        let audioCtx = null;

        window.onload = () => {
            atualizarTextos();
            const btnPt = document.getElementById('btn-pt-br');
            if (btnPt) btnPt.focus();
        };

        function selecionarIdioma(lang) {
            idiomaAtual = lang;
            document.getElementById('tela-idioma').style.display = 'none';
            document.getElementById('tela-inicial').style.display = 'flex';
            atualizarTextos();
            anunciarTexto(lang === 'pt-BR' ? "Idioma definido para Português" : "Language set to English");
            document.getElementById('btn-comecar').focus();
        }

        function voltarAoMenu() {
            jogoAtivo = false;
            document.getElementById('container-jogo').style.display = 'none';
            document.getElementById('tela-vitoria').style.display = 'none';
            document.getElementById('tela-gameover').style.display = 'none';
            document.getElementById('tela-idioma').style.display = 'none';
            document.getElementById('tela-inicial').style.display = 'flex';
            document.getElementById('btn-comecar').focus();
        }

        function atualizarTextos() {
            const t = TEXTOS[idiomaAtual];
            document.getElementById('titulo-main').innerText = t.titulo;
            document.getElementById('subtitulo-main').innerText = t.subtitulo;
            
            // Créditos traduzidos
            document.getElementById('txt-desenvolvido').innerText = t.creditos;
            document.getElementById('txt-feedback').innerText = t.feedback;

            document.getElementById('lbl-dificuldade').innerText = t.lblDificuldade;
            document.getElementById('lbl-selecao').innerText = t.lblNivel;
            document.getElementById('btn-comecar').innerText = t.btnIniciar;
            document.getElementById('btn-idioma-menu').innerText = t.btnIdioma;
            document.getElementById('bt-abrir-ajuda').innerText = t.btnAjuda;
            document.getElementById('btn-abandonar').innerText = t.btnAbandonar;

            const selDif = document.getElementById('select-dificuldade');
            selDif.options[0].text = t.optFacil;
            selDif.options[1].text = t.optMedio;
            selDif.options[2].text = t.optDificil;

            document.getElementById('vitoria-titulo').innerText = t.vitoriaTitulo;
            document.getElementById('vitoria-resumo').innerText = t.vitoriaResumo;
            document.getElementById('btn-proximo-nivel').innerText = t.btnProximo;
            document.getElementById('btn-vitoria-menu').innerText = t.btnMenu;

            document.getElementById('gameover-titulo').innerText = t.gameoverTitulo;
            document.getElementById('gameover-resumo').innerText = t.gameoverResumo;
            document.getElementById('btn-tentar-novamente').innerText = t.btnTentarNovamente;
            document.getElementById('btn-gameover-menu').innerText = t.btnMenu;

            document.getElementById('titulo-ajuda').innerText = t.ajudaTitulo;
            document.getElementById('ajuda-p1').innerText = t.ajudaP1;
            document.getElementById('bt-fechar-ajuda').innerText = t.btnFechar;
            
            const lista = document.getElementById('lista-ajuda');
            lista.innerHTML = "";
            t.ajudaItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = item;
                lista.appendChild(li);
            });

            const selNivel = document.getElementById('select-nivel');
            selNivel.innerHTML = "";
            CONFIG_NIVEIS.forEach((c, i) => {
                const opt = document.createElement('option');
                opt.value = i;
                opt.text = `${t.statusNivel} ${c.nivel} (${c.tamanho}x${c.tamanho})`;
                selNivel.appendChild(opt);
            });
        }

        function iniciarPartida() {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            nivelIdx = parseInt(document.getElementById('select-nivel').value);
            dificuldade = document.getElementById('select-dificuldade').value;
            pontuacao = 0;
            vidas = 5;
            jogoAtivo = true;
            document.getElementById('tela-inicial').style.display = 'none';
            document.getElementById('container-jogo').style.display = 'flex';
            document.getElementById('tela-vitoria').style.display = 'none';
            document.getElementById('tela-gameover').style.display = 'none';
            sortearGemaBonus();
            gerarTabuleiro();
            atualizarInterface();
        }

        function sortearGemaBonus() {
            const config = CONFIG_NIVEIS[nivelIdx];
            joiaBonusId = Math.floor(Math.random() * config.tipos);
        }

        function gerarTabuleiro() {
            const config = CONFIG_NIVEIS[nivelIdx];
            matrizGemas = [];
            const tabuleiro = document.getElementById('tabuleiro');
            tabuleiro.style.gridTemplateColumns = `repeat(${config.tamanho}, 1fr)`;
            tabuleiro.innerHTML = "";

            for (let l = 0; l < config.tamanho; l++) {
                matrizGemas[l] = [];
                for (let c = 0; c < config.tamanho; c++) {
                    let id;
                    do { id = Math.floor(Math.random() * config.tipos); } 
                    while (seriaMatch(l, c, id));
                    matrizGemas[l][c] = id;
                }
            }
            renderizarTabuleiro();
        }

        function seriaMatch(l, c, id) {
            if (c >= 2 && matrizGemas[l][c-1] === id && matrizGemas[l][c-2] === id) return true;
            if (l >= 2 && matrizGemas[l-1][c] === id && matrizGemas[l-2][c] === id) return true;
            return false;
        }

        function renderizarTabuleiro() {
            const config = CONFIG_NIVEIS[nivelIdx];
            const tabuleiro = document.getElementById('tabuleiro');
            tabuleiro.innerHTML = "";
            for (let l = 0; l < config.tamanho; l++) {
                for (let c = 0; c < config.tamanho; c++) {
                    const id = matrizGemas[l][c];
                    const gema = document.createElement('button');
                    gema.className = 'gema';
                    gema.id = `gema-${l}-${c}`;
                    if (id !== -1) {
                        const img = document.createElement('img');
                        img.src = GEMAS[id].img;
                        img.alt = "";
                        gema.appendChild(img);
                        const nomeTraduzido = TEXTOS[idiomaAtual].gemas[id];
                        gema.setAttribute('aria-label', `${obterCoordenada(l,c)}: ${nomeTraduzido}`);
                    } else {
                        gema.setAttribute('aria-label', `${obterCoordenada(l,c)}: Vazio`);
                    }
                    gema.onclick = () => clicarGema(l, c);
                    gema.onkeydown = (e) => tratarTeclado(e, l, c);
                    tabuleiro.appendChild(gema);
                }
            }
        }

        function obterCoordenada(l, c) {
            return String.fromCharCode(65 + c) + (l + 1);
        }

        function clicarGema(l, c) {
            if (bloqueado || !jogoAtivo) return;
            tocarSom(GEMAS[matrizGemas[l][c]].nota);
            const gemaDOM = document.getElementById(`gema-${l}-${c}`);
            
            if (!gemaSelecionada) {
                gemaSelecionada = { l, c, dom: gemaDOM };
                gemaDOM.classList.add('selecionada');
            } else {
                const dist = Math.abs(l - gemaSelecionada.l) + Math.abs(c - gemaSelecionada.c);
                if (dist === 1) {
                    trocar(gemaSelecionada.l, gemaSelecionada.c, l, c);
                }
                gemaSelecionada.dom.classList.remove('selecionada');
                gemaSelecionada = null;
            }
        }

        function trocar(l1, c1, l2, c2) {
            bloqueado = true;
            const temp = matrizGemas[l1][c1];
            matrizGemas[l1][c1] = matrizGemas[l2][c2];
            matrizGemas[l2][c2] = temp;
            renderizarTabuleiro();

            setTimeout(() => {
                if (checarMatches()) {
                    multiplicadorCombo = 1;
                    atingiuBonusNoTurno = false;
                    processarTurno();
                } else {
                    const temp2 = matrizGemas[l1][c1];
                    matrizGemas[l1][c1] = matrizGemas[l2][c2];
                    matrizGemas[l2][c2] = temp2;
                    vidas--;
                    tocarErro();
                    renderizarTabuleiro();
                    atualizarInterface();
                    if (vidas <= 0) fimDeJogo(false);
                    bloqueado = false;
                }
            }, 300);
        }

        function checarMatches() {
            const config = CONFIG_NIVEIS[nivelIdx];
            let encontrou = false;
            let paraEliminar = Array.from({ length: config.tamanho }, () => Array(config.tamanho).fill(false));

            for (let l = 0; l < config.tamanho; l++) {
                for (let c = 0; c < config.tamanho - 2; c++) {
                    let id = matrizGemas[l][c];
                    if (id !== -1 && id === matrizGemas[l][c+1] && id === matrizGemas[l][c+2]) {
                        paraEliminar[l][c] = paraEliminar[l][c+1] = paraEliminar[l][c+2] = true;
                        encontrou = true;
                    }
                }
            }
            for (let c = 0; c < config.tamanho; c++) {
                for (let l = 0; l < config.tamanho - 2; l++) {
                    let id = matrizGemas[l][c];
                    if (id !== -1 && id === matrizGemas[l+1][c] && id === matrizGemas[l+2][c]) {
                        paraEliminar[l][c] = paraEliminar[l+1][c] = paraEliminar[l+2][c] = true;
                        encontrou = true;
                    }
                }
            }

            if (encontrou) {
                let ptsBase = 0;
                let blocos = 0;
                for (let l = 0; l < config.tamanho; l++) {
                    for (let c = 0; c < config.tamanho; c++) {
                        if (paraEliminar[l][c]) {
                            let id = matrizGemas[l][c];
                            if (id === joiaBonusId) { ptsBase += 20; atingiuBonusNoTurno = true; }
                            else { ptsBase += 10; }
                            matrizGemas[l][c] = -1;
                            blocos++;
                        }
                    }
                }
                pontuacao += ptsBase * multiplicadorCombo;
                totalTrincasNoTurno += Math.floor(blocos / 3);
                totalPontosNoTurno += ptsBase * multiplicadorCombo;
            }
            return encontrou;
        }

        function processarTurno() {
            setTimeout(() => {
                aplicarGravidade();
                renderizarTabuleiro();
                setTimeout(() => {
                    if (checarMatches()) {
                        multiplicadorCombo++;
                        processarTurno();
                    } else {
                        const t = TEXTOS[idiomaAtual];
                        const meta = CONFIG_NIVEIS[nivelIdx].meta;
                        let msg = t.msgFinal.replace("{trincas}", totalTrincasNoTurno).replace("{pontos}", totalPontosNoTurno).replace("{total}", pontuacao).replace("{meta}", meta);
                        
                        let ganhouVida = false;
                        if (dificuldade === "facil" && totalTrincasNoTurno > 1) ganhouVida = true;
                        else if (dificuldade === "medio" && atingiuBonusNoTurno) ganhouVida = true;

                        if (ganhouVida && vidas < 5) {
                            vidas++;
                            msg += (dificuldade === "medio") ? t.msgGemaBonus : t.msgCombo;
                        }

                        anunciarTexto(msg);
                        atualizarInterface();
                        if (pontuacao >= meta) fimDeJogo(true);
                        else {
                            totalTrincasNoTurno = 0;
                            totalPontosNoTurno = 0;
                            bloqueado = false;
                        }
                    }
                }, 400);
            }, 300);
        }

        function aplicarGravidade() {
            const config = CONFIG_NIVEIS[nivelIdx];
            for (let c = 0; c < config.tamanho; c++) {
                let vazio = config.tamanho - 1;
                for (let l = config.tamanho - 1; l >= 0; l--) {
                    if (matrizGemas[l][c] !== -1) {
                        matrizGemas[vazio][c] = matrizGemas[l][c];
                        if (vazio !== l) matrizGemas[l][c] = -1;
                        vazio--;
                    }
                }
                for (let l = vazio; l >= 0; l--) {
                    matrizGemas[l][c] = Math.floor(Math.random() * config.tipos);
                }
            }
        }

        function atualizarInterface() {
            const t = TEXTOS[idiomaAtual];
            const config = CONFIG_NIVEIS[nivelIdx];
            document.getElementById('status-fase').innerText = `${t.statusNivel} ${config.nivel} - ${t.statusTabuleiro} ${config.tamanho}x${config.tamanho}`;
            const nomeGemaBonus = joiaBonusId !== -1 ? t.gemas[joiaBonusId] : "";
            document.getElementById('status-desafio').innerText = joiaBonusId !== -1 ? t.statusBonusAtivo.replace("{gema}", nomeGemaBonus) : t.statusBonus;
            document.getElementById('label-pontos').innerText = t.statusPontos;
            document.getElementById('pontos-atual').innerText = pontuacao;
            document.getElementById('pontos-meta').innerText = config.meta;
            document.getElementById('status-vidas').innerText = `${t.statusVidas}: ${vidas}`;
        }

        function fimDeJogo(vitoria) {
            jogoAtivo = false;
            document.getElementById('container-jogo').style.display = 'none';
            if (vitoria) {
                document.getElementById('tela-vitoria').style.display = 'flex';
                document.getElementById('btn-proximo-nivel').focus();
            } else {
                document.getElementById('tela-gameover').style.display = 'flex';
                document.getElementById('btn-tentar-novamente').focus();
            }
        }

        function tratarTeclado(e, l, c) {
            const config = CONFIG_NIVEIS[nivelIdx];
            let nl = l, nc = c;
            if (e.key === "ArrowUp") nl--;
            else if (e.key === "ArrowDown") nl++;
            else if (e.key === "ArrowLeft") nc--;
            else if (e.key === "ArrowRight") nc++;
            else if (e.key === "Enter" || e.key === " ") { clicarGema(l, c); return; }
            else return;

            if (nl >= 0 && nl < config.tamanho && nc >= 0 && nc < config.tamanho) {
                const prox = document.getElementById(`gema-${nl}-${nc}`);
                if (prox) prox.focus();
            }
            e.preventDefault();
        }

        function tocarSom(f) {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = f;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            osc.start(); osc.stop(audioCtx.currentTime + 0.3);
        }

        function tocarErro() {
            tocarSom(150); tocarSom(100);
        }

        function anunciarTexto(txt) {
            const an = document.getElementById('anunciador-braille');
            an.innerText = "";
            setTimeout(() => an.innerText = txt, 50);
        }

        document.getElementById('btn-comecar').onclick = iniciarPartida;
        document.getElementById('btn-idioma-menu').onclick = () => { 
            document.getElementById('tela-inicial').style.display='none'; 
            document.getElementById('tela-idioma').style.display='flex'; 
            const btnPt = document.getElementById('btn-pt-br');
            if (btnPt) btnPt.focus();
        };
        document.getElementById('bt-abrir-ajuda').onclick = () => {
            document.getElementById('modal-ajuda').style.display='flex';
            document.getElementById('bt-fechar-ajuda').focus();
        };
        document.getElementById('bt-fechar-ajuda').onclick = () => {
            document.getElementById('modal-ajuda').style.display='none';
            document.getElementById('bt-abrir-ajuda').focus();
        };
        document.getElementById('btn-abandonar').onclick = voltarAoMenu;
        document.getElementById('btn-vitoria-menu').onclick = voltarAoMenu;
        document.getElementById('btn-gameover-menu').onclick = voltarAoMenu;
        document.getElementById('btn-tentar-novamente').onclick = iniciarPartida;
        document.getElementById('btn-proximo-nivel').onclick = () => { nivelIdx++; iniciarPartida(); };

        atualizarTextos();
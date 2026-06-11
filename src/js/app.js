import { MODOS, NOTAS_INFO, TRANSLATIONS, POWER_UPS } from './config.js';
import { initAudio, tocarGema, tocarPowerUp, tocarAcorde } from './audio.js';
import { renderizarTabuleiro, atualizarStatus } from './ui.js';
import { gerarPassword, validarPassword } from './passwords.js';

let state = {
    modo: MODOS.PADRAO,
    lang: localStorage.getItem('game_lang') || (navigator.language.startsWith('pt') ? 'pt' : 'en'),
    tabuleiro: [],
    pontos: 0,
    vidas: 3,
    nivel: 1,
    selecionada: null,
    objetivoCompositor: null
};

let T = TRANSLATIONS[state.lang];

function anunciar(texto) {
    const el = document.getElementById('announcer');
    if (el) {
        el.textContent = '';
        setTimeout(() => { el.textContent = texto; }, 50);
    }
}

function mudarIdioma(lang) {
    state.lang = lang;
    localStorage.setItem('game_lang', lang);
    T = TRANSLATIONS[lang];
    
    // Atualiza botões e textos
    const elTitulo = document.getElementById('titulo-jogo');
    const elBtnIniciar = document.getElementById('btn-iniciar');
    const elBtnVoltar = document.getElementById('btn-voltar');

    if (elTitulo) elTitulo.textContent = T.gameTitle;
    if (elBtnIniciar) elBtnIniciar.textContent = T.play;
    if (elBtnVoltar) elBtnVoltar.textContent = T.back;

    // Atualiza as labels de status
    atualizarStatus(state.pontos, state.vidas, null, T);
    
    // Atualiza destaque visual dos botões de idioma
    const btnPt = document.getElementById('btn-pt');
    const btnEn = document.getElementById('btn-en');
    if (btnPt) btnPt.classList.toggle('active', lang === 'pt');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    if (!document.getElementById('tela-jogo').classList.contains('hidden')) {
        atualizarUI();
    }
}

function init() {
    const elBtnIniciar = document.getElementById('btn-iniciar');
    const elBtnVoltar = document.getElementById('btn-voltar');
    const elBtnPt = document.getElementById('btn-pt');
    const elBtnEn = document.getElementById('btn-en');
    const elBtnLoadPass = document.getElementById('btn-load-pass');
    const elSelectModo = document.getElementById('select-modo');

    if (elBtnIniciar) elBtnIniciar.onclick = iniciarJogo;
    if (elBtnVoltar) elBtnVoltar.onclick = voltarMenu;
    if (elBtnPt) elBtnPt.onclick = () => mudarIdioma('pt');
    if (elBtnEn) elBtnEn.onclick = () => mudarIdioma('en');
    if (elBtnLoadPass) elBtnLoadPass.onclick = carregarRetroPassword;
    
    if (elSelectModo) {
        elSelectModo.onchange = (e) => {
            state.modo = e.target.value;
        };
    }
    
    window.gerenciarClique = gerenciarClique;
    
    // Aplica idioma inicial
    mudarIdioma(state.lang);
}

function iniciarJogo() {
    initAudio();
    state.pontos = 0;
    state.vidas = 3;
    state.nivel = 1;
    
    if (state.modo === MODOS.COMPOSITOR) {
        state.objetivoCompositor = ['C', 'E', 'G']; // Acorde de Dó Maior
    } else {
        state.objetivoCompositor = null;
    }

    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('tela-jogo').classList.remove('hidden');
    
    const tam = (state.modo === MODOS.SUDOKU) ? 3 : 5;
    gerarTabuleiro(tam);
    anunciar(`${T.gameTitle} iniciado no modo ${state.modo}. Tabuleiro ${tam} por ${tam}.`);
}

function voltarMenu() {
    document.getElementById('tela-jogo').classList.add('hidden');
    document.getElementById('tela-menu').classList.remove('hidden');
}

function gerarTabuleiro(tam) {
    const notas = Object.keys(NOTAS_INFO);
    state.tabuleiro = Array.from({ length: tam }, () =>
        Array.from({ length: tam }, () => ({
            nota: notas[Math.floor(Math.random() * notas.length)],
            isMinor: Math.random() > 0.8,
            powerUp: null,
            selecionada: false
        }))
    );
    atualizarUI();
}

function atualizarUI() {
    renderizarTabuleiro(state.tabuleiro, NOTAS_INFO, T, gerenciarClique);
    
    let metaTexto = "500";
    if (state.modo === MODOS.COMPOSITOR && state.objetivoCompositor) {
        metaTexto = `${T.nextChord} ${state.objetivoCompositor.join('-')}`;
    }
    
    atualizarStatus(state.pontos, state.vidas, metaTexto, T);
}

function gerenciarClique(l, c) {
    const gema = state.tabuleiro[l][c];
    const nomeNota = T.notes[gema.nota] + (gema.isMinor ? ` ${T.notes.minor}` : '');
    anunciar(`${nomeNota} em linha ${l+1} coluna ${c+1}`);
    
    tocarGema(NOTAS_INFO[gema.nota].freq, gema.isMinor);

    if (!state.selecionada) {
        state.selecionada = { l, c };
        state.tabuleiro[l][c].selecionada = true;
    } else {
        const { l: l1, c: c1 } = state.selecionada;
        state.tabuleiro[l1][c1].selecionada = false;
        
        const dist = Math.abs(l - l1) + Math.abs(c - c1);
        if (dist === 1) {
            trocarGemas(l1, c1, l, c);
        } else {
            anunciar("Seleção cancelada");
        }
        state.selecionada = null;
    }
    atualizarUI();
}

function trocarGemas(l1, c1, l2, c2) {
    const g1 = state.tabuleiro[l1][c1];
    const g2 = state.tabuleiro[l2][c2];

    state.tabuleiro[l1][c1] = g2;
    state.tabuleiro[l2][c2] = g1;

    const matches = verificarMatches();
    
    if (matches.length === 0) {
        state.vidas--;
        anunciar(`Nenhuma harmonia formada. Perdeu uma vida. Restam ${state.vidas}.`);
        if (state.vidas <= 0) {
            anunciar(T.gameOver);
            alert(T.gameOver);
            iniciarJogo();
            return;
        }
        tocarPowerUp('METRONOMO');
    } else {
        processarMatch(matches);
    }
    atualizarUI();
}

function verificarMatches() {
    const tam = state.tabuleiro.length;
    const paraRemover = new Set();

    // Horizontal
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam - 2; j++) {
            const n1 = state.tabuleiro[i][j].nota;
            const n2 = state.tabuleiro[i][j+1].nota;
            const n3 = state.tabuleiro[i][j+2].nota;
            
            if (n1 === n2 && n2 === n3) {
                paraRemover.add(`${i},${j}`);
                paraRemover.add(`${i},${j+1}`);
                paraRemover.add(`${i},${j+2}`);
            }
            
            if (state.modo === MODOS.COMPOSITOR && state.objetivoCompositor) {
                const notasMatch = [n1, n2, n3].sort();
                const objMatch = [...state.objetivoCompositor].sort();
                if (JSON.stringify(notasMatch) === JSON.stringify(objMatch)) {
                    paraRemover.add(`${i},${j}`);
                    paraRemover.add(`${i},${j+1}`);
                    paraRemover.add(`${i},${j+2}`);
                    anunciar("Acorde harmonizado!");
                }
            }
        }
    }

    // Vertical
    for (let j = 0; j < tam; j++) {
        for (let i = 0; i < tam - 2; i++) {
            const n1 = state.tabuleiro[i][j].nota;
            const n2 = state.tabuleiro[i+1][j].nota;
            const n3 = state.tabuleiro[i+2][j].nota;
            if (n1 === n2 && n2 === n3) {
                paraRemover.add(`${i},${j}`);
                paraRemover.add(`${i+1},${j}`);
                paraRemover.add(`${i+2},${j}`);
            }
        }
    }

    return Array.from(paraRemover);
}

function processarMatch(coordsArray) {
    const pontosGanhos = coordsArray.length * 10;
    state.pontos += pontosGanhos;
    anunciar(`Harmonia realizada! Ganhou ${pontosGanhos} pontos. Total: ${state.pontos}`);
    
    tocarAcorde([440, 554, 659]);

    coordsArray.forEach(coord => {
        const [l, c] = coord.split(',').map(Number);
        const notas = Object.keys(NOTAS_INFO);
        state.tabuleiro[l][c] = {
            nota: notas[Math.floor(Math.random() * notas.length)],
            isMinor: Math.random() > 0.8,
            powerUp: null,
            selecionada: false
        };
    });

    const pass = gerarPassword(state.nivel, state.vidas);
    const display = document.getElementById('current-pass-display');
    if (display) display.textContent = `Sua senha: ${pass}`;

    atualizarUI();
    
    setTimeout(() => {
        const novosMatches = verificarMatches();
        if (novosMatches.length > 0) processarMatch(novosMatches);
    }, 500);
}

function carregarRetroPassword() {
    const pass = document.getElementById('input-pass').value.trim();
    if (!pass) return;
    const dados = validarPassword(pass);
    if (dados) {
        state.nivel = dados.nivel;
        state.vidas = dados.vidas;
        anunciar(`Progresso carregado. Nível ${state.nivel}, Vidas ${state.vidas}.`);
        alert(`Progresso carregado!`);
        iniciarJogo();
    } else {
        anunciar("Senha inválida.");
        alert("Senha inválida.");
    }
}

window.onload = init;

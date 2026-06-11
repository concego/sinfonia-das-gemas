import { MODOS, NOTAS_INFO, TRANSLATIONS, POWER_UPS } from './config.js';
import { initAudio, tocarGema, tocarPowerUp, tocarAcorde } from './audio.js';
import { renderizarTabuleiro, atualizarStatus } from './ui.js';

let state = {
    modo: MODOS.PADRAO,
    lang: localStorage.getItem('game_lang') || (navigator.language.startsWith('pt') ? 'pt' : 'en'),
    tabuleiro: [],
    pontos: 0,
    vidas: 3,
    nivel: 1,
    selecionada: null
};

let T = TRANSLATIONS[state.lang];

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

    if (elBtnIniciar) elBtnIniciar.onclick = iniciarJogo;
    if (elBtnVoltar) elBtnVoltar.onclick = voltarMenu;
    if (elBtnPt) elBtnPt.onclick = () => mudarIdioma('pt');
    if (elBtnEn) elBtnEn.onclick = () => mudarIdioma('en');
    
    window.gerenciarClique = gerenciarClique;
    
    // Aplica idioma inicial
    mudarIdioma(state.lang);
}

function iniciarJogo() {
    initAudio();
    state.pontos = 0;
    state.vidas = 3;
    state.nivel = 1;
    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('tela-jogo').classList.remove('hidden');
    gerarTabuleiro(5); // Padrão 5x5
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
    atualizarStatus(state.pontos, state.vidas, 500, T);
}

function gerenciarClique(l, c) {
    const gema = state.tabuleiro[l][c];
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

    if (!verificarMatches()) {
        // Se não houver match, desfaz a troca após um pequeno delay
        setTimeout(() => {
            state.tabuleiro[l1][c1] = g1;
            state.tabuleiro[l2][c2] = g2;
            atualizarUI();
        }, 300);
    }
}

function verificarMatches() {
    let houveMatch = false;
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
                houveMatch = true;
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
                houveMatch = true;
            }
        }
    }

    if (houveMatch) {
        processarMatch(paraRemover);
    }
    return houveMatch;
}

function processarMatch(coordsSet) {
    state.pontos += coordsSet.size * 10;
    tocarAcorde([440, 554, 659]); // Som de sucesso

    coordsSet.forEach(coord => {
        const [l, c] = coord.split(',').map(Number);
        const notas = Object.keys(NOTAS_INFO);
        state.tabuleiro[l][c] = {
            nota: notas[Math.floor(Math.random() * notas.length)],
            isMinor: Math.random() > 0.8,
            powerUp: null,
            selecionada: false
        };
    });

    atualizarUI();
    // Checa cascata
    setTimeout(verificarMatches, 500);
}

window.onload = init;

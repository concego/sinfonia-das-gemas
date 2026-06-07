import { MODOS, NOTAS_INFO, TRANSLATIONS, POWER_UPS } from './config.js';
import { initAudio, tocarGema, tocarPowerUp, tocarAcorde } from './audio.js';
import { renderizarTabuleiro, atualizarStatus } from './ui.js';

let state = {
    modo: MODOS.PADRAO,
    lang: navigator.language.startsWith('pt') ? 'pt' : 'en',
    tabuleiro: [],
    pontos: 0,
    vidas: 3,
    nivel: 1,
    selecionada: null
};

const T = TRANSLATIONS[state.lang];

function init() {
    document.getElementById('btn-iniciar').onclick = iniciarJogo;
    window.gerenciarClique = gerenciarClique;
    // Traduz interface inicial
    document.getElementById('titulo-jogo').textContent = T.gameTitle;
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
    const t = state.tabuleiro[l1][c1];
    state.tabuleiro[l1][c1] = state.tabuleiro[l2][c2];
    state.tabuleiro[l2][c2] = t;

    // Aqui entraria a lógica de checar matches e ativar power-ups
    // Exemplo simplificado de detecção de match-3
    console.log("Troca realizada. Checando harmonia...");
}

window.onload = init;

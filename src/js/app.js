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
    document.getElementById('titulo-jogo').textContent = T.gameTitle;
    document.getElementById('btn-iniciar').textContent = T.play;
    document.getElementById('btn-voltar').textContent = T.back;

    // Atualiza as labels de status
    atualizarStatus(state.pontos, state.vidas, null, T);
    
    // Atualiza destaque visual dos botões de idioma
    document.getElementById('btn-pt').classList.toggle('active', lang === 'pt');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    if (!document.getElementById('tela-jogo').classList.contains('hidden')) {
        atualizarUI();
    }
}

function init() {
    document.getElementById('btn-iniciar').onclick = iniciarJogo;
    document.getElementById('btn-voltar').onclick = voltarMenu;
    document.getElementById('btn-pt').onclick = () => mudarIdioma('pt');
    document.getElementById('btn-en').onclick = () => mudarIdioma('en');
    
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
    const t = state.tabuleiro[l1][c1];
    state.tabuleiro[l1][c1] = state.tabuleiro[l2][c2];
    state.tabuleiro[l2][c2] = t;

    // Aqui entraria a lógica de checar matches e ativar power-ups
    // Exemplo simplificado de detecção de match-3
    console.log("Troca realizada. Checando harmonia...");
}

window.onload = init;

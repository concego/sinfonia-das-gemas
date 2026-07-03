import { NOTAS_INFO, TRANSLATIONS } from './config.js';
import { initAudio, tocarGema, tocarMatch, tocarErro } from './audio.js';
import { renderizarTabuleiro, atualizarStatus } from './ui.js';
let s = { lang: 'pt', tab: [], pts: 0, v: 3, sel: null }, T = TRANSLATIONS.pt;
function init() {
  document.getElementById('btn-iniciar').onclick = iniciar;
  document.getElementById('btn-voltar').onclick = () => location.reload();
  document.getElementById('btn-pt').onclick = () => mudar('pt');
  document.getElementById('btn-en').onclick = () => mudar('en');
  mudar('pt');
}
function mudar(l) { s.lang = l; T = TRANSLATIONS[l]; document.getElementById('titulo-jogo').textContent = T.gameTitle; document.getElementById('btn-iniciar').textContent = T.play; }
function iniciar() {
  initAudio(); s.pts = 0; s.v = 3; document.getElementById('tela-menu').classList.add('hidden'); document.getElementById('tela-jogo').classList.remove('hidden');
  let n = Object.keys(NOTAS_INFO); s.tab = Array.from({length:5}, () => Array.from({length:5}, () => ({nota: n[Math.floor(Math.random()*n.length)], isMinor: Math.random()>0.8, selecionada: false})));
  upd();
}
function upd() { renderizarTabuleiro(s.tab, NOTAS_INFO, T, clique); atualizarStatus(s.pts, s.v, T); }
function clique(l, c) {
  let g = s.tab[l][c]; tocarGema(NOTAS_INFO[g.nota].freq, g.isMinor);
  if (!s.sel) { s.sel = {l, c}; s.tab[l][c].selecionada = true; }
  else {
    let {l: l1, c: c1} = s.sel; s.tab[l1][c1].selecionada = false;
    if (Math.abs(l-l1) + Math.abs(c-c1) === 1) {
      let t = s.tab[l1][c1]; s.tab[l1][c1] = s.tab[l][c]; s.tab[l][c] = t;
      let m = check();
      if (m.length > 0) { tocarMatch(); s.pts += m.length*10; m.forEach(p => { let [rl, rc] = p.split(',').map(Number); let n = Object.keys(NOTAS_INFO); s.tab[rl][rc] = {nota: n[Math.floor(Math.random()*n.length)], isMinor: Math.random()>0.8, selecionada: false}; }); }
      else { s.v--; tocarErro(); if (s.v <= 0) { alert(T.gameOver); location.reload(); } }
    }
    s.sel = null;
  }
  upd();
}
function check() {
  let m = new Set();
  for (let i=0; i<5; i++) for (let j=0; j<5; j++) {
    if (j<3 && s.tab[i][j].nota===s.tab[i][j+1].nota && s.tab[i][j].nota===s.tab[i][j+2].nota) { m.add(`${i},${j}`); m.add(`${i},${j+1}`); m.add(`${i},${j+2}`); }
    if (i<3 && s.tab[i][j].nota===s.tab[i+1][j].nota && s.tab[i][j].nota===s.tab[i+2][j].nota) { m.add(`${i},${j}`); m.add(`${i+1},${j}`); m.add(`${i+2},${j}`); }
  }
  return Array.from(m);
}
init();

export function renderizarTabuleiro(matriz, notasInfo, translations, callback) {
  let c = document.getElementById('container-tabuleiro'), t = document.createElement('table');
  t.setAttribute('role', 'grid');
  matriz.forEach((l, i) => {
    let r = document.createElement('tr');
    l.forEach((g, j) => {
      let d = document.createElement('td'), info = notasInfo[g.nota], n = translations.notes[g.nota] + (g.isMinor ? " " + translations.notes.minor : "");
      d.setAttribute('role', 'gridcell'); d.setAttribute('aria-label', `L${i+1} C${j+1}: ${n}`); d.setAttribute('tabindex', '0');
      if (g.selecionada) d.classList.add('selecionada');
      d.innerHTML = `<div class="cristal" style="background-color: ${info.cor}">${g.nota}${g.isMinor ? 'm' : ''}</div>`;
      d.onclick = () => callback(i, j);
      d.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') callback(i, j); };
      r.appendChild(d);
    });
    t.appendChild(r);
  });
  c.innerHTML = ''; c.appendChild(t);
}
export function atualizarStatus(p, v, t) {
  document.getElementById('label-score').textContent = `${t.score}: ${p}`;
  document.getElementById('label-vidas').textContent = `${t.lives}: ${v}`;
}

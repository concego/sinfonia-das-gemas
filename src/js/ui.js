/**
 * Sinfonia das Gemas / Gems Symphony - UI Engine
 */
export function renderizarTabuleiro(matriz, notasInfo, translations, callbackClique) {
    const container = document.getElementById('container-tabuleiro');
    const tabela = document.createElement('table');
    tabela.setAttribute('role', 'grid');
    tabela.setAttribute('aria-label', translations.gameTitle);

    matriz.forEach((linha, i) => {
        const tr = document.createElement('tr');
        linha.forEach((gema, j) => {
            const td = document.createElement('td');
            const info = notasInfo[gema.nota];
            
            // Texto para o leitor de tela
            let nomeNota = translations.notes[gema.nota];
            if (gema.isMinor) nomeNota += ` ${translations.notes.minor}`;
            if (gema.powerUp) nomeNota += ` - ${translations.powerUps[gema.powerUp]}`;

            td.setAttribute('role', 'gridcell');
            td.setAttribute('aria-label', `L${i+1}C${j+1}: ${nomeNota}`);
            td.setAttribute('tabindex', '0');
            
            if (gema.isMinor) td.classList.add('gema-opaca');
            if (gema.selecionada) td.classList.add('selecionada');

            // Representação visual
            td.innerHTML = `
                <div class="cristal" style="background-color: ${info.cor}">
                    <span class="simbolo">${gema.nota}${gema.isMinor ? 'm' : ''}</span>
                    ${gema.powerUp ? `<span class="icon-power">${gema.powerUp[0]}</span>` : ''}
                </div>
            `;

            td.onclick = (e) => {
                e.preventDefault();
                callbackClique(i, j);
            };
            
            tr.appendChild(td);
        });
        tabela.appendChild(tr);
    });

    container.innerHTML = '';
    container.appendChild(tabela);
}

export function atualizarStatus(pontos, vidas, meta, translations) {
    document.getElementById('label-score').textContent = `${translations.score}: ${pontos}`;
    document.getElementById('label-vidas').textContent = `${translations.lives}: ${vidas}`;
    if (meta) {
        document.getElementById('label-meta').textContent = `${translations.goal}: ${meta}`;
    }
}

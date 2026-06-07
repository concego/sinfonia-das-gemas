/**
 * Sinfonia das Gemas / Gems Symphony - Audio Engine
 */

let audioCtx = null;

export function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function criarNota(freq, duracao, ganho, tipo = 'sine', tempoInicio = 0) {
    const t = audioCtx.currentTime + tempoInicio;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    
    osc.type = tipo;
    osc.frequency.setValueAtTime(freq, t);
    
    g.gain.setValueAtTime(ganho, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + duracao);
    
    osc.connect(g);
    g.connect(audioCtx.destination);
    
    osc.start(t);
    osc.stop(t + duracao);
}

export function tocarGema(freq, isMinor = false) {
    if (!audioCtx) return;
    const f = isMinor ? freq * Math.pow(2, -1/12) : freq;
    criarNota(f, 0.5, 0.2, 'sine');
    criarNota(f * 2, 0.4, 0.05, 'sine'); // Brilho
}

export function tocarPowerUp(tipo) {
    if (!audioCtx) return;
    const agora = 0;
    if (tipo === 'DIAPASAO') {
        // Som de cristal longo
        criarNota(880, 1.5, 0.2, 'sine');
    } else if (tipo === 'METRONOMO') {
        // Batida grave
        criarNota(110, 0.5, 0.3, 'triangle');
    } else if (tipo === 'CLAVE') {
        // Arpejo ascendente
        [261, 329, 392, 523].forEach((f, i) => criarNota(f, 0.6, 0.1, 'sine', i * 0.1));
    }
}

export function tocarAcorde(freqs) {
    if (!audioCtx) return;
    freqs.forEach(f => criarNota(f, 1.0, 0.1));
}

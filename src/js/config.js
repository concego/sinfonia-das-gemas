/**
 * Sinfonia das Gemas / Gems Symphony - Configurações Globais
 */

export const MODOS = {
    PADRAO: 'PADRAO',
    MAESTRO: 'MAESTRO',
    COMPOSITOR: 'COMPOSITOR',
    SUDOKU: 'SUDOKU',
    ZEN: 'ZEN'
};

export const POWER_UPS = {
    DIAPASAO: 'DIAPASAO', // Linha/Coluna
    METRONOMO: 'METRONOMO', // Explosão 3x3
    CLAVE: 'CLAVE' // Limpa tipo
};

export const TRANSLATIONS = {
    pt: {
        gameTitle: "Sinfonia das Gemas",
        play: "Jogar",
        score: "Pontos",
        goal: "Meta",
        lives: "Vidas",
        composer: "Modo Compositor",
        maestro: "Modo Maestro",
        sudoku: "Sudoku Musical",
        nextChord: "Próximo: ",
        victory: "Sinfonia Completa!",
        gameOver: "Fim de Partida",
        powerUps: {
            DIAPASAO: "Diapasão de Cristal",
            METRONOMO: "Gema Metrônomo",
            CLAVE: "Clave de Sol"
        },
        notes: {
            C: "Dó", D: "Ré", E: "Mi", F: "Fá", G: "Sol", A: "Lá", B: "Si",
            minor: "menor"
        }
    },
    en: {
        gameTitle: "Gems Symphony",
        play: "Play",
        score: "Score",
        goal: "Goal",
        lives: "Lives",
        composer: "Composer Mode",
        maestro: "Maestro Mode",
        sudoku: "Musical Sudoku",
        nextChord: "Next: ",
        victory: "Symphony Complete!",
        gameOver: "Game Over",
        powerUps: {
            DIAPASAO: "Crystal Tuning Fork",
            METRONOMO: "Metronome Gem",
            CLAVE: "Treble Clef"
        },
        notes: {
            C: "C", D: "D", E: "E", F: "F", G: "G", A: "A", B: "B",
            minor: "minor"
        }
    }
};

export const NOTAS_INFO = {
    C: { cor: '#ff5252', freq: 261.63 },
    D: { cor: '#ffb74d', freq: 293.66 },
    E: { cor: '#fff176', freq: 329.63 },
    F: { cor: '#81c784', freq: 349.23 },
    G: { cor: '#64b5f6', freq: 392.00 },
    A: { cor: '#5c6bc0', freq: 440.00 },
    B: { cor: '#ba68c8', freq: 493.88 }
};

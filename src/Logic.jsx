const INF = 1e9;

const dp = Array(600).fill().map(() => Array(600).fill().map(() => Array(3).fill()))
const moves = [4, 0, 2, 6, 8, 1, 3, 5, 7];

const Lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const Lleno = 511;

export function result(tab, player) {

    let end = true
    tab.forEach(fila => {
        fila.forEach(col => {
            if (col === null) end = false
        })
    })
    if (end) return { end: true, line: null, winner: null }

    let ret = { end: false }

    Lines.forEach(line => {
        let matchX = true
        line.forEach(pos => {
            let i = Math.floor(pos / 3), j = pos % 3;
            if (tab[i][j] !== 'X') matchX = false
        })
        if (matchX) ret = { end: true, line: line, winner: player === 0 }
        let matchO = true
        line.forEach(pos => {
            let i = Math.floor(pos / 3), j = pos % 3;
            if (tab[i][j] !== 'O') matchO = false
        })
        if (matchO) ret = { end: true, line: line, winner: player === 1 }
    })

    return ret
}

function win(jug) {
    for (let k = 0; k < 8; k++) {
        let win = true;
        for (let i = 0; i < 3; i++) {
            if (!(jug & (1 << Lines[k][i]))) {
                win = false;
                break;
            }
        }
        if (win)
            return true;
    }
    return false;
}

function minimax(x, o, t) {

    if (win(x)) return 10;
    if (win(o)) return -10;
    if ((x ^ o) == Lleno) return 0;

    if (dp[x][o][t] !== undefined)
        return dp[x][o][t];

    let best = 0;
    if (t === 0) {
        best = -INF;
        for (let i = 0; i < 9; i++) {
            if (!(x & (1 << moves[i])) && !(o & (1 << moves[i]))) {
                best = Math.max(best, minimax(x ^ (1 << moves[i]), o, t ? 0 : 1));
            }
        }
    }
    else {
        best = INF;
        for (let i = 0; i < 9; i++) {
            if (!(x & (1 << moves[i])) && !(o & (1 << moves[i]))) {
                best = Math.min(best, minimax(x, o ^ (1 << moves[i]), t ? 0 : 1));
            }
        }
    }
    //printTab(x, o);
    //cout << best << "\n";
    return dp[x][o][t] = best;
}


function best_move(x, o, t) {
    if (win(x) || win(o) || (x ^ o) == Lleno) return -1;

    let b_m = -1;
    let best_value = (!t ? -INF : INF);

    for (let i = 0; i < 9; i++) {
        if (!(x & (1 << moves[i])) && !(o & (1 << moves[i]))) {
            if (!t) {
                let newVal = minimax(x ^ (1 << moves[i]), o, t ? 0 : 1);
                if (newVal > best_value) {
                    best_value = newVal;
                    b_m = moves[i];
                }
            }
            else {
                let newVal = minimax(x, o ^ (1 << moves[i]), t ? 0 : 1);
                if (newVal < best_value) {
                    best_value = newVal;
                    b_m = moves[i];
                }
            }
        }
    }
    return b_m;
}

export function find_best_move(tab, turn) {
    let jugX = 0, jugO = 0;
    for (let pos = 0; pos < 9; pos++) {
        let i = Math.floor(pos / 3), j = pos % 3;
        if (tab[i][j] === 'X') jugX ^= (1 << pos)
        if (tab[i][j] === 'O') jugO ^= (1 << pos)
    }

    let bestMove = best_move(jugX, jugO, turn);
    return ({ i: Math.floor(bestMove / 3), j: bestMove % 3 })
}
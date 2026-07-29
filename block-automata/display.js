import * as ba from "./block-automata.js"
import * as om from "../helpers/other-math.js"
import * as d from "../helpers/display.js"
import * as p from "../helpers/pointer.js"

export function flatten (l, n) {
    const result = [];

    let row = [];

    for (let i = 0; i < l.length; i++) {
        const element = l[i];

        row.push(element);

        if (row.length == n) {
            result.push(row);
            row = [];
        }
    }

    return result;
}

export function randLongBij (n) {
    const cycle = [];

    for (const element of om.allLists([false, true], n ** 2)) {
        const image = flatten(element, n);

        cycle.push(image);
    }

    om.randShuffle(cycle);

    const shiftedCycle = cycle.slice(1).concat([cycle[0]]);

    const result = new Map();

    for (let i = 0; i < cycle.length; i++) {
        result.set(JSON.stringify(cycle[i]), shiftedCycle[i]);
    }

    return result;
}

export function randImage (n, p) {
    const result = [];

    for (let _ = 0; _ < n; _++) {
        const new_row = [];

        for (let _ = 0; _ < n; _++) {
            new_row.push(Math.random() <= p)
        }
        
        result.push(new_row);
    }

    return result;
}

export function fillImage(n, x_end, y_end) {
    const result = [];

    for (let y = 0; y < n; y++) {
        const new_row = [];

        for (let x = 0; x < n; x++) {
            new_row.push(x < x_end && y < y_end)
        }

        result.push(new_row);
    }

    return result;
}

export function blankImage(n) {
    return fillImage(n, 0, 0);
}

export function addRect(l, x0, x1, y0, y1) {
    const xmin = Math.min(x0, x1);
    const xmax = Math.max(x0, x1);
    const ymin = Math.min(y0, y1);
    const ymax = Math.max(y0, y1);

    for (let y = ymin; y < ymax; y++) {
        for (let x = xmin; x < xmax; x++) {
            l[y][x] = true;
        }
    }
}

export function addNoiseRect(l, x0, x1, y0, y1, p) {
    const xmin = Math.min(x0, x1);
    const xmax = Math.max(x0, x1);
    const ymin = Math.min(y0, y1);
    const ymax = Math.max(y0, y1);

    for (let y = ymin; y < ymax; y++) {
        for (let x = xmin; x < xmax; x++) {
            l[y][x] = (Math.random() <= p)
        }
    }
}

const BLACK = [0, 0, 0, 255];
const WHITE = [255, 255, 255, 255];

export function boolArrayToImage (l) {
    const result = [];

    for (const row of l) {
        const new_row = [];

        for (const element of row) {
            if (element) {
                new_row.push(BLACK);
            } else {
                new_row.push(WHITE);
            }
        }

        result.push(new_row);
    }

    return result;
}

export function makeImage (automaton) {
    return boolArrayToImage(automaton.getState());
}

export function updateAnimation (automaton) {
    function updateImage () {
        const result = makeImage(automaton);
        automaton.update();

        return result;
    }

    return d.updateCanvas2d(updateImage);
}

function hammingDiff (l1, l2) {
    const result = [];

    for (let i = 0; i < l1.length; i++) {
        const row1 = l1[i];
        const row2 = l2[i];
        const new_row = [];

        for (let j = 0; j < l1[0].length; j++) {
            const element1 = row1[j];
            const element2 = row2[j];

            new_row.push(element1 == element2);
        }

        result.push(new_row);
    }

    return result;
}

function hammingPercent (l1, l2) {
    let result = 0;
    let count = 0;

    for (let i = 0; i < l1.length; i++) {
        const row1 = l1[i];
        const row2 = l2[i];

        for (let j = 0; j < l1[0].length; j++) {
            const element1 = row1[j];
            const element2 = row2[j];

            if (element1 != element2) {
                result += 1;
            }

            count += 1;
        }
    }

    return result / count;
}

export function flipOne (automaton, x, y) {
    const newState = automaton.getState();
    newState[y][x] = !newState[y][x];

    return new ba.ReversibleBlockAutomata(automaton.rule, newState, automaton.firstPhase, automaton.divisions);
}

export function hammingDiffUpdate (a1, a2) {
    function updateImage () {
        const result = boolArrayToImage(hammingDiff(a1.getState(), a2.getState()));

        a1.update();
        a2.update();

        return result;
    }

    return d.updateCanvas2d(updateImage);
}

export function hammingPercentUpdate(automaton) {
    const height = automaton.state.length;
    const width = automaton.state[0].length;

    const diffAutomata = [];

    for (let y = 0; y < height; y++) {
        const new_row = [];

        for (let x = 0; x < width; x++) {
            const new_state = automaton.getState();
            new_state[y][x] = !new_state[y][x];

            new_row.push(new ba.BlockAutomata(automaton.rule, new_state, automaton.firstPhase, automaton.divisions));
        }

        diffAutomata.push(new_row);
    }

    function updateImage () {
        const opacities = [];
        
        let minOpacity = 1;
        let maxOpacity = 0;

        for (const row of diffAutomata) {
            const new_row = [];

            for (const different of row) {
                const opacity = hammingPercent(automaton.getState(), different.getState());
                new_row.push(opacity);

                if (opacity > maxOpacity) {
                    maxOpacity = opacity;
                }

                if (opacity < minOpacity) {
                    minOpacity = opacity;
                }

                different.update();
            }

            opacities.push(new_row);
        }

        automaton.update();

        const result = [];

        for (const row of opacities) {
            const new_row = [];

            for (const opacity of row) {
                new_row.push([0, 0, 255, 255 * (opacity - minOpacity) / maxOpacity]);
            }

            result.push(new_row);
        }

        return result;
    }

    return d.updateCanvas2d(updateImage);
}

export function drawState (automaton) {
    function update (x, y) {
        const newX = Math.floor(x);
        const newY = Math.floor(y);
        
        automaton.state[newY][newX] = !automaton.state[newY][newX];
    }

    return update;
}
import * as ba from "./block-automata.js"

export class blockAutomataPRNG {
    constructor (automaton, times, x, y) {
        this.automaton = automaton;
        this.times = times;
        this.x = x;
        this.y = y;
    }

    randBit () {
        const result = this.automaton.state[this.y][this.x];

        for (let i = 0; i < this.times; i++) {
            this.automaton.update();
        }

        return result;
    }
}

export function randBitSeq (prng) {
    function getBit () {
        return prng.randBit();
    }

    return getBit;
}

export function randImageSeq (bitSeq, x, y) {
    function getImage () {
        const result = [];

        for (let _ = 0; _ < y; _++) {
            const newRow = [];

            for (let _ = 0; _ < x; _++) {
                const component = 255 * bitSeq();

                newRow.push([component, component, component, 255]);
            }

            result.push(newRow);
        }

        return result;
    }

    return getImage
}
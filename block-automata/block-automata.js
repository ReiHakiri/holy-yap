import * as om from "../helpers/other-math.js"

function blockCopy (grid, x, y, width) {
    const result = [];

    for (let j = 0; j < width; j++) {
        const row = [];

        for (let i = 0; i < width; i++) {
            const new_y = y + j;
            const new_x = x + i;

            row.push(grid[new_y][new_x]);
        }
        result.push(row);
    }

    return result;
}

function blockUpdate (grid, x, y, width, rule) {
    const copy = blockCopy(grid, x, y, width);
    const newBlock = rule.get(JSON.stringify(copy));

    for (let j = 0; j < width; j++) {
        for (let i = 0; i < width; i++) {
            const new_y = y + j;
            const new_x = x + i;

            grid[new_y][new_x] = newBlock[j][i];
        }
    }
}

function twoDeepCopy (l) {
    const result = [];

    for (const row of l) {
        const new_row = [];

        for (const element of row) {
            new_row.push(element);
        }

        result.push(new_row);
    }

    return result;
}

export class BlockAutomata {
    constructor (rule, state, firstPhase, divisions) {
        this.rule = rule;
        this.state = state;
        this.firstPhase = firstPhase;

        this.width = om.floorDiv(this.state[0].length, divisions);
        this.divisions = divisions;
    }

    halfUpdate () {
        let offset;
        let times;

        if (this.firstPhase) {
            offset = 0;
            times = this.divisions;
        } else {
            offset = om.floorDiv(this.width, 2);
            times = this.divisions - 1;
        }

        for (let timesY = 0; timesY < times; timesY++) {
            for (let timesX = 0; timesX < times; timesX++) {
                const y = this.width * timesY + offset;
                const x = this.width * timesX + offset;

                blockUpdate(this.state, x, y, this.width, this.rule);
            }
        }

        this.firstPhase = !this.firstPhase;
    }

    update () {
        this.halfUpdate();
        this.halfUpdate();
    }

    getState () {
        return twoDeepCopy(this.state);
    }
}

function inverse_map (map) {
    const result = new Map();

    for (const [key, value] of map) {
        result.set(JSON.stringify(value), JSON.parse(key))
    }

    return result
}

export class ReversibleBlockAutomata extends BlockAutomata {
    reverse () {
        return new ReversibleBlockAutomata(inverse_map(this.rule), this.getState(), !this.firstPhase, this.divisions);
    }
}
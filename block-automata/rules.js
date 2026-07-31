import * as om from "../helpers/other-math.js"
import * as bd from "./display.js"

export function defaultRule (n) {
    const result = new Map();

    for (const unFlatState of om.allLists([false, true], n ** 2)) {
        const state = bd.flatten(unFlatState, n);
        result.set(JSON.stringify(state), state);
    }

    return result;
}

// From https://en.wikipedia.org/wiki/Block_cellular_automaton
export const TRON_RULE = defaultRule(2);
TRON_RULE.set(JSON.stringify([[false, false], [false, false]]), [[true, true], [true, true]]);
TRON_RULE.set(JSON.stringify([[true, true], [true, true]]), [[false, false], [false, false]]);

// From https://cell-auto.com/bbm/2d/index.html
export const BMM_RULE = defaultRule(2);
BMM_RULE.set(JSON.stringify([[true, false], [false, false]]), [[false, false], [false, true]])
BMM_RULE.set(JSON.stringify([[false, true], [false, false]]), [[false, false], [true, false]])
BMM_RULE.set(JSON.stringify([[false, false], [true, false]]), [[false, true], [false, false]])
BMM_RULE.set(JSON.stringify([[false, false], [false, true]]), [[true, false], [false, false]])

BMM_RULE.set(JSON.stringify([[true, false], [false, true]]), [[false, true], [true, false]])
BMM_RULE.set(JSON.stringify([[false, true], [true, false]]), [[true, false], [false, true]])

export const SP_RULE = defaultRule(4);
SP_RULE.set(JSON.stringify([[false, false, false, false],
                            [false, false, false, false],
                            [false, false, false, false],
                            [false, false, false, false]]),
                            
                           [[true, false, false, true],
                            [false, true, true, false],
                            [false, true, true, false],
                            [true, false, false, true]])

SP_RULE.set(JSON.stringify([[true, false, false, true],
                            [false, true, true, false],
                            [false, true, true, false],
                            [true, false, false, true]]),
                            
                           [[true, true, true, true],
                            [true, false, false, true],
                            [true, false, false, true],
                            [true, true, true, true]])

SP_RULE.set(JSON.stringify([[true, true, true, true],
                            [true, false, false, true],
                            [true, false, false, true],
                            [true, true, true, true]]),
                            
                           [[false, false, false, false],
                            [false, false, false, false],
                            [false, false, false, false],
                            [false, false, false, false]])

export const EX_RULE = defaultRule(2);
EX_RULE.set(JSON.stringify([[true, false], [false, false]]), [[true, true], [true, true]]);
EX_RULE.set(JSON.stringify([[true, true], [true, true]]), [[false, false], [false, false]]);
EX_RULE.set(JSON.stringify([[false, false], [false, false]]), [[false, false], [false, true]]);
EX_RULE.set(JSON.stringify([[false, false], [false, true]]), [[true, false], [false, false]]);

// From https://en.wikipedia.org/wiki/Critters_(cellular_automaton)
export const CRITTERS_RULE = defaultRule(2);
CRITTERS_RULE.set(JSON.stringify([[false, false], [false, false]]), [[true, true], [true, true]]);
CRITTERS_RULE.set(JSON.stringify([[false, false], [false, true]]), [[true, true], [true, false]]);
CRITTERS_RULE.set(JSON.stringify([[false, false], [true, false]]), [[true, true], [false, true]]);
CRITTERS_RULE.set(JSON.stringify([[false, true], [false, false]]), [[true, false], [true, true]]);
CRITTERS_RULE.set(JSON.stringify([[false, true], [true, true]]), [[false, false], [false, true]]);
CRITTERS_RULE.set(JSON.stringify([[true, false], [false, false]]), [[false, true], [true, true]]);
CRITTERS_RULE.set(JSON.stringify([[true, false], [true, true]]), [[false, false], [true, false]]);
CRITTERS_RULE.set(JSON.stringify([[true, true], [false, true]]), [[false, true], [false, false]]);
CRITTERS_RULE.set(JSON.stringify([[true, true], [true, false]]), [[true, false], [false, false]]);
CRITTERS_RULE.set(JSON.stringify([[true, true], [true, true]]), [[false, false], [false, false]]);
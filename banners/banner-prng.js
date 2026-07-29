import * as ba from "../block-automata/block-automata.js"
import * as bd from "../block-automata/display.js"
import * as rules from "../block-automata/rules.js"
import * as d from "../helpers/display.js"

const canvas1 = document.getElementById("banner1");
const ctx1 = canvas1.getContext("2d");

const image1 = bd.blankImage(256);
bd.addRect(image1, 0, 64, 0, 128);
bd.addRect(image1, 192, 256, 0, 128);
bd.addRect(image1, 0, 256, 64, 128);
bd.addRect(image1, 80, 176, 128, 256);

const bij1 = bd.randLongBij(4);
const automaton1 = new ba.ReversibleBlockAutomata(bij1, image1, true, 64);

const update1 = bd.updateAnimation(automaton1);
const animation1 = new d.Animation(update1, ctx1);

animation1.begin();
animation1.changePause();

console.log("Loaded canvas 1");

const canvas2 = document.getElementById("banner2");
const ctx2 = canvas2.getContext("2d");

const image2 = bd.blankImage(512);
bd.addRect(image2, 104, 144, 0, 256);
bd.addRect(image2, 184, 224, 0, 256);
bd.addRect(image2, 104, 224, 0, 40);
bd.addRect(image2, 104, 224, 80, 120);

const bij2 = rules.TRON_RULE;
const automaton2 = new ba.ReversibleBlockAutomata(bij2, image2, true, 256);

const update2 = bd.updateAnimation(automaton2);
const animation2 = new d.Animation(update2, ctx2);

animation2.begin();
animation2.changePause();

console.log("Loaded canvas 2");

const canvas3 = document.getElementById("banner3");
const ctx3 = canvas3.getContext("2d");

const image3 = bd.blankImage(512);
bd.addRect(image3, 200, 240, 0, 256);
bd.addRect(image3, 200, 320, 0, 40)
bd.addRect(image3, 200, 320, 80, 120)
bd.addRect(image3, 280, 320, 0, 120)

const bij3 = rules.SP_RULE;
const automaton3 = new ba.ReversibleBlockAutomata(bij3, image3, true, 128);

const update3 = bd.updateAnimation(automaton3);
const animation3 = new d.Animation(update3, ctx3);

animation3.begin();
animation3.changePause();

console.log("Loaded canvas 3");
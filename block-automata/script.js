import * as ba from "../block-automata/block-automata.js"
import * as bd from "../block-automata/display.js"
import * as rules from "./rules.js"
import * as prng from "./prng.js"
import * as d from "../helpers/display.js"

const exBalls = document.getElementById("ex-balls");
const exBallsCtx = exBalls.getContext("2d");

const exBallsImage = bd.blankImage(256);
bd.addRect(exBallsImage, 0, 2, 0, 256);
bd.addRect(exBallsImage, 253, 256, 0, 256);
bd.addRect(exBallsImage, 0, 256, 0, 2);
bd.addRect(exBallsImage, 0, 256, 253, 256);
bd.addNoiseRect(exBallsImage, 2, 253, 2, 253, 0.01);

const exBallsA = new ba.ReversibleBlockAutomata(rules.BMM_RULE, exBallsImage, true, 128);

const exBallsUpdate = bd.updateAnimation(exBallsA);
const exBallsAnimation = new d.Animation(exBallsUpdate, exBallsCtx);

exBallsAnimation.begin();
exBallsAnimation.changePause()

const tron = document.getElementById("ex-tron");
const tronCtx = tron.getContext("2d");

const tronImage = bd.blankImage(256);
bd.addRect(tronImage, 64, 128, 64, 128);
bd.addRect(tronImage, 200, 256, 150, 200);

const tronA = new ba.ReversibleBlockAutomata(rules.TRON_RULE, tronImage, true, 128);

const tronUpdate = bd.updateAnimation(tronA);
const tronAnimation = new d.Animation(tronUpdate, tronCtx);

tronAnimation.begin();
tronAnimation.changePause()

const rand = document.getElementById("ex-random");
const randCtx = rand.getContext("2d");

const randImage = bd.blankImage(256);

const randA = new ba.ReversibleBlockAutomata(bd.randLongBij(2), randImage, true, 128);

const randUpdate = bd.updateAnimation(randA);
const randAnimation = new d.Animation(randUpdate, randCtx);

randAnimation.begin();
randAnimation.changePause()

const ex = document.getElementById("ex-ex");
const exCtx = ex.getContext("2d");

const exImage = bd.blankImage(256);
bd.addRect(exImage, 160, 192, 0, 256)

const exA = new ba.ReversibleBlockAutomata(rules.EX_RULE, exImage, true, 128);
const revA = exA.reverse();

const exUpdate = bd.updateAnimation(exA);
const exAnimation = new d.Animation(exUpdate, exCtx);

exAnimation.begin();
exAnimation.changePause()

const rev = document.getElementById("ex-rev");
const revCtx = rev.getContext("2d");

const revImage = bd.blankImage(256);
bd.addRect(revImage, 160, 192, 0, 256)

const revUpdate = bd.updateAnimation(revA);
const revAnimation = new d.Animation(revUpdate, revCtx);

revAnimation.begin();
revAnimation.changePause()

const rand2 = document.getElementById("ex-random2");
const rand2Ctx = rand2.getContext("2d");

const rand2Image = bd.blankImage(256);

const rand2A = new ba.ReversibleBlockAutomata(bd.randLongBij(4), rand2Image, true, 64);

const rand2Update = bd.updateAnimation(rand2A);
const rand2Animation = new d.Animation(rand2Update, rand2Ctx);

rand2Animation.begin();
rand2Animation.changePause();
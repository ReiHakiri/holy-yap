function arrayToImageData (l) {
    const result = [];

    for (const row of l) {
        for (const color of row) {
            for (const coord of color) {
                result.push(coord);
            }
        }
    }

    const width = l[0].length;
    const height = l.length;

    return new ImageData(new Uint8ClampedArray(result), width, height);
}

export class Animation {
    constructor (update, ctx) {
        this.update = update;
        this.ctx = ctx;
        this.pause = true;
    }

    begin () {
        if (!this.pause) {
            this.pause = this.update(this.ctx);
        }

        requestAnimationFrame(this.begin.bind(this));
    }

    changePause () {
        this.pause = !this.pause;
    }
}

export function updateCanvas2d (update) {
    function result (ctx) {
        ctx.putImageData(arrayToImageData(update()), 0, 0);
    }

    return result;
}
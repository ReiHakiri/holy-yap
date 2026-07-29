export function draw (canvas, update) {
    let drawing = false;

    function startDraw () {
        drawing = true;
    }

    function endDraw () {
        drawing = false;
    }

    function getPointerPos(e) {
        const rect = canvas.getBoundingClientRect();

        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function moveDraw (e) {
        if (!drawing) {
            return;
        }

        const { x , y } = getPointerPos(e);

        update(x, y);
    }

    canvas.addEventListener("pointerdown", startDraw);
    canvas.addEventListener("pointerup", endDraw);
    canvas.addEventListener("pointerleave", endDraw);
    canvas.addEventListener("pointermove", moveDraw);
}
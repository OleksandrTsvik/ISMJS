export class Painting {
    _canvas;
    _ctx;
    _color;
    _isMouseDown;
    constructor(idCanvas, color = 'black') {
        this._canvas = document.getElementById(idCanvas);
        this._ctx = this._canvas.getContext('2d');
        this._color = color;
        this._isMouseDown = false;
    }

    drawBrush(x, y, radius, color = this._color) {
        if (this._isMouseDown) {
            this._ctx.lineWidth = 2 * radius;
            this._ctx.fillStyle = color;
            this._ctx.strokeStyle = color;

            this._ctx.lineTo(x, y);
            this._ctx.stroke();

            this._ctx.beginPath();
            this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this._ctx.fill();

            this._ctx.beginPath();
            this._ctx.moveTo(x, y);
        }
    }

    drawLine(x1, y1, x2, y2, radius, color = this._color) {
        if (!this._isMouseDown) {
            this._ctx.beginPath();
            this._ctx.lineWidth = 2 * radius;
            this._ctx.strokeStyle = color;
            this._ctx.moveTo(x1, y1);
            this._ctx.lineTo(x2, y2);
            this._ctx.stroke();
            this._ctx.closePath();
        }
    }

    // drawRectangle() {}

    // drawEllipse() {}

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.offsetWidth, this._canvas.offsetHeight);
    }

    changeMouseDown() {
        this._isMouseDown = !this._isMouseDown;
        this._ctx.beginPath();
    }

    setCanvas(value) {
        this._canvas = value;
    }
    getCanvas() {
        return this._canvas;
    }

    setCtx(value) {
        this._ctx = value;
    }
    getCtx() {
        return this._ctx;
    }

    setColor(value) {
        this._color = value;
    }
    getColor() {
        return this._color;
    }

    setIsMouseDown(value) {
        this._isMouseDown = value;
    }
    getIsMouseDown() {
        return this._isMouseDown;
    }
}
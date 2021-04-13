export class Figure {
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

    draw(x, y, radius, color = this._color) {
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

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.offsetWidth, this._canvas.offsetHeight);
    }

    switchMouseDown() {
        this._isMouseDown = !this._isMouseDown;
        this._ctx.beginPath();
    }

    setColor(value) {
        this._color = value;
    }
}
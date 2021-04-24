export class Painting {
    _canvas;
    _ctx;
    _colorFill;
    _colorStroke;
    _isMouseDown;
    constructor(idCanvas, colorFill = 'black', colorStroke = 'black') {
        this._canvas = document.getElementById(idCanvas);
        this._ctx = this._canvas.getContext('2d');
        this._colorFill = colorFill;
        this._colorStroke = colorStroke;
        this._isMouseDown = false;
    }

    drawBrush(x, y, radius, colorFill = 'black') {
        if (this._isMouseDown) {
            this._ctx.lineWidth = 2 * radius;
            this._ctx.fillStyle = colorFill;
            this._ctx.strokeStyle = colorFill;

            this._ctx.lineTo(x, y);
            this._ctx.stroke();

            this._ctx.beginPath();
            this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this._ctx.fill();

            this._ctx.beginPath();
            this._ctx.moveTo(x, y);
        }
    }

    drawLine(x1, y1, x2, y2, radius, color = this._colorStroke) {
        if (!this._isMouseDown) {
            this.beginPath(radius, color, color);
            this._ctx.moveTo(x1, y1);
            this._ctx.lineTo(x2, y2);
            this.closePath();
        }
    }

    drawRectangle(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        if (!this._isMouseDown) {
            this.beginPath(radius, colorStroke, colorFill);
            this._ctx.rect(x1, y1, x2 - x1, y2 - y1);
            this.closePath(isBorder, isFill);
        }
    }

    drawCircle(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        if (!this._isMouseDown) {
            this.beginPath(radius, colorStroke, colorFill);
            this._ctx.arc(x1, y1,
                    Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5) / 2,
                    0, 2 * Math.PI, false);
            this.closePath(isBorder, isFill);
        }
    }

    drawEllipse(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        if (!this._isMouseDown) {
            this.beginPath(radius, colorStroke, colorFill);
            this._ctx.ellipse(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1), 0, 0, 2 * Math.PI, false);
            this.closePath(isBorder, isFill);
        }
    }

    beginPath(radius, colorStroke, colorFill) {
        this._ctx.beginPath();
        this._ctx.lineWidth = 2 * radius;
        this._ctx.fillStyle = colorFill;
        this._ctx.strokeStyle = colorStroke;
    }
    closePath(isBorder = true, isFill = false) {
        if (isBorder || (isBorder === false && isFill === false))
            this._ctx.stroke();
        if (isFill)
            this._ctx.fill();
        this._ctx.closePath();
    }

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

    setColorFill(value) {
        this._colorFill = value;
    }
    getColorFill() {
        return this._colorFill;
    }

    setColorStroke(value) {
        this._colorStroke = value;
    }
    getColorStroke() {
        return this._colorStroke;
    }

    setIsMouseDown(value) {
        this._isMouseDown = value;
    }
    getIsMouseDown() {
        return this._isMouseDown;
    }
}
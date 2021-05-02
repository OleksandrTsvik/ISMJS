export class Painting {
    _canvas;
    _ctx;
    _colorFill;
    _colorStroke;
    _isMouseDown;
    #drawingHistory = [{'painting': 'completed'}];
    constructor(canvas, colorFill = 'black', colorStroke = 'black') {
        this._canvas = canvas;
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
        if (this._isMouseDown) {
            this.beginPath(radius, color, color);
            this._ctx.moveTo(x1, y1);
            this._ctx.lineTo(x2, y2);
            this.closePath();
        }
    }

    drawRectangle(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        if (this._isMouseDown) {
            this.beginPath(radius, colorStroke, colorFill);
            this._ctx.rect(x1, y1, x2 - x1, y2 - y1);
            this.closePath(isBorder, isFill);
        }
    }

    drawCircle(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        if (this._isMouseDown) {
            this.beginPath(radius, colorStroke, colorFill);
            this._ctx.arc(x1, y1,
                    Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5) / 2,
                    0, 2 * Math.PI, false);
            this.closePath(isBorder, isFill);
        }
    }

    drawEllipse(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        if (this._isMouseDown) {
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

    redrawBrush(x, y, radius, colorFill) {
        if (this._isMouseDown) {
            this.#drawingHistory.push( {'draw': 'Brush', 'painting': 'completed', x, y, radius, colorFill} );
            this.drawBrush(x, y, radius, colorFill);
        } else if (this.#drawingHistory[this.#drawingHistory.length - 1].draw !== 'beginPath') {
            this.#drawingHistory.push({'draw': 'beginPath', 'painting': 'completed'});
        }
    }

    redrawLine(x1, y1, x2, y2, radius, color) {
        this.#redrawShape('Line', {x1, y1, x2, y2, radius, color});
    }

    redrawRectangle(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill, isBorder, isFill) {
        this.#redrawShape('Rectangle', {x1, y1, x2, y2, radius, colorStroke, colorFill, isBorder, isFill});
    }

    redrawCircle(x1, y1, x2, y2, radius, colorStroke, colorFill, isBorder, isFill) {
        this.#redrawShape('Circle', {x1, y1, x2, y2, radius, colorStroke, colorFill, isBorder, isFill});
    }

    redrawEllipse(x1, y1, x2, y2, radius, colorStroke = 'black', colorFill = 'black', isBorder = true, isFill = false) {
        this.#redrawShape('Ellipse', {x1, y1, x2, y2, radius, colorStroke, colorFill, isBorder, isFill});
    }

    #redrawShape(shape, propShape) {
        if (this._isMouseDown) {
            if (this.#drawingHistory[this.#drawingHistory.length - 1].painting === 'completed')
                this.#drawingHistory.push( {'draw': shape, 'painting': 'started', ...propShape} );
            else
                this.#drawingHistory[this.#drawingHistory.length - 1] = {'draw': shape, 'painting': 'started', ...propShape};

            this.redraw();
        } else {
            this.#drawingHistory[this.#drawingHistory.length - 1].painting = 'completed';
        }
    }

    redraw() {
        this.clearCanvas();

        for (let i = 0; i < this.#drawingHistory.length; i++) {
            if (this.#drawingHistory[i].draw !== 'Brush')
                this._ctx.beginPath();

            switch (this.#drawingHistory[i].draw) {
                case 'Brush':
                    this.drawBrush(this.#drawingHistory[i].x, this.#drawingHistory[i].y, this.#drawingHistory[i].radius, this.#drawingHistory[i].colorFill);
                    break;
                case 'Line':
                    this.drawLine(this.#drawingHistory[i].x1, this.#drawingHistory[i].y1, this.#drawingHistory[i].x2, this.#drawingHistory[i].y2, this.#drawingHistory[i].radius, this.#drawingHistory[i].color);
                    break;
                case 'Rectangle':
                    this.drawRectangle(this.#drawingHistory[i].x1, this.#drawingHistory[i].y1, this.#drawingHistory[i].x2, this.#drawingHistory[i].y2, this.#drawingHistory[i].radius, this.#drawingHistory[i].colorStroke, this.#drawingHistory[i].colorFill, this.#drawingHistory[i].isBorder, this.#drawingHistory[i].isFill);
                    break;
                case 'Circle':
                    this.drawCircle(this.#drawingHistory[i].x1, this.#drawingHistory[i].y1, this.#drawingHistory[i].x2, this.#drawingHistory[i].y2, this.#drawingHistory[i].radius, this.#drawingHistory[i].colorStroke, this.#drawingHistory[i].colorFill, this.#drawingHistory[i].isBorder, this.#drawingHistory[i].isFill);
                    break;
                case 'Ellipse':
                    this.drawEllipse(this.#drawingHistory[i].x1, this.#drawingHistory[i].y1, this.#drawingHistory[i].x2, this.#drawingHistory[i].y2, this.#drawingHistory[i].radius, this.#drawingHistory[i].colorStroke, this.#drawingHistory[i].colorFill, this.#drawingHistory[i].isBorder, this.#drawingHistory[i].isFill);
                    break;
                case 'beginPath':
                    this._ctx.beginPath();
                    break;
            }
        }
    }

    clear() {
        this.#drawingHistory = [{'painting': 'completed'}];
        this.clearCanvas();
    }

    clearCanvas() {
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
        this._ctx.beginPath();
    }
    getIsMouseDown() {
        return this._isMouseDown;
    }
}
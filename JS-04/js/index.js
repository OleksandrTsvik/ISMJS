'use strict';
import { Painting } from "./libs/Painting.js";

let
    canvas = document.getElementById('c1'),
    selectedColorPen = document.getElementById('color-pen'),
    inputWidthPen = document.getElementById('width-pen'),
    listWidthPen = document.getElementById('list-width-pen'),
    radioArrPens = document.getElementsByName('pen'),
    btnClearCanvas = document.getElementById('clear-c1');

let
    tempWidthPen,
    figureDrawing,
    x1, y1,
    x2, y2,
    paint = new Painting('c1');

canvas.addEventListener('mousedown', function(event) {
    paint.changeMouseDown();

    x1 = event.offsetX;
    y1 = event.offsetY;

    if (inputWidthPen.value === '') {
        inputWidthPen.value = tempWidthPen;
    } else {
        tempWidthPen = inputWidthPen.value;
    }
});

canvas.addEventListener('mouseup', function(event) {
    paint.changeMouseDown();

    x2 = event.offsetX;
    y2 = event.offsetY;
});

canvas.addEventListener('mousemove', function(e) {
    paint.setColor(selectedColorPen.value);

    if (figureDrawing === 'Brush') {
        paint.drawBrush(e.offsetX, e.offsetY, tempWidthPen);
    } else if (figureDrawing === 'Line') {
        paint.drawLine(x1, y1, x2, y2, tempWidthPen);
    } else if (figureDrawing === 'Rectangle') {
        // paint.drawRectangle();
    } else if (figureDrawing === 'Ellipse') {
        // paint.drawEllipse();
    } else if (figureDrawing === 'Eraser') {
        paint.setColor(window.getComputedStyle(canvas).backgroundColor);
        paint.drawBrush(e.offsetX, e.offsetY, tempWidthPen);
    }
});

canvas.addEventListener('mouseout', function() {
    paint.setIsMouseDown(false);
    x1 = x2 = y1 = y2 = 0;
});

inputWidthPen.addEventListener('click', function() {
    tempWidthPen = inputWidthPen.value;
    inputWidthPen.value = '';
});

radioArrPens.forEach(radioBtn => radioBtn.addEventListener(('click'), function() {
    figureDrawing = radioBtn.value;
}));

btnClearCanvas.addEventListener('click', function() {
    paint.clear();
});

// Початкові значення при завантаженні сторінки
canvas.width = window.innerWidth * 0.81;
canvas.height = window.innerHeight * 0.81;
radioArrPens[0].checked = true;
figureDrawing = 'Brush';
inputWidthPen.value = 10;

for (let i = 1; i <= 2000; ) {
    let elemOption = document.createElement('option');
    elemOption.innerHTML = i.toString();
    listWidthPen.append(elemOption);
    if (i < 15) {
        i++;
    } else if (i >= 15 && i < 100) {
        i += 5;
    } else if (i >= 100 && i < 500) {
        i += 25;
    } else if (i >= 500 && i < 1000) {
        i += 50;
    } else if (i >= 1000 && i < 2000) {
        i += 100;
    } else break;
}
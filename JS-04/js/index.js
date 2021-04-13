'use strict';
import { Figure } from "./libs/Figure.js";

let
    canvas = document.getElementById('c1'),
    selectedColorPen = document.getElementById('color-pen'),
    inputWidthPen = document.getElementById('width-pen'),
    listWidthPen = document.getElementById('list-width-pen'),
    btnClearPen = document.getElementById('clear-pen'),
    btnClearCanvas = document.getElementById('clear-c1');

let
    tempWidthPen,
    figure = new Figure('c1');

canvas.addEventListener('mousedown', function() {
    figure.switchMouseDown();

    if (inputWidthPen.value === '') {
        inputWidthPen.value = tempWidthPen;
    } else {
        tempWidthPen = inputWidthPen.value;
    }
});

canvas.addEventListener('mouseup', function() {
    figure.switchMouseDown();
});

canvas.addEventListener('mousemove', function(e) {
    figure.draw(e.offsetX, e.offsetY, tempWidthPen);
});

selectedColorPen.addEventListener('input', function() {
    figure.setColor(selectedColorPen.value);
});

inputWidthPen.addEventListener('click', function() {
    tempWidthPen = inputWidthPen.value;
    inputWidthPen.value = '';
});

btnClearPen.addEventListener('click', function() {
    figure.setColor(window.getComputedStyle(canvas).backgroundColor);
});

btnClearCanvas.addEventListener('click', function() {
    figure.clear();
});

// Початкові значення при завантаженні сторінки
canvas.width = window.innerWidth * 0.81;
canvas.height = window.innerHeight * 0.81;
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
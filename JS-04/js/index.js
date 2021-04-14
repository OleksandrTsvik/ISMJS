'use strict';
import { Painting } from "./libs/Painting.js";

let
    canvas = document.getElementById('c1'),
    selectedColorPen = document.getElementById('color-pen'),
    inputWidthPen = document.getElementById('width-pen'),
    spanColorPaint = document.getElementById('color-paint'),
    spanWidthPaint = document.getElementById('width-paint'),
    listWidthPen = document.getElementById('list-width-pen'),
    radioArrPens = document.getElementsByName('pen'),
    radioBrushPen = document.getElementById('brush-pen'),
    radioLinePen = document.getElementById('line-pen'),
    radioRectanglePen = document.getElementById('rectangle-pen'),
    radioEllipsePen = document.getElementById('ellipse-pen'),
    radioClearPen = document.getElementById('clear-pen'),
    labelsStylePen = document.getElementsByClassName('style-pen'),
    labelsStyleRectangle = document.getElementsByClassName('style-rectangle'),
    labelsStyleEllipse = document.getElementsByClassName('style-ellipse'),
    inputRectangleColorFill = document.getElementById('rectangle-color-fill'),
    inputRectangleColorStroke = document.getElementById('rectangle-color-stroke'),
    inputEllipseColorFill = document.getElementById('ellipse-color-fill'),
    inputEllipseColorStroke = document.getElementById('ellipse-color-stroke'),
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
    if (figureDrawing === 'Brush') {
        paint.drawBrush(e.offsetX, e.offsetY, tempWidthPen, selectedColorPen.value);
    } else if (figureDrawing === 'Line') {
        paint.drawLine(x1, y1, x2, y2, tempWidthPen, selectedColorPen.value);
    } else if (figureDrawing === 'Rectangle') {
        paint.drawRectangle(x1, y1, x2, y2, tempWidthPen, inputRectangleColorFill.value, inputRectangleColorStroke.value);
    } else if (figureDrawing === 'Ellipse') {
        paint.drawEllipse(x1, y1, x2, y2, tempWidthPen, inputEllipseColorFill.value, inputEllipseColorStroke.value);
    } else if (figureDrawing === 'Eraser') {
        paint.drawBrush(e.offsetX, e.offsetY, tempWidthPen, window.getComputedStyle(canvas).backgroundColor);
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

radioBrushPen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStylePen, 'block');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanColorPaint.innerHTML = 'Колір пензлика: ';
    spanWidthPaint.innerHTML = 'Товщина пензлика: ';
});

radioLinePen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStylePen, 'block');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanColorPaint.innerHTML = 'Колір лінії: ';
    spanWidthPaint.innerHTML = 'Товщина лінії: ';
});

radioRectanglePen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'block');
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioEllipsePen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'block');
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioClearPen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Товщина гумки: ';
});

btnClearCanvas.addEventListener('click', function() {
    paint.clear();
});

// *** Початкові значення при завантаженні сторінки ***
canvas.width = window.innerWidth * 0.81;
canvas.height = window.innerHeight * 0.81;
radioArrPens[0].checked = true;
figureDrawing = 'Brush';
inputWidthPen.value = 10;
changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');

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
// ****************************************************

function changeDisplayStyle(idTag, value) {
    idTag.style.display = value;
}

function changeDisplayStyleArrayTags(arrIdTags, value) {
    for (let i = 0; i < arrIdTags.length; i++)
        changeDisplayStyle(arrIdTags[i], value);
}
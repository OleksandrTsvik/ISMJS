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
    radioArrRectangle = document.getElementsByName('rectangle'),
    radioArrCircle = document.getElementsByName('circle'),
    radioArrEllipse = document.getElementsByName('ellipse'),
    radioBrushPen = document.getElementById('brush-pen'),
    radioLinePen = document.getElementById('line-pen'),
    radioRectanglePen = document.getElementById('rectangle-pen'),
    radioRectangleStroke = document.getElementById('rectangle-stroke'),
    radioRectangleFill = document.getElementById('rectangle-fill'),
    radioRectangleStrokeAndFill = document.getElementById('rectangle-stroke-fill'),
    radioCirclePen = document.getElementById('circle-pen'),
    radioCircleStroke = document.getElementById('circle-stroke'),
    radioCircleFill = document.getElementById('circle-fill'),
    radioCircleStrokeAndFill = document.getElementById('circle-stroke-fill'),
    radioEllipsePen = document.getElementById('ellipse-pen'),
    radioEllipseStroke = document.getElementById('ellipse-stroke'),
    radioEllipseFill = document.getElementById('ellipse-fill'),
    radioEllipseStrokeAndFill = document.getElementById('ellipse-stroke-fill'),
    radioClearPen = document.getElementById('clear-pen'),
    labelsStylePen = document.getElementsByClassName('style-pen'),
    labelsStyleRectangle = document.getElementsByClassName('style-rectangle'),
    labelsStyleCircle = document.getElementsByClassName('style-circle'),
    labelsStyleEllipse = document.getElementsByClassName('style-ellipse'),
    inputRectangleColorFill = document.getElementById('rectangle-color-fill'),
    inputRectangleColorStroke = document.getElementById('rectangle-color-stroke'),
    inputCircleColorFill = document.getElementById('circle-color-fill'),
    inputCircleColorStroke = document.getElementById('circle-color-stroke'),
    inputEllipseColorFill = document.getElementById('ellipse-color-fill'),
    inputEllipseColorStroke = document.getElementById('ellipse-color-stroke'),
    btnClearCanvas = document.getElementById('clear-c1');

let
    tempWidthPen,
    figureDrawing,
    x1, y1,
    paint = new Painting(canvas);

canvas.addEventListener('mousedown', function(event) {
    paint.setIsMouseDown(true);

    x1 = event.offsetX;
    y1 = event.offsetY;

    if (inputWidthPen.value === '') {
        inputWidthPen.value = tempWidthPen;
    } else {
        tempWidthPen = inputWidthPen.value;
    }
});

canvas.addEventListener('mouseup', function() {
    paint.setIsMouseDown(false);
});

canvas.addEventListener('mousemove', function(e) {
    switch (figureDrawing) {
        case 'Brush':
            paint.redrawBrush(e.offsetX, e.offsetY, tempWidthPen, selectedColorPen.value);
            break;
        case 'Line':
            paint.redrawLine(x1, y1, e.offsetX, e.offsetY, tempWidthPen, selectedColorPen.value);
            break;
        case 'Rectangle':
        case 'RectangleStrokeAndFill':
            paint.redrawRectangle(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputRectangleColorStroke.value, inputRectangleColorFill.value, true, true);
            break;
        case 'RectangleFill':
            paint.redrawRectangle(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputRectangleColorStroke.value, inputRectangleColorFill.value, false, true);
            break;
        case 'RectangleStroke':
            paint.redrawRectangle(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputRectangleColorStroke.value, inputRectangleColorFill.value);
            break;
        case 'Circle':
        case 'CircleStrokeAndFill':
            paint.redrawCircle(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputCircleColorStroke.value, inputCircleColorFill.value, true, true);
            break;
        case 'CircleFill':
            paint.redrawCircle(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputCircleColorStroke.value, inputCircleColorFill.value, false, true);
            break;
        case 'CircleStroke':
            paint.redrawCircle(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputCircleColorStroke.value, inputCircleColorFill.value);
            break;
        case 'Ellipse':
        case 'EllipseStrokeAndFill':
            paint.redrawEllipse(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputEllipseColorStroke.value, inputEllipseColorFill.value, true, true);
            break;
        case 'EllipseFill':
            paint.redrawEllipse(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputEllipseColorStroke.value, inputEllipseColorFill.value, false, true);
            break;
        case 'EllipseStroke':
            paint.redrawEllipse(x1, y1, e.offsetX, e.offsetY, tempWidthPen, inputEllipseColorStroke.value, inputEllipseColorFill.value);
            break;
        case 'Eraser':
            paint.redrawBrush(e.offsetX, e.offsetY, tempWidthPen, window.getComputedStyle(canvas).backgroundColor);
            break;
    }
});

canvas.addEventListener('mouseout', function() {
    paint.setIsMouseDown(false);
});

inputWidthPen.addEventListener('click', function() {
    tempWidthPen = inputWidthPen.value;
    inputWidthPen.value = '';
});

radioArrPens.forEach(radioBtn => radioBtn.addEventListener(('click'), function() {
    figureDrawing = radioBtn.value;
}));

radioArrRectangle.forEach(radioBtn => radioBtn.addEventListener(('click'), function() {
    figureDrawing = radioBtn.value;
}));

radioArrCircle.forEach(radioBtn => radioBtn.addEventListener(('click'), function() {
    figureDrawing = radioBtn.value;
}));

radioArrEllipse.forEach(radioBtn => radioBtn.addEventListener(('click'), function() {
    figureDrawing = radioBtn.value;
}));

radioBrushPen.addEventListener('click', function() {
    changeDisplayStyleElemArrValue(labelsStylePen, 'block', labelsStyleRectangle, 'none', labelsStyleCircle, 'none', labelsStyleEllipse, 'none');
    spanColorPaint.innerHTML = 'Колір пензлика: ';
    spanWidthPaint.innerHTML = 'Товщина пензлика: ';
});

radioLinePen.addEventListener('click', function() {
    changeDisplayStyleElemArrValue(labelsStylePen, 'block', labelsStyleRectangle, 'none', labelsStyleCircle, 'none', labelsStyleEllipse, 'none');
    spanColorPaint.innerHTML = 'Колір лінії: ';
    spanWidthPaint.innerHTML = 'Товщина лінії: ';
});

radioRectanglePen.addEventListener('click', function() {
    radioArrRectangle[2].checked = true;
    changeDisplayStyleElemArrValue(labelsStylePen, 'none', labelsStyleRectangle, 'block', labelsStyleCircle, 'none', labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioCirclePen.addEventListener('click', function() {
    radioArrCircle[2].checked = true;
    changeDisplayStyleElemArrValue(labelsStylePen, 'none', labelsStyleRectangle, 'none', labelsStyleCircle, 'block', labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioEllipsePen.addEventListener('click', function() {
    radioArrEllipse[2].checked = true;
    changeDisplayStyleElemArrValue(labelsStylePen, 'none', labelsStyleRectangle, 'none', labelsStyleCircle, 'none', labelsStyleEllipse, 'block');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioClearPen.addEventListener('click', function() {
    changeDisplayStyleElemArrValue(labelsStylePen, 'none', labelsStyleRectangle, 'none', labelsStyleCircle, 'none', labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Товщина гумки: ';
});

radioRectangleStroke.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleRectangle[3], 'none', labelsStyleRectangle[4], 'block'));

radioRectangleFill.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleRectangle[3], 'block', labelsStyleRectangle[4], 'none'));

radioRectangleStrokeAndFill.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleRectangle[3], 'block', labelsStyleRectangle[4], 'block'));

radioCircleStroke.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleCircle[3], 'none', labelsStyleCircle[4], 'block'));

radioCircleFill.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleCircle[3], 'block', labelsStyleCircle[4], 'none'));

radioCircleStrokeAndFill.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleCircle[3], 'block', labelsStyleCircle[4], 'block'));

radioEllipseStroke.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleEllipse[3], 'none', labelsStyleEllipse[4], 'block'));

radioEllipseFill.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleEllipse[3], 'block', labelsStyleEllipse[4], 'none'));

radioEllipseStrokeAndFill.addEventListener('click', () => changeDisplayStyleElemValue(labelsStyleEllipse[3], 'block', labelsStyleEllipse[4], 'block'));

btnClearCanvas.addEventListener('click', function() {
    paint.clear();
});

// *** Початкові значення при завантаженні сторінки ***
canvas.width = window.innerWidth * 0.81;
canvas.height = window.innerHeight * 0.81;
radioArrPens[0].checked = true;
figureDrawing = 'Brush';
inputWidthPen.value = 10;
changeDisplayStyleElemArrValue(labelsStyleRectangle, 'none', labelsStyleCircle, 'none', labelsStyleEllipse, 'none');

let objSteps = {
    firstStep: 1,
    15: 5,
    100: 25,
    500: 50,
    1000: 100
};
let step = objSteps.firstStep;

for (let i = 1; i <= 2000; i += step) {
    let elemOption = document.createElement('option');
    elemOption.innerHTML = i.toString();
    listWidthPen.append(elemOption);
    if (objSteps[i])
        step = objSteps[i];
}
// ****************************************************

function changeDisplayStyle(idTag, value) {
    idTag.style.display = value;
}

function changeDisplayStyleArrayTags(arrIdTags, value) {
    for (let i = 0; i < arrIdTags.length; i++)
        changeDisplayStyle(arrIdTags[i], value);
}

function changeDisplayStyleElemValue() {
    for (let i = 0; i < arguments.length - 1; i += 2) {
        changeDisplayStyle(arguments[i], arguments[i + 1]);
    }
}

function changeDisplayStyleElemArrValue() {
    for (let i = 0; i < arguments.length - 1; i += 2) {
        changeDisplayStyleArrayTags(arguments[i], arguments[i + 1]);
    }
}
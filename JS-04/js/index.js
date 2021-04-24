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
    } else if (figureDrawing === 'RectangleStrokeAndFill' || figureDrawing === 'Rectangle') {
        paint.drawRectangle(x1, y1, x2, y2, tempWidthPen, inputRectangleColorStroke.value, inputRectangleColorFill.value, true, true);
    } else if (figureDrawing === 'RectangleFill') {
        paint.drawRectangle(x1, y1, x2, y2, tempWidthPen, inputRectangleColorStroke.value, inputRectangleColorFill.value, false, true);
    } else if (figureDrawing === 'RectangleStroke') {
        paint.drawRectangle(x1, y1, x2, y2, tempWidthPen, inputRectangleColorStroke.value, inputRectangleColorFill.value);
    } else if (figureDrawing === 'CircleStrokeAndFill' || figureDrawing === 'Circle') {
        paint.drawCircle(x1, y1, x2, y2, tempWidthPen, inputCircleColorStroke.value, inputCircleColorFill.value, true, true);
    } else if (figureDrawing === 'CircleFill') {
        paint.drawCircle(x1, y1, x2, y2, tempWidthPen, inputCircleColorStroke.value, inputCircleColorFill.value, false, true);
    } else if (figureDrawing === 'CircleStroke') {
        paint.drawCircle(x1, y1, x2, y2, tempWidthPen, inputCircleColorStroke.value, inputCircleColorFill.value);
    } else if (figureDrawing === 'EllipseStrokeAndFill' || figureDrawing === 'Ellipse') {
        paint.drawEllipse(x1, y1, x2, y2, tempWidthPen, inputEllipseColorStroke.value, inputEllipseColorFill.value, true, true);
    } else if (figureDrawing === 'EllipseFill') {
        paint.drawEllipse(x1, y1, x2, y2, tempWidthPen, inputEllipseColorStroke.value, inputEllipseColorFill.value, false, true);
    } else if (figureDrawing === 'EllipseStroke') {
        paint.drawEllipse(x1, y1, x2, y2, tempWidthPen, inputEllipseColorStroke.value, inputEllipseColorFill.value);
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
    changeDisplayStyleArrayTags(labelsStylePen, 'block');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleCircle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanColorPaint.innerHTML = 'Колір пензлика: ';
    spanWidthPaint.innerHTML = 'Товщина пензлика: ';
});

radioLinePen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStylePen, 'block');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleCircle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanColorPaint.innerHTML = 'Колір лінії: ';
    spanWidthPaint.innerHTML = 'Товщина лінії: ';
});

radioRectanglePen.addEventListener('click', function() {
    radioArrRectangle[2].checked = true;
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'block');
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleCircle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioCirclePen.addEventListener('click', function() {
    radioArrCircle[2].checked = true;
    changeDisplayStyleArrayTags(labelsStyleCircle, 'block');
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioEllipsePen.addEventListener('click', function() {
    radioArrEllipse[2].checked = true;
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'block');
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleCircle, 'none');
    spanWidthPaint.innerHTML = 'Ширина контуру: ';
});

radioClearPen.addEventListener('click', function() {
    changeDisplayStyleArrayTags(labelsStylePen, 'none');
    changeDisplayStyleArrayTags(labelsStyleRectangle, 'none');
    changeDisplayStyleArrayTags(labelsStyleCircle, 'none');
    changeDisplayStyleArrayTags(labelsStyleEllipse, 'none');
    spanWidthPaint.innerHTML = 'Товщина гумки: ';
});

radioRectangleStroke.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleRectangle[4], 'block');
    changeDisplayStyle(labelsStyleRectangle[3], 'none');
});
radioRectangleFill.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleRectangle[4], 'none');
    changeDisplayStyle(labelsStyleRectangle[3], 'block');
});
radioRectangleStrokeAndFill.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleRectangle[4], 'block');
    changeDisplayStyle(labelsStyleRectangle[3], 'block');
});
radioCircleStroke.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleCircle[3], 'none');
    changeDisplayStyle(labelsStyleCircle[4], 'block');
});
radioCircleFill.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleCircle[3], 'block');
    changeDisplayStyle(labelsStyleCircle[4], 'none');
});
radioCircleStrokeAndFill.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleCircle[3], 'block');
    changeDisplayStyle(labelsStyleCircle[4], 'block');
});
radioEllipseStroke.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleEllipse[3], 'none');
    changeDisplayStyle(labelsStyleEllipse[4], 'block');
});
radioEllipseFill.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleEllipse[3], 'block');
    changeDisplayStyle(labelsStyleEllipse[4], 'none');
});
radioEllipseStrokeAndFill.addEventListener('click', function() {
    changeDisplayStyle(labelsStyleEllipse[3], 'block');
    changeDisplayStyle(labelsStyleEllipse[4], 'block');
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
changeDisplayStyleArrayTags(labelsStyleCircle, 'none');
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
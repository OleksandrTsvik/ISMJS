'use strict';

let blockMessageError = document.getElementById('messageError');
let blockDeterminantMatrix = document.getElementById('determinantMatrix');
let arrButtonsForm = document.querySelectorAll('div.form-buttons .btn');
let arrInputsForm = document.querySelectorAll('div.form-user input');
let minValue = -100, maxValue = 100;
let matrix, htmlTable;

class Matrix {
    constructor(rowsCount, colsCount, paramsObject = null) {
        this.rowsCount = rowsCount;
        this.colsCount = colsCount;
        this.matrix = [];

        if (paramsObject && paramsObject.hasOwnProperty('minValue')) {
            minValue = paramsObject.minValue;
        }

        if (paramsObject && paramsObject.hasOwnProperty('maxValue')) {
            maxValue = paramsObject.maxValue;
        }

        for (let i = 0; i < rowsCount; i++) {
            let rowArray = [];
            for (let j = 0; j < colsCount; j++) {
                rowArray.push(Math.round(Math.random() * (maxValue - minValue) + minValue));
            }
            this.matrix.push(rowArray);
        }
    }

    clearMatrix() {
        this.matrix = [];
    }

    transposition() {
        let transposeMatrix = [];
        for (let i = 0; i < this.colsCount; i++) {
            let transposeRow = [];
            for (let j = 0; j < this.rowsCount; j++) {
                transposeRow.push(this.matrix[j][i]);
            }
            transposeMatrix.push(transposeRow);
        }

        let temp = this.rowsCount;
        this.rowsCount = this.colsCount;
        this.colsCount = temp;

        this.matrix = transposeMatrix;
    }

    moveMatrixColumnsOneRight() {
        let arr = [];
        for (let i = 0; i < this.rowsCount; i++) {
            arr.push(this.matrix[i][this.colsCount - 1]);
        }

        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = this.colsCount - 1; j > 0; j--) {
                this.matrix[i][j] = this.matrix[i][j - 1];
            }
            this.matrix[i][0] = arr[i];
        }
    }

    addRowToMatrix() {
        let rowArray = [];
        for (let i = 0; i < this.colsCount; i++) {
            rowArray.push(Math.round(Math.random() * (maxValue - minValue) + minValue));
        }

        this.matrix.push(rowArray);
        this.rowsCount++;
    }

    addColumnToMatrix() {
        for (let i = 0; i < this.rowsCount; i++) {
            this.matrix[i].push(Math.round(Math.random() * (maxValue - minValue) + minValue));
        }

        this.colsCount++;
    }

    // функцію взято з - http://mathhelpplanet.com/static.php?p=javascript-operatsii-nad-matritsami
    getDeterminant() {
        let N = this.matrix.length, B = [], denom = 1, exchanges = 0;
        for (let i = 0; i < N; ++i) {
            B[i] = [];
            for (let j = 0; j < N; ++j)
                B[i][j] = this.matrix[i][j];
        }

        for (let i = 0; i < N - 1; ++i) {
            let maxN = i, maxValue = Math.abs(B[i][i]);
            for (let j = i + 1; j < N; ++j) {
                let value = Math.abs(B[j][i]);
                if (value > maxValue) {
                    maxN = j;
                    maxValue = value;
                }
            }

            if (maxN > i) {
                let temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
                ++exchanges;
            } else {
                if (maxValue === 0) return maxValue;
            }

            let value1 = B[i][i];

            for (let j = i + 1; j < N; ++j) {
                let value2 = B[j][i];
                B[j][i] = 0;
                for (let k = i+1; k < N; ++k)
                    B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
            }
            denom = value1;
        }

        if (exchanges % 2) return -B[N - 1][N - 1];
        else return B[N - 1][N - 1];
    }
}

class HTMLTable {
    constructor(blockId) {
        this.blockElement = document.getElementById(blockId);
    }

    bindMatrix(matrix) {
        this.matrix = matrix;
    }

    update() {
        this.createTableInHTML(this.matrix);
    }

    clearBlock() {
        this.blockElement.innerHTML = "";
    }

    createTableInHTML(matrixObject) {
        let tableElem = document.createElement('table');
        for (let i = 0; i < matrixObject.rowsCount; i++) {
            let trElem = document.createElement('tr');
            for (let j = 0; j < matrixObject.colsCount; j++) {
                let tdElem = document.createElement('td');
                tdElem.innerHTML = matrixObject.matrix[i][j];
                trElem.appendChild(tdElem);
            }
            tableElem.appendChild(trElem);
        }

        this.clearBlock();
        this.blockElement.appendChild(tableElem);
    }
}

document.querySelector('#buttonGenerateMatrix').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'none';
    let countRows = parseInt(document.getElementById('inputCountRows').value);
    let countColumns = parseInt(document.getElementById('inputCountColumns').value);
    minValue = parseInt(document.getElementById('inputMinNum').value);
    maxValue = parseInt(document.getElementById('inputMaxNum').value);

    if (isNaN(countRows) || isNaN(countColumns) || isNaN(minValue) || isNaN(maxValue)) {
        blockMessageError.style.display = 'block';
        blockMessageError.innerHTML = "Заповніть всі поля!";
    } else if (minValue >= maxValue) {
        blockMessageError.style.display = 'block';
        blockMessageError.innerHTML = "Мінімальне число не може бути більше або дорівнювати максимальному!&#129315;&#129315;&#128514;";
    } else if (countRows <= 0 || countColumns <= 0) {
        blockMessageError.style.display = 'block';
        blockMessageError.innerHTML = "Введено некоректні значення!";
    } else {
        blockMessageError.style.display = 'none';

        arrButtonsForm.forEach(btn => {
            btn.removeAttribute('disabled');
            btn.style.opacity = '1';
        });

        matrix = new Matrix(countRows, countColumns, {minValue : minValue, maxValue : maxValue});
        htmlTable = new HTMLTable('matrixTable');
        htmlTable.bindMatrix(matrix);
        htmlTable.update();
    }
});

document.querySelector('#buttonTranspositionMatrix').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'none';
    matrix.transposition();
    htmlTable.update();
});

document.querySelector('#buttonCalculateDeterminantMatrix').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'block';
    blockDeterminantMatrix.innerHTML = `Детермінант матриці: ${matrix.getDeterminant()}.`;
});

document.querySelector('#buttonMoveMatrixColumnsOneRight').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'none';
    matrix.moveMatrixColumnsOneRight();
    htmlTable.update();
});

document.querySelector('#buttonAddNewRowMatrix').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'none';
    matrix.addRowToMatrix();
    htmlTable.update();
});

document.querySelector('#buttonAddNewColumnMatrix').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'none';
    matrix.addColumnToMatrix();
    htmlTable.update();
});

document.querySelector('#buttonClearMatrix').addEventListener('click', function () {
    blockDeterminantMatrix.style.display = 'none';
    htmlTable.clearBlock();
    matrix.clearMatrix();

    arrButtonsForm.forEach(btn => {
        btn.disabled = 'true';
        btn.style.opacity = '0.6';
    });

    arrInputsForm.forEach(input => input.value = '');
});
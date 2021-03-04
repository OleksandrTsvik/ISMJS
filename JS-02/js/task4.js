'use strict';

let matrix = [];
let messError = document.getElementById('messageError');
let matrTable = document.getElementById('matrixTable');
let minNum, maxNum;

buttonGenerateMatrix.addEventListener('click', function () {
    let countRows = parseInt(inputCountRows.value);
    let countColumns = parseInt(inputCountColumns.value);
    minNum = parseInt(inputMinNum.value);
    maxNum = parseInt(inputMaxNum.value);

    if (isNaN(countRows) || isNaN(countColumns) || isNaN(minNum) || isNaN(maxNum)) {
        messError.style.display = 'block';
        messError.innerHTML = "Заповніть всі поля!";
    } else if (minNum >= maxNum) {
        messError.style.display = 'block';
        messError.innerHTML = "Мінімальне число не може бути більше або дорівнювати максимальному!&#129315;&#129315;&#128514;";
    } else {
        messError.style.display = 'none';
        matrix = [];
        generateMatrix(countRows, countColumns, minNum, maxNum);
        createTableInHTML(matrix, matrTable);
    }
});

buttonTranspositionMatrix.addEventListener('click', function () {
    if (matrix.length > 0) {
        let transposeMatrix = new Array(matrix[0].length);
        for (let i = 0; i < matrix[0].length; i++) {
            transposeMatrix[i] = new Array(matrix.length);
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                transposeMatrix[j][i] = matrix[i][j];
            }
        }

        // copy
        matrix = new Array(transposeMatrix.length);
        for (let i = 0; i < transposeMatrix.length; i++) {
            matrix[i] = new Array(transposeMatrix[i].length);
        }

        for (let i = 0; i < transposeMatrix.length; i++) {
            for (let j = 0; j < transposeMatrix[i].length; j++) {
                matrix[i][j] = transposeMatrix[i][j];
            }
        }

        createTableInHTML(transposeMatrix, matrTable);
    }
});

buttonCalculateDeterminantMatrix.addEventListener('click', function () {
    //...
});

buttonMoveMatrixColumnsOneRight.addEventListener('click', function () {
    if (matrix.length > 0) {
        let arr = [];
        for (let i = 0; i < matrix.length; i++) {
            arr.push(matrix[i][matrix[i].length - 1]);
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = matrix[i].length - 1; j > 0; j--) {
                matrix[i][j] = matrix[i][j - 1];
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            matrix[i][0] = arr[i];
        }

        createTableInHTML(matrix, matrTable);
    }
});

buttonAddNewRowMatrix.addEventListener('click', function () {
    if (matrix.length > 0) {
        let rowArray = [];
        for (let i = 0; i < matrix[0].length; i++) {
            rowArray.push(Math.round(Math.random() * (maxNum - minNum) + minNum));
        }
        matrix.push(rowArray);

        createTableInHTML(matrix, matrTable);
    }
});

buttonAddColumnMatrix.addEventListener('click', function () {
    if (matrix.length > 0) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].push(Math.round(Math.random() * (maxNum - minNum) + minNum));
        }

        createTableInHTML(matrix, matrTable);
    }
});

function generateMatrix(rowCount, columnCount, minValue, maxValue) {
    for (let i = 0; i < rowCount; i++) {
        let rowArray = [];
        for (let j = 0; j < columnCount; j++) {
            rowArray.push(Math.round(Math.random() * (maxValue - minValue) + minValue));
        }
        matrix.push(rowArray);
    }
}

function createTableInHTML(matr, idTable) {
    let tableElem = document.createElement('table');
    for (let i = 0; i < matr.length; i++) {
        let trElem = document.createElement('tr');
        for (let j = 0; j < matr[i].length; j++) {
            let tdElem = document.createElement('td');
            tdElem.innerHTML = matr[i][j];
            trElem.appendChild(tdElem);
        }
        tableElem.appendChild(trElem);
    }

    idTable.innerHTML = "";
    idTable.appendChild(tableElem);
}
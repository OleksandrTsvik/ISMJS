'use script';

let nameSnakeCaseConvert = document.getElementById('varNameSnakeCaseConvert');
let nameCamelCaseConvert = document.getElementById('varNameCamelCaseConvert');
let messError = document.getElementById('messageError');

convertSnakeCaseToCamelCase.addEventListener('click', function() {
    let text = deleteWhitespace(varNameSnakeCase.value);

    if (text !== '') {
        messError.style.display = 'none';
        nameSnakeCaseConvert.value = toCamelCase(text);
    } else {
        nameSnakeCaseConvert.value = '';
        messError.style.display = 'block';
        messError.innerHTML = "Введіть значення в поле <b>&Prime;Snake case&Prime;</b>";
    }
});

convertCamelCaseToSnakeCase.addEventListener('click', function() {
    let text = deleteWhitespace(varNameCamelCase.value);

    if (text !== '') {
        messError.style.display = 'none';
        nameCamelCaseConvert.value = toSnakeCase(text);
    } else {
        nameCamelCaseConvert.value = '';
        messError.style.display = 'block';
        messError.innerHTML = "Введіть значення в поле <b>&Prime;Camel case&Prime;</b>";
    }
});

function toCamelCase(line) {
    line = line.toLowerCase();
    let i = 0;
    while (i < line.length - 1) {
        if (line[i] === '_')
            line = line.replace(`${line[i]}${line[i + 1]}`, line[i + 1].toUpperCase());
        i++;
    }

    return line;
}

function toSnakeCase(line) {
    let i = 0;
    while (i < line.length ) {
        if (isUpperLetter(line[i]))
            line = line.replace(line[i], `_${line[i].toLowerCase()}`);
        i++;
    }

    return line;
}

function deleteWhitespace(line) {
    // видалення всіх пробілів
    line = line.replace(/\s+/g, '');
    // g - це флажок "global", що означає шукать всі \s (пробіли)

    return line;
}

function isUpperLetter(letter) {
    if (letter === letter.toUpperCase() && letter !== letter.toLowerCase())
        return true;
    return false;
}
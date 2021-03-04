'use strict';

let obj = {
    className: 'open menu'
};

let messError = document.getElementById('messageError');

addCls.addEventListener('click', function () {
    let text = deleteWhitespace(inputClass.value);

    if (isEmptyLineAndShowMessageError(text)) {
        addClass(obj, text);
        objClassName.innerHTML = obj.className;
        inputClass.value = '';
    }
});

removeCls.addEventListener('click', function () {
    let text = deleteWhitespace(inputClass.value);

    if (isEmptyLineAndShowMessageError(text)) {
        removeClass(obj, text);
        objClassName.innerHTML = obj.className;
        inputClass.value = '';
    }
});

function addClass(obj, cls) {
    if (obj.className.length > 0) {
        obj.className = obj.className.concat(' ' + cls);
    } else {
        obj.className = obj.className.concat(cls);
    }
}

function removeClass(obj, cls) {
    let arrClassName = obj.className.split(' ');
    let i = 0;
    while (i < arrClassName.length) {
        if (arrClassName[i] === cls)
            arrClassName.splice(i, 1);
        else
            i++;
    }

    obj.className = arrClassName.join(' ');
}

function isEmptyLineAndShowMessageError(line) {
    if (line === ''){
        messError.style.display = 'block';
        messError.innerHTML = "Введіть дані!";
        return false;
    } else {
        messError.style.display = 'none';
        return true;
    }
}

function deleteWhitespace(line) {
    line = line.replace(/\s+/g, '');
    return line;
}
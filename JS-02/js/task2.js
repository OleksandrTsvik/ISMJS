'use strict';

let data = document.querySelector("textarea");
let messError = document.getElementById('messageError');

generateTable.addEventListener('click', function () {
    generateTableHTML(createArrayFromTextarea(data), generatedTable);
    generateTable.disabled = 'true';
    generateTable.style.opacity = '0.6';
});

buttonAdd.addEventListener('click', function () {
    messError.style.display = 'none';
    let txtFirstName = removeFirstSpaces(inputFirstName.value);
    let txtLastName = removeFirstSpaces(inputLastName.value);
    let txtGender = removeFirstSpaces(inputGender.value);
    let txtAddress = removeFirstSpaces(inputAddress.value);
    let txtBirthDate = removeFirstSpaces(inputBirthDate.value);
    let txtNickname = removeFirstSpaces(inputNickname.value);
    let txtPassword = removeFirstSpaces(inputPassword.value);
    let txtEmail = removeFirstSpaces(inputEmail.value);

    if (
        txtFirstName === '' ||
        txtLastName === '' ||
        txtGender === '' ||
        txtAddress === '' ||
        txtBirthDate === '' ||
        txtNickname === '' ||
        txtPassword === '' ||
        txtEmail === ''
    ) {
        messError.style.display = 'block';
        messError.innerHTML = "Заповніть всі поля!";
    } else {
        dataList.append( '\n\n' + txtFirstName + '\n');
        dataList.append(txtLastName + '\n');
        dataList.append(txtGender + '\n');
        dataList.append(txtAddress + '\n');
        dataList.append(txtBirthDate + '\n');
        dataList.append(txtNickname + '\n');
        dataList.append(txtPassword + '\n');
        dataList.append(txtEmail);

        data.scrollTop = data.scrollHeight;

        generateTable.removeAttribute('disabled');
        generateTable.style.opacity = '1';

        inputFirstName.value = '';
        inputLastName.value = '';
        inputGender.value = '';
        inputAddress.value = '';
        inputBirthDate.value = '';
        inputNickname.value = '';
        inputPassword.value = '';
        inputEmail.value = '';
    }
});

function createArrayFromTextarea(idTextarea) {
    let arr = [];
    let lines = idTextarea.value;
    let countLine = lines.split(/\n/).length;
    lines = lines.split(/\n/);

    for (let i = 0; i < countLine; i += 9) {
        arr.push({
            firstName: lines[i],
            lastName: lines[i + 1],
            gender: lines[i + 2],
            address: lines[i + 3],
            birthDate: lines[i + 4],
            nickname: lines[i + 5],
            password: lines[i + 6],
            email: lines[i + 7]
        });
    }

    return arr;
}

function generateTableHTML(array, linkForElem) {
    let tableElem = document.createElement('table');
    let trElem = document.createElement('tr');

    for (let key in array[0]) {
        let thElem = document.createElement('th');
        thElem.innerHTML = key[0].toUpperCase() + key.slice(1);
        trElem.appendChild(thElem);
    }
    tableElem.appendChild(trElem);

    for (let i = 0; i < array.length; i++) {
        let trElem = document.createElement('tr');
        for (let key in array[i]) {
            let tdElem = document.createElement('td');
            tdElem.innerHTML = array[i][key];
            trElem.appendChild(tdElem);
        }
        tableElem.appendChild(trElem);
    }

    linkForElem.innerHTML = '';
    linkForElem.appendChild(tableElem);
}

function removeFirstSpaces(line) {
    if (line.length === 0)
        return '';

    while (line[0] === ' ')
        line = line.slice(1);

    return line;
}
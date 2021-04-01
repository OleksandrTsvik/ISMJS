'use strict';
import { Hamburger } from './classHamburger.js';

let messageError = document.getElementById('pMessageError');
let selectSizeHamburger = document.getElementById('selectSizeHamburger');
let selectStuffingHamburger = document.getElementById('selectStuffingHamburger');
let selectToppingHamburger = document.getElementById('selectToppingHamburger');
let arrTdFromTrCostAndCountCalories = document.querySelectorAll('#trCostAndCountCalories td');
let spanPriceHamburger = document.getElementById('spanPriceHamburger');
let spanCountCaloriesHamburger = document.getElementById('spanCountCaloriesHamburger');
let buttonShowCostAndCountCalories = document.getElementById('buttonShowCostAndCountCalories');
let buttonBuyHamburger = document.getElementById('buttonBuyHamburger');
let textareaAllOrders = document.getElementById('textareaAllOrders');

let hamburgerOrders = [];

buttonShowCostAndCountCalories.addEventListener('click', function() {
    if (selectSizeHamburger.selectedIndex !== 0 && selectStuffingHamburger.selectedIndex !== 0) {
        try {
            messageError.style.display = 'none';
            arrTdFromTrCostAndCountCalories.forEach(td => td.style.display = 'table-cell');
            let price = Hamburger[valueSelectedItem(selectSizeHamburger)].cost + Hamburger[valueSelectedItem(selectStuffingHamburger)].cost;
            let countCalories = Hamburger[valueSelectedItem(selectSizeHamburger)].calories + Hamburger[valueSelectedItem(selectStuffingHamburger)].calories;

            if (selectToppingHamburger.selectedIndex !== 0) {
                price += Hamburger[valueSelectedItem(selectToppingHamburger)].cost;
                countCalories += Hamburger[valueSelectedItem(selectToppingHamburger)].calories;
            }

            spanPriceHamburger.innerHTML = price;
            spanCountCaloriesHamburger.innerHTML = countCalories;
        } catch(e) {
            alert(e.message);
        }
    } else {
        messageError.style.display = 'block';
        messageError.innerHTML = "Заповніть обов'язкові поля!(*)";
    }
});

buttonBuyHamburger.addEventListener('click', function() {
    if (selectSizeHamburger.selectedIndex !== 0 && selectStuffingHamburger.selectedIndex !== 0) {
        try {
            messageError.style.display = 'none';
            arrTdFromTrCostAndCountCalories.forEach(td => td.style.display = 'none');

            hamburgerOrders.push(new Hamburger(Hamburger[valueSelectedItem(selectSizeHamburger)], Hamburger[valueSelectedItem(selectStuffingHamburger)]));

            if (selectToppingHamburger.selectedIndex !== 0) {
                hamburgerOrders[hamburgerOrders.length - 1].addTopping(Hamburger[valueSelectedItem(selectToppingHamburger)]);
            }

            textareaAllOrders.style.display = 'block';
            textareaAllOrders.append(`\tЗаказ №${hamburgerOrders.length}\n`);
            textareaAllOrders.append(`Вид гамбургера: ${innerHTMLSelectedItem(selectSizeHamburger)}.\n`);
            textareaAllOrders.append(`Начинка гамбургера: з ${innerHTMLSelectedItem(selectStuffingHamburger)}.\n`);
            textareaAllOrders.append(`По бажанню: ${innerHTMLSelectedItem(selectToppingHamburger)}.\n`);
            textareaAllOrders.append(`Вартість: ${hamburgerOrders[hamburgerOrders.length - 1].calculatePrice()}грн.\nКількість калорій: ${hamburgerOrders[hamburgerOrders.length - 1].countCalories()}.\n\n`);
        } catch (e) {
            alert(e.message);
        }
    } else {
        messageError.style.display = 'block';
        messageError.innerHTML = "Заповніть обов'язкові поля!(*)";
    }
});

document.querySelector('#buttonResetOrderHamburger').addEventListener('click', function() {
    arrTdFromTrCostAndCountCalories.forEach(td => td.style.display = 'none');

    selectSizeHamburger.selectedIndex = 0;
    selectStuffingHamburger.selectedIndex = 0;
    selectToppingHamburger.selectedIndex = 0;
});

function valueSelectedItem(idSelect) {
    return idSelect.options[idSelect.selectedIndex].value;
}

function innerHTMLSelectedItem(idSelect) {
    return idSelect.options[idSelect.selectedIndex].innerHTML;
}
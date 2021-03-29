'use strict';

class Hamburger {
    constructor(size, stuffing) {
        try {
            if (size === undefined) {
                throw new Error("HamburgerException: no size given");
            } else if (stuffing === undefined) {
                throw new Error("HamburgerException: no stuffing given");
            }

            if (size === Hamburger.SIZE_BIG || size === Hamburger.SIZE_SMALL) {
                this.size = size;
            } else {
                throw new Error("HamburgerException: invalid size");
            }

            if (stuffing === Hamburger.STUFFING_CHEESE ||
                stuffing === Hamburger.STUFFING_POTATO ||
                stuffing === Hamburger.STUFFING_SALAD
            ) {
                this.stuffing = stuffing;
            } else {
                throw new Error("HamburgerException: invalid stuffing");
            }

            this.toppings = {};
        } catch (error) {
            alert(error.message);
        }
    }

    static SIZE_SMALL = {
        cost: 50,
        calories: 20
    };

    static SIZE_BIG = {
        cost: 100,
        calories: 40
    };

    static STUFFING_CHEESE = {
        cost: 10,
        calories: 20
    };

    static STUFFING_SALAD = {
        cost: 20,
        calories: 5
    };

    static STUFFING_POTATO = {
        cost: 15,
        calories: 10
    };

    static TOPPING_SAUCE = {
        cost: 15,
        calories: 0
    };

    static TOPPING_MAYO = {
        cost: 20,
        calories: 5
    };

    addTopping(topping) {
        try {
            if (topping === Hamburger.TOPPING_MAYO) {
                if (!('TOPPING_MAYO' in this.toppings)) {
                    this.toppings.TOPPING_MAYO = topping;
                }
                else {
                    throw new Error("HamburgerException: duplicate topping 'TOPPING_MAYO'");
                }
            } else if (topping === Hamburger.TOPPING_SAUCE) {
                if (!("TOPPING_SAUCE" in this.toppings)){
                    this.toppings.TOPPING_SAUCE = topping;
                }
                else {
                    throw new Error("HamburgerException: duplicate topping 'TOPPING_SAUCE'");
                }
            } else {
                throw new Error("HamburgerException: invalid topping!");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    calculatePrice() {
        let price = this.size.cost + this.stuffing.cost;

        for (let key in this.toppings) {
            price += this.toppings[key].cost;
        }

        return price;
    }

    countCalories() {
        let count = this.size.calories + this.stuffing.calories;

        for (let key in this.toppings) {
            count += this.toppings[key].calories;
        }

        return count;
    }
}

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
    } else {
        messageError.style.display = 'block';
        messageError.innerHTML = "Заповніть обов'язкові поля!(*)";
    }
});

buttonBuyHamburger.addEventListener('click', function() {
    if (selectSizeHamburger.selectedIndex !== 0 && selectStuffingHamburger.selectedIndex !== 0) {
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
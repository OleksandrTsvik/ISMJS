export class Hamburger {
    constructor(size, stuffing) {
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
    }

    static SIZE_SMALL = Object.freeze({
        cost: 50,
        calories: 20
    });

    static SIZE_BIG = Object.freeze({
        cost: 100,
        calories: 40
    });

    static STUFFING_CHEESE = Object.freeze({
        cost: 10,
        calories: 20
    });

    static STUFFING_SALAD = Object.freeze({
        cost: 20,
        calories: 5
    });

    static STUFFING_POTATO = Object.freeze({
        cost: 15,
        calories: 10
    });

    static TOPPING_SAUCE = Object.freeze({
        cost: 15,
        calories: 0
    });

    static TOPPING_MAYO = Object.freeze({
        cost: 20,
        calories: 5
    });

    addTopping(topping) {
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
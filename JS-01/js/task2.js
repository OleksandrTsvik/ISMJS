'use strict';

calculate.addEventListener('click',
    function(){
        let a = parseFloat(numberA.value);
        let b = parseFloat(numberB.value);
        let c = parseFloat(numberC.value);

        document.getElementById('discriminant').value = null;
        messageSolution.innerHTML = "";

        if (isNaN(a) && isNaN(b) && isNaN(c))
            messageError.innerHTML = "Ви не ввели значення!";
        else if (isNaN(a) || isNaN(b) || isNaN(c))
            messageError.innerHTML = "Введено некоректні значення!";
        else{
            messageError.innerHTML = "";

            let d = b**2 - 4 * a * c;

            document.getElementById('discriminant').value = d.toFixed(4);

            if (d < 0)
                messageSolution.innerHTML = "Квадратне рівняння не має рішень.";
            else if (d == 0){
                let x = -b / (2 * a);
                messageSolution.innerHTML = "Квадратне рівняння має один розв&apos;язок<br /> x = " + x.toString();
            }
            else {
                let x1 = (-b + Math.sqrt(d)) / (2 * a);
                let x2 = (-b - Math.sqrt(d)) / (2 * a);
                messageSolution.innerHTML = "Квадратне рівняння має два розв&apos;язки:<br />x<sub>1</sub> = " + x1.toFixed(4).toString() + "<br />x<sub>2</sub> = " + x2.toFixed(4).toString();
            }
        }
    });
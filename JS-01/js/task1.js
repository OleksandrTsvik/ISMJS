'use strict';

calculate.addEventListener('click',
    function(){
        let x = parseFloat(numberX.value);
        let y = parseFloat(numberY.value);
        let z = parseFloat(numberZ.value);

        document.getElementById('numberS').value = null;

        if (isNaN(x) && isNaN(y) && isNaN(z))
            messageError.innerHTML = "Ви не ввели значення!";
        else if (isNaN(x) || isNaN(y) || isNaN(z))
            messageError.innerHTML = "Введено некоректні значення!";
        else{
            messageError.innerHTML = "";

            let s1 = Math.pow(Math.E, z + y) * Math.pow(z - y, x + z);
            let s2 = Math.sin(x) + Math.sin(y);
            let s3 = Math.pow(x,7) + Math.log(y);

            if (s2 == 0)
                messageError.innerHTML = "Ділення на нуль!";
            else if (y <= 0)
                messageError.innerHTML = "ln(y)  &emsp;=&gt;&emsp;  y &gt; 0"; //&emsp; - широкий пробіл
            else if (s3 < 0)
                messageError.innerHTML = "Підкореневий вираз від&apos;ємний!";
            else{
                let s4 = Math.pow(s3, 1/4); // y > 0

                let s = s1 / s2 + s4;

                document.getElementById('numberS').value = s.toFixed(4);
            }
        }
    });
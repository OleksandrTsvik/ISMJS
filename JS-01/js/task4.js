'use strict';

calculate.addEventListener('click',
    function(){
        let n = parseFloat(numberN.value);
        let k = parseFloat(numberK.value);

        document.getElementById('summa').value = null;

        if (isNaN(n) && isNaN(k))
            messageError.innerHTML = "Ви не ввели значення!";
        else if (!(n > 0 && k > 0))
            messageError.innerHTML = "Введено некоректні значення, всі числа мають бути додатніми!";
        else{
            messageError.innerHTML = "";
            let res = 0, i = 1;

            while (i <= n){
                res += i ** k;
                i++;
            }
            document.getElementById('summa').value = res;
        }
    });
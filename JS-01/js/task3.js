'use strict';

calculate.addEventListener('click',
    function(){
        let n = parseFloat(numberN.value);

        document.getElementById('summa').value = null;

        if (isNaN(n))
            messageError.innerHTML = "Ви не ввели значення!";
        else if (!(n > 0))
            messageError.innerHTML = "Введено некоректне значення, має виконуватися умова: N &gt; 0!";
        else{
            messageError.innerHTML = "";
            let result = 0, i = 1;
            while (n >= 1){
                result += Math.pow(i, n);
                i++;
                n--;
            }
            document.getElementById('summa').value = result;
        }
    });
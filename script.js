let btns = document.querySelector(".buttons");
let output = document.querySelector(".result");
let num1 = 0, num2 = 0, result = 0, operatorOp;


btns.addEventListener("click", event => {
    let target = event.target;
    let targetId = target.id;
    let targetClass = target.className;


    if (targetClass === "numbers"){
        output.textContent += target.value;
    }

    if (targetClass === "operators"){

        if (targetId === "equal"){
            if (!(num1 || num2)){
                return error();
            }
            if (!(result)){
                result = operator(num1, num2, operatorOp);
            }
            output.textContent = result;
        }

        if (!(num1)){
            num1 = output.textContent;
        }

        if (!(num2)){
            num2 = output.textContent;
        }
        
        operatorOp = target.value;
        output.textContent = "";
    }

});


function operator(num1, num2, operator){
    let a = Number(num1);
    let b = Number(num2);
    switch (operator){
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "/":
            return a / b;
            break;
        case "*":
            return a * b;
            break;
        default:
            return error(); 
    }
};
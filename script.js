let btns = document.querySelector(".buttons");
let output = document.querySelector(".result");
let num1 = 0, num2 = 0, result = 0, previousResult = 0, operatorOp;


btns.addEventListener("click", event => {
    let target = event.target;
    let targetId = target.id;
    let targetClass = target.className;


    if (targetClass === "numbers"){
        output.textContent += target.value;
    }

    if (targetClass === "operators"){
        if (targetId === "clear"){
            return clearAll();
        }
        if (targetId === "delete"){
            return deleteDigit();
        }

        if (previousResult && !(num1 && num2)){    
            return handlePreviousResult(targetId);
        }

        if (num1 && !(num2)){
            num2 = output.textContent;
        }

        if (!(num1)){
            num1 = output.textContent;
        }

    
        if (targetId === "equal"){
            return getAndDisplayResult();
        }
        else if ((num1 && num2) && targetId !== "equal"){
            num1 = operator(num1, num2, operatorOp);
            num2 = 0;
        }
      
        operatorOp = targetId;
        output.textContent = "";
    }
});


function operator(num1, num2, operator){
    let a = Number(num1);
    let b = Number(num2);
    switch (operator){
        case "sum":
            return a + b;
        case "sub":
            return a - b;
        case "divide":
            return a / b;
        case "times":
            return a * b;
        default:
            return errorFunc(); 
    }
};

function getAndDisplayResult(){
    if (!(result)){
        result = operator(num1, num2, operatorOp);
    }
    output.textContent = result;
    num1 = 0;
    num2 = 0;
    operatorOp = "";
    previousResult = result;
    result = 0;
    return;
}

function handlePreviousResult(operator){
    num1 = previousResult;
    num2 = 0;
    previousResult = 0;
    output.textContent = "";
    operatorOp = operator;
    return;
}

function clearAll(){
    num1 = 0, num2 = 0;
    previousResult = 0;
    result = 0;   
    operatorOp = "";
    output.textContent = "";
    return;
}

function deleteDigit() {
    value = output.textContent;
    if (!(value)) return;
    output.textContent = value.slice(0, -1);
    return;
}
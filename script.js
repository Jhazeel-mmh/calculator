let btns = document.querySelector(".buttons");
let output = document.querySelector(".result");
let num1 = 0, num2 = 0, result = 0, previousResult = 0, operatorOp;

// main function
btns.addEventListener("click", event => {
    const target = event.target;
    const targetId = target.id;
    const targetClass = target.className;


    if (targetClass === "numbers"){
        output.textContent += target.value;
    }

    if (targetClass === "operators"){
        handleOperators(targetId);
    }
});

function handleOperators(operatorId){
    switch (operatorId){
        case "clear":
            return clearAll();
        case "delete":
            return deleteDigit();
        default:
            return handleMathOperator(operatorId);
    }
}

function handleMathOperator(operatorId){
    if (previousResult && !(num1 && num2)){    
        return handlePreviousResult(operatorId);
    }

    if (num1 && !(num2)){
        num2 = output.textContent;
    }

    if (!(num1)){
        num1 = output.textContent;
    }

    if (operatorId === "equal"){
        if(checkErrors()) return;
        return getAndDisplayResult();
    }

    if ((num1 && num2) && operatorId !== "equal"){
        num1 = operator(num1, num2, operatorOp);
        num2 = 0;
    }
  
    operatorOp = operatorId;
    output.textContent = "";
}

function operator(num1, num2, operator){
    let a = Number(num1);
    let b = Number(num2);
    switch (operator){
        case "sum":
            return a + b;
        case "sub":
            return a - b;
        case "divide":
            return (a / b).toFixed(5);
        case "times":
            return a * b;
        default:
            return displayError("Invalid Operator"); 
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

function checkErrors(){
    if (Number(num2) === 0 && operatorOp === "divide"){
        displayError("Invalid Operation");
        return true;
    } else if (!operatorOp){
        displayError("Syntax Error");
        return true;
    } else if (num1 === "" || num2 === ""){
        displayError("Syntax Error");
        return true;
    }   
}

function displayError(msg){
    output.textContent = msg;
    setTimeout(() => {
        clearAll();
    }, 3000);
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
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){

    if(b === 0) return undefined;

    return a/b ;
}

let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = "";

function operate(operator, firstNumber, secondNumber){

    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
            
        case "-":
            return subtract(firstNumber, secondNumber);

        case "*":
            return multiply(firstNumber, secondNumber);

        case "/":
            return divide(firstNumber, secondNumber);

        default:
            return "Please enter a valid operation"

    }
}


/* let a = Number(window.prompt("Enter a"));
let op = (window.prompt("Enter operator"));
let b = Number(window.prompt("Enter b"));

let c = operate(op, a, b);

alert(c); */
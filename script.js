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

    if(b === 0) return "/0 not allowed";

    return a/b ;
}

let firstNumber = "";
let secondNumber = "";
let operator = null;
let displayValue = "";
let operationSelected = false;

function operate(operator, firstNumber, secondNumber){

    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
            
        case '-':
            return subtract(firstNumber, secondNumber);

        case 'x':
            return multiply(firstNumber, secondNumber);

        case '÷':
            return divide(firstNumber, secondNumber);

        default:
            return "Please enter a valid operation"

    }
}

function truncateTo15Digits(value) {

    let numberStr = String(value);

    if(numberStr.length > 15) {

        if(numberStr.includes(".")) {
            const [integerPart, decimalPart] = numberStr.split(".");
            const totalDigits = integerPart.length;
            const remainingDigits = 15 - totalDigits;

            if(remainingDigits > 0) {
                return (integerPart + '.' + decimalPart.substring(0, remainingDigits));
            } else {
                return integerPart;
            }

        } else {
            return "TOO LARGE TO DISPLAY";
        }
    } else {
        return numberStr;
    }
}

function updateDisplay(value) {

    value = truncateTo15Digits(value);

    let operationDisplay = document.querySelector('#operation');
    let currentValueDisplay = document.querySelector('#currentValue');

    if ( firstNumber !== "" && secondNumber !== "") {

        operationDisplay.innerText = `${firstNumber} ${operator} ${secondNumber}`;

    } else if(firstNumber !== "" && operator !== "") {

        operationDisplay.innerText = `${firstNumber} ${operator}`;

    } else {
        operationDisplay.innerText = '';
    }

    currentValueDisplay.innerText = value || '0';
}

function clearCalculator() {
    
    firstNumber = "";
    secondNumber = "";
    operator = null;
    displayValue = "";
    operationSelected = false;
    updateDisplay(displayValue);

}

function handleNumberClick(value) {

    if(operationSelected) {

        displayValue = secondNumber;
        
        displayValue += value;
       
        secondNumber = displayValue;

        console.log(`secondNumber value : ${secondNumber}`)

    } else {

        displayValue += value; //this is to accommodate number which are greater than 9
    
    } 

    updateDisplay(displayValue);
}

function handleOperatorClick(value) {

    if (operationSelected) {
        
        handleEqualsClick();
    }

    firstNumber = displayValue;
    operator = value;
    operationSelected = true;
}

function handleEqualsClick() {
    
    if ( firstNumber !== "" && secondNumber !== "") {

        let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        displayValue = result;
        console.log(`result : ${result}`);
        updateDisplay(displayValue);

        operationSelected = false;
        secondNumber = "";
    }
    
}

function handleDotClick() {

    if(!displayValue.includes("."))
    {
        if(operationSelected) {

            secondNumber = displayValue + ".";
    
        } 
            displayValue = displayValue + "." ;
        
    
        updateDisplay(displayValue);
    }
  
}

function handleDeleteClick(){
    
    displayValue = displayValue.slice(0, -1);
    updateDisplay(displayValue);
}

document.querySelectorAll('.buttonsContainer button').forEach((button) => {
    
    button.addEventListener('click', (event) => {
        
        let value = event.target.innerText;
        console.log(`${value} button got clicked`);

        if (!isNaN(value)) { // Checking button if the button is number

            handleNumberClick(value);
        
        } else if (value === 'Clear') {

            clearCalculator();
        
        } else if (value === 'Delete') {

            handleDeleteClick();

        } else if (value === '=') {

            handleEqualsClick();

        } else if (value === '.') {

            handleDotClick();
        
        } else { //Here button will be any of the 4 operator

            handleOperatorClick(value);
        }

    });
});


//keyboard support 

function handleKeyPress(event) {
    const key = event.key;

    if(!isNaN(key)) {

        handleNumberClick(key);
    
    } else if(key === 'Enter') {

        event.preventDefault();
        handleEqualsClick();
    
    } else if(key === 'Backspace') {

        handleDeleteClick();

    } else if(key === 'Escape') {

        clearCalculator();
    
    } else if(key === '.') {

        handleDotClick();

    } else if (['+', '-', '*', '/'].includes(key)) {

        if(key === '/') {

            handleOperatorClick('÷');

        } else if (key === '*'){

            handleOperatorClick('x');

        } else {

            handleOperatorClick(key);
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

clearCalculator();
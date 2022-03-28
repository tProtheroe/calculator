const display = document.querySelector('.display');
const calculate = document.querySelector('.equals');

let displayValue = '';

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    return operator(num1, num2);
}

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

numbers.forEach(num => num.addEventListener('click', () => {
    displayValue = num.textContent;
    display.textContent += displayValue;
}))   

operators.forEach(op => op.addEventListener('click', () => {
    displayValue = op.textContent;
    display.textContent += displayValue;
}))

calculate.addEventListener('click', operate());


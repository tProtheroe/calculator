const currentDisplayValue = document.querySelector('.current-number');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const equals = document.querySelector('.equals');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const previousDisplayValue = document.querySelector('.previous-number');

let currentInput = '';
let previousInput = '';
let operator = ''; 
let result = 0;

function calculate(){

    previousInput = Number(previousInput);
    currentInput = Number(currentInput);

    switch (operator){
        case '+':
            previousInput += currentInput;
            break;
        case '-':
            previousInput -= currentInput;
            break;
        case '*':
            previousInput *= currentInput;
            break;
        case '/':
            previousInput /= currentInput;
            break;
    }

    roundNum();

    previousDisplayValue.textContent = '';
    currentDisplayValue.textContent = previousInput
}

function handleNum(num){
    if(currentInput.length <= 14){
        currentInput += num;
        currentDisplayValue.textContent += num;
    }
}

function handleOp(op){
    operator = op;
    previousInput = currentInput
    currentInput = '';
    previousDisplayValue.textContent = `${previousInput} ${op}`
    currentDisplayValue.textContent = '';
}

function roundNum(){
    previousInput = Math.round(previousInput * 1000) / 1000;
}

function clearCalc(){
    currentInput = '';
    previousInput = '';
    operator = '';
    currentDisplayValue.textContent = '';
    previousDisplayValue.textContent = '';
}

function delNum(){
    let num = Array.from(currentInput);
    num.pop();

    currentInput = num.join('');
    currentDisplayValue.textContent = currentInput;
}

numbers.forEach(num => num.addEventListener('click', (e) => {
    handleNum(e.target.textContent);
}))

operators.forEach(op => op.addEventListener('click', (e) => {
    handleOp(e.target.textContent);
}))

equals.addEventListener('click', () => {
    if(currentInput != '' && previousInput != '') calculate();
})

clear.addEventListener('click', clearCalc);

backspace.addEventListener('click', delNum);
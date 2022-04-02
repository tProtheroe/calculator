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
            if(currentInput == 0){
                previousInput = "Error";
                previousDisplayValue.textContent = '';
                currentDisplayValue.textContent = previousInput;
                operator = '';
                return;
            }
            previousInput /= currentInput;
            break;
    }

    roundNum();
    previousInput = previousInput.toString();
}

function handleNum(num){
    if(currentInput.length <= 14){
        if(num == '.' && currentInput.includes('.')) return;
        if(currentInput != '' && previousInput != '' && operator == ''){
            currentInput = '';
            previousInput = '';
        }
        currentInput += num;
        currentDisplayValue.textContent = currentInput;
    }
}

function displayResult(){
    if(previousInput.length > 14){
        currentDisplayValue.textContent = previousInput.slice(0, 12) + '...';
    } else {
        currentDisplayValue.textContent = previousInput;
    }
    
    previousDisplayValue.textContent = '';

    operator = '';
    currentInput = previousInput;
}

function handleOp(op){
    if(currentInput == '') return;
    
    if(previousInput == "Can't divide by 0, silly"){
        currentDisplayValue.textContent = previousInput;
        previousDisplayValue.textContent = '';
        clearCalc();
        
    } else {
        if(currentInput != '' && previousInput != ''){
            calculate();
            console.log(previousInput);
        } else {
            previousInput = currentInput;
        }
    
        currentInput = '';
        operator = op;
    
        currentDisplayValue.textContent = '';
        previousDisplayValue.textContent = `${previousInput} ${operator}`;
    }
}

function roundNum(){
    if(typeof previousInput == 'number') previousInput = Math.round(previousInput * 100000) / 100000;
}

function clearCalc(){
    currentInput = '';
    previousInput = '';
    operator = '';
    currentDisplayValue.textContent = '';
    previousDisplayValue.textContent = '';
}

function delNum(){
    if(currentInput != '' && previousInput != '' && operator == ''){
        return
    }
    
    currentInput = currentInput.slice(0, -1);
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
    displayResult();
})

clear.addEventListener('click', clearCalc);

backspace.addEventListener('click', delNum);


let firstOperand = ''
let currentOperation = null
let secondOperand = ''
let shouldResetScreen = false


//Retrieving the elements
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const currentOperationScreen = document.querySelector('.screen-current')
const lastOperationScreen = document.querySelector('.screen-last')

//Adding the corresponding functions to the click event listeners
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clearScreen)
deleteButton.addEventListener('click', deleteOperand)
pointButton.addEventListener('click', appendPoint)


function appendNumber(number){
    if(currentOperationScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.textContent += number
}

//Each number button that is being clicked will be added to the calculator screen
numberButtons.forEach((button)=>{
    button.addEventListener('click', ()=>appendNumber(button.textContent))
})

//Each operator button that is being clicked will be added to the calculator screen
operatorButtons.forEach((button)=>{
    button.addEventListener('click', ()=>setOperation(button.textContent))
})

function resetScreen(){
    currentOperationScreen.textContent = ''
    shouldResetScreen = false 
}

//Appending the number to the calculator view
function setOperation(operator){
    if(currentOperation != null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function appendPoint(){
    if(shouldResetScreen) resetScreen()
    if(currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0'
    if(currentOperationScreen.textContent.includes('.')) return
        currentOperationScreen.textContent += '.'
}

function deleteOperand(){
    currentOperationScreen.textContent = currentOperationScreen.textContent.
    toString().slice(0,-1)
}

function evaluate(){
    if(currentOperation == null || shouldResetScreen) return 
    if(currentOperation === "÷" && currentOperationScreen.textContent === '0'){
        alert("Division by 0 is not possible")
        return 
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )

    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} = `
    currentOperation = null
}

function roundResult(number){
    return Math.round(number*1000)/1000
}

//Clear all the elements currently visible on the screen
function clearScreen(){
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function operate(operation, firstOperand, secondOperand){
    firstOperand = Number(firstOperand)
    secondOperand = Number(secondOperand)
    switch(operation){
        case '+':
            return add(firstOperand, secondOperand)
        case '-':
            return subtract(firstOperand, secondOperand)
        case 'x':
            return multiply(firstOperand, secondOperand)
        case '÷':
            return divide(firstOperand, secondOperand)
    }
}

//Arithmetic functions
let add = (a, b)=>{
    return a+b;
}

let subtract = (a, b)=>{
    return a-b;
}

let multiply = (a, b)=>{
    return a*b;
}

let divide = (a, b)=>{
    return a+b;
}

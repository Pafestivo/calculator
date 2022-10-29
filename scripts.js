let calculationFinished = false;

const numbersData = document.querySelectorAll('[data-number]');
const operatorsData = document.querySelectorAll('[data-operator]');
const divideOperator = document.getElementById('divide');
const multiplyOperator = document.getElementById('multiply');
const subtractOperator = document.getElementById('subtract');
const decimal = document.getElementById('decimal');
const sumOperator = document.getElementById('sum');
const screenInput = document.getElementById('screen-input');
const screenOutput = document.getElementById('screen-output');
const equalOperator = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');

equalOperator.addEventListener('click', calculate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', erase);


let inputData;
numbersData.forEach((key) => { //event listener for each number key to show it on the screen.
  key.addEventListener('click', () => {
    if(calculationFinished) {
      clear();
      screenInput.textContent = key.textContent
      calculationFinished = false;
    } else {
      screenInput.textContent += key.textContent;
    }
  })
})

operatorsData.forEach((key) => { //event listener for each operator key to output it on the calc screen
  key.addEventListener('click', () => {
    screenInput.textContent += ` ${key.textContent} `;
  })
})

function calculate() {
  let inputArray = screenInput.textContent.replace("x", "*").split(" ");
  if(operate(inputArray) === Infinity || isNaN(operate(inputArray))) screenOutput.textContent = "ERROR"
  else screenOutput.textContent = operate(inputArray);
  calculationFinished = true;
}

function erase() {
  if(screenInput.textContent.charAt(screenInput.textContent.length - 1) === " ") { 
    let newString = screenInput.textContent.slice(0, -2); //deletes twice if last letter is space
    screenInput.textContent = newString;
  } else {
    let newString = screenInput.textContent.slice(0, -1);
    screenInput.textContent = newString;
  }
}

function clear() {
  screenInput.textContent = "";
  screenOutput.textContent = "";
}

//calculation functions
function add(a, b) {
  const sum = +a + +b;
  return sum;
}

function subtract(a, b) {
  const sum = a - b;
  return sum;
}

function multiply(a, b) {
  const sum = a * b;
  return sum;
}

function divide(a, b) {
  const sum = a / b;
  if (sum === Infinity) return "ERROR"
  if (sum - Math.floor(sum) === 0) return sum;
  return sum.toFixed(2);
}
//end calculation functions

//operate
function operate([a, operator, b]) {
  if (operator === "+") {
    return add(a, b)
  } else if (operator === "-") {
    return subtract(a, b)
  } else if (operator === "*") {
    return multiply(a, b) 
  } else if (operator === "/") {
    return divide(a, b)
  }
}
//operate
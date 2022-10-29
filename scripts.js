let calculationFinished = false;

const numbersData = document.querySelectorAll('[data-number]');
const operatorsData = document.querySelectorAll('[data-operator]');
const screenInput = document.getElementById('screen-input');
const screenOutput = document.getElementById('screen-output');
const equalOperator = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');

equalOperator.addEventListener('click', calculate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', erase);
window.addEventListener('keydown', keyboardHandler);

//add event listener to every number button
numbersData.forEach((key) => key.addEventListener('click', () => {
    if(calculationFinished) {
      clear(); //reset calculator if equal was pressed before
      screenInput.textContent = key.textContent
      calculationFinished = false;
    } else {
      screenInput.textContent += key.textContent;
    }
  })
)

//add event listener for every operator button
operatorsData.forEach((key) => { //event listener for each operator key to output it on the calc screen
  key.addEventListener('click', () => {
    if(screenInput.textContent.charAt(screenInput.textContent.length -1) === " ") { //replace operator if already given
      erase();
    }
    else if (screenInput.textContent.replace("x", "*").split(" ").length === 3) {//calculate if two numbers are already given
      calculate();
      screenInput.textContent = screenOutput.textContent
      calculationFinished = false;
    }
    screenInput.textContent += ` ${key.textContent} `;
  })
})

function calculate() {
  let inputArray = screenInput.textContent.replace("x", "*").split(" ");
  if(operate(inputArray) === Infinity || isNaN(operate(inputArray))) { //if divided by 0 or invalid number
    screenOutput.textContent = "ERROR"
  } else if(operate(inputArray) - Math.floor(operate(inputArray)) === 0) { //if result has no decimal
    screenOutput.textContent = operate(inputArray)
  } else { //if result has a decimal
    screenOutput.textContent = operate(inputArray).toFixed(2) //round it to two decimal numbers
  }
  calculationFinished = true;
}

function erase() {
  if(screenInput.textContent.charAt(screenInput.textContent.length - 1) === " ") { 
    let newString = screenInput.textContent.slice(0, -3); //deletes twice if last letter is space
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

function keyboardHandler(e) {
  if((e.key >= 0 && e.key <= 9) || e.key === ".") numberClicked(e.key);
  if(e.key === "Enter") calculate();
  if(
    e.key === "/" ||
    e.key === "x" ||
    e.key === "-" ||
    e.key === "+"
    ) operatorClicked(e.key);
    if(e.key === "*") operatorClicked("x")
    if(e.key === "Backspace") erase();
    if(e.key === "Escape") clear();
}

function numberClicked(number) {
  {
    if(calculationFinished) {
      clear(); //reset calculator if equal was pressed before
      screenInput.textContent = number;
      calculationFinished = false;
    } else {
      screenInput.textContent += number;
    }
  }
}

function operatorClicked(operator) {
  if(screenInput.textContent.charAt(screenInput.textContent.length -1) === " ") { //replace operator if already given
    erase();
  }
  else if (screenInput.textContent.replace("x", "*").split(" ").length === 3) {//calculate if two numbers are already given
    calculate();
    screenInput.textContent = screenOutput.textContent
    calculationFinished = false;
  }
  screenInput.textContent += ` ${operator} `;
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
  return sum;
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
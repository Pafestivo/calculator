//calculation functions

function add([...args]) {
  const sum = args.reduce((total, next) => total + next)
  return sum;
}

function subtract([...args]) {
  const sum = args.reduce((total, next) => total - next)
  return sum;
}

function multiply([...args]) {
  const sum = args.reduce((total, next) => total * next)
  return sum;
}

function divide([...args]) {
  const sum = args.reduce((total, next) => total / next);
  if (sum === Infinity) return "ERROR"
  if (sum - Math.floor(sum) === 0) return sum;
  return sum.toFixed(2);
}
//end calculation functions

//operate
function operate(a, operator, b) {
  if (operator === "+") {
    return add([a, b])
  } else if (operator === "-") {
    return subtract([a, b])
  } else if (operator === "*") {
    return multiply([a, b]) 
  } else if (operator === "/") {
    return divide([a, b])
  }
}
//operate
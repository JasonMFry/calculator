let addEventsToButtons = () => {
  addDigitsListener();
  addOperationsListener();
}

// TODO make AC functional, don't disable AC here, instruct user to press AC in validateNumber()
let disableButtons = () => {
  let buttons = document.getElementsByTagName('button');
  for (let button of buttons) {
    button.disabled = true;
  }
}

let validateNumber = (number) => {
  if (number.toPrecision().length > 10) {
    disableButtons();
    return 'Error';
  } else if (number === Infinity) {
    disableButtons();
    return 'Undefined';
  }
  return number;
}

let math = {
  '+': (x, y) => {
    let sum = x + y;
    return validateNumber(sum);
  },
  '-': (x, y) => {
    let sum = x - y
    return validateNumber(sum);
  },
  '÷': (x, y) => {
    let product = x / y;
    return validateNumber(product);
  },
  '×': (x, y) => {
    let product = x * y;
    return validateNumber(product);
  },
}

let evaluateNumbers = () => {
  let numbersToEvaluate = tape.splice(-4, 3);
  let x = numbersToEvaluate[0];
  let y = numbersToEvaluate[2];
  let operator = numbersToEvaluate[1];
  let answer = math[operator](x, y);
  tape.splice(-1, 0, answer);
}

let addDigitsListener = () => {
  let digitButtons = document.getElementsByClassName('digits');
  let responsePane = document.getElementById('response-pane');
  for (let elem of digitButtons) {
    elem.addEventListener('click', (e) => {
      let elemText = e.currentTarget.innerText;
      if (responsePane.dataset.processed === 'false') {
        responsePane.innerText += elemText;
      } else {
        responsePane.innerText = elemText;
      } // end if
      responsePane.dataset.processed = false;
    });
  } // end for
}

let addOperationsListener = () => { // consider removing = button from this and giving it its own listener
  let operationButtons = document.getElementsByClassName('operations');
  let operators = ['+', '-', '×', '÷', '='];
  let addition = ['+', '-'];
  let multiplication = ['×', '÷'];
  let responsePane = document.getElementById('response-pane');
  for (let elem of operationButtons) {
    elem.addEventListener('click', (e) => {
      if (responsePane.dataset.processed !== 'true') {
        tape.push(Number(responsePane.innerText));
      }
      if (operators.includes(tape[tape.length - 1])) {
        tape.pop();
      }
      responsePane.dataset.processed = true;
      tape.push(e.currentTarget.innerText);

      let firstOperator = tape[1];
      let secondOperator = tape[3];
      // scenario: [N, m, N, m]
      // scenario: [N, m, N, a]
      // scenario: [N, a, N, a]
      if (tape.length === 4) {
        if (multiplication.includes(firstOperator) || addition.includes(secondOperator) || secondOperator === '=') {
          evaluateNumbers();
        }
      }
      if (tape.length === 6) {
        // scenario: [N, a, N, m, N, m]
        let thirdOperator = tape[5];
        if (multiplication.includes(thirdOperator) || thirdOperator === '=') { // TODO if thirdOperator === '=' it doesn't work correctly. fix it.
          evaluateNumbers();
        }
        // scenario: [N, a, N, m, N, a]
        if (addition.includes(thirdOperator)) {
          evaluateNumbers();
          evaluateNumbers();
        }
      }

      // TODO make this more resilient. I'm not happy with it. It assumes too much about the contents of `tape`
      responsePane.innerText = tape[tape.length - 2] || responsePane.innerText;

      if (tape[tape.length - 1] === '=') {
        tape.pop();
      }
    })
  } // end for
}

let tape = []

document.addEventListener('DOMContentLoaded', addEventsToButtons());
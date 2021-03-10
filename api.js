"use strict";

const calculator = document.querySelector('html');
const input = document.getElementById('display');
const output = document.querySelector('.calculator__output');
const number = document.querySelectorAll('.calculator__button');
const operator = document.querySelectorAll('.calculator__operator');
const result = document.querySelector('.calculator__key--equal');
const percentage = document.querySelector('.calculator__percentage');
const clear = document.querySelector('.calculator__backspace');
const clearAll = document.querySelector('.calculator__clear');
const pressedEqual = false;

function changeOutput() {
  let inputString = input.innerHTML;

  let lastChar = inputString[inputString.length-1];

  if (lastChar === "+"
    || lastChar === "-"
    || lastChar === "*"
    || lastChar === "/") {
    inputString = inputString.slice(0, inputString.length-1);
  }

  let numbers = inputString.split(/\+|\-|\*|\/|\%/g);
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  let percentage = operators.indexOf("%");
  while (percentage !== -1) {
    numbers.splice((percentage), 1, numbers[percentage - 1] / 100 * numbers[percentage]);
    operators.splice(percentage, 1);
    percentage = operators.indexOf("%");
  }

  let divide = operators.indexOf("/");
  while (divide !== -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("/");
  }

  let multiply = operators.indexOf("*");
  while (multiply !== -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("*");
  }

  let subtract = operators.indexOf("-");
  while (subtract !== -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add !== -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  if (numbers[0] === Infinity || numbers[0] === -Infinity || isNaN(numbers[0])) {
    output.innerHTML = 'Invalid operation';
  } else {
    output.innerHTML = numbers[0];
  }
};

function showResult(e) {
  input.innerHTML = output.innerHTML;
  pressedEqual = true;
};

function backspace() {
  input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
  changeOutput();
};

function deleteAll() {
  input.innerHTML = "";
  output.innerHTML = "";
};

function pressedKey(e) {
  let numbers = '0123456789.';
  let operators = '/*-+';

  if (numbers.includes(e.key)) {
    if (pressedEqual) {
      input.innerHTML = e.key;
      changeOutput();
      pressedEqual = false;
    } else {
      input.innerHTML += e.key;
      changeOutput();
    }
  }

  if (operators.includes(e.key)) {
    if (!input.innerHTML || input.innerHTML === 'Invalid operation') {
      input.innerHTML = '0' + e.key;
      changeOutput();
      pressedEqual = false;
    }

    let lastChar = input.innerHTML[input.innerHTML.length-1];

    if (lastChar === "+"
      || lastChar === "-"
      || lastChar === "*"
      || lastChar === "/") {
      input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length-1);
      input.innerHTML += e.key;
      changeOutput();
    } else {
      input.innerHTML += e.key;
      changeOutput();
      pressedEqual = false;
    }
  }

  if (e.key === 'Enter') {
    showResult();
  }

  if (e.key === 'Backspace') {
    backspace();
  }

  if (e.key === 'Delete') {
    deleteAll();
  }
}

calculator.addEventListener("keydown", pressedKey);

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    if (pressedEqual) {
      input.innerHTML = e.target.innerHTML;
      changeOutput();
      pressedEqual = false;
    } else {
      input.innerHTML += e.target.innerHTML;
      changeOutput();
    }
  });
};

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    if (!input.innerHTML || input.innerHTML === 'Invalid operation') {
      input.innerHTML = '0' + e.target.innerHTML;
      changeOutput();
      pressedEqual = false;
    }

    let lastChar = input.innerHTML[input.innerHTML.length-1];

    if (lastChar === "+"
      || lastChar === "-"
      || lastChar === "*"
      || lastChar === "/") {
      input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length-1);
      input.innerHTML += e.target.innerHTML;
      changeOutput();
    } else {
      input.innerHTML += e.target.innerHTML;
      changeOutput();
      pressedEqual = false;
    }
  });
};

result.addEventListener("click", showResult);

clear.addEventListener("click", backspace);

clearAll.addEventListener("click", deleteAll);

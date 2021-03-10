"use strict";

let input = document.getElementById('display');
let output = document.querySelector('.calculator__output');
let number = document.querySelectorAll('.calculator__button');
let operator = document.querySelectorAll('.calculator__operator');
let result = document.querySelector('.calculator__key--equal');
let clear = document.querySelector('.calculator__backspace');
let clearAll = document.querySelector('.calculator__clear');
let pressedEqual = false;

let arrOfNumAndOper = [];
let num = [];

function changeOutput() {
  let inputString = input.innerHTML;

  let lastChar = inputString[inputString.length-1];

  if (lastChar === "+"
    || lastChar === "-"
    || lastChar === "*"
    || lastChar === "/") {
    inputString = inputString.slice(0, inputString.length-1);
  }

  let numbers = inputString.split(/\+|\-|\*|\//g);
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

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

  output.innerHTML = numbers[0];
};

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    if (pressedEqual) {
      num = [e.target.innerHTML];
      input.innerHTML = e.target.innerHTML;
      changeOutput();
      pressedEqual = false;
    } else {
      num.push(e.target.innerHTML);
      input.innerHTML += e.target.innerHTML;
      changeOutput();
    }
  });
};

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
    let lastChar = input.innerHTML[input.innerHTML.length-1];

    if (lastChar === "+"
      || lastChar === "-"
      || lastChar === "*"
      || lastChar === "/") {
      arrOfNumAndOper.pop();
      arrOfNumAndOper.push(e.target.innerHTML);
      input.innerHTML = arrOfNumAndOper.join("");
      changeOutput();
    } else {
      arrOfNumAndOper.push(parseInt(num.join("")), e.target.innerHTML);
      num = [];
      input.innerHTML += e.target.innerHTML;
      changeOutput();
      pressedEqual = false;
    }
  });
};

result.addEventListener("click", function(e) {
  input.innerHTML = output.innerHTML;
  num = [output.innerHTML.split('')];
  arrOfNumAndOper = [];
  pressedEqual = true;
});

clear.addEventListener("click", function() {
  num.pop();
  input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
  changeOutput();
});

clearAll.addEventListener("click", function() {
  arrOfNumAndOper = [];
  input.innerHTML = "";
  output.innerHTML = "";
});
"use strict";

let input = document.getElementById('display'); // input
let output = document.querySelector('.calculator__output'); // output
let number = document.querySelectorAll('.calculator__button'); // number buttons
let operator = document.querySelectorAll('.calculator__operator'); // operator buttons
let result = document.querySelector('.calculator__key--equal'); // equal button
let clear = document.querySelector('.calculator__backspace'); // clear button
let clearAll = document.querySelector('.calculator__clear'); // clearAll button
let resultDisplayed = false; // flag to keep an eye on what output is displayed

let arrOfNumAndOper = [];
let num = [];

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    num.push(e.target.innerHTML);
    input.innerHTML += e.target.innerHTML;
    
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
    } else {
      arrOfNumAndOper.push(parseInt(num.join("")), e.target.innerHTML);
      num = [];
      input.innerHTML += e.target.innerHTML;
    }
  });
};

result.addEventListener("click", function(e) {
  if (!Number.isInteger(+input.innerHTML[input.innerHTML.length-1])) {
    console.log(+input.innerHTML[input.innerHTML.length-1]);
    return;
  }

  arrOfNumAndOper.push(parseInt(num.join("")));

  let resultOfCalc = arrOfNumAndOper[0];
  console.log(arrOfNumAndOper);

  for (let i = 1; i < arrOfNumAndOper.length; i++) {
    console.log(arrOfNumAndOper[i]);

    switch(arrOfNumAndOper[i]) {
      case "+":
        resultOfCalc += arrOfNumAndOper[i+1];
        break;
      case "-":
        resultOfCalc -= arrOfNumAndOper[i+1];
        break;
      case "*":
        resultOfCalc *= arrOfNumAndOper[i+1];
        break;
      case "/":
        resultOfCalc /= arrOfNumAndOper[i+1];
        break;
      default:
        continue;
    }
  }

  console.log("resultOfCalc: ", resultOfCalc);
  output.innerHTML = resultOfCalc;
  input.innerHTML = '';
  num = [];
  arrOfNumAndOper = [];
});

clear.addEventListener("click", function() {
  console.log(num[num.length-1]);
  // arrOfNumAndOper.pop();
  // input.innerHTML = arrOfNumAndOper.join("");
  num.pop();
  input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
});

clearAll.addEventListener("click", function() {
  arrOfNumAndOper = [];
  input.innerHTML = "";
  output.innerHTML = "";
});
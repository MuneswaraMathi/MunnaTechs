"use strict";
var c = 40;
//function declaration
function add(a, b) {
  const c = 20;
  console.log("Inside add function");
  console.log("from add() function c value:", c);
  //console.log("from add() function c value:",this.c);//Uncaught TypeError: Cannot read properties of undefined (reading 'c')
  console.log("this:", this);
  console.log(this === window);
  return a + b;
}
const sum1 = add(10, 20);
console.log("sum1:", sum1);
//function expression
const subtract = function (a, b) {
  console.log("Inside function expression");
  console.log("this:", this);
  console.log(this === window);
  return a - b;
};

const message = function(){
    return "Hello from message function";
}
console.log("message..",message());

console.log("Anonymous function..");
setTimeout(function(name="John"){
  console.log("Inside Anonymous function..", name);
  },10000);

//arrow function
const multiply = (a, b) => {
  console.log("Inside arrow function");
  console.log("this:", this);
  console.log(this === window);
  return a * b;
};

//using the functions
console.log("Addition:", add(5, 3)); // Output: 8
console.log("Subtraction:", subtract(5, 3)); // Output: 2
console.log("Multiplication:", multiply(5, 3)); // Output: 15

//function with default parameters
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet()); // Output: Hello, Guest!
console.log(greet("Alice")); // Output: Hello, Alice!

//function with rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); //Output: 6
console.log(sum(4, 5)); //Output: 9

//Default Parameters
function addition(a=20, b = 10) {
    return a + b;
}
console.log("addition with default parameters:", addition());

console.log("object...");
const obj = {
  age: 39,
  value: 10,
  add: function (a, b) {
    return a + b;
  },
  normalFunc: function () {
    console.log("from function age: ", this.age);
    console.log("from function value: ", this.value);
  },
  arrowFunc: () => {
    console.log("Inside arrowFunc this: ", this); //this will represents window object..
    console.log("from arrowfunction age: ", this.age); //undefined
    console.log("from arrowfunction value: ", this.value); //undefined..
  },
};

console.log(obj);
obj.normalFunc(); //10
obj.arrowFunc(); //undefined

//callback functions
console.log("Callback function without parameter");
function processCallback(callback) {
    console.log("processCallback called");
    callback();
  }

processCallback(function() {
   console.log("processCallback executed!");
});

console.log("Callback function with name");
function processName(name,callback) {
  console.log("name2: ", name);
  callback(name);
}

processName("John", function(name) {
  console.log("name1: ", name);
});

console.log("Callback function with parameter");
function processUser(a,b,callback) {
  console.log("parameters: ", a, b);
  callback(a,b);
}

processUser(10,20,function(a,b) {
  console.log("sum is:...", (a+b));
});

console.log("Callback function with parameter");
function calculateSum(a,b,calculate) {
    console.log("calculateSum called with parameters:", a, b);
  calculate(a,b);
}

calculateSum(30,40, function(a,b) {
    console.log("calcaulation is: ", a+b);
});

console.log("example of callback function..");

function sayHello(name){
    console.log("Inside called function sayHello()");
  console.log("Hello", name);
}

function process(callback){
    console.log("Inside calling function process()");
  callback("John");
}

process(sayHello);
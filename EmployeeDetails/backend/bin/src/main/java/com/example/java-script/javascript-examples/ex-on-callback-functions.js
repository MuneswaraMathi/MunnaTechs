
function sayHello(name){
    console.log("Inside callback function sayHello()");
    console.log("Hello", name);
}

function process(callback){
    console.log("Inside calling function process()");
    callback("Munna");
}

process(sayHello);

console.log("=====********=======");

console.log("calculateSum function..");
function calculateSum(a, b) {
  const sum = a + b;
  console.log("calculateSum called with parameters:", a, b, "sum is:", sum);
 return sum;
}

function processSum(callback) {
    console.log("Inside processSum function");
  callback(40, 60);
}

processSum(calculateSum);

console.log("=====********=======");

//callback functions
console.log("Callback function without parameter");
function processCallback(callback) {
    console.log("processCallback called");
    callback();
  }

processCallback(function() {
   console.log("processCallback executed without parameters:");
});

console.log("=====********=======");
//callback function for subtraction

function calculateSubtraction(a, b) {
  const subtraction = a - b;
  console.log("calculateSubtraction called with parameters:", a, b, "subtraction is:", subtraction);
 return subtraction;
}

function processSubtraction(callback) {
    console.log("Inside processSubtraction function");
  callback(100, 30);
}

processSubtraction(calculateSubtraction);

console.log("=====********=======");
console.log("callback function with welcome message..");

function welcomeMessage(name) {
  console.log("Welcome to the callback function, " + name + "!");
}

function displayWelcome(callback) {
    console.log("displayWelcome function called");
    callback("Munna");
}

displayWelcome(welcomeMessage);

console.log("=====********=======");
console.log("Higher Order function...:");

function multiplier(x){
    return function(y){
        return x*y;
    }
}

const double = multiplier(2);
console.log(double(5));

  console.log("=====********=======");
  console.log("immediately invoked functions...");
   (function(){
    console.log("this is from immediately invoked functions..");
   })();
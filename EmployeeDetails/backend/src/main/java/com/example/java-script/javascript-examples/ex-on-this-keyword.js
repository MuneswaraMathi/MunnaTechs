"use strict";
// x=10; with strict mode Error
//console.log(x);
console.log(this===window);

function testThis() {
    console.log("this keyword value in function:", this);
    console.log("globalThis keyword value in function:", globalThis);
    console.log(this===window);
  return "Function executed successfully";
}
const message = testThis();
console.log(message);

const arrowFunction = () => {
  console.log("this keyword value in arrow function:", this);
  console.log("globalThis keyword value in arrow function:", globalThis);
  console.log(this===window);
};

arrowFunction();

const obj = {
  name: "John",
  show() {
    console.log(this);
    console.log("type...",typeof this);
    console.log(this===window);
  }
};

obj.show();
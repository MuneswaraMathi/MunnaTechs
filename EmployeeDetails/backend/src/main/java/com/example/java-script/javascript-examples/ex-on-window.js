var x = 10;
let y = 20;
const z = 30;

var window=40;
//let window=50;Uncaught SyntaxError: Identifier 'window' has already been declared
//const window=60;//Uncaught SyntaxError: Identifier 'window' has already been declared
console.log("window.....:", window);//prints global window object..

//var this=70;//'this' is not allowed as a variable declaration name.ts(1389)
//let this=80; Error
//const this=90;Error

function testWindow() {
    console.log("local window variable value:", window);
    var window=100;
    console.log("after initialization local window variable value:", window);
}

const testArrowFunction = () => {
    console.log("testArrowFunction in window object");
};
console.log("testWindow function:", window.testWindow());
console.log("window object in global scope", window);

console.log("var x value in window:", window.x);
console.log("let y value in window:", window.y);
console.log("const z value in window:", window.z);

console.log("testWindow function:", window.testWindow);
console.log("testArrowFunction function:", window.testArrowFunction);

console.log("====*******=====");
console.log("this object in global scope", this);
console.log("var x value in this:", this.x);
console.log("let y value in this:", this.y);
console.log("const z value in this:", this.z);
console.log("testWindow function with this keyword:", this.testWindow);
console.log("testArrowFunction function with this keyword:", this.testArrowFunction);

console.log("======= Errors =======");
//console.log(x);//Uncaught ReferenceError: x is not defined
//console.log("This line will not be executed due to error above");

var x=10;
var x=20;
 x=30;

console.log("Value of x is: ", x);


let y=10;
//let y=20;//Uncaught SyntaxError: Identifier 'y' has already been declared
 y=30;
 console.log("Value of y is: ", y);

 const z=10;
 //const z=20; //Uncaught SyntaxError: Identifier 'z' has already been declared
  z=30; //Uncaught TypeError: Assignment to constant variable.
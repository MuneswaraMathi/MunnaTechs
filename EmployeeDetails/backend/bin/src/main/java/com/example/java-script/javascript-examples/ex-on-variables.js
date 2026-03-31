console.log("======= Var =======");
console.log("variables before initialization");
console.log("var before declaration and without initialization",x);
console.log("======= ***** =======");
var x;
var x;//var allows redeclaration
var x=10;
console.log("variables after initialization");
console.log("var after declaration without initialization",x);

console.log("======= ****** =======");
console.log("======= let =======");

console.log("variables before initialization");
//console.log("let before declaration and without initialization",y);//Uncaught ReferenceError: Cannot access 'y' before initialization
console.log("======= ***** =======");
let y;
//let y;//SyntaxError: Identifier 'y' has already been declared
console.log("variables after initialization");
console.log("let after declaration without initialization",y);


console.log("======= ****** =======");
console.log("======= const =======");

console.log("variables before initialization");
//console.log("const before declaration and without initialization",z);//Uncaught ReferenceError: Cannot access 'z' before initialization
console.log("======= ***** =======");
//let y;//Cannot redeclare block-scoped variable 'y'.
//const z;//SyntaxError: Missing initializer in const declaration
const z = 10;
//const z = 20;//SyntaxError: Identifier 'z' has already been declared
console.log("variables after initialization");
console.log("const after declaration with initialization",z);
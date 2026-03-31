
console.log("======= Window Object in global scope =======");
console.log("window object",window);
console.log(typeof window);

console.log("======= this keyword in global scope =======");
console.log("this keyword in global scope",this);
console.log(typeof this);

console.log("in global scope window and this are equal:",this === window);//true

//const window=10;//Uncaught SyntaxError: Identifier 'window' has already been declared
//const this=20;//'this' is not allowed as a variable declaration name.ts(1389)
console.log("window value in global scope",window);

function testThisInFunction() {
    //console.log("window value inside function",window);//Uncaught ReferenceError: Cannot access 'window' before initialization
    const window=100;
    console.log("window value inside function",window);
   // const this=10;//'this' is not allowed as a variable declaration name.ts(1389)
    console.log("======= this keyword inside function =======");
    console.log("this keyword inside function",this);
}
testThisInFunction();

const testThisInArrowFunction = () => {
    console.log("======= this keyword inside arrow function =======");
    console.log("this keyword inside arrow function",this);
}
testThisInArrowFunction();
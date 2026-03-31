
let bigInt1 = 90n;
console.log("bigInt1 is: ", bigInt1);
console.log(`bigInt1 type is ${typeof bigInt1}`);

console.log("========***********=========");

let bigInt2 = BigInt("12");
console.log("bigInt2 is: ", bigInt2);
console.log(`bigInt2 type is ${typeof bigInt2}`);

console.log("========***********=========");

let bigInt3 = BigInt(123);
console.log("bigInt3 is: ", bigInt3);
console.log(`bigInt3 type is ${typeof bigInt3}`);

console.log("========***********=========");

let bigInt5 = BigInt(true);
console.log("bigInt5 is: ", bigInt5);
console.log(`bigInt5 type is ${typeof bigInt5}`);

console.log("========***********=========");

let bigInt6 = BigInt(false);
console.log("bigInt6 is: ", bigInt6);
console.log(`bigInt6 type is ${typeof bigInt6}`);

console.log("========***********=========");
let bigInt7 = 123;
let bigIntToNum = Number(bigInt7);
console.log("bigIntToNum is: ", bigIntToNum);
console.log(`bigIntToNum type is ${typeof bigIntToNum}`);

console.log("========***********=========")
//let bigInt = new BigInt(12);//Uncaught TypeError: BigInt is not a constructor
//console.log("bigInt is:",bigInt);

//let bigInt4 = BigInt("123abc");//Uncaught SyntaxError: Cannot convert 123abc to a BigInt
//console.log("bigInt4 is: ", bigInt4);
//console.log(`bigInt4 type is ${typeof bigInt4}`);






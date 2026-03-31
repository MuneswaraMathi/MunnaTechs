
let x = 42;
console.log("number is: ", x);
console.log(`x type is ${typeof x}`);

console.log("========***********=========");
let y= Number(260);
console.log("y is: ", y);
console.log(`y type is ${typeof y}`);

console.log("========***********=========");
let z = new Number(12);
console.log("z is: ", z);
console.log(`z type is ${typeof z}`);

console.log("========***********=========");
let result = "Munna"/10;
console.log("result is: ", result);
console.log(`result type is ${typeof result}`);

let finalResult = result*10;
console.log("finalResult is: ", finalResult);
console.log(`finalResult type is ${typeof finalResult}`);

console.log("========***********=========");
let result2 = 10/"Munna";
console.log("result2 is: ", result2);
console.log(`result2 type is ${typeof result2}`);

console.log("========***********=========");
let result3 = "Munna"/"Rao";
console.log("result3 is: ", result3);
console.log(`result3 type is ${typeof result3}`);

console.log("========***********=========");
let result4 = 10/0;
console.log("result4 is: ", result4);
console.log(`result4 type is ${typeof result4}`);

console.log("========***********=========");
let result5 = -10/0;
console.log("result5 is: ", result5);
console.log(`result5 type is ${typeof result5}`);

console.log("========***********=========");
let result6 = 0/0;
console.log("result6 is: ", result6);
console.log(`result6 type is ${typeof result6}`);

const paraGraph = document.getElementById("paragraph");
console.log("paraGraph",paraGraph);
if(paraGraph){
    paraGraph.innerText = "This is a paragraph"; // can not set properties of null
}

console.log("========***********=========");
let result7 = Number("123abc");
console.log("result7 is: ", result7);
console.log(`result7 type is ${typeof result7}`);

console.log("========***********=========");
let result8 = Number("123");
console.log("result8 is: ", result8);
console.log(`result8 type is ${typeof result8}`);

console.log("========***********=========");
let result9 = Number(true);
console.log("result9 is: ", result9);
console.log(`result9 type is ${typeof result9}`);

let result91 = true;
console.log("result91 is: ", result91);
console.log(`result91 type is ${typeof result91}`);

let result92 = new Number(false);
console.log("result92 is: ", result92);
console.log(`result92 type is ${typeof result92}`);

console.log("========***********=========");
let result10 = Number(false);
console.log("result10 is: ", result10);
console.log(`result10 type is ${typeof result10}`);

console.log("========***********=========");
let result11 = 0/10;
console.log("result11 is: ", result11);
console.log(`result11 type is ${typeof result11}`);

console.log("========***********=========");
let result12 = "30"/"3";
console.log("result12 is: ", result12);
console.log(`result12 type is ${typeof result12}`);

console.log("========***********=========");
let result13 = Number("123abc");
console.log("result13 is: ", result13);
console.log(`result13 type is ${typeof result13}`);

console.log("========***********=========");
let result16 = new Number("123abc");
console.log("result16 is: ", result16);
console.log(`result16 type is ${typeof result16}`);

console.log("========***********=========");
let result14 = result16 ** 0;
console.log("result14 is: ", result14);
console.log(`result14 type is ${typeof result14}`);

console.log("========***********=========");
let result15 = result16 + 1;
console.log("result15 is: ", result15);
console.log(`result15 type is ${typeof result15}`);

console.log("========***********=========");
let stringToNumber = Number("abc");
console.log("stringToNumber is: ", stringToNumber);
console.log(`stringToNumber type is ${typeof stringToNumber}`);

let stringToNumber2 = "abc";
console.log(+stringToNumber2);
console.log(`stringToNumber2 type is ${typeof +stringToNumber2}`);

console.log("========***********=========");
let stringToNumber3 = "123";
console.log("stringToNumber3 is: ", +stringToNumber3);
console.log(`stringToNumber3 type is ${typeof +stringToNumber3}`);

console.log("========***********=========");
let stringToNumber4 = "123";
console.log("stringToNumber4 is: ", -stringToNumber4);
console.log(`stringToNumber4 type is ${typeof -stringToNumber4}`);
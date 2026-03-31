"use strict";
var x=10;
{
    var x = 40;
    let y = 50;
    const z = 60;
    var v=1000;
    console.log("Inside block scope:");
    console.log("Value of x:", x); // 40
    console.log("Value of y:", y); // 50
    console.log("Value of z:", z); // 60    
}

   console.log("Value of v outside the block", v); // 1000

    console.log("Value of x outside the block", x); // 40
    //console.log("Value of y outside the block", y); // 20 Uncaught ReferenceError: y is not defined
    //console.log("Value of z outside the block", z); // 30 Uncaught ReferenceError: z is not defined
    //console.log("Value of y:", y); //Uncaught ReferenceError: y is not defined
    //console.log("Value of z:", z); //Uncaught ReferenceError: y is not defined

function test(){
    console.log("Inside function scope:");
    v=2000;
    let y=100;
     y=101;
    const z=101;
    console.log("Value of x:", x); // 40
    console.log("Value of y:", y); // 101
    console.log("Value of z:", z); // 30    
}
test();
console.log("Value of v outside the function", v); // 2000

const testArrowFunction = () => {
 console.log("Inside arrowfunction scope:");
     let y=103;
    console.log("Value of x:", x); // 40
    console.log("Value of y:", y); // 103
    //console.log("Value of z:", z); // 30  Uncaught ReferenceError: z is not defined 

}
console.log(testArrowFunction())

const testfunction = function(){
    console.log("Inside variablefunction scope:");
         let y=105;
       const z=105;
    console.log("Value of x:", x); // 40
    console.log("Value of y:", y); // 20
    console.log("Value of z:", z); // 30    

}
console.log(testfunction())

 //k=1000;
 //console.log(k); //Uncaught ReferenceError: k is not defined

    console.log("final Value of x:", x); // 40
    //console.log("final Value of y:", y); // 101 Uncaught ReferenceError: y is not defined
    //console.log("final Value of z:", z); // 30 Uncaught ReferenceError: z is not defined 

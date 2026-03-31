
sayHello();

function sayHello(){
    console.log("Hello");
}
console.log("sayHello function: ",window.sayHello());

console.log(getName);

var getName =()=>function() { 
    console.log("getName  arrow function called");
}
console.log(x);
var x;
console.log(getName);

var getName = function() { 
    console.log("getName function called");
}

console.log(getName);
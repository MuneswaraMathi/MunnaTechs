
const a = 5; //number
console.log("a is: ", a);
console.log(`${a} type is ${typeof a}`)

console.log("========***********=========");

const userName = 'Muneswara Rao Mathi';//string
console.log("userName is: ", userName);
console.log(`${userName} type is ${typeof userName}`)

console.log("========***********=========");

const isActive = true; //boolean
console.log("isActive is: ", isActive);
console.log(`${isActive} type is ${typeof isActive}`)

console.log("========***********=========");
let x;
console.log("x is: ", x);
console.log(`${x} type is ${typeof x}`)

console.log("========***********=========");
let y = null;
console.log("y is: ", y);
console.log(`${y} type is ${typeof y}`);

console.log("========***********=========");
let z = 12376557n;
console.log("z is: ", z);
console.log(`${z} type is ${typeof z}`);

console.log("========***********=========");
let id = Symbol('id');
console.log("id is: ", id);
console.log(typeof id);
//console.log(`${id} type is ${typeof id}`);//Uncaught TypeError: Cannot convert a Symbol value to a string

console.log("========data types stored by reference(object)=========");
const obj1 = {
    name: 'John',
     age: 30
};
console.log("obj1 is: ", obj1);
console.log(`type is ${typeof obj1}`);

const obj2 = obj1;
console.log("obj2 is: ", obj2);
console.log(`type is ${typeof obj2}`);

obj2.name = 'Jane';
console.log("obj1 after modifying obj2: ", obj1);
console.log("name in obj1 is: ", obj1.name);

console.log("========***********=========");
const array = [1, 2, 3];
console.log("array is: ", array);
console.log(`type is ${typeof array}`);

console.log("========***********=========");
const greet = function(name) {
    return `Hello, ${name}!`;
};
console.log("greet is: ", greet("Munna"));
console.log(`type is ${typeof greet}`);

console.log("========***********=========");
const date = new Date();
console.log("date is: ", date);
console.log(`type is ${typeof date}`);

console.log("========***********=========");
const regExp = /pattern/g;
console.log("regExp is: ", regExp);
console.log(`type is ${typeof regExp}`);
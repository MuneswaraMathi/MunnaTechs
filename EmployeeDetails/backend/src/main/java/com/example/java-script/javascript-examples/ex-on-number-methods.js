console.log("==========*** isNaN() method ***===========");
console.log("isNaN value for NaN:", Number.isNaN(NaN));
console.log("isNaN value for 123:", Number.isNaN(123));
console.log("isNaN value for '123':", Number.isNaN("123"));
console.log("isNaN value for null:", Number.isNaN(null));
console.log("isNaN value for true:", Number.isNaN(true));
console.log("isNaN value for false:", Number.isNaN(false));
console.log("isNaN value for Infinity:", Number.isNaN(Infinity));
console.log("isNaN value for -Infinity:", Number.isNaN(-Infinity));
console.log("isNaN value for 0:", Number.isNaN(0));
console.log("isNaN value for 1234/'abc':", Number.isNaN(1234/"abc"));
console.log("isNaN value for 'abc':", Number.isNaN("abc"));

console.log("isNaN value for undefined:", Number.isNaN(undefined));

let undefinedValue = Number(undefined);
console.log("undefinedValue is: ", undefinedValue);
console.log(`undefinedValue type is ${typeof undefinedValue}`);
console.log("isNaN value for undefinedValue:", Number.isNaN(undefinedValue));

console.log("==========*** isFinite() method ***===========");
console.log("isFinite value for NaN:", Number.isFinite(NaN));
console.log("isFinite value for 123:", Number.isFinite(123));
console.log("isFinite value for '123':", Number.isFinite("123"));
console.log("isFinite value for undefined:", Number.isFinite(undefined));
console.log("isFinite value for null:", Number.isFinite(null));
console.log("isFinite value for true:", Number.isFinite(true));
console.log("isFinite value for false:", Number.isFinite(false));
console.log("isFinite value for Infinity:", Number.isFinite(Infinity));
console.log("isFinite value for -Infinity:", Number.isFinite(-Infinity));


console.log("==========*** isInteger() method ***===========")
console.log("isInteger value for 123:", Number.isInteger(123));
console.log("isInteger value for 123.45:", Number.isInteger(123.45));
console.log("isInteger value for '123':", Number.isInteger("123"));
console.log("isInteger value for NaN:", Number.isInteger(NaN));
console.log("isInteger value for Infinity:", Number.isInteger(Infinity));
console.log("isInteger value for -Infinity:", Number.isInteger(-Infinity));
console.log("isInteger value for undefined:", Number.isInteger(undefined));
console.log("isInteger value for null:", Number.isInteger(null));
console.log("isInteger value for true:", Number.isInteger(true));
console.log("isInteger value for false:", Number.isInteger(false));


console.log("==========*** isSafeInteger() method ***===========");
console.log("isSafeInteger value for 9007199254740991:", Number.isSafeInteger(9007199254740991));
console.log("isSafeInteger value for 1900719925474099223:", Number.isSafeInteger(9007199254740992));
console.log("isSafeInteger value for 123.45:", Number.isSafeInteger(123.45));
console.log("isSafeInteger value for '123':", Number.isSafeInteger("123"));
console.log("isSafeInteger value for NaN:", Number.isSafeInteger(NaN));
console.log("isSafeInteger value for Infinity:", Number.isSafeInteger(Infinity));
console.log("isSafeInteger value for -Infinity:", Number.isSafeInteger(-Infinity));
console.log("isSafeInteger value for undefined:", Number.isSafeInteger(undefined));
console.log("isSafeInteger value for null:", Number.isSafeInteger(null));
console.log("isSafeInteger value for true:", Number.isSafeInteger(true));
console.log("isSafeInteger value for false:", Number.isSafeInteger(false));

console.log("==========*** parseInt() method ***===========");
console.log("parseInt value for '123':", Number.parseInt("123"));
console.log("parseInt value for '123.45':", Number.parseInt("123.45"));
console.log("parseInt value for 'abc':", Number.parseInt("abc"));
console.log("parseInt value for '0x10':", Number.parseInt("0x10"));
console.log("parseInt value for '010':", Number.parseInt("010"));
console.log("parseInt value for '010' with radix 8:", Number.parseInt("010", 8));
console.log("parseInt value for '123abc':", Number.parseInt("123abc"));

console.log("==========*** parseFloat() method ***===========");
console.log("parseFloat value for '123.45':", Number.parseFloat("123.45"));
console.log("parseFloat value for '123.45abc':", Number.parseFloat("123.45abc"));
console.log("parseFloat value for 'abc':", Number.parseFloat("abc"));
console.log("parseFloat value for '0x10':", Number.parseFloat("0x10"));
console.log("parseFloat value for '010':", Number.parseFloat("010"));
console.log("parseFloat value for '010' with radix 8:", Number.parseFloat("010", 8));
console.log("parseFloat value for '123abc':", Number.parseFloat("123abc"));

console.log("convert value for '123':",Number("123"));   // 123
console.log("convert value for 'abc':",Number("abc"));   // NaN

console.log("==========*** instance() method ***===========");

let num1 = new Number("123bca");
let num2 = num1.valueOf();
console.log("num1 is: ", num1);
console.log("num2 is: ", num2);

let num = 123.456;
console.log("toFixed value for num:", num.toFixed(2));
console.log("toPrecision value for num:", num.toPrecision(5));
console.log("toString value for num:", num.toString());

let num10 = "123";
console.log("value of:",num10.valueOf());


lastName="Mathi";
console.log(lastName);

age=41;
console.log(age);

class Book{
    static author="Muneswara Rao";
    constructor(title,price,pages){
        this.title=title;
        this.price=price;
        this.pages=pages
    }

    updatePrice(newPrice){
        this.price=newPrice;
    }
}

function updateLastName(newName){
this.lastName=newName;
};


class Pen{
    constructor(companyName,price,color){
        this.companyName=companyName;
        this.price=price;
        this.color=color;
    }

    updateColor(newColor){
        this.color=newColor;
    }
}

//jsb is javascript book
const jsb = new Book("JavaScript Book",500,150,"Munna");
console.log("title: ",jsb.title);
console.log("price: ",jsb.price);
console.log("author: ",Book.author);
jsb.updatePrice(1000);
console.log("price after update: ",jsb.price);


//jb is java book
//const pen = new Pen();
//console.log(pen);//Uncaught ReferenceError: Pen is not defined
console.log("=====*********=======")
const jb = new Book("Java Book",1000,200);
console.log("java book author",Book.author);

console.log("=====*********=======")
//sb is spring book
const sb = jb;
console.log("Spring book author: ",sb.author);
sb.author="Kishore";

console.log("java book author:",jb.author);
console.log("spring book author:",sb.author);

console.log("=====****Pen*****=======")

let renalds = new Pen("renalds",10,"Red")
console.log("renalds1",renalds);
console.log("pen color: ",renalds.color)

renalds = jsb;
console.log("renalds2",renalds);

console.log("renalds2 color: ",renalds.color);
console.log("typs of renalds2",typeof renalds);

console.log("===creating classes using object notation");

const person = {
    firstName:"Muneswara",
    middleName:"Rao",
    lastName:"Mathi",
    wish:function(){
      console.log("Hello ",this.firstName)
    }
};

console.log("person obj: ",person);
console.log("person firstName:",person.firstName);
console.log("person wish message..",person.wish);

console.log("author: ",this.author)


function normalFunction(){
    console.log("this is from normalFunction()...");
    console.log("color from normalFunction: ",this.age);
}

normalFunction();
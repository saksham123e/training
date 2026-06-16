function greet(name, callback) {
    console.log("Hello " + name);

    setTimeout(callback, 2000); 
}

function sayBye() {
    console.log("Bye after 2 sec");
}

greet("Saksham", sayBye);
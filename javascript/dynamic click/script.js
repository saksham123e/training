let title = document.getElementById("title");
let button = document.getElementById("btn");
let texts = document.querySelectorAll(".text");


button.addEventListener("click", function() {

    
    title.innerText = "Button Clicked ";

    
    title.style.color = "blue";

    
    texts.forEach((el) => {
        el.style.color = "white";
        el.style.backgroundColor = "black";
    });
});
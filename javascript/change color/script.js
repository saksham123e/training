let btn = document.getElementById("btn");
let box = document.getElementById("box");
let colorText = document.getElementById("colorCode");

btn.addEventListener("click", function() {

   
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let color = "rgb(" + r + "," + g + "," + b + ")";

  
    box.style.background = color;

  
    colorText.innerText = "Color: " + color;
});
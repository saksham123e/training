let input = document.getElementById("input");
let text = document.getElementById("text");

input.addEventListener("input", function() {
    text.innerText = input.value;
});
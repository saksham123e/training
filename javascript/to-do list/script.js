let input = document.getElementById("input");
let button = document.getElementById("btn");
let list = document.getElementById("list");

button.addEventListener("click", function() {

    let value = input.value;

    if (value === "") return;

    let li = document.createElement("li");

    li.innerText = value;

    list.appendChild(li);

    input.value = "";
});
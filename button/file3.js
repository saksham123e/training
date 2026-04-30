let first = document.getElementById("firstName");
let last = document.getElementById("lastName");
let full = document.getElementById("fullName");

function updateName() {
  full.value = (first.value + " " + last.value).trim();
}

first.addEventListener("input", updateName);
last.addEventListener("input", updateName);
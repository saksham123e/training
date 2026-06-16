let form = document.getElementById("form");
form.addEventListener("submit", function(e){
    e.preventDefault()

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value

    error.innertext = ""
})
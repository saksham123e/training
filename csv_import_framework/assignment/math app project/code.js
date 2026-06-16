let currentType = "";

function openModal(type) {
    currentType = type;

    if (type === "prime") {
        document.getElementById("primePanel").classList.add("active");
        document.getElementById("modal").style.display = "none";
    } else {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("primePanel").classList.remove("active");

        document.getElementById("numberInput").style.display = "block";
        document.getElementById("title").innerText = type === "fibo" ? "Fibonacci Number" : "Odd or Even";
    }
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("primePanel").classList.remove("active");
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function checkPrime() {
    let start = parseInt(document.getElementById("start").value);
    let end = parseInt(document.getElementById("end").value);
    let primes = [];

    for (let i = start; i <= end; i++) {
        if (isPrime(i)) primes.push(i);
    }

    document.getElementById("primeResult").innerText = primes.length ? primes.join(", ") : "No primes found";
}

function checkNumber() {
    let num = parseInt(document.getElementById("numberInput").value);
    let result = "";

    if (currentType === "odd") {
        result = num % 2 === 0 ? "Even Number" : "Odd Number";
    } else if (currentType === "fibo") {
        let a = 0, b = 1;
        let series = [a];
        if (num > 1) series.push(b);

        for (let i = 2; i < num; i++) {
            let next = a + b;
            series.push(next);
            a = b;
            b = next;
        }
        result = series.join(", ");
    }

    document.getElementById("modalResult").innerText = result;
}
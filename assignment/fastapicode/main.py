from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Number(BaseModel):
    number: int

@app.post("/prime")
def check_prime(data: Number):
    num = data.number

    if num <= 1:
        return {"result": "Not Prime "}

    for i in range(2, num):
        if num % i == 0:
            return {"result": "Not Prime "}

    return {"result": "Prime Number "}

@app.post("/prime-range")
def prime_range(data: dict):
    start = data["start"]
    end = data["end"]
    primes = []

    for num in range(start, end + 1):
        if num > 1:
            for i in range(2, num):
                if num % i == 0:
                    break
            else:
                primes.append(num)

    return {"result": primes}

@app.post("/odd-even")
def odd_even(data: Number):
    num = data.number
    return {
        "result": "Even Number" if num % 2 == 0 else "Odd Number"
    }

@app.post("/fibonacci")
def fibonacci(data: Number):
    n = data.number
    a, b = 0, 1
    series = [a]

    if n > 1:
        series.append(b)

    for _ in range(2, n):
        a, b = b, a + b
        series.append(b)

    return {"result": series}
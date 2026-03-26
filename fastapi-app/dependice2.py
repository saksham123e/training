from fastapi import FastAPI, Depends

app = FastAPI()

def check_even(number: int):
    if number % 2 == 0:
        return "Even"
    return "Odd"

@app.get("/check/{number}")
def check_number(type = Depends(check_even)):
    return {"type": type}
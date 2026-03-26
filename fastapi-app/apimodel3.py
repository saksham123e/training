from fastapi import FastAPI

app = FastAPI()

numbers = [10, 20, 30, 40]

@app.get("numbers")
def new_number():
    return{
        numbers
    }
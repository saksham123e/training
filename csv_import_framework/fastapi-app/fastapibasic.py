from fastapi import FastAPI

app = FastAPI()

user = [ "saksham" , "rahul" , "aman"]

@app.get("/user/{index}")
def get_user(index: int):
    if index >= len(user):
        return {"error": "user not find"}

    return{"user": user [index]}

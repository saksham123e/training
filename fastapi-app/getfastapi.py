from fastapi import FastAPI

app = FastAPI()

user = [ "saksham" , "sammer" , "rahul"]

@app.get("/user")
def get_user():
    return {"user":user}
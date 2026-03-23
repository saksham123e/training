from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class user (BaseModel):
    name:str

user = []

@app.post("/user")
def create_user(user: user):
    user.append(user.name)
    return {"messages": "user added" , "user": user.name}
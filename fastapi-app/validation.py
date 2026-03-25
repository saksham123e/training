from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class User(BaseModel):
    name: str
    age: Optional[int] = 18

@app.post("/users")
def create_user(user: User):
    return {
        "name": user.name,
        "age": user.age
    }

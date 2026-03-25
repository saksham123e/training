from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI()

class User(BaseModel):
    name: str = Field(min_length=3)
    age: Optional[int] = None         
    city: str = "Delhi"               

@app.post("/user")
def create_user(user: User):
    return {
        "message": "User created",
        "data": {
            "name": user.name,
            "age": user.age,
            "city": user.city
        }
    }
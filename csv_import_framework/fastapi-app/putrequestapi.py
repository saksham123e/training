from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    age: int

@app.put("/users/{user_id}")
def update_user(user_id: int, user: User):
    return {
        "message": "User updated",
        "user_id": user_id,
        "data": user
    }
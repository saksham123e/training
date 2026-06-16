from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str

users = ["saksham", "rahul", "aman"]

@app.put("/users/{index}")
def update_user(index: int, user: User):
    if index < 0 or index >= len(users):
        return {"error": "User not found"}
    
    users[index] = user.name
    return {"message": "Updated", "user": user.name}
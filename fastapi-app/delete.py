from fastapi import FastAPI

app = FastAPI()

users = ["saksham", "rahul", "aman"]

@app.delete("/users/{index}")
def delete_user(index: int):
    if index < 0 or index >= len(users):
        return {"error": "User not found"}
    
    deleted = users.pop(index)
    return {"message": "Deleted", "user": deleted}
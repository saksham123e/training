from fastapi import FastAPI

app = FastAPI()

users = ["Saksham", "Rahul"]

@app.get("/users")
def get_users():
    return {"users": users}
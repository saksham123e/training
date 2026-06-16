from fastapi import FastAPI

app = FastAPI()

names = ["ram", "shyam", "mohan"]

@app.get("/names/{index}")
def get_name(index: int):
    if index >= len(names):
        return {"error": "Invalid index"}
    
    return {
        "name": names[index]
    }
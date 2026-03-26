from fastapi import FastAPI, Depends

app = FastAPI()

def get_message():
    return "Hello Saksham"

@app.get("/")
def home(msg = Depends(get_message)):
    return {"message": msg}
from fastapi import FastAPI

app = FastAPI(title="Kid Math AI Platform Backend")

@app.get("/")
def root():
    return {
        "message": "Kid Math AI backend is running"
    }
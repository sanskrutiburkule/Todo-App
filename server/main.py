import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ---- GLOBAL OPTIONS FIX (CRITICAL) ----
@app.middleware("http")
async def allow_options(request: Request, call_next):
    if request.method == "OPTIONS":
        return Response(status_code=200)
    return await call_next(request)

# ---- CORS ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- SUPABASE ----
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# ---- MODEL ----
class Task(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    status: str
    due_date: Optional[str] = None

# ---- ROUTES ----
@app.get("/tasks")
def get_tasks():
    return supabase.table("tasks").select("*").execute().data

@app.post("/tasks")
def create_task(task: Task):
    return supabase.table("tasks").insert(task.dict()).execute().data

@app.get("/tasks/{id}")
def get_task(id: str):
    res = supabase.table("tasks").select("*").eq("id", id).execute()
    if not res.data:
        raise HTTPException(404, "Task not found")
    return res.data[0]

@app.put("/tasks/{id}")
def update_task(id: str, task: Task):
    return supabase.table("tasks").update(task.dict()).eq("id", id).execute().data

@app.delete("/tasks/{id}")
def delete_task(id: str):
    supabase.table("tasks").delete().eq("id", id).execute()
    return {"message": "Task deleted"}

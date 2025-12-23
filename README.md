# Todo-App

 Task Manager – Full Stack Application

 1. Project Overview

This project is a **full-stack Task Manager application** developed as part of a technical assignment.  
The application allows users to **create, view, update, and delete tasks** with attributes such as title, description, status, priority, and due date.

The project is structured with a clear separation of concerns:
- Frontend built using Next.js
- Backend built using FastAPI
- Database managed using Supabase (PostgreSQL)

The UI is intentionally simple, clean, and functional, following assignment requirements.

---

 2. Tech Stack Used

 Frontend
- Next.js (App Router)
- React
- TypeScript
- Axios
- Custom CSS

 Backend
- FastAPI
- Python
- Supabase Python Client
- Pydantic
- Uvicorn

 Database
- Supabase (PostgreSQL)

---

 3. How to Install and Run the Backend

### Step 1: Navigate to backend folder
```bash
cd server
```
Step 2: Create and activate virtual environment
```bash

python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

Step 3: Install dependencies
```bash

pip install -r requirements.txt
```
Step 4: Create environment variables

Create a .env file inside the server folder:
```bash

SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```
Step 5: Run backend
```bash


uvicorn main:app --reload --port 8000
```

Backend will run at:
```bash


http://localhost:8000
```
4. How to Install and Run the Frontend
Step 1: Navigate to frontend folder
```bash

cd client
```
Step 2: Install dependencies
```bash

npm install
```

Step 3: Create environment variables
```bash


Create .env.local inside client folder:

NEXT_PUBLIC_API_URL=http://localhost:8000

```
Step 4: Run frontend
```bash
npm run dev
```

Frontend will run at:
```bash
http://localhost:8080
```
5. Supabase Setup (Database)
Step 1: Create Supabase Project

Go to https://supabase.com

Create a new project

Copy the Project URL and Anon Public Key

step 2: Create tasks Table

Run the following SQL in Supabase SQL Editor:
```bash
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  priority text,
  status text,
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```
Step 3: Row Level Security (Development)
alter table tasks enable row level security;
```bash
create policy "Allow all access"
on tasks
for all
using (true);
```
6. Environment Example Files
 ```bash  
server/.env.example
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_KEY=your_supabase_anon_public_key_here

client/.env.example
NEXT_PUBLIC_API_URL=http://localhost:8000

```
screenshots

TASK LIST PAGE
<img width="1470" height="956" alt="Screenshot 2025-12-23 at 14 13 08" src="https://github.com/user-attachments/assets/d52d259f-0395-48b3-ba3b-fc8378278ed5" />

CREATE/TASK PAGE
<img width="1470" height="956" alt="Screenshot 2025-12-23 at 14 11 55" src="https://github.com/user-attachments/assets/ed66447e-320d-444d-aeef-caab887431e0" />


import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = () => api.get("/tasks");
export const getTask=(id:string)=> api.get(`/tasks/${id}`);
export const createTask = (data: any) => api.post("/tasks", data);
export const updateTask = (id: string, data: any) =>
  api.put(`/tasks/${id}`, data);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);

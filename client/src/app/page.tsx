"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTasks, deleteTask } from "@/lib/api";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="container">
      <h1>Tasks</h1>
      <Link href="/create">+ Create Task</Link>

      {tasks.map((task) => (
        <div key={task.id} className="card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.status} | {task.priority}</p>

          <Link href={`/edit/${task.id}`}>Edit</Link>
          <button onClick={() => deleteTask(task.id).then(loadTasks)}>
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

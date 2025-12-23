"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTask, updateTask } from "@/lib/api";
import TaskForm from "@/components/TaskForm";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    getTask(id as string)
      .then((res) => setTask(res.data))
      .catch(() => router.push("/"));
  }, [id, router]);

  const handleUpdate = async (data: any) => {
    await updateTask(id as string, data);
    router.push("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <main className="container">
      <h1>Edit Task</h1>
      <TaskForm initialData={task} onSubmit={handleUpdate} />
    </main>
  );
}

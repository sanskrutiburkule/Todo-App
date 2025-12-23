"use client";

import { useRouter } from "next/navigation";
import { createTask } from "@/lib/api";
import TaskForm from "@/components/TaskForm";

export default function CreateTaskPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await createTask(data);
    router.push("/");
  };

  return (
    <main className="container">
      <h1>Create Task</h1>
      <TaskForm onSubmit={handleCreate} />
    </main>
  );
}

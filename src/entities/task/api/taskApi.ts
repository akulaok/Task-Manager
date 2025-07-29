import axios from "axios";
import type {Task} from "../model/types";

const API_BASE = "http://localhost:3000/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const response = await axios.get<Task[]>(API_BASE);
  return response.data;
}

export async function createTask(
  task: Omit<Task, "id" | "creationDate">
): Promise<Task> {
  const response = await axios.post<Task>(API_BASE, task);
  return response.data;
}

export async function deleteTask(id: string): Promise<void> {
  await axios.delete(`${API_BASE}/${id}`);
}

export async function updateTask(task: Task): Promise<Task> {
  const {id, ...data} = task;
  const response = await axios.patch<Task>(`${API_BASE}/${id}`, data);
  return response.data;
}

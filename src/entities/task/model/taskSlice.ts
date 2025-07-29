import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Task} from "./types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Получение всех задач
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get<Task[]>(`${BASE_URL}/tasks`);
  return response.data;
});

// Создание новой задачи
export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Omit<Task, "id" | "creationDate">) => {
    const response = await axios.post<Task>(`${BASE_URL}/tasks`, task);
    return response.data;
  }
);

// Удаление задачи
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await axios.delete(`${BASE_URL}/tasks/${id}`);
    return id;
  }
);

// Обновление задачи
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (task: Task) => {
    const response = await axios.patch<Task>(
      `${BASE_URL}/tasks/${task.id}`,
      task
    );
    return response.data;
  }
);

// Работа с localStorage

function loadTasksFromLocalStorage(): Task[] {
  const data = localStorage.getItem("tasks");
  if (!data) return [];
  try {
    return JSON.parse(data) as Task[];
  } catch (e) {
    console.warn("Ошибка чтения из localStorage", e);
    return [];
  }
}

function saveTasksToLocalStorage(tasks: Task[]) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.warn("Ошибка записи в localStorage", e);
  }
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        saveTasksToLocalStorage(state.tasks);
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        saveTasksToLocalStorage(state.tasks);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        saveTasksToLocalStorage(state.tasks);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          saveTasksToLocalStorage(state.tasks);
        }
      });
  },
});

export default taskSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./types";

/**
 * Загружает задачи из localStorage.
 * @returns Массив задач или пустой массив, если данные отсутствуют или произошла ошибка.
 */
function loadTasksFromLocalStorage(): Task[] {
  const data = localStorage.getItem("tasks");

  if (!data) return [];

  try {
    return JSON.parse(data) as Task[];
  } catch (e) {
    throw new Error("Невозможно прочитать задачи из localStorage: " + (e instanceof Error ? e.message : ""));
  }
}

/**
 * Сохраняет массив задач в localStorage.
 * @param tasks - Массив задач для сохранения.
 */
function saveTasksToLocalStorage(tasks: Task[]) {
  try {
    const json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);
  } catch (e) {
    // Здесь можно заменить на логгер или вывести пользовательское сообщение
    throw new Error("Не удалось сохранить задачи в localStorage: " + (e instanceof Error ? e.message : ""));
  }
}

/** Состояние Redux slice с задачами */
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: (() => {
    try {
      return loadTasksFromLocalStorage();
    } catch (e) {
      console.warn(e); // или показать в UI как уведомление
      return [];
    }
  })(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /** Обновляет существующую задачу по ID */
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    /** Добавляет новую задачу */
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    /** Удаляет задачу по ID */
    removeTask(state, action: PayloadAction<Task>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const { updateTask, addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;

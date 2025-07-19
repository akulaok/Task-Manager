import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {mockTasks} from "./mocks";
import type {Task} from "./types";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: mockTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<Task>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const {updateTask, addTask, removeTask} = taskSlice.actions;
export default taskSlice.reducer;

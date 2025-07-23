import type { TaskCategory, TaskPriority, TaskStatus } from "../../entities/task/model/types";

  export interface initialState {
    id:string,
    title: string,
    description: string,
    category: TaskCategory,
    priority: TaskPriority,
    status: TaskStatus,
    creationDate: Date,
  }
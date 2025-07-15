import type { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from "./taskOptions"

export type TaskStatus = (typeof TASK_STATUSES)[number]
export type TaskCategory = (typeof TASK_CATEGORIES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export interface Task {
  id: string,
  title: string,
   description?: string,
  status: TaskStatus, 
  category: TaskCategory,
  priority: TaskPriority,
}
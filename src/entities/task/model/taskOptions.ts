/**
 * Возможные статусы задач.
 * Используются для фильтрации и отображения прогресса.
 */
export const TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;

/**
 * Категории задач.
 */
export const TASK_CATEGORIES = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
] as const;

/**
 * Приоритеты задач.
 */
export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const;

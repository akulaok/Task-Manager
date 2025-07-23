import type { TaskPriority } from "./types";

/**
 * Цвета для приоритетов задач.
 */
const priorityColors: Record<TaskPriority, { bg: string; color: string }> = {
  Low: { bg: "#f0c0edff", color: "white" },
  Medium: { bg: "#e196dcff", color: "white" },
  High: { bg: "#df5ed7ff", color: "white" },
};

/**
 * Возвращает цвета для заданного приоритета.
 * @param priority - Приоритет задачи ("Low", "Medium", "High")
 * @returns Цвет фона и текста, или значения по умолчанию.
 */
export function getPriorityColors(priority: string): { bg: string; color: string } {
  return priorityColors[priority as TaskPriority] || { bg: "#ddd", color: "#333" };
}

const priorityColors: Record<string, {bg: string; color: string}> = {
  Low: {bg: "#f0c0edff", color: "white"},
  Medium: {bg: "#e196dcff", color: "white"},
  High: {bg: "#df5ed7ff", color: "white"},
};

export function getPriorityColors(priority: string) {
  return priorityColors[priority] || {bg: "#ddd", color: "#333"};
}

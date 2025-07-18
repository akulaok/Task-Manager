const priorityColors: Record<string, {bg: string; color: string}> = {
  Low: {bg: "#f0c0edff", color: "white"}, // зеленый светлый и темный
  Medium: {bg: "#e196dcff", color: "white"}, // желтый светлый и темный
  High: {bg: "#df5ed7ff", color: "white"}, // красный светлый и темный
};


export function getPriorityColors(priority: string) {
  return priorityColors[priority] || { bg: "#ddd", color: "#333" };
}
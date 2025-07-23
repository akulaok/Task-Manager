import { Box } from "@mui/material";
import type { Task } from "../model/types";
import TaskItem from "./TaskItem";
import type { JSX } from "@emotion/react/jsx-runtime";

/**
 * Пропсы компонента TaskList
 * @interface TaskListProps
 * @property {Task[]} tasks - Список задач для отображения
 */
interface TaskListProps {
  tasks: Task[];
}

/**
 * Компонент для отображения списка задач в виде сетки карточек.
 * @param {TaskListProps} props - Пропсы компонента
 * @returns {JSX.Element} - Сетка карточек задач
 */
function TaskList({ tasks }: TaskListProps): JSX.Element {
  return (
    <Box
      display="grid"
      gap={2}
      sx={{
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        mt: 3,
        mb: 3,
      }}
    >
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
}

export default TaskList;

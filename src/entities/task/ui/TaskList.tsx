import {Box} from "@mui/material";
import type {Task} from "../model/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
}

function TaskList({tasks}: TaskListProps) {
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

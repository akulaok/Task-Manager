import type {JSX} from "@emotion/react/jsx-runtime";
import {Grid, Stack, Typography} from "@mui/material";
import type {Task} from "../model/types";
import TaskCard from "./TaskItem";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

function TaskColumn({title, tasks}: TaskColumnProps): JSX.Element {
  return (
    <Grid size={4}>
      <Typography align="center" variant="h4" sx={{ mb: 2, mt: 2 }}>
        {title}
      </Typography>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task}></TaskCard>
        ))}
      </Stack>
    </Grid>
  );
}

export default TaskColumn;

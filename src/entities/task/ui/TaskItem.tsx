import type {JSX} from "@emotion/react/jsx-runtime";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import type {Task} from "../model/types";

interface TaskItemProps {
  task: Task;
}

function TaskItem({task}: TaskItemProps): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>

        {task.description && (
          <Typography variant="body2">{task.description}</Typography>
        )}

        <Stack direction="row" spacing={1} sx={{mt: 1}}>
          <Chip label={task.status} color="primary" size="small" />
          <Chip
            label={task.priority}
            color="secondary"
            size="small"
          />
          <Chip
            label={task.category}
            color="default"
            size="small"
          />
        </Stack>
      </CardContent>

      <CardActions>
        <Button size="small">Редактировать</Button>
      </CardActions>
    </Card>
  );
}

export default TaskItem;

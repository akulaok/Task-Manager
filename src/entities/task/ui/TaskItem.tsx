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
import {useLocation, useNavigate} from "react-router-dom";
import {getPriorityColors} from "../model/taskStyles";
import {useCallback} from "react";
import {actionSx, cardSx, descriptionSx, editBtnSx} from "./styles";

interface TaskItemProps {
  task: Task;
}

function TaskChip({
  label,
  color,
  bg,
}: {
  label: string;
  color: string;
  bg: string;
}) {
  return <Chip label={label} size="small" sx={{backgroundColor: bg, color}} />;
}

function TaskItem({task}: TaskItemProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const priorityColor = getPriorityColors(task.priority);

  const openModal = useCallback(() => {
    navigate(`/task/${task.id}`, {
      state: {backgroundLocation: location},
    });
  }, [navigate, location, task.id]);

  return (
    <Card sx={cardSx}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{color: "#2b85ca"}}>
          {task.title}
        </Typography>

        {task.description && (
          <Typography variant="body2" sx={descriptionSx}>
            {task.description}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={actionSx}>
        <Stack direction="row" spacing={1} sx={{mt: 1}}>
          <TaskChip label={task.status} color="white" bg="#8995dc" />
          <TaskChip
            label={task.priority}
            color={priorityColor.color}
            bg={priorityColor.bg}
          />
          <TaskChip label={task.category} color="white" bg="#2b85ca" />
        </Stack>

        <Button onClick={openModal} size="small" sx={editBtnSx}>
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskItem;

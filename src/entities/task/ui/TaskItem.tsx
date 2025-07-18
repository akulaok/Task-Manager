import type {JSX} from "@emotion/react/jsx-runtime";
import {
  Box,
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

interface TaskItemProps {
  task: Task;
}

function TaskItem({task}: TaskItemProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const priorityColor = getPriorityColors(task.priority);

  const openModal = () => {
    navigate(`/task/${task.id}`, {
      state: {backgroundLocation: location},
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 4,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{color: "#2b85ca"}}>
          {task.title}
        </Typography>

        {task.description && (
          <Typography
            variant="body2"
            sx={{
              color: "#333",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {task.description}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          p: 2,
          alignItems: "flex-start",
        }}
      >
        <Stack direction="row" spacing={1} sx={{mt: 1}}>
          <Chip
            label={task.status}
            sx={{backgroundColor: "#8995dc", color: "white"}}
            size="small"
          />
          <Chip
            label={task.priority}
            sx={{backgroundColor: priorityColor.bg, color: priorityColor.color}}
            size="small"
          />
          <Chip
            label={task.category}
            sx={{
              backgroundColor: "#2b85ca",
              color: "white",
            }}
            size="small"
          />
        </Stack>

        <Button
          onClick={openModal}
          size="small"
          sx={{
            mt: 1,
            color: "#2b85ca",
            borderColor: "#2b85ca",
            border: "1px solid",
            ml: 0,
            "&:hover": {
              backgroundColor: "#dfa2db",
              color: "#300d17",
              borderColor: "#dfa2db",
            },
          }}
        >
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskItem;

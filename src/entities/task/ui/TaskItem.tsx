import type {JSX} from "@emotion/react/jsx-runtime";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type {Task} from "../model/types";
import {useLocation, useNavigate} from "react-router-dom";
import {getPriorityColors} from "../model/taskStyles";
import {useCallback} from "react";
import {actionSx, cardSx, descriptionSx, editBtnSx} from "./styles";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {useDispatch} from "react-redux";
import {removeTask} from "../model/taskSlice";
import TaskChip from "./TaskChip";

/**
 * Пропсы компонента TaskItem
 * @interface TaskItemProps
 * @property {Task} task - Задача для отображения
 */
interface TaskItemProps {
  task: Task;
}
/**
 * Компонент для отображения карточки задачи
 * @param {TaskItemProps} props - Пропсы компонента
 * @returns {JSX.Element} - React элемент карточки задачи
 */
function TaskItem({task}: TaskItemProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const priorityColor = getPriorityColors(task.priority);

  /**
   * Открывает модальное окно с деталями задачи
   */
  const openModal = useCallback(() => {
    navigate(`/task/${task.id}`, {
      state: {backgroundLocation: location},
    });
  }, [navigate, location, task.id]);

  /**
   * Обработчик удаления задачи
   */
  const handleDelete = () => {
    dispatch(removeTask(task));
  };

  return (
    <Card sx={{...cardSx, position: "relative"}}>
      <IconButton
        onClick={handleDelete}
        sx={{position: "absolute", top: 8, right: 8, color: "#d44bcb"}}
        size="small"
        aria-label="Удалить задачу"
      >
        <DeleteIcon />
      </IconButton>

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
        {task.creationDate && (
          <Typography variant="body2" sx={descriptionSx} mt={1}>
            {format(new Date(task.creationDate), "d MMMM yyyy, HH:mm", {
              locale: ru,
            })}
          </Typography>
        )}
        <Button onClick={openModal} size="small" sx={editBtnSx}>
          Редактировать
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskItem;

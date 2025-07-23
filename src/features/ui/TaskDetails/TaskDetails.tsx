import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useCallback, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../../entities/task/model/taskOptions";
import { updateTask } from "../../../entities/task/model/taskSlice";
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "../../../entities/task/model/types";
import { modalBoxStyles } from "../styles";
import TaskChipGroup from "../../../shared/ui/TaskChipGroup/TaskChipGroup";
import { editBtnSx } from "../../../entities/task/ui/styles";

/**
 * Состояние формы редактирования задачи
 */
interface TaskFormData {
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  creationDate: Date;
}

/**
 * Модальное окно с формой для редактирования задачи.
 * Отображается по `id` из URL. Если `id === "new"` — создаётся новая задача.
 *
 * @component
 */
function TaskDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isNewTask = id === "new";

  const task = useSelector((state: RootState) =>
    !isNewTask ? state.tasks.tasks.find((t) => t.id === id) : null
  );

  /**
   * Закрытие модального окна и переход на главную
   */
  const handleClose = () => {
    navigate("/");
  };

  /**
   * Переход к созданию новой задачи
   */
  const openNewTaskModal = useCallback(() => {
    navigate(`/task/new`, {
      state: { backgroundLocation: location },
    });
  }, [navigate]);

  if (!task && !isNewTask) {
    return (
      <Modal open onClose={handleClose}>
        <Box sx={modalBoxStyles}>
          <Typography variant="h6" mb={2} sx={{ color: "#2b85ca" }}>
            Задача не найдена
          </Typography>
          <Button onClick={openNewTaskModal} size="small" sx={editBtnSx}>
            Создать задачу
          </Button>
        </Box>
      </Modal>
    );
  }

  const [titleError, setTitleError] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || TASK_CATEGORIES[0],
    priority: task?.priority || TASK_PRIORITIES[0],
    status: task?.status || TASK_STATUSES[0],
    creationDate: task?.creationDate || new Date(),
  });

  /**
   * Сохраняет изменения задачи и закрывает модальное окно
   */
  const handleSave = () => {
    if (formData.title.trim() === "") {
      setTitleError(true);
      return;
    }

    const updatedTask: Task = {
      id: task?.id || crypto.randomUUID(),
      ...formData,
    };

    dispatch(updateTask(updatedTask));
    navigate("/");
  };

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyles}>
        <Typography variant="h6" mb={2} sx={{ color: "#2b85ca" }}>
          {isNewTask ? "Создать задачу" : "Редактировать задачу"}
        </Typography>

        <TextField
          label="Title"
          fullWidth
          multiline
          variant="standard"
          rows={1}
          value={formData.title}
          error={titleError}
          helperText={titleError ? "Поле обязательно для заполнения" : ""}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            if (titleError) setTitleError(false);
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle2" mb={1}>
          Категория
        </Typography>
        <TaskChipGroup
          options={TASK_CATEGORIES}
          onSelect={(label: string) =>
            setFormData({ ...formData, category: label as TaskCategory })
          }
          selected={formData.category}
        />

        <Typography variant="subtitle2" mb={1}>
          Статус
        </Typography>
        <TaskChipGroup
          options={TASK_STATUSES}
          selected={formData.status}
          onSelect={(label) =>
            setFormData({ ...formData, status: label as TaskStatus })
          }
        />

        <Typography variant="subtitle2" mb={1}>
          Приоритет
        </Typography>
        <TaskChipGroup
          options={TASK_PRIORITIES}
          selected={formData.priority}
          onSelect={(label) =>
            setFormData({ ...formData, priority: label as TaskPriority })
          }
        />

        <Typography variant="subtitle2" mt={2}>
          Дата создания:
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {format(formData.creationDate, "d MMMM yyyy, HH:mm", { locale: ru })}
        </Typography>

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button
            onClick={handleClose}
            sx={{
              mt: 1,
              color: "#2b85ca",
              borderColor: "#2b85ca",
              border: "1px solid",
              ml: 0,
            }}
          >
            Отмена
          </Button>
          <Button
            sx={{
              backgroundColor: "#2b85ca",
              color: "white",
            }}
            variant="contained"
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default TaskDetails;

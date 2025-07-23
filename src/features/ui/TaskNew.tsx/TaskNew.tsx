import {format} from "date-fns";
import {ru} from "date-fns/locale";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../../entities/task/model/taskOptions";
import {addTask} from "../../../entities/task/model/taskSlice";
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "../../../entities/task/model/types";
import {modalBoxStyles} from "../styles";
import TaskChipGroup from "../../../shared/ui/TaskChipGroup/TaskChipGroup";
import type { initialState } from "../../model/types";

/**
 * Компонент `TaskNew` представляет модальное окно создания новой задачи.
 * После сохранения задача добавляется в Redux store и пользователь возвращается назад.
 *
 * @returns {JSX.Element} Модальное окно с формой создания задачи.
 */

function TaskNew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<initialState>({
    id: "",
    title: "",
    description: "",
    category: TASK_CATEGORIES[0],
    priority: TASK_PRIORITIES[0],
    status: TASK_STATUSES[0],
    creationDate: new Date(),
  });

  const [titleError, setTitleError] = useState(false);

  const handleClose = () => {
    navigate('/');
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      setTitleError(true);
      return;
    }

    const newTask: Task = {
      ...formData,
      id: Date.now().toString(),
    };
    dispatch(addTask(newTask));
    navigate(-1);
  };

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyles}>
        <Typography variant="h6" mb={1} sx={{color: "#2b85ca"}}>
          Новая задача
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
            setFormData({...formData, title: e.target.value});
            if (titleError) setTitleError(false); 
          }}
          sx={{mb: 2}}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={formData.description}
          onChange={(e) =>
            setFormData({...formData, description: e.target.value})
          }
          sx={{mb: 2}}
        />

        <Typography variant="subtitle2" mb={1}>
          Категория
        </Typography>
        <TaskChipGroup
          options={TASK_CATEGORIES}
          onSelect={(label: string) =>
            setFormData({...formData, category: label as TaskCategory})
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
            setFormData({...formData, status: label as TaskStatus})
          }
        />

        <Typography variant="subtitle2" mb={1}>
          Приоритет
        </Typography>
        <TaskChipGroup
          options={TASK_PRIORITIES}
          selected={formData.priority}
          onSelect={(label) =>
            setFormData({...formData, priority: label as TaskPriority})
          }
        />

        <Typography variant="subtitle2" mt={2}>
          Дата создания:
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {format(formData.creationDate, "d MMMM yyyy, HH:mm", {locale: ru})}
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

export default TaskNew;

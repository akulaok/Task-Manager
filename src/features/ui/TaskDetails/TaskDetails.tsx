import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../app/store";
import {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../../entities/task/model/taskOptions";
import {updateTask} from "../../../entities/task/model/taskSlice";
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "../../../entities/task/model/types";
import {modalBoxStyles} from "./styles";
import TaskChipGroup from "../../../shared/ui/TaskChipGroup/TaskChipGroup";

function TaskDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  if (!task) {
    return <Typography>Задача не найдена</Typography>;
  }

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    category: task.category as TaskCategory,
    priority: task.priority as TaskPriority,
    status: task.status as TaskStatus,
  });

  const handleClose = () => {
    navigate(-1);
  };

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      ...formData,
    };
    dispatch(updateTask(updatedTask));
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
        <Typography variant="h6" mb={2} sx={{color: "#2b85ca"}}>
          Редактировать задачу
        </Typography>

        <TextField
          label="Title"
          fullWidth
          multiline
          variant="standard"
          rows={1}
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
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
        ></TaskChipGroup>

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

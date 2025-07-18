import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../app/store";
import {useState} from "react";
import {Button, Chip, Stack, TextField} from "@mui/material";
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

const modalBoxStyles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90vw", // для мобилки
    sm: 500, // для десктопа
  },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 6,
  p: 3,
};

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

  const tagStyle = (selected: boolean) => ({
    bgcolor: selected ? "#8995dc" : "#efefef",
    color: selected ? "white" : "black",
    cursor: "pointer",
    "&:hover": {
      bgcolor: selected ? "#6e7dd4" : "#efefef", // свой hover цвет
    },
  });

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
        <Stack
          direction="row"
          spacing={1}
          mb={2}
          rowGap={1}
          flexWrap="wrap"
          justifyContent="flex-start"
        >
          {TASK_CATEGORIES.map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() =>
                setFormData({...formData, category: label as TaskCategory})
              }
              sx={tagStyle(formData.category === label)}
            />
          ))}
        </Stack>

        <Typography variant="subtitle2" mb={1}>
          Статус
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          mb={2}
          rowGap={1}
          flexWrap="wrap"
          justifyContent="flex-start"
        >
          {TASK_STATUSES.map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() =>
                setFormData({...formData, status: label as TaskStatus})
              }
              sx={tagStyle(formData.status === label)}
            />
          ))}
        </Stack>

        <Typography variant="subtitle2" mb={1}>
          Приоритет
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          mb={2}
          rowGap={1}
          flexWrap="wrap"
          justifyContent="flex-start"
        >
          {TASK_PRIORITIES.map((label) => (
            <Chip
              key={label}
              label={label}
              onClick={() =>
                setFormData({...formData, priority: label as TaskPriority})
              }
              sx={tagStyle(formData.priority === label)}
            />
          ))}
        </Stack>

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

import type {JSX} from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import type {TaskFiltersState} from "../model/taskFilterSlice";
import {
  TASK_PRIORITIES,
  TASK_CATEGORIES,
  TASK_STATUSES,
} from "../model/taskOptions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {commonSx, searchSx} from "./styles";

/**
 * Props для компонента панели фильтров задач.
 * @interface TaskFilterPanelProps
 * @property {TaskFiltersState} selected - Текущие выбранные фильтры.
 * @property {(key: keyof TaskFiltersState, value: string | null) => void} onSelect - Коллбэк при изменении фильтра.
 */
interface TaskFilterPanelProps {
  selected: TaskFiltersState;
  onSelect: (key: keyof TaskFiltersState, value: string | null) => void;
}

/**
 * Массив конфигураций фильтров для отображения в панели.
 */
const filters = [
  {label: "Приоритет", key: "priority", values: TASK_PRIORITIES},
  {label: "Категория", key: "category", values: TASK_CATEGORIES},
  {label: "Статус", key: "status", values: TASK_STATUSES},
] as const;

/**
 * Компонент панели фильтров задач.
 * Отображает выпадающие списки для выбора фильтров приоритета, категории и статуса.
 * Также содержит кнопку для создания новой задачи.
 * Так же содержит строку поиска по названию
 *
 * @param {TaskFilterPanelProps} props - Пропсы компонента.
 * @returns {JSX.Element} - React элемент панели фильтров.
 */
function TaskFilterPanel({
  selected,
  onSelect,
}: TaskFilterPanelProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = useCallback(() => {
    navigate(`/task/new`, {
      state: {backgroundLocation: location},
    });
  }, [navigate, location]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 1.5,
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          flexWrap: "nowrap",
          flexShrink: 1,
        }}
      >
        {filters.map(({label, key, values}) => (
          <FormControl key={key} size="small" sx={commonSx}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={selected[key] ?? ""}
              label={label}
              onChange={(e) => {
                const value = e.target.value;
                onSelect(key, value === "" ? null : value);
              }}
            >
              <MenuItem value="">Без фильтра</MenuItem>
              {values.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "nowrap",
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Поиск задачи"
          value={selected.search ?? ""}
          onChange={(e) => onSelect("search", e.target.value || null)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{mr: 0.5}}>
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            ...searchSx,
            flexGrow: 1,
            minWidth: 0,
          }}
        />

        <Tooltip title="Новая задача">
          <IconButton
            sx={{
              transition: "transform 0.2s",
              "&:hover": {transform: "scale(1.1)"},
              flexShrink: 0,
            }}
            size="small"
            color="primary"
            onClick={openModal}
          >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TaskFilterPanel;

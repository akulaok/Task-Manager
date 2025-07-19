import type {JSX} from "react";
import {Stack, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import type {TaskFiltersState} from "../model/taskFilterSlice";
import {
  TASK_PRIORITIES,
  TASK_CATEGORIES,
  TASK_STATUSES,
} from "../model/taskOptions";

interface TaskFilterPanelProps {
  selected: TaskFiltersState;
  onSelect: (key: keyof TaskFiltersState, value: string | null) => void;
}

function TaskFilterPanel({
  selected,
  onSelect,
}: TaskFilterPanelProps): JSX.Element {
  const commonSx = {
    minWidth: 120,
    "& .MuiInputBase-root": {
      fontSize: 12,
      padding: "2px 8px",
      height: 32,
    },
    "& .MuiInputLabel-root": {
      fontSize: 12,
      top: "-4px",
    },
    "& .MuiSelect-select": {
      paddingTop: "6px",
      paddingBottom: "6px",
    },
  };

  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mt: 3,
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <FormControl size="small" sx={commonSx}>
        <InputLabel>Приоритет</InputLabel>
        <Select
          value={selected.priority ?? ""}
          label="Приоритет"
          onChange={(e) => {
            const value = e.target.value;
            onSelect("priority", value === "" ? null : value);
          }}
        >
          <MenuItem value="">Без фильтра</MenuItem>
          {TASK_PRIORITIES.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={commonSx}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={selected.category ?? ""}
          label="Категория"
          onChange={(e) => {
            const value = e.target.value;
            onSelect("category", value === "" ? null : value);
          }}
        >
          <MenuItem value="">Без фильтра</MenuItem>
          {TASK_CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={commonSx}>
        <InputLabel>Статус</InputLabel>
        <Select
          value={selected.status ?? ""}
          label="Статус"
          onChange={(e) => {
            const value = e.target.value;
            onSelect("status", value === "" ? null : value);
          }}
        >
          <MenuItem value="">Без фильтра</MenuItem>
          {TASK_STATUSES.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default TaskFilterPanel;

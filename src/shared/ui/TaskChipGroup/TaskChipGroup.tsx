import type {JSX} from "@emotion/react/jsx-runtime";
import {Chip, Stack} from "@mui/material";
import {getTagStyle} from "../../../features/ui/TaskDetails/styles";

interface TaskChipGroupProps {
  options: readonly string[];
  onSelect: (value: string) => void;
  selected: string;
}

function TaskChipGroup({
  options,
  onSelect,
  selected,
}: TaskChipGroupProps): JSX.Element {
  return (
    <Stack
      direction="row"
      spacing={1}
      mb={2}
      rowGap={1}
      flexWrap="wrap"
      justifyContent="flex-start"
    >
      {options.map((label) => (
        <Chip
          key={label}
          label={label}
          onClick={() => onSelect(label)}
          sx={getTagStyle(selected === label)}
        />
      ))}
    </Stack>
  );
}

export default TaskChipGroup;

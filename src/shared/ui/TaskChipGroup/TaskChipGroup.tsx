import type {JSX} from "@emotion/react/jsx-runtime";
import {Chip, Stack} from "@mui/material";
import {getTagStyle} from "../../../features/ui/styles";

interface TaskChipGroupProps {
  options: readonly string[];
  onSelect: (value: string) => void;
  selected: string;
}

/**
 * Компонент отображает группу чипов (Chip) для выбора одной из переданных опций.
 *
 * @param {TaskChipGroupProps} props - Свойства компонента
 * @returns {JSX.Element} Элемент интерфейса с группой чипов
 */

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

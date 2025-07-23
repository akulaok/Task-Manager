import type { JSX } from "@emotion/react/jsx-runtime";
import { Chip } from "@mui/material";

/**
 * Пропсы компонента TaskChip
 * @interface TaskChipProps
 * @property {string} label - Текст метки
 * @property {string} color - Цвет текста
 * @property {string} bg - Цвет фона
 */
interface TaskChipProps {
  label: string;
  color: string;
  bg: string;
}

/**
 * Компонент отображает отдельную "чип"-метку с цветами.
 * @param {TaskChipProps} props - Пропсы компонента
 * @returns {JSX.Element} - React элемент
 */
function TaskChip({ label, color, bg }: TaskChipProps): JSX.Element {
  return <Chip label={label} size="small" sx={{ backgroundColor: bg, color }} />;
}

export default TaskChip;
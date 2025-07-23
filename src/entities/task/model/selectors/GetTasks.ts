import type {RootState} from "../../../../app/store";

/**
 * Получает список всех задач из состояния Redux.
 * @param state — глобальное состояние Redux
 * @returns массив задач
 */
export const getTasks = (state: RootState) => state.tasks.tasks;

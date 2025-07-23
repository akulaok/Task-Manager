import type {RootState} from "../../../../app/store";

/**
 * Возвращает текущие значения фильтров задач из состояния Redux.
 * @param state — глобальное состояние Redux
 * @returns объект фильтров задач
 */
export const getTaskFilters = (state: RootState) => state.taskFilters;

import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

/**
 * Тип состояния фильтров задач.
 * Используется для фильтрации задач по приоритету, категории и статусу.
 */
export interface TaskFiltersState {
  priority: string | null;
  category: string | null;
  status: string | null;
  search: string | null;
}

const initialState: TaskFiltersState = {
  priority: null,
  category: null,
  status: null,
  search: null,
};

const taskFilterSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    /**
     * Устанавливает значение одного из фильтров.
     * @param state — текущее состояние
     * @param action — ключ фильтра и его новое значение
     */
    setFilter: (
      state,
      action: PayloadAction<{key: keyof TaskFiltersState; value: string | null}>
    ) => {
      state[action.payload.key] = action.payload.value;
    },

    /**
     * Сбрасывает все фильтры к начальному состоянию.
     */
    resetFilters: () => initialState,
  },
});

export const {setFilter, resetFilters} = taskFilterSlice.actions;
export default taskFilterSlice.reducer;

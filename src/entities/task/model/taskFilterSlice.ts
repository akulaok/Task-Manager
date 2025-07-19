import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface TaskFiltersState {
  priority: string | null;
  category: string | null;
  status: string | null;
}

const initialState: TaskFiltersState = {
  priority: null,
  category: null,
  status: null,
};

const taskFilterSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{key: keyof TaskFiltersState; value: string | null}>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetFilters: () => initialState,
  },
});

export const {setFilter, resetFilters} = taskFilterSlice.actions;
export default taskFilterSlice.reducer;

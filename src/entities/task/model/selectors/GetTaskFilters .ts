import type {RootState} from "../../../../app/store";

export const getTaskFilters = (state: RootState) => state.taskFilters;

import type {RootState} from "../../../../app/store";

export const getTasks = (state: RootState) => state.tasks.tasks;

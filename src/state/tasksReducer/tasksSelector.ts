import { AppStateType } from "../store";
import { TaskType } from "../../api/tasksAPI";

export const tasksSelector =
    (todoListID: string) =>
    (state: AppStateType): TaskType[] =>
        state.tasks[todoListID];

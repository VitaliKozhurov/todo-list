import { AppStateType } from "../store";
import { TaskType } from "../../api/tasksAPI";
import {AppTaskType} from './tasksReducer';

export const tasksSelector =
    (todoListID: string) =>
    (state: AppStateType): AppTaskType[] =>
        state.tasks[todoListID];

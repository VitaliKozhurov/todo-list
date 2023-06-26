import { AppStateType } from "../store";
import { TodoListType } from "./todolists-reducer";

export const todoListsSelector = (state: AppStateType): TodoListType[] =>
    state.todoLists;

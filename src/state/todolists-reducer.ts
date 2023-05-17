import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { todoListID },
    } as const;
};
export const addTodoListAC = (title: string, todoListID: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: { title, todoListID },
    } as const;
};
export const changeTitleAC = (title: string, todoListID: string) => {
    return {
        type: "CHANGE-TITLE",
        payload: {
            title,
            todoListID,
        },
    } as const;
};
export const changeFilterAC = (
    filter: FilterValuesType,
    todoListID: string
) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            filter,
            todoListID,
        },
    } as const;
};

type ActionType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTitleAC>
    | ReturnType<typeof changeFilterAC>;

export const todolistsReducer = (
    state: Array<TodolistType>,
    action: ActionType
): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(
                (todo) => todo.id !== action.payload.todoListID
            );
        case "ADD-TODOLIST":
            const newTodoList: TodolistType = {
                id: action.payload.todoListID,
                title: action.payload.title,
                filter: "all",
            };
            return [...state, newTodoList];
        case "CHANGE-TITLE":
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? { ...todo, title: action.payload.title }
                    : todo
            );
        case "CHANGE-FILTER":
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? { ...todo, filter: action.payload.filter }
                    : todo
            );
        default:
            return state;
    }
};

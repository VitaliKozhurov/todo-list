import { Dispatch } from "redux";
import { TodoListApiType, TodoListsAPI } from "../../api/todoListsAPI";

export const addTodoListAC = (todoList: TodoListApiType) =>
    ({
        type: "ADD-TODO-LIST",
        payload: { todoList },
    } as const);
export const changeTodoListTitleAC = (todoListID: string, title: string) =>
    ({
        type: "CHANGE-TODO-LIST-TITLE",
        payload: {
            todoListID,
            title,
        },
    } as const);
export const changeTodoListFilterAC = (
    todoListID: string,
    filter: FilterValuesType
) =>
    ({
        type: "CHANGE-TODO-LIST-FILTER",
        payload: {
            todoListID,
            filter,
        },
    } as const);
export const removeTodoListAC = (todoListID: string) =>
    ({
        type: "REMOVE-TODO-LIST",
        payload: { todoListID },
    } as const);

export const setTodoListsAC = (todoLists: TodoListApiType[]) =>
    ({
        type: "SET-TODO-LISTS",
        payload: { todoLists },
    } as const);

const initialState: TodoListType[] = [];

export const todoListsReducer = (
    state: TodoListType[] = initialState,
    action: TodoListsActionsType
): TodoListType[] => {
    switch (action.type) {
        case "ADD-TODO-LIST":
            return [
                {
                    ...action.payload.todoList,
                    filter: "all",
                },
                ...state,
            ];
        case "CHANGE-TODO-LIST-TITLE":
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? { ...todo, title: action.payload.title }
                    : todo
            );
        case "CHANGE-TODO-LIST-FILTER":
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? { ...todo, filter: action.payload.filter }
                    : todo
            );
        case "REMOVE-TODO-LIST":
            return state.filter(
                (todo) => todo.id !== action.payload.todoListID
            );
        case "SET-TODO-LISTS":
            return action.payload.todoLists.map((todo) => ({
                ...todo,
                filter: "all",
            }));
        default:
            return state;
    }
};

// Thunk creator
export const getTodoListTC =
    () => (dispatch: Dispatch<TodoListsActionsType>) => {
        TodoListsAPI.getTodoLists().then((res) =>
            dispatch(setTodoListsAC(res.data))
        );
    };

export const removeTodoListTC =
    (todoListID: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
        TodoListsAPI.deleteTodoList(todoListID).then((res) =>
            dispatch(removeTodoListAC(todoListID))
        );
    };

export const addTodoListTC =
    (title: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
        TodoListsAPI.createTodoList(title).then((res) =>
            dispatch(addTodoListAC(res.data.data.item))
        );
    };

export const changeTodoListTitleTC =
    (todoListID: string, title: string) =>
    (dispatch: Dispatch<TodoListsActionsType>) => {
        TodoListsAPI.upDateTodoList(todoListID, title).then((res) =>
            dispatch(changeTodoListTitleAC(todoListID, title))
        );
    };

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = TodoListApiType & { filter: FilterValuesType };
export type TodoListsActionsType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>;

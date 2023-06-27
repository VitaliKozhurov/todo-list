import { AnyAction, Dispatch } from "redux";
import { TodoListApiType, TodoListsAPI } from "../../api/todoListsAPI";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = TodoListApiType & { filter: FilterValuesType };

export const addTodoListAC = (todoListID: string, title: string) =>
    ({
        type: "ADD-TODO-LIST",
        payload: { todoListID, title },
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

export type TodoListsActionsType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>;

const initialState: TodoListType[] = [];
export const todoListsReducer = (
    state: TodoListType[] = initialState,
    action: TodoListsActionsType
): TodoListType[] => {
    switch (action.type) {
        case "ADD-TODO-LIST": {
            const newTodo = {
                id: action.payload.todoListID,
                title: action.payload.title,
                addedDate: "",
                order: 0,
                filter: "all",
            } as TodoListType;
            return [newTodo, ...state];
        }
        case "CHANGE-TODO-LIST-TITLE": {
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? { ...todo, title: action.payload.title }
                    : todo
            );
        }
        case "CHANGE-TODO-LIST-FILTER": {
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? { ...todo, filter: action.payload.filter }
                    : todo
            );
        }
        case "REMOVE-TODO-LIST": {
            return state.filter(
                (todo) => todo.id !== action.payload.todoListID
            );
        }
        case "SET-TODO-LISTS": {
            return action.payload.todoLists.map((todo) => ({
                ...todo,
                filter: "all",
            }));
        }
        default:
            return state;
    }
};

// Thunk creator
export const getTodoListTC = () => (dispatch: Dispatch) => {
    TodoListsAPI.getTodoLists().then((res) =>
        dispatch(setTodoListsAC(res.data))
    );
};

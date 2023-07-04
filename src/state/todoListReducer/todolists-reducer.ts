import {Dispatch} from 'redux';
import {TodoListApiType, TodoListsAPI} from '../../api/todoListsAPI';
import {RootAppActionsType} from '../store';
import {EntityStatus, setAppStatusAC} from '../appReducer/appReducer';
import {appNetworkHandlingError, appServerHandlingError} from '../../utils/error-handling';

export const addTodoListAC = (todoList: TodoListApiType) =>
    ({
        type: 'ADD-TODO-LIST',
        payload: {todoList},
    } as const);
export const changeTodoListTitleAC = (todoListID: string, title: string) =>
    ({
        type: 'CHANGE-TODO-LIST-TITLE',
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
        type: 'CHANGE-TODO-LIST-FILTER',
        payload: {
            todoListID,
            filter,
        },
    } as const);
export const removeTodoListAC = (todoListID: string) =>
    ({
        type: 'REMOVE-TODO-LIST',
        payload: {todoListID},
    } as const);

export const setTodoListsAC = (todoLists: TodoListApiType[]) =>
    ({
        type: 'SET-TODO-LISTS',
        payload: {todoLists},
    } as const);

export const changeTodoListStatusAC = (todoListID: string, status: EntityStatus) => ({
    type: 'CHANGE-TODO-LIST-STATUS',
    payload: {
        todoListID,
        status
    }
} as const)

const initialState: TodoListType[] = [];

export const todoListsReducer = (
    state: TodoListType[] = initialState,
    action: TodoListsActionsType
): TodoListType[] => {
    switch (action.type) {
        case 'ADD-TODO-LIST':
            return [
                {
                    ...action.payload.todoList,
                    filter: 'all',
                    status: EntityStatus.Idle
                },
                ...state,
            ];
        case 'CHANGE-TODO-LIST-TITLE':
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? {...todo, title: action.payload.title}
                    : todo
            );
        case 'CHANGE-TODO-LIST-FILTER':
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? {...todo, filter: action.payload.filter}
                    : todo
            );
        case 'CHANGE-TODO-LIST-STATUS':
            return state.map((todo) =>
                todo.id === action.payload.todoListID
                    ? {...todo, status: action.payload.status}
                    : todo
            );
        case 'REMOVE-TODO-LIST':
            return state.filter(
                (todo) => todo.id !== action.payload.todoListID
            );
        case 'SET-TODO-LISTS':
            return action.payload.todoLists.map((todo) => ({
                ...todo,
                filter: 'all',
                status: EntityStatus.Idle
            }));
        default:
            return state;
    }
};

// Thunk creator
export const getTodoListTC =
    () => (dispatch: Dispatch<RootAppActionsType>) => {
        dispatch(setAppStatusAC(EntityStatus.Loading))
        TodoListsAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC(EntityStatus.Succeeded))
            })
            .catch((error) => {
                appNetworkHandlingError(error, dispatch)
            })
    };

export const removeTodoListTC =
    (todoListID: string) => (dispatch: Dispatch<RootAppActionsType>) => {
        dispatch(setAppStatusAC(EntityStatus.Loading))
        dispatch(changeTodoListStatusAC(todoListID, EntityStatus.Loading))
        TodoListsAPI.deleteTodoList(todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC(todoListID))
                    dispatch(setAppStatusAC(EntityStatus.Succeeded))
                } else {
                    appServerHandlingError(res.data, dispatch)
                }
            })
            .catch((error) => {
                appNetworkHandlingError(error, dispatch)
            })

    };

export const addTodoListTC =
    (title: string) => (dispatch: Dispatch<RootAppActionsType>) => {
        dispatch(setAppStatusAC(EntityStatus.Loading))
        TodoListsAPI.createTodoList(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodoListAC(res.data.data.item))
                    dispatch(setAppStatusAC(EntityStatus.Succeeded))
                } else {
                    appServerHandlingError(res.data, dispatch)
                }
            })
            .catch((error) => {
                appNetworkHandlingError(error, dispatch)
            })
    };

export const changeTodoListTitleTC =
    (todoListID: string, title: string) =>
        (dispatch: Dispatch<RootAppActionsType>) => {
            dispatch(setAppStatusAC(EntityStatus.Loading))
            TodoListsAPI.upDateTodoList(todoListID, title)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTodoListTitleAC(todoListID, title))
                        dispatch(setAppStatusAC(EntityStatus.Succeeded))
                    } else {
                        appServerHandlingError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    appNetworkHandlingError(error, dispatch)
                })
        };

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = TodoListApiType & { filter: FilterValuesType, status: EntityStatus };
export type TodoListsActionsType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeTodoListStatusAC>

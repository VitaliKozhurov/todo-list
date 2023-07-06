import {TaskPriorities, TasksAPI, TaskStatuses, TaskType, UpdatedTaskType,} from '../../api/tasksAPI';
import {addTodoListAC, removeTodoListAC, setTodoListsAC,} from '../todoListReducer/todolists-reducer';
import {Dispatch} from 'redux';
import {AppStateType, RootAppActionsType} from '../store';
import {EntityStatus, setAppErrorAC, setAppStatusAC} from '../appReducer/appReducer';
import {appNetworkHandlingError, appServerHandlingError} from '../../utils/error-handling';

export const addTasksAC = (task: TaskType) =>
    ({
        type: 'ADD-TASK',
        payload: {task},
    } as const);
export const removeTaskAC = (todoListID: string, taskID: string) =>
    ({
        type: 'REMOVE-TASK',
        payload: {todoListID, taskID},
    } as const);
export const updateTaskAC = (
    todoListID: string,
    taskID: string,
    updateModel: UpdateTaskModelType
) =>
    ({
        type: 'UPDATE-TASK',
        payload: {
            todoListID,
            taskID,
            updateModel,
        },
    } as const);
export const setTasksAC = (todoListID: string, tasks: TaskType[]) =>
    ({
        type: 'SET-TASKS',
        payload: {todoListID, tasks},
    } as const);

export const changeTaskEntityStatusAC = (todoListID: string, taskID: string, entityStatus: EntityStatus) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    payload: {
        todoListID,
        taskID,
        entityStatus
    }
} as const)

const initialState: TasksType = {};

export const tasksReducer = (
    state: TasksType = initialState,
    action: TasksActionsType
): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [
                    {...action.payload.task, entityStatus: EntityStatus.Idle},
                    ...state[action.payload.task.todoListId],
                ],
            };
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListID]: state[
                    action.payload.todoListID
                    ].filter((task) => task.id !== action.payload.taskID),
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todoListID]: state[
                    action.payload.todoListID
                    ].map((todo) =>
                    todo.id === action.payload.taskID
                        ? {...todo, ...action.payload.updateModel}
                        : todo
                ),
            };
        case 'ADD-TODO-LIST':
            return {
                [action.payload.todoList.id]: [],
                ...state,
            };
        case 'REMOVE-TODO-LIST': {
            const copyState = {...state};
            delete copyState[action.payload.todoListID];
            return copyState;
        }
        case 'SET-TODO-LISTS': {
            const copyState = {...state};
            action.payload.todoLists.forEach(
                (todo) => (copyState[todo.id] = [])
            );
            return copyState;
        }
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todoListID]: action.payload.tasks.map(task => ({
                    ...task,
                    entityStatus: EntityStatus.Idle
                })),
            };
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.taskID
                    ? {
                        ...task,
                        entityStatus: action.payload.entityStatus
                    }
                    : task)
            }
        default:
            return state;
    }
};

// Thunk creator
export const getTasksTC =
    (todoListID: string) => (dispatch: Dispatch<RootAppActionsType>) => {
        dispatch(setAppStatusAC(EntityStatus.Loading))
        TasksAPI.getTasks(todoListID)
            .then((res) => {
                if (!res.data.error) {
                    dispatch(setTasksAC(todoListID, res.data.items))
                    dispatch(setAppStatusAC(EntityStatus.Succeeded))
                } else {
                    dispatch(setAppErrorAC(res.data.error))
                    dispatch(setAppStatusAC(EntityStatus.Failed))
                }
            })
            .catch((error) => {
                appNetworkHandlingError(error, dispatch)
            })
    };

export const addTaskTC =
    (todoListID: string, title: string) =>
        (dispatch: Dispatch<RootAppActionsType>) => {
            dispatch(setAppStatusAC(EntityStatus.Loading))
            TasksAPI.createTask(todoListID, title)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(addTasksAC(res.data.data.item));
                        dispatch(setAppStatusAC(EntityStatus.Succeeded))
                    } else {
                        appServerHandlingError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    appNetworkHandlingError(error, dispatch)
                })
        };

export const removeTaskTC =
    (todoListID: string, taskID: string) =>
        (dispatch: Dispatch<RootAppActionsType>) => {
            dispatch(setAppStatusAC(EntityStatus.Loading))
            dispatch(changeTaskEntityStatusAC(todoListID,taskID,EntityStatus.Loading))
            TasksAPI.deleteTask(todoListID, taskID)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(removeTaskAC(todoListID, taskID));
                        dispatch(setAppStatusAC(EntityStatus.Succeeded))
                    } else {
                        appServerHandlingError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    appNetworkHandlingError(error, dispatch)
                    dispatch(changeTaskEntityStatusAC(todoListID,taskID,EntityStatus.Failed))
                })
        };

export const updateTaskTC =
    (todoListID: string, taskID: string, updateModel: UpdateTaskModelType) =>
        (dispatch: Dispatch<RootAppActionsType>, getState: () => AppStateType) => {
            const state = getState();
            const task = state.tasks[todoListID].find((task) => task.id === taskID);
            if (!task) {
                console.warn('Task not found!!!');
                return;
            }
            const updatedTask: UpdatedTaskType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...updateModel,
            };

            dispatch(setAppStatusAC(EntityStatus.Loading))
            dispatch(changeTaskEntityStatusAC(todoListID,taskID,EntityStatus.Loading))
            TasksAPI.updateTask(todoListID, taskID, updatedTask)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(todoListID, taskID, res.data.data.item))
                        dispatch(setAppStatusAC(EntityStatus.Succeeded))
                    } else {
                        appServerHandlingError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    appNetworkHandlingError(error, dispatch)
                })
                .finally(()=>dispatch(changeTaskEntityStatusAC(todoListID,taskID,EntityStatus.Idle)))
        };

// types
export type TasksActionsType =
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

export type AppTaskType = TaskType & { entityStatus: EntityStatus }

export type TasksType = {
    [key: string]: Array<AppTaskType>;
};

export type UpdateTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};

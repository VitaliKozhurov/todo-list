import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TaskType } from "../../api/tasksAPI";
import {
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC,
} from "../todoListReducer/todolists-reducer";

export const addTasksAC = (todoListID: string, title: string) =>
    ({
        type: "ADD-TASK",
        payload: { todoListID, title },
    } as const);
export const removeTaskAC = (todoListID: string, taskID: string) =>
    ({
        type: "REMOVE-TASK",
        payload: { todoListID, taskID },
    } as const);
export const changeTaskTitleAC = (
    todoListID: string,
    taskID: string,
    title: string
) =>
    ({
        type: "CHANGE-TASK-TITLE",
        payload: { todoListID, taskID, title },
    } as const);
export const changeTaskStatusAC = (
    todoListID: string,
    taskID: string,
    status: TaskStatuses
) =>
    ({
        type: "CHANGE-TASK-STATUS",
        payload: { todoListID, taskID, status },
    } as const);
export const setTasksAC = (todoListID: string, tasks: TaskType[]) =>
    ({
        type: "SET-TASKS",
        payload: { todoListID, tasks },
    } as const);

type TasksActionsType =
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>;

export type TasksType = {
    [key: string]: Array<TaskType>;
};

const initialState: TasksType = {};

export const tasksReducer = (
    state: TasksType = initialState,
    action: TasksActionsType
): TasksType => {
    switch (action.type) {
        case "ADD-TASK": {
            const newTask = {
                todoListId: action.payload.todoListID,
                id: v1(),
                description: "",
                title: action.payload.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                order: 0,
                addedDate: "",
            };
            return {
                ...state,
                [action.payload.todoListID]: [
                    newTask,
                    ...state[action.payload.todoListID],
                ],
            };
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todoListID]: state[
                    action.payload.todoListID
                ].filter((task) => task.id !== action.payload.taskID),
            };
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoListID]: state[
                    action.payload.todoListID
                ].map((task) =>
                    task.id === action.payload.taskID
                        ? { ...task, title: action.payload.title }
                        : task
                ),
            };
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListID]: state[
                    action.payload.todoListID
                ].map((task) =>
                    task.id === action.payload.taskID
                        ? { ...task, status: action.payload.status }
                        : task
                ),
            };
        }
        case "ADD-TODO-LIST": {
            return {
                [action.payload.todoListID]: [],
                ...state,
            };
        }
        case "REMOVE-TODO-LIST": {
            const copyState = { ...state };
            delete copyState[action.payload.todoListID];
            return copyState;
        }
        case "SET-TODO-LISTS": {
            const copyState = { ...state };
            action.payload.todoLists.forEach(
                (todo) => (copyState[todo.id] = [])
            );
            return copyState;
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todoListID]: action.payload.tasks,
            };
        }

        default:
            return state;
    }
};

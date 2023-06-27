import {TaskPriorities, TasksAPI, TaskStatuses, TaskType, UpdatedTaskType} from '../../api/tasksAPI';
import {addTodoListAC, removeTodoListAC, setTodoListsAC,} from '../todoListReducer/todolists-reducer';
import {Dispatch} from 'redux';
import {AppStateType} from '../store';

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
/*export const changeTaskTitleAC = (
    todoListID: string,
    taskID: string,
    title: string
) =>
    ({
        type: 'CHANGE-TASK-TITLE',
        payload: {todoListID, taskID, title},
    } as const);
export const changeTaskStatusAC = (
    todoListID: string,
    taskID: string,
    status: TaskStatuses
) =>
    ({
        type: 'CHANGE-TASK-STATUS',
        payload: {todoListID, taskID, status},
    } as const);*/
export const updateTaskAC = (todoListID: string, taskID: string, updateModel: UpdateTaskModelType) => ({
    type: 'UPDATE-TASK',
    payload: {
        todoListID,
        taskID,
        updateModel
    }
} as const)
export const setTasksAC = (todoListID: string, tasks: TaskType[]) =>
    ({
        type: 'SET-TASKS',
        payload: {todoListID, tasks},
    } as const);

type TasksActionsType =
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
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
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [
                    action.payload.task,
                    ...state[action.payload.task.todoListId],
                ],
            };
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[
                    action.payload.todoListID
                    ].filter((task) => task.id !== action.payload.taskID),
            };
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(todo => todo.id === action.payload.taskID
                        ? {...todo, ...action.payload.updateModel}
                        : todo)
            }
        }
        case 'ADD-TODO-LIST': {
            return {
                [action.payload.todoList.id]: [],
                ...state,
            };
        }
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
        case 'SET-TASKS': {
            return {
                ...state,
                [action.payload.todoListID]: action.payload.tasks,
            };
        }

        default:
            return state;
    }
};


// Thunk creator
export const getTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    TasksAPI.getTasks(todoListID).then((res) =>
        dispatch(setTasksAC(todoListID, res.data.items))
    );
};

export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    TasksAPI.createTask(todoListID, title)
        .then(res => {
            dispatch(addTasksAC(res.data.data.item))
        })
}

export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    TasksAPI.deleteTask(todoListID, taskID)
        .then(res => {
            dispatch(removeTaskAC(todoListID, taskID))
        })
}

export type UpdateTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};

export const updateTaskTC = (todoListID: string, taskID: string, updateModel: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppStateType) => {
    const state = getState();
    const task = state.tasks[todoListID].find(task => task.id === taskID);
    if (!task) {
        console.warn('Task not found!!!')
        return
    }
    const updatedTask: UpdatedTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...updateModel
    }
    TasksAPI.updateTask(todoListID, taskID, updatedTask)
        .then(res => dispatch(updateTaskAC(todoListID, taskID, updateModel)))
}
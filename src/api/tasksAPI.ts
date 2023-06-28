import { todoListInstance } from "./axiosInstance";
export class TasksAPI {
    static getTasks(todoListID: string) {
        return todoListInstance.get<GetTasksResponseType>(
            `todo-lists/${todoListID}/tasks`
        );
    }

    static createTask(todoListID: string, title: string) {
        return todoListInstance.post<TasksResponseType<TasksDataType>>(
            `todo-lists/${todoListID}/tasks`,
            { title }
        );
    }

    static updateTask(
        todoListID: string,
        taskID: string,
        updatedTask: UpdatedTaskType
    ) {
        return todoListInstance.put<TasksResponseType<TasksDataType>>(
            `todo-lists/${todoListID}/tasks/${taskID}`,
            updatedTask
        );
    }

    static deleteTask(todoListID: string, taskID: string) {
        return todoListInstance.delete<TasksResponseType>(
            `todo-lists/${todoListID}/tasks/${taskID}`
        );
    }
}

// types
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export type TaskType = {
    todoListId: string;
    id: string;
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    order: number;
    addedDate: string;
};
export type UpdatedTaskType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
type TasksDataType = {
    item: TaskType;
};
type GetTasksResponseType = {
    items: TaskType[];
    totalCount: number;
    error: string | null;
};
type TasksResponseType<T = {}> = {
    data: T;
    resultCode: number;
    messages: string[];
    fieldsErrors?: string[];
};

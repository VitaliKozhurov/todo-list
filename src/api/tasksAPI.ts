import {todoListInstance} from './axiosInstance';

type TaskType = {
    todoListId: string
    id: string
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    order: number
    addedDate: string
}
type UpdateTaskRequestType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type TasksDataType = {
    item: TaskType
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
type TasksResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
}

export class TasksAPI {
    static getTasks(todoListID: string) {
        return todoListInstance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`)
    }

    static createTask(todoListID: string, title: string) {
        return todoListInstance.post<TasksResponseType<TasksDataType>>(`todo-lists/${todoListID}/tasks`, {title})
    }

    static updateTask(todoListID: string, taskID: string, updatedTask: UpdateTaskRequestType) {
        return todoListInstance.put<TasksResponseType<TasksDataType>>(`todo-lists/${todoListID}/tasks/${taskID}`, updatedTask)
    }

    static deleteTask(todoListID: string, taskID: string) {
        return todoListInstance.delete<TasksResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    }
}
import { todoListInstance } from "./axiosInstance";
export class TodoListsAPI {
    static getTodoLists() {
        return todoListInstance.get<TodoListApiType[]>("todo-lists");
    }

    static createTodoList(title: string) {
        return todoListInstance.post<TodoListResponseType<CreateTodoDataType>>(
            "todo-lists",
            { title }
        );
    }

    static upDateTodoList(todoListID: string, title: string) {
        return todoListInstance.put<TodoListResponseType>(
            `todo-lists/${todoListID}`,
            { title }
        );
    }

    static deleteTodoList(todoListID: string) {
        return todoListInstance.delete<TodoListResponseType>(
            `todo-lists/${todoListID}`
        );
    }
}

export type TodoListApiType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
type CreateTodoDataType = {
    item: TodoListApiType;
};
type TodoListResponseType<T = {}> = {
    data: T;
    resultCode: number;
    messages: string[];
    fieldsErrors?: string[];
};

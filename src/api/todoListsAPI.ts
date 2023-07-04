import {todoListInstance, ResponseType} from './axiosInstance';

export class TodoListsAPI {
    static getTodoLists() {
        return todoListInstance.get<TodoListApiType[]>('todo-lists');
    }

    static createTodoList(title: string) {
        return todoListInstance.post<ResponseType<CreateTodoDataType>>(
            'todo-lists',
            {title}
        );
    }

    static upDateTodoList(todoListID: string, title: string) {
        return todoListInstance.put<ResponseType>(
            `todo-lists/${todoListID}`,
            {title}
        );
    }

    static deleteTodoList(todoListID: string) {
        return todoListInstance.delete<ResponseType>(
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

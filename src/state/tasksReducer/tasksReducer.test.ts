import {
    addTodoListAC,
    removeTodoListAC,
} from "../todoListReducer/todolists-reducer";
import {
    TasksType,
    addTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
} from "./tasksReducer";

describe("Tasks reducer tests", () => {
    let tasks: TasksType;
    const todoID = "First_todo";
    const taskID = "First_task";
    beforeEach(() => {
        tasks = {
            First_todo: [
                {
                    todoListId: todoID,
                    id: taskID,
                    description: "",
                    title: "First task",
                    status: 0,
                    priority: 0,
                    startDate: "",
                    deadline: "",
                    order: 0,
                    addedDate: "",
                },
            ],
        };
    });

    it("Should add new task", () => {
        const title = "Second Task";
        const newTasks = tasksReducer(tasks, addTasksAC(todoID, title));

        expect(newTasks[todoID].length).toBe(2);
        expect(newTasks[todoID][0].title).toBe(title);
        expect(newTasks[todoID][0].todoListId).toBe(todoID);
    });

    it("Should remove task", () => {
        const newTasks = tasksReducer(tasks, removeTaskAC(todoID, taskID));

        expect(newTasks[todoID].length).toBe(0);
    });

    it("Should change task name", () => {
        const newTasks = tasksReducer(
            tasks,
            changeTaskTitleAC(todoID, taskID, "Changed First task")
        );

        expect(newTasks[todoID].length).toBe(1);
        expect(newTasks[todoID][0].title).toBe("Changed First task");
        expect(newTasks[todoID][0].id).toBe(taskID);
    });

    it("Should change task status", () => {
        const newTasks = tasksReducer(
            tasks,
            changeTaskStatusAC(todoID, taskID, 1)
        );

        expect(newTasks[todoID].length).toBe(1);
        expect(newTasks[todoID][0].status).toBe(1);
        expect(newTasks[todoID][0].id).toBe(taskID);
    });

    it("When add new Todo list, should add property for tasks", () => {
        const newTodoID = "Second_todo";
        const newTasks = tasksReducer(
            tasks,
            addTodoListAC(newTodoID, "Second todo list")
        );

        expect(Object.keys(newTasks).length).toBe(2);
        expect(Object.keys(newTasks)[0]).toBe(newTodoID);
        expect(Object.keys(newTasks)[1]).toBe(todoID);
        expect(newTasks[newTodoID]).toBeInstanceOf(Array);
        expect(newTasks[newTodoID].length).toBe(0);
    });

    it("When remove todo list array with tasks should be removed", () => {
        const newTasks = tasksReducer(tasks, removeTodoListAC(todoID));

        expect(Object.keys(newTasks).length).toBe(0);
        expect(Object.values(newTasks).length).toBe(0);
    });
});

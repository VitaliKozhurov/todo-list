import {
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC,
} from "../todoListReducer/todolists-reducer";
import {
    addTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksType,
} from "./tasksReducer";
import { TaskPriorities, TaskStatuses } from "../../api/tasksAPI";

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
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
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
        const taskID = "Second_task";
        const newTask = {
            todoListId: todoID,
            id: taskID,
            description: "",
            title: title,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            order: 0,
            addedDate: "",
        }
        const newTasks = tasksReducer(tasks, addTasksAC(newTask));

        expect(newTasks[todoID].length).toBe(2);
        expect(newTasks[todoID][0].title).toBe(title);
        expect(newTasks[todoID][0].todoListId).toBe(todoID);
        expect(newTasks[todoID][0].id).toBe(taskID);
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
            changeTaskStatusAC(todoID, taskID, TaskStatuses.Completed)
        );

        expect(newTasks[todoID].length).toBe(1);
        expect(newTasks[todoID][0].status).toBe(TaskStatuses.Completed);
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

    it("Should set task in task object when todolists set from server", () => {
        const todoLists = [
            {
                id: "First_todo",
                title: "First_todo",
                addedDate: "",
                order: 0,
            },
            {
                id: "Second_todo",
                title: "Second_todo",
                addedDate: "",
                order: 0,
            },
        ];
        const state = tasksReducer({}, setTodoListsAC(todoLists));

        expect(Object.keys(state).length).toBe(2);
        expect(state["First_todo"]).toStrictEqual([]);
        expect(state["Second_todo"]).toStrictEqual([]);
        expect(Object.keys(state)[0]).toBe("First_todo");
        expect(Object.keys(state)[1]).toBe("Second_todo");
    });

    it("Should set actual tasks after request to server", () => {
        const newTasks = [
            {
                todoListId: "First_todo",
                id: "First_task",
                description: "",
                title: "First task",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                order: 0,
                addedDate: "",
            },
            {
                todoListId: "First_todo",
                id: "Second_task",
                description: "",
                title: "Second task",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                order: 0,
                addedDate: "",
            },
        ];

        const state = tasksReducer(tasks, setTasksAC("First_todo", newTasks));

        expect(state["First_todo"].length).toBe(2);
        expect(state["First_todo"][0].todoListId).toBe("First_todo");
        expect(state["First_todo"][1].todoListId).toBe("First_todo");
        expect(state["First_todo"][0].id).toBe("First_task");
        expect(state["First_todo"][1].id).toBe("Second_task");
    });
});

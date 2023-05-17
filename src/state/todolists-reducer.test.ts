import { v1 } from "uuid";
import {
    addTodoListAC,
    changeFilterAC,
    changeTitleAC,
    removeTodoListAC,
    todolistsReducer,
} from "./todolists-reducer";
import { FilterValuesType, TodolistType } from "../App";

test("correct todoList should be removed", () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    const startState: Array<TodolistType> = [
        { id: todoListID_1, title: "TodoList_1", filter: "all" },
        { id: todoListID_2, title: "TodoList_2", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        removeTodoListAC(todoListID_1)
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID_2);
});

test("correct todoList should be added", () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    let newTitle = "TodoList_3";
    let newTodoListID = v1();

    const startState: Array<TodolistType> = [
        { id: todoListID_1, title: "TodoList_1", filter: "all" },
        { id: todoListID_2, title: "TodoList_2", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        addTodoListAC(newTitle, newTodoListID)
    );

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
});

test("should correct change todoList  title", () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    let newTitle = "TodoList_22";

    const startState: Array<TodolistType> = [
        { id: todoListID_1, title: "TodoList_1", filter: "all" },
        { id: todoListID_2, title: "TodoList_2", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        changeTitleAC(newTitle, todoListID_2)
    );

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTitle);
});

test("should correct change filter type", () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        { id: todoListID_1, title: "TodoList_1", filter: "all" },
        { id: todoListID_2, title: "TodoList_2", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        changeFilterAC(newFilter, todoListID_2)
    );

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);
});

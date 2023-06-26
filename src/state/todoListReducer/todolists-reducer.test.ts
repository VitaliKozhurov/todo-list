import { v1 } from "uuid";
import {
    TodoListType,
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer,
} from "./todolists-reducer";

describe("Todo list reducer tests", () => {
    let initialState: Array<TodoListType>;
    beforeEach(() => {
        initialState = [
            {
                id: "First_todo",
                title: "First_todo",
                addedDate: "",
                order: 0,
                filter: "all",
            },
        ];
    });

    it("Should add todo list", () => {
        const newState = todoListsReducer(
            initialState,
            addTodoListAC(v1(), "Second_todo")
        );
        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe("Second_todo");
        expect(newState[1].title).toBe("First_todo");
    });

    it("Should change todo list title", () => {
        const newTitle = "Changed First_todo";
        const newState = todoListsReducer(
            initialState,
            changeTodoListTitleAC("First_todo", newTitle)
        );
        expect(newState.length).toBe(1);
        expect(newState[0].title).toBe(newTitle);
    });

    it("Should change todo list filter type", () => {
        const newFilterType = "active";
        const newState = todoListsReducer(
            initialState,
            changeTodoListFilterAC("First_todo", newFilterType)
        );
        expect(newState.length).toBe(1);
        expect(newState[0].filter).toBe(newFilterType);
    });

    it("Should remove todo list", () => {
        const newState = todoListsReducer(
            initialState,
            removeTodoListAC("First_todo")
        );
        expect(newState.length).toBe(0);
    });
});

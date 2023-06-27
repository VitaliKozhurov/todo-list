import React, { useCallback, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { todoListsSelector } from "./state/todoListReducer/todoListSelectors";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { TodoList } from "./components/TodoList/TodoList";
import { Card, Grid, Paper } from "@mui/material";
import {
    addTodoListAC,
    getTodoListTC,
} from "./state/todoListReducer/todolists-reducer";
import { v1 } from "uuid";

function App() {
    const todoLists = useSelector(todoListsSelector);
    const dispatch = useDispatch();
    const addTodoList = useCallback(
        (title: string) => {
            dispatch(addTodoListAC(v1(), title));
        },
        [dispatch]
    );
    // Example request for todo lists
    useEffect(() => {
        /* dispatch(getTodoListTC()); */
    }, []);
    return (
        <div className="App">
            <AddItemForm onAddItem={addTodoList} title="Add new todo" />
            <Grid
                style={{ marginBottom: "50px", justifyContent: "center" }}
                container
                spacing={10}
                alignItems="stretch"
            >
                {todoLists.map((todo) => (
                    <Grid item key={todo.id}>
                        <Paper style={{ height: "100%" }}>
                            <Card
                                style={{ padding: "10px 20px", height: "100%" }}
                            >
                                <TodoList {...todo} />
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default App;

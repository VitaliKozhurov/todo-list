import Card from "@mui/material/Card/Card";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import { TodoList } from "./TodoList/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { todoListsSelector } from "../../state/todoListReducer/todoListSelectors";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { addTodoListAC } from "../../state/todoListReducer/todolists-reducer";

export const TodoLists = () => {
    const todoLists = useSelector(todoListsSelector);
    const dispatch = useDispatch();
    const addTodoList = useCallback(
        (title: string) => {
            // dispatch(addTodoListTC(title))
            /* dispatch(
                addTodoListAC({
                    id: "Second_todo",
                    title: "Second_todo",
                    addedDate: "",
                    order: 0,
                })
            ); */
        },
        [dispatch]
    );
    // Example request for todo lists
    useEffect(() => {
        /*dispatch(getTodoListTC())*/
    }, []);
    return (
        <>
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
        </>
    );
};

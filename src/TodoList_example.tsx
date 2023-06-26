import React, { ChangeEvent } from "react";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { SuperCheckBox } from "./components/UI/SuperCheckbox";

export function TodoList_example() {
    return (
        <div>sdf</div>
        /* <div>
            <h3>
                {" "}
                <EditableSpan
                    value={props.title}
                    onChange={changeTodolistTitle}
                />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {props.tasks.map((t) => {
                    const onClickHandler = () =>
                        props.removeTask(t.id, props.id);
                    const onChangeHandler = (value: boolean) => {
                        props.changeTaskStatus(t.id, value, props.id);
                    };
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    };

                    return (
                        <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <SuperCheckBox
                                checked={t.isDone}
                                color="primary"
                                callback={onChangeHandler}
                            />

                            <EditableSpan
                                value={t.title}
                                onChange={onTitleChangeHandler}
                            />
                            <IconButton onClick={onClickHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={props.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>*/
    );
}

import { TaskStatuses, TaskType } from "../../api/tasksAPI";
import { FC, useCallback } from "react";
import s from "./Task.module.css";
import { CustomCheckbox } from "../UI/CustomCheckbox/CustomCheckbox";
import { useDispatch } from "react-redux";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "../../state/tasksReducer/tasksReducer";
import { EditableSpan } from "../UI/EditableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";

export const Task: FC<TaskType> = React.memo((props) => {
    const {
        todoListId,
        id,
        description,
        title,
        status,
        priority,
        startDate,
        deadline,
        order,
        addedDate,
    } = props;
    const dispatch = useDispatch();

    const changeTaskStatus = useCallback(
        (status: boolean) => {
            status
                ? dispatch(
                      changeTaskStatusAC(todoListId, id, TaskStatuses.Completed)
                  )
                : dispatch(
                      changeTaskStatusAC(todoListId, id, TaskStatuses.New)
                  );
        },
        [dispatch, id, todoListId]
    );
    const changeTaskTitle = useCallback(
        (title: string) => {
            dispatch(changeTaskTitleAC(todoListId, id, title));
        },
        [dispatch, todoListId, id]
    );
    const onRemoveTask = () => {
        dispatch(removeTaskAC(todoListId, id));
    };

    return (
        <>
            <div className={s.taskBody}>
                <CustomCheckbox
                    checked={status === TaskStatuses.Completed}
                    color={"primary"}
                    callback={changeTaskStatus}
                />
                <EditableSpan title={title} changeTitle={changeTaskTitle} />
                <IconButton onClick={onRemoveTask}>
                    <DeleteOutlineIcon color={"error"} />
                </IconButton>
            </div>
        </>
    );
});

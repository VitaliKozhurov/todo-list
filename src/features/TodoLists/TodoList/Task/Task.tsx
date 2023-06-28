import { TasksAPI, TaskStatuses, TaskType } from "../../../../api/tasksAPI";
import { FC, useCallback } from "react";
import s from "./Task.module.css";
import { CustomCheckbox } from "../../../../components/CustomCheckbox/CustomCheckbox";
import { useDispatch } from "react-redux";
import {
    removeTaskAC,
    removeTaskTC,
    updateTaskAC,
    updateTaskTC,
} from "../../../../state/tasksReducer/tasksReducer";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
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
                ? //dispatch(changeTaskStatusTC(todoListId,id, {status:TaskStatuses.Completed}))
                  dispatch(
                      updateTaskAC(todoListId, id, {
                          status: TaskStatuses.Completed,
                      })
                  )
                : //dispatch(changeTaskStatusTC(todoListId,id, {status:TaskStatuses.New}))
                  dispatch(
                      updateTaskAC(todoListId, id, { status: TaskStatuses.New })
                  );
        },
        [dispatch, id, todoListId]
    );
    const changeTaskTitle = useCallback(
        (title: string) => {
            //dispatch(updateTaskTC(todoListId, id, {title}))
            dispatch(updateTaskAC(todoListId, id, { title }));
        },
        [dispatch, todoListId, id]
    );
    const onRemoveTask = () => {
        /*dispatch(removeTaskTC(todoListId, id))*/
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

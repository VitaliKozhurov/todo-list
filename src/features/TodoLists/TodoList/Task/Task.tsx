import {TaskStatuses} from '../../../../api/tasksAPI';
import {FC, useCallback} from 'react';
import s from './Task.module.css';
import {CustomCheckbox} from '../../../../components/CustomCheckbox/CustomCheckbox';
import {
    AppTaskType,
    removeTaskTC,
    updateTaskTC,
} from '../../../../state/tasksReducer/tasksReducer';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from 'react';
import {useAppDispatch} from '../../../../state/store';
import {EntityStatus} from '../../../../state/appReducer/appReducer';

export const Task: FC<AppTaskType> = React.memo((props) => {
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
        entityStatus
    } = props;
    const dispatch = useAppDispatch();

    const changeTaskStatus = useCallback(
        (status: boolean) => {
            status
                ? dispatch(
                    updateTaskTC(todoListId, id, {
                        status: TaskStatuses.Completed,
                    })
                )
                : dispatch(
                    updateTaskTC(todoListId, id, {status: TaskStatuses.New})
                );
        },
        [dispatch, id, todoListId]
    );
    const changeTaskTitle = useCallback(
        (title: string) => {
            dispatch(updateTaskTC(todoListId, id, {title}));
        },
        [dispatch, todoListId, id]
    );
    const onRemoveTask = () => {
        dispatch(removeTaskTC(todoListId, id));
    };

    return (
        <>
            <div className={s.taskBody}>
                <CustomCheckbox
                    checked={status === TaskStatuses.Completed}
                    color={'primary'}
                    callback={changeTaskStatus}
                    disabled={entityStatus === EntityStatus.Loading}
                />
                <EditableSpan title={title} changeTitle={changeTaskTitle}
                              disabled={entityStatus === EntityStatus.Loading} />
                <IconButton onClick={onRemoveTask} disabled={entityStatus === EntityStatus.Loading}>
                    <DeleteOutlineIcon color={entityStatus === EntityStatus.Loading ? 'disabled' : 'error'} />
                </IconButton>
            </div>
        </>
    );
});

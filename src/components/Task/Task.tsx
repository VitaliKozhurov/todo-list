import {TaskType} from '../../api/tasksAPI';
import {FC} from 'react';
import s from './Task.module.css';
import {CustomCheckbox} from '../UI/CustomCheckbox/CustomCheckbox';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasksReducer/tasksReducer';
import {EditableSpan} from '../UI/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Task: FC<TaskType> = (props) => {
    const {
        todoListId, id, description, title, status, priority, startDate, deadline, order, addedDate
    } = props;
    const dispatch = useDispatch();

    const changeTaskStatus = (status: boolean) => {
        if (status) {
            dispatch(changeTaskStatusAC(todoListId, id, 1))
        } else {
            dispatch(changeTaskStatusAC(todoListId, id, 0))
        }

    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, title))
    }
    const onRemoveTask = () => {
        dispatch(removeTaskAC(todoListId, id))
    }


    return <>
        <div className={s.taskBody}>
            <CustomCheckbox checked={status === 1} color={'primary'} callback={changeTaskStatus} />
            <EditableSpan title={title} changeTitle={changeTaskTitle} />
            <IconButton>
                <DeleteOutlineIcon color={'error'} onClick={onRemoveTask} />
            </IconButton>
        </div>
    </>;
};

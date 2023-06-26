import React, {ChangeEvent, FC, useState} from 'react';
import s from './EditableSpan.module.css';
import TextField from '@mui/material/TextField/TextField';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, changeTitle}) => {
    const [taskTitle, setTaskTitle] = useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        if (taskTitle.trim()) {
            setEditMode(false);
            changeTitle(taskTitle);
        } else {
            setError('Field can not be empty')
        }

    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        if(taskTitle.length>15){
            setError('Title is long!')
        } else {
            setTaskTitle(e.currentTarget.value);
        }

    }


    return (
        <div className={s.body}>
            {editMode
                ? <TextField
                    size={'small'}
                    variant="outlined"
                    value={taskTitle}
                    error={!!error}
                    label={error}
                    onChange={onChangeTaskTitle}
                    autoFocus
                    onBlur={activateViewMode}
                />
                : <span onDoubleClick={activateEditMode}>{title}</span>}
        </div>
    )
}

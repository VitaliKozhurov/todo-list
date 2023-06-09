import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import s from './EditableSpan.module.css';
import TextField from '@mui/material/TextField/TextField';

type EditableSpanPropsType = {
    title: string;
    disabled?: boolean;
    changeTitle: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = React.memo(
    ({title, disabled, changeTitle}) => {
        const [taskTitle, setTaskTitle] = useState<string>(title);
        const [editMode, setEditMode] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);

        const activateEditMode = () => {
            if (disabled) {
                return
            }
            setEditMode(true);
        };
        const activateViewMode = () => {
            if (taskTitle.trim()) {
                setEditMode(false);
                changeTitle(taskTitle);
                setTaskTitle('')
            }
            if (!taskTitle.trim()) {
                setError('Field can not be empty');
            }
        };
        const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(null);
            setTaskTitle(e.currentTarget.value);
        };
        const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.code === 'Enter') {
                activateViewMode();
            }
        };
        return (
            <div className={s.body}>
                {editMode ? (
                    <TextField
                        size={'small'}
                        variant="outlined"
                        value={taskTitle}
                        error={!!error}
                        label={error}
                        onChange={onChangeTaskTitle}
                        autoFocus
                        onBlur={activateViewMode}
                        onKeyDown={onPressEnter}
                    />
                ) : (
                    <span onDoubleClick={activateEditMode}>{title}</span>
                )}
            </div>
        );
    }
);

import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, classes, changeTitle}) => {
    const [newTitle, setNewTitle] = useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeTitle(newTitle)
        setEditMode(false)
    }

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={newTitle} onChange={changeInputHandler} onBlur={offEditMode} type="text" autoFocus />
            : <span onDoubleClick={onEditMode} className={classes}>{title}</span>
    )
};
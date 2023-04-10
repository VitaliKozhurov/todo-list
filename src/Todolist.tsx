import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { Button } from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
}

export function Todolist(props: PropsType) {

    const [inputState, setInputState] = useState('');

    const addTaskHandler = () => {
        props.addTask(inputState);
        setInputState('');
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    }


    const onChangeFilterHandler = (filterType: FilterValuesType) => {
        props.changeFilter(filterType);
    }

    const onRemoveTaskHandler = (id: string) => {
        props.removeTask(id);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputState}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            {/* <button onClick={addTaskHandler}>+</button> */}
            <Button name={'+'} callBack={addTaskHandler} />
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <Button name={'X'} callBack={() => onRemoveTaskHandler(t.id)} />
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => onChangeFilterHandler('all')} />
            <Button name={'Active'} callBack={() => onChangeFilterHandler('active')} />
            <Button name={'Completed'} callBack={() => onChangeFilterHandler('completed')} />
        </div>
    </div>
}

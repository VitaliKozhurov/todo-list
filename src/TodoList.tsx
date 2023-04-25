import React, {ChangeEvent, useRef, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {logDOM} from '@testing-library/react';

type TodoListPropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (todoListId: string, taskId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (nextFilter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, todoListId: string, newIsDoneValue: boolean) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId);
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        const removeTask = () => props.removeTask(props.todoListId, task.id);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, props.todoListId, e.currentTarget.checked)
        const taskClasses = task.isDone ? 'task-isDone' : 'task'
        return (
            <li key={task.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span className={taskClasses}>{task.title}</span>
                </div>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is too long!</div>
        : null
    const userMessage = error
        ? <div style={{color: 'red'}}>Title is required!</div>
        : null
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter, props.todoListId)
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddBtnDisabled && addTaskHandler()
    const inputClasses = error || isTitleLengthTooLong ? 'input-error' : undefined
    return (
        <div className="todolist">
            <header className={'todolist-header'}>
                <h2>
                    {props.title}
                </h2>
                <button onClick={removeTodoListHandler}>X</button>
            </header>


            <div>
                <input
                    placeholder="Please, enter title"
                    value={title}
                    onChange={setTitleHandler}
                    //ref={taskTitleInput}
                    onKeyDown={addTaskOnKeyPressHandler}
                    className={inputClasses}
                />
                <button
                    disabled={isAddBtnDisabled}
                    //onClick={addTaskHandler}
                    onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div className={'filter-btn-wrapper'}>
                <button
                    className={props.filter === 'all'
                        ? 'filter-btn filter-btn-active'
                        : 'filter-btn'}
                    onClick={handlerCreator('all')}>All
                </button>
                <button
                    className={props.filter === 'active'
                        ? 'filter-btn filter-btn-active'
                        : 'filter-btn'}
                    onClick={handlerCreator('active')}>Active
                </button>
                <button
                    className={props.filter === 'completed'
                        ? 'filter-btn filter-btn-active'
                        : 'filter-btn'}
                    onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;
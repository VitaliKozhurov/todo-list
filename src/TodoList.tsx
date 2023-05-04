import React, {ChangeEvent, useRef, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {logDOM} from '@testing-library/react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId);
    }
    const tasksListItems: Array<JSX.Element> = props.tasks.map((task: TaskType): JSX.Element => {
        const removeTask = () => props.removeTask(props.todoListId, task.id);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, props.todoListId, e.currentTarget.checked)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, props.todoListId, title)
        const taskClasses = task.isDone ? 'task-isDone' : 'task'
        return (
            <li key={task.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <EditableSpan title={task.title} classes={taskClasses} changeTitle={changeTaskTitle} />
                </div>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter, props.todoListId)
    const addItem = (title: string) => props.addTask(title, props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return (
        <div className="todolist">
            <header className={'todolist-header'}>
                <h2>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                </h2>
                <button onClick={removeTodoListHandler}>X</button>
            </header>

            <AddItemForm titleMaxLength={25} addItem={addItem} />
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
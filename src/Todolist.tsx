import React from 'react';
import { useState } from 'react';
import { FilterKeyType } from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void  // типизируем функцию (функция ничего не возвращает void), которую пробросили в TodoList
}

export function Todolist(props: PropsType) {

    let [currentTask, setCurrentTask] = useState<FilterKeyType>('all');

    const collanderFoo = () => {
        let resultTasks = props.tasks;
        if (currentTask === 'active') {
            resultTasks = resultTasks.filter(el => !el.isDone)
        } else if (currentTask === 'completed') {
            resultTasks = resultTasks.filter(el => el.isDone)
        }
        return resultTasks;
    }

    const tasksFilter = (taskName: FilterKeyType) => {
        setCurrentTask(taskName);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input />
            <button>+</button>
        </div>
        <ul>
            {collanderFoo().map(
                task => {
                    return <li key={task.id}>
                        <button
                            onClick={() => { props.removeTask(task.id) }}>X
                        </button>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                        />
                        <span>{task.title}</span>
                    </li>
                }
            )}
        </ul>
        <div>
            <button
                onClick={() => { tasksFilter('all') }}>All
            </button>
            <button
                onClick={() => { tasksFilter('active') }}>Active
            </button>
            <button
                onClick={() => { tasksFilter('completed') }}>Completed
            </button>
        </div>
    </div>
}
import React from 'react';
import { useState } from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

export type FilterKeyType = 'all' | 'active' | 'completed';

export function Todolist(props: PropsType) {

    let [currentTask, setCurrentTask] = useState<FilterKeyType>('all');
    let [myTasks, setMyTasks] = useState<Array<TaskType>>(props.tasks);
   
    const removeTask = (taskId:number)=>{
        setMyTasks(myTasks.filter(task=>task.id!==taskId))
    }
    
    const changeTaskFilter = (filterType:FilterKeyType) =>{
        setCurrentTask(filterType);
    }

    const returnResultTask = () =>{
        let resultTask = myTasks;
        if(currentTask==='active'){
            resultTask = resultTask.filter(task=>!task.isDone)
        } else if(currentTask==='completed'){
            resultTask = resultTask.filter(task=>task.isDone)
        }
        return resultTask;
    }
    


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input />
            <button>+</button>
        </div>
        <ul>
            {returnResultTask().map(
                task => {
                    return <li key={task.id}>
                        <button
                            onClick={() => { removeTask(task.id) }}>X
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
                onClick={() => { changeTaskFilter('all') }}>All
            </button>
            <button
                onClick={() => { changeTaskFilter('active') }}>Active
            </button>
            <button
                onClick={() => { changeTaskFilter('completed') }}>Completed
            </button>
        </div>
    </div>
}
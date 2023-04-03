import React from 'react';
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type FilterKeyType = 'all' | 'active' | 'completed';

const App: React.FC = () => {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]);


    // ТИПИЗИРУЕМ ПРИНИМАЕМЫЕ ПАРАМЕТРЫ !!!
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(el => el.id !== taskId));
    }

    // ТИПИЗИРУЕМ ПРИНИМАЕМЫЕ ПАРАМЕТРЫ !!!
    /*  const tasksFilter = (taskName: FilterKeyType) => {
         setCurrentTask(taskName);
     } */

    /*  let [currentTask, setCurrentTask] = useState<FilterKeyType>('all');
     let resultTasks = tasks;
     if (currentTask === 'active') {
         resultTasks = resultTasks.filter(el => !el.isDone)
     } else if (currentTask === 'completed') {
         resultTasks = resultTasks.filter(el => el.isDone)
     } */

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
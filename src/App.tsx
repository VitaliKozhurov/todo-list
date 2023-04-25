import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';


//CRUD
//C-create
//R-read (filter, search, sort, pagination)
//U-update
//D-delete


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
        ]
    });

    const removeTask = (todoListId: string, taskId: string) => {
        console.log(tasks.todoListId)
        const updatedTasks = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }


    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    const changeTaskStatus = (taskId: string, todoListId: string, newIsDoneValue: boolean) => {
        const updatedTasks = tasks[todoListId].map(task => task.id === taskId
            ? {...task, isDone: newIsDoneValue}
            : task)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(todo => todo.id === todoListId
            ? {...todo, filter: nextFilter}
            : todo))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId));

        const copy = {...tasks};
        delete copy[todoListId];
        setTasks(copy);

        // delete tasks[todoListId]; вариант изменения стейта без перерисовки
    }

    /* const addTodoList = (title: string) => {
         const todo_id = v1();
     }*/

    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case 'active':
                return tasksList.filter(t => !t.isDone)
            case 'completed':
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const todoListsComponents: JSX.Element[] = todoLists.map(todo => {
        const tasksWhatIWantToSee = getTasksForRender(tasks[todo.id], todo.filter)
        return (<TodoList
            key={todo.id}
            todoListId={todo.id}
            title={todo.title}
            tasks={tasksWhatIWantToSee}
            filter={todo.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeTodoListFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
        />)
    })


    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;

import React from 'react';
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';


const App: React.FC = () => {
    const tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ];
    console.log('Render App')

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
            />
        </div>
    );
}

export default App;
import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

function App() {

    const forTrack1 = 'What to learn 111 апрпарапрапрапр';
    const forTrack2 = 'What to learn 222 апрпарапрапрапр';

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "ReactJSX", isDone: false },
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]

    return (
        <div className="App">
            <TodoList track1={forTrack1} track2={111} tasks={tasks1} />
            <TodoList track1={forTrack2} tasks={tasks2} />
        </div>
    );
}

export default App;
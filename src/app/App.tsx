import React from 'react';
import './App.css';
import {TodoLists} from '../features/TodoLists/TodoLists';
import {Header} from '../components/Header/Header';
import {CustomSnackbar} from '../components/CustomSnackBar/CustomSnackBar';

function App() {
    return (
        <div className="App">
            <Header />
            <CustomSnackbar/>
            <TodoLists />
        </div>
    );
}

export default App;

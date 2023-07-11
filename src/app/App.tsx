import React from 'react';
import './App.css';
import {TodoLists} from '../features/TodoLists/TodoLists';
import {Header} from '../components/Header/Header';
import {CustomSnackbar} from '../components/CustomSnackBar/CustomSnackBar';
import {Routes, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';

function App() {
    return (
        <div className="App">
            <Header />
            <CustomSnackbar />
            <Routes>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/'} element={<TodoLists />} />
            </Routes>

        </div>
    );
}

export default App;

import React, {useEffect} from 'react';
import './App.css';
import {TodoLists} from '../features/TodoLists/TodoLists';
import {Header} from '../components/Header/Header';
import {CustomSnackbar} from '../components/CustomSnackBar/CustomSnackBar';
import {Routes, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {AppStateType, useAppDispatch} from '../state/store';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {initializeAppTC} from '../state/appReducer/appReducer';

function App() {
    const dispatch = useAppDispatch();
    const appInitializedStatus = useSelector<AppStateType, boolean>(state => state.app.initialized);

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [])

    if (!appInitializedStatus) {
        return <div
            style={{width: '100%', textAlign: 'center', position: 'fixed', top: '45%'}}>
            <CircularProgress />
        </div>
    }

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

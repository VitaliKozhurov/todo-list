import s from './Header.module.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useCallback} from 'react';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {AppStateType, useAppDispatch} from '../../state/store';
import {EntityStatus} from '../../state/appReducer/appReducer';
import {useSelector} from 'react-redux';
import {logoutUserTC} from '../../state/authReducer/authReducer';


export const Header = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector<AppStateType, EntityStatus>(state => state.app.status);
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLoggedStatus);

    const logOutAppHandler = useCallback(() => {
        dispatch(logoutUserTC())
    }, [])
    return (
        <div className={s.body}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todo App
                    </Typography>
                    {
                        isLogged && <Button onClick={logOutAppHandler} color="inherit">Log out</Button>

                    }

                </Toolbar>
                {isLoading === EntityStatus.Loading && (
                    <div className={s.loader}>
                        <LinearProgress />
                    </div>)}
            </AppBar>

        </div>
    )
};
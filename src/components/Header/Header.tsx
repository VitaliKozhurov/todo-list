import s from './Header.module.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Box from '@mui/material/Box/Box';
import {AppStateType} from '../../state/store';
import {EntityStatus} from '../../state/appReducer/appReducer';
import {useSelector} from 'react-redux';


export const Header = () => {
    const isLoading = useSelector<AppStateType, EntityStatus>(state => state.app.status)
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {isLoading === EntityStatus.Loading && (
                    <div className={s.loader}>
                        <LinearProgress />
                    </div>)}
            </AppBar>

        </div>
    )
};
import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {TodoList} from './TodoList/TodoList';
import {useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {todoListsSelector} from '../../state/todoListReducer/todoListSelectors';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {
    addTodoListTC,
    getTodoListTC,
} from '../../state/todoListReducer/todolists-reducer';
import {AppStateType, useAppDispatch} from '../../state/store';
import '../../app/App.css';
import {Navigate} from 'react-router-dom';


export const TodoLists = () => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector(todoListsSelector);
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLoggedStatus);

    const addTodoList = useCallback(
        (title: string) => {
            dispatch(addTodoListTC(title));
        },
        [dispatch]
    );
    // Example request for todo lists
    useEffect(() => {
        if (!isLogged) {
            return
        }
        dispatch(getTodoListTC());
    }, []);

    if (!isLogged) {
        return <Navigate to={'/login'} />
    }
    return (
        <div className="contentBody">
            <AddItemForm onAddItem={addTodoList} title="Add new todo" />
            <Grid style={{justifyContent: 'center'}} container spacing={10}>
                {todoLists.map((todo) => (
                    <Grid item key={todo.id}>
                        <Paper>
                            <Card>
                                <TodoList {...todo} />
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

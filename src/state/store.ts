import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import {TodoListsActionsType, todoListsReducer} from './todoListReducer/todolists-reducer';
import {TasksActionsType, tasksReducer} from './tasksReducer/tasksReducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {AppActionsType, appReducer} from './appReducer/appReducer';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type StoreType = typeof store;

export type RootAppActionsType = TasksActionsType | TodoListsActionsType | AppActionsType

// кастомный хук для диспатча с типизацией для санок
export const useAppDispatch = () =>
    useDispatch<ThunkDispatch<AppStateType, any, AnyAction>>();

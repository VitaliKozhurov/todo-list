import {AppStateType} from '../store';
import {TasksType} from './tasksReducer';

export const tasksSelector = (state:AppStateType):TasksType=>state.tasks
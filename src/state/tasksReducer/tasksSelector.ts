import {AppStateType} from '../store';
import {TasksType} from './tasksReducer';
import {TaskType} from '../../api/tasksAPI';

export const tasksSelector = (state: AppStateType): TasksType => state.tasks

export const _tasksSelector = (todoListID: string) => (state: AppStateType): TaskType[] => state.tasks[todoListID]
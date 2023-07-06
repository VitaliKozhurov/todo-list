import {FC, useCallback, useEffect} from 'react';
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    FilterValuesType,
    removeTodoListTC,
    TodoListType,
} from '../../../state/todoListReducer/todolists-reducer';
import s from './TodoList.module.css';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {useSelector} from 'react-redux';
import {tasksSelector} from '../../../state/tasksReducer/tasksSelector';
import {Task} from './Task/Task';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {TaskStatuses, TaskType} from '../../../api/tasksAPI';
import {TasksFilter} from './TasksFilter/TasksFilter';
import {useAppDispatch} from '../../../state/store';
import {addTaskTC, AppTaskType, getTasksTC,} from '../../../state/tasksReducer/tasksReducer';
import {EntityStatus} from '../../../state/appReducer/appReducer';

const filterTask = (filter: FilterValuesType, tasks: AppTaskType[]) => {
    if (filter === 'active') {
        return tasks.filter((task) => task.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
        return tasks.filter((task) => task.status === TaskStatuses.Completed);
    }
    return tasks;
};

export const TodoList: FC<TodoListType> = ({
                                               id,
                                               title,
                                               order,
                                               addedDate,
                                               filter,
                                               status
                                           }) => {
    const tasks = useSelector(tasksSelector(id));
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTasksTC(id));
    }, []);

    const onAddTaskHandler = useCallback(
        (title: string) => {
            dispatch(addTaskTC(id, title));
        },
        [dispatch, id]
    );

    const onChangeTodoListTitle = useCallback(
        (title: string) => {
            dispatch(changeTodoListTitleTC(id, title));
        },
        [dispatch, id]
    );

    const onRemoveTodoList = () => {
        dispatch(removeTodoListTC(id));
    };

    const onChangeTodoListFilter = useCallback(
        (value: FilterValuesType) => {
            dispatch(changeTodoListFilterAC(id, value));
        },
        [dispatch, id]
    );

    const filteredTask = filterTask(filter, tasks);

    const todoIsLoading = status === EntityStatus.Loading;

    return (
        <div className={s.cardBody}>
            <div className={s.titleBody}>
                <h2 className={s.title}>
                    <EditableSpan
                        title={title}
                        disabled ={todoIsLoading}
                        changeTitle={onChangeTodoListTitle}
                    />
                </h2>
                <IconButton onClick={onRemoveTodoList} disabled={todoIsLoading}>
                    <DeleteOutlineIcon color={todoIsLoading?'disabled':'error'} />
                </IconButton>
            </div>
            <AddItemForm onAddItem={onAddTaskHandler} title={'Add new task'} disabled={todoIsLoading} />
            {filteredTask.map((task) => (
                <Task key={task.id} {...task} />
            ))}
            <div className={s.filterGroup}>
                <TasksFilter
                    filter={filter}
                    onChange={onChangeTodoListFilter}
                />
            </div>
        </div>
    );
};

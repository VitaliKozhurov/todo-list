import {FC, useCallback, useEffect} from 'react';
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC,
    TodoListType,
} from '../../state/todoListReducer/todolists-reducer';
import s from './TodoList.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {tasksSelector} from '../../state/tasksReducer/tasksSelector';
import {Task} from '../Task/Task';
import {EditableSpan} from '../UI/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {TaskStatuses, TaskType} from '../../api/tasksAPI';
import {TasksFilter} from '../TasksFilter/TasksFilter';

const filterTask = (filter: FilterValuesType, tasks: TaskType[]) => {
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
                                           }) => {
    const tasks = useSelector(tasksSelector(id));

    useEffect(() => {
        /*dispatch(getTasksTC(id))*/
    }, [])

    const dispatch = useDispatch();
    const onAddTaskHandler = useCallback(
        (title: string) => {
            /*dispatch(addTaskTC(id,title))*/
            //dispatch(addTasksAC(id, title));
        },
        [dispatch, id]
    );
    const onChangeTodoListTitle = useCallback(
        (title: string) => {
            // dispatch(changeTodoListTitleTC(id,title))
            dispatch(changeTodoListTitleAC(id, title));
        },
        [dispatch, id]
    );
    const onRemoveTodoList = () => {
        // dispatch(removeTodoListTC(id))
        dispatch(removeTodoListAC(id));
    };
    const onChangeTodoListFilter = useCallback(
        (value: FilterValuesType) => {
            dispatch(changeTodoListFilterAC(id, value));
        },
        [dispatch, id]
    );
    const filteredTask = filterTask(filter, tasks);

    return (
        <div className={s.cardBody}>
            <div className={s.titleBody}>
                <h2 className={s.title}>
                    <EditableSpan
                        title={title}
                        changeTitle={onChangeTodoListTitle}
                    />
                </h2>
                <IconButton onClick={onRemoveTodoList}>
                    <DeleteOutlineIcon color={'error'} />
                </IconButton>
            </div>
            <AddItemForm onAddItem={onAddTaskHandler} title={'Add new task'} />
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

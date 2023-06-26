import {FC, useCallback} from 'react';
import {changeTodoListTitleAC, removeTodoListAC, TodoListType} from '../../state/todoListReducer/todolists-reducer';
import s from './TodoList.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {tasksSelector} from '../../state/tasksReducer/tasksSelector';
import {addTasksAC} from '../../state/tasksReducer/tasksReducer';
import {Task} from '../Task/Task';
import {EditableSpan} from '../UI/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export const TodoList: FC<TodoListType> = ({id, title, order, addedDate, filter}) => {
    const tasks = useSelector(tasksSelector)[id];
    const dispatch = useDispatch();
    const onAddItemHandler = useCallback((title: string) => {
        dispatch(addTasksAC(id, title))
    }, [])
    const onChangeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
    }
    const onRemoveTodoList = () =>{
        dispatch(removeTodoListAC(id))
    }
    return <div className={s.cardBody}>
        <div className={s.titleBody}>
            <h2 className={s.title}>
                <EditableSpan title={title} changeTitle={onChangeTodoListTitle} />
            </h2>
            <IconButton>
                <DeleteOutlineIcon color={'error'} onClick={onRemoveTodoList} />
            </IconButton>
        </div>
        <AddItemForm onAddItem={onAddItemHandler} title={'Add new task'} />
        {tasks.map(task => (
            <Task
                key={task.id}
                {...task}
            />
        ))}
    </div>
};

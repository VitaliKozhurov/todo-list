import {FC, useCallback} from 'react';
import {TodoListType} from '../../state/todoListReducer/todolists-reducer';
import s from './TodoList.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {tasksSelector} from '../../state/tasksReducer/tasksSelector';
import {addTasksAC} from '../../state/tasksReducer/tasksReducer';
import {Task} from '../Task/Task';


export const TodoList: FC<TodoListType> = ({id, title, order, addedDate, filter}) => {
    const tasks = useSelector(tasksSelector)[id];
    const dispatch = useDispatch();
    const onAddItemHandler = useCallback((title: string) => {
        dispatch(addTasksAC(id, title))
    }, [])
    return <div className={s.cardBody}>
        <h2 className={s.title}>{title}</h2>
        <AddItemForm onAddItem={onAddItemHandler} title={'Add new task'} />
        {tasks.map(task => (
            <Task
                key={task.id}
                {...task}
            />
        ))}
    </div>
};

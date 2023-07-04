import {
    addTodoListAC,
    changeTodoListFilterAC, changeTodoListStatusAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListsAC,
    todoListsReducer,
    TodoListType,
} from './todolists-reducer';
import {EntityStatus} from '../appReducer/appReducer';

describe('Todo list reducer tests', () => {
    let initialState: Array<TodoListType>;
    beforeEach(() => {
        initialState = [
            {
                id: 'First_todo',
                title: 'First_todo',
                addedDate: '',
                order: 0,
                filter: 'all',
                status: EntityStatus.Idle
            },
        ];
    });

    it('Should add todo list', () => {
        const newTodo = {
            id: 'Second_todo',
            title: 'Second_todo',
            addedDate: '',
            order: 0,
        };
        const newState = todoListsReducer(initialState, addTodoListAC(newTodo));
        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe('Second_todo');
        expect(newState[0].filter).toBe('all');
        expect(newState[1].title).toBe('First_todo');
    });

    it('Should change todo list title', () => {
        const newTitle = 'Changed First_todo';
        const newState = todoListsReducer(
            initialState,
            changeTodoListTitleAC('First_todo', newTitle)
        );
        expect(newState.length).toBe(1);
        expect(newState[0].title).toBe(newTitle);
    });

    it('Should change todo list filter type', () => {
        const newFilterType = 'active';
        const newState = todoListsReducer(
            initialState,
            changeTodoListFilterAC('First_todo', newFilterType)
        );
        expect(newState.length).toBe(1);
        expect(newState[0].filter).toBe(newFilterType);
    });

    it('Should remove todo list', () => {
        const newState = todoListsReducer(
            initialState,
            removeTodoListAC('First_todo')
        );
        expect(newState.length).toBe(0);
    });
    it('Should set todolists in state from server with filter field', () => {
        const todoLists = [
            {
                id: 'First_todo',
                title: 'First_todo',
                addedDate: '',
                order: 0,
            },
            {
                id: 'Second_todo',
                title: 'Second_todo',
                addedDate: '',
                order: 0,
            },
        ];

        const state = todoListsReducer([], setTodoListsAC(todoLists));

        expect(state.length).toBe(2);
        expect(state[0].filter).toBe('all');
        expect(state[1].filter).toBe('all');
    });

    it('Should change todo list status type', () => {
        const newStatus = EntityStatus.Loading;
        const newState = todoListsReducer(
            initialState,
            changeTodoListStatusAC('First_todo', newStatus)
        );
        expect(newState.length).toBe(1);
        expect(newState[0].status).toBe(EntityStatus.Loading);
    });
});

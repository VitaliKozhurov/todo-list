import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from "redux";
import { todoListsReducer } from "./todoListReducer/todolists-reducer";
import { tasksReducer } from "./tasksReducer/tasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type StoreType = typeof store;

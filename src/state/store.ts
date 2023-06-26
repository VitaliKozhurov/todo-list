import { combineReducers, legacy_createStore as createStore } from "redux";
import { todoListsReducer } from "./todoListReducer/todolists-reducer";
import { tasksReducer } from "./tasksReducer/tasksReducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

export type StoreType = typeof store;

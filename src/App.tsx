import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { todoListsSelector } from "./state/todoListReducer/todoListSelectors";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";

function App() {
    const todoLists = useSelector(todoListsSelector);

    return (
        <div className="App">
            <AddItemForm title="Add todo list" />
        </div>
    );
}

export default App;

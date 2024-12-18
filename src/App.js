import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    // Load todos from local storage on component mount
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
        setTodoList(savedTodos);
    }, []);

    // Save todos to local storage
    const saveTodosToLocalStorage = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const handleAddTodo = () => {
        if (todoInput.trim() === "") {
            alert("Enter Valid Text");
            return;
        }

        const newTodo = {
            text: todoInput,
            uniqueNo: Date.now(),
            isCompleted: false,
        };

        setTodoList((prevList) => [...prevList, newTodo]);
        setTodoInput("");
    };

    const handleDeleteTodo = (todoId) => {
        const updatedTodos = todoList.filter((todo) => todo.uniqueNo !== todoId);
        setTodoList(updatedTodos);
    };

    const toggleTodoStatus = (todoId) => {
        const updatedTodos = todoList.map((todo) =>
            todo.uniqueNo === todoId
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo
        );
        setTodoList(updatedTodos);
    };

    return (
        <div className="todos-bg-container">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="todos-heading">Todos</h1>
                        <h1 className="create-task-heading">
                            Create <span className="create-task-heading-subpart">Task</span>
                        </h1>
                        <input
                            type="text"
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            className="todo-user-input"
                            placeholder="What needs to be done?"
                        />
                        <button className="button" onClick={handleAddTodo}>
                            Add
                        </button>
                        <h1 className="todo-items-heading">
                            My <span className="todo-items-heading-subpart">Tasks</span>
                        </h1>
                        <ul className="todo-items-container">
                            {todoList.map((todo) => (
                                <li
                                    key={todo.uniqueNo}
                                    className="todo-item-container d-flex flex-row"
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        checked={todo.isCompleted}
                                        onChange={() => toggleTodoStatus(todo.uniqueNo)}
                                    />
                                    <div className="label-container d-flex flex-row">
                                        <label
                                            htmlFor={`checkbox${todo.uniqueNo}`}
                                            className={`checkbox-label ${
                                                todo.isCompleted ? "checked" : ""
                                            }`}
                                        >
                                            {todo.text}
                                        </label>
                                        <div className="delete-icon-container">
                                            <i
                                                className="far fa-trash-alt delete-icon"
                                                onClick={() => handleDeleteTodo(todo.uniqueNo)}
                                            ></i>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="button" onClick={saveTodosToLocalStorage}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

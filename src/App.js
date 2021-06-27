import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        filterHandler()
        saveLocalTodos()
    }, [todos, status]);



    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter((todo) => todo.completed === true))
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter((todo) => todo.completed !== true))
                break;
            default:
                setFilteredTodos(todos)
                break
        }
    }

    const saveLocalTodos = () => {

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            let localTodo = JSON.parse(localStorage.getItem('todos'))
            setTodos(localTodo)
        }
    }


    return ( <
        div className = "App" >
        <
        header >
        <
        h1 > TechArt 's Todo Application</h1></header>  <
        Form todos = { todos }
        setStatus = { setStatus }
        setTodos = { setTodos }
        inputText = { inputText }
        setInputText = { setInputText }
        / > <
        TodoList todos = { todos }
        setTodos = { setTodos }
        filteredTodos = { filteredTodos }
        / > < /
        div >
    );
}

export default App;
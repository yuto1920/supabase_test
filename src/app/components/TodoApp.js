"use client";
import React, { useEffect, useState } from 'react';
import "./TodoApp.css";
import { getAllTodos,addTodo } from '../utils/supabaseFunction';
import TodoList from './TodoList'; // 1. TodoList をインポート

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [title,setTitle] = useState("");

    useEffect(() => {
        const getTodos = async () => {
            try {
                const fetchedTodos = await getAllTodos();
                // fetchedTodosがundefinedの場合に備えて空配列をセット
                setTodos(fetchedTodos || []); 
            } catch (error) {
                console.error("データの取得に失敗しました:", error);
            }
        };
        getTodos();
    }, []);

    const handlesubmit = async(e) => {
        e.preventDefault();
        await addTodo(title);
        let newTodos = await getAllTodos();
        setTodos(newTodos)

        setTitle("")
    }


    return (
        <section>
            <div>TodoApp</div>
            <form onSubmit={(e) => {
                handlesubmit(e)
            }}>
                <input type="text" className="input" value = {title} onChange={(e) => setTitle(e.target.value)}></input>
                <button>Add</button>
            </form>
            {/* 2. 'todos' stateをTodoListコンポーネントに渡す */}
            <TodoList todos={todos}  setTodos={setTodos}/> 
        </section>
    );
};

export default TodoApp;
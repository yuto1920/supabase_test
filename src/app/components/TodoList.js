import React from 'react';
import { deleteTodo, getAllTodos } from '../utils/supabaseFunction';

const TodoList = ({ todos, setTodos }) => { 
    const handleDelete = async(id) => {
        await deleteTodo(id);
        let todos = await getAllTodos()
        setTodos(todos)
    }
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            <li>{todo.title}</li>
            <span onClick={() => handleDelete(todo.id)}>✖</span>
          </div>
        
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
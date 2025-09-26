import React from 'react';
import { deleteTodo, getAllTodos } from '../utils/supabaseFunction';

// 親から 'todos' をpropsとして受け取る
const TodoList = ({ todos, setTodos }) => { 
    const handleDelete = async(id) => {
        await deleteTodo(id);
        let todos = await getAllTodos()
        setTodos(todos)
    }
  return (
    <div>
      <ul>
        {/* これで 'todos' は常に配列であることが保証される */}
        {todos.map((todo) => (
          // keyはループで生成される一番外側の要素に付けるのがルール
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
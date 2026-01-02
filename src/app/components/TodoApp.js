"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addTodo, getAllTodos, getProfile } from '../utils/supabaseFunction';
import "./TodoApp.css";
import TodoList from './TodoList'; // 1. TodoList をインポート
const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [title,setTitle] = useState("");
    const router = useRouter();
    const [ profile, setProfile] = useState(null)
     useEffect(() => {
            const plotProfile = async () => {
                try {
                    const fetchedProfile = await getProfile();
                    setProfile(fetchedProfile || null); 
                    // fetchedTodosがundefinedの場合に備えて空配列をセット
                     console.log(fetchedProfile)
                } catch (error) {
                    console.error("データの取得に失敗しました:", error);
                }
              };
              plotProfile(); 
          }, []);
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
    const toProfile = () =>{
        router.push(`/${profile.id}/profile`)
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

            <button onClick={toProfile}>プロフィール画面へ</button>

        </section>
    );
};

export default TodoApp;
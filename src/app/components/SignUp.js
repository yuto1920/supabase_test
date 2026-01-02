'use client'
import { supabase } from '../utils/supabase'; 
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/state';
import { useState } from 'react';
import { addUser } from '../utils/supabaseFunction';

export default function SignUp() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, username, setUsername } = useAuth();
  const [from, setFrom] = useState('');
  const [age, setAge] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username, 
          from: from,        
          age: age            
        }
      }
    });
      if (error) throw error; 
      
      alert('登録完了メールを確認してください。');
      router.push('/Login'); 

    } catch (error) {
      alert(error.message);
    }

  }

  return (
    <div>
      <h1>新規登録</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            メールアドレス：
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            パスワード：
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            名前
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>
            出身
          </label>
          <input
            type="text"
            name="from"
            onChange={(e) => setFrom(e.target.value)}
          />
          <label>
            年齢
          </label>
          <input
            type="number"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
          <button
            type="submit"
            style={{ width: 220 }}
          >
            登録
          </button>
        </form>
      </div>
    </div>
  )
}

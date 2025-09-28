// components/Login.js
"use client";
import Link, { LinkProps } from 'next/link';
import { useState } from 'react';
import { supabase } from '../utils/supabase'; // Supabaseクライアントをインポート

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // ログイン
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert('ログインしました！'); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href='Todo' as='/Todo' passHref>
            <button type="submit">
                ログイン
            </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
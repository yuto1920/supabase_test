"use client"
import React from 'react'
import Link, { LinkProps } from 'next/link';
import { useState } from 'react';
import { supabase } from '../utils/supabase'; // Supabaseクライアントをインポート

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        {
        // 新規登録
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert('登録完了メールを確認してください。');
        }
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
                新規登録
            </button>
        </Link>
      </form>
    </div>
  );
}

export default SignUp
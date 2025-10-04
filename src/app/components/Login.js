'use client'
import { useEffect, useState } from 'react';
// supabase
import { supabase } from '../utils/supabase';
// useRouterをインポート
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../hooks/state"

// コンポーネント名はファイル名や役割に合わせてLoginにするのがおすすめです
export default function Login() { 
  const router = useRouter();
  const { email, setEmail, password, setPassword} = useAuth();

  // 1. 関数がイベント(e)を受け取るようにする
  const handleSubmit = async (e) => {
    // 2. ページの再読み込みをキャンセル
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error; // エラーがあればcatchブロックに投げる
      
      console.log(data);
      router.push('/Todo'); // ログイン成功後にページ遷移

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <div>
        {/* 3. formのonSubmitに関数を渡す */}
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
          {/* 4. ボタンのtypeを"submit"にし、onClickを削除 */}
          <button type="submit">
            ログイン
          </button>
        </form>
      </div>
    </div>
  )
}
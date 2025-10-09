'use client'
import { useEffect } from 'react';

// supabaseをインポート
import { supabase } from '../utils/supabase';

// useRouterをインポート
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../hooks/state"

const Logout = () => {
  const {currentUser, setCurrentUser} = useAuth();
  // routerを使うための記述
  const router = useRouter();

    // 現在ログインしているユーザーを取得する処理
  const getCurrentUser = async () => {
    // ログインのセッションを取得する処理
    const { data } = await supabase.auth.getSession()
    // セッションがあるときだけ現在ログインしているユーザーを取得する
    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      const { data: { user } } = await supabase.auth.getUser()
      // currentUserにユーザーのメールアドレスを格納
      setCurrentUser(user.email)
    }
  }

  // HeaderコンポーネントがレンダリングされたときにgetCurrentUser関数が実行される
  useEffect(()=>{
    getCurrentUser()
  },[])

  // ログアウトの処理を追加
  const doLogout = async () => {
    // supabaseに用意されているログアウトの関数
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    // ログアウトを反映させるためにリロードさせる
    router.push('./')
  }

  // ログアウトボタンも追加
  return (
    <div>
          <div>
            <button onClick={()=>{
              doLogout();
            }} >
              ログアウト
            </button>
          </div>
    </div>
  );
}

export default Logout;

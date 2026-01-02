'use client'
import { useEffect } from 'react';

// supabaseをインポート
import { supabase } from '../utils/supabase';

// useRouterをインポート
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../hooks/state"

const Logout = () => {
  const {currentUser, setCurrentUser} = useAuth();
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

  useEffect(()=>{
    getCurrentUser()
  },[])

  const doLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    router.push('./')
  }

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

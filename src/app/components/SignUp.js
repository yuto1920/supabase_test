'use client'
import { supabase } from '../utils/supabase'; 
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/state';
import { addUser } from '../utils/supabaseFunction';

export default function SignUp() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, name, setName } = useAuth();

  // 1. 関数がイベントオブジェクト(e)を受け取るようにする
  const handleSubmit = async (e) => {
    // 2. フォームのデフォルトの再読み込みを防ぐ
    e.preventDefault(); 
    
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error; // エラーがあればcatchブロックに投げる
      //const userId = data.user?.id;
      //console.log("新規登録ユーザーID:", userId);
      //console.log("data",data);
      //if (userId){
        //await addUser(userId, email, name)
      //}
      

      alert('登録完了メールを確認してください。');
      router.push('/Login'); 

    } catch (error) {
      // 4. try...catchでエラーを安全に処理する
      alert(error.message);
    }

  }

  return (
    <div>
      <h1>新規登録</h1>
      <div>
        {/* 1. formのonSubmitに関数を渡す */}
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
          {/* 3. ボタンのtypeを"submit"にし、onClickを削除 */}
          <label>
            名前
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
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

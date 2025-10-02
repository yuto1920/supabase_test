"use client";
import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation'; // 1. useRouterをインポート

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // 2. useRouterを初期化

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 新規登録
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;
            
            alert('登録完了メールを確認してください。');
            
            // 3. 登録処理が終わった後にログインページへ遷移
            router.push('/Login'); 

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
                {/* 4. Linkコンポーネントを削除し、通常のbuttonにする */}
                <button type="submit">
                    新規登録
                </button>
            </form>
        </div>
    );
};

export default SignUp;
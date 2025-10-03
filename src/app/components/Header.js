'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; 

const Header = () => {
    // ユーザー情報の初期値はnullの方が状態管理しやすい
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // 1. 最初に現在のセッション情報を取得して、ユーザー状態をセット
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setCurrentUser(session.user);
                console.log(session.user)
            }
        };
        fetchUser();

        // 2. 認証状態の変化（ログイン、ログアウトなど）を監視するリスナーを設定
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setCurrentUser(session.user);
            }
            if (event === 'SIGNED_OUT') {
                setCurrentUser(null);
            }
        });

        // 3. コンポーネントが不要になったらリスナーを解除（クリーンアップ）
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    
    
    return (
        <div style={{ padding: "1rem" }}>
            {currentUser ? (
                <div suppressHydrationWarning={true}>
                    <div style={{ paddingBottom: "1rem" }}>{currentUser.email} でログインしています。</div>
                </div>
            ) : (
                <div suppressHydrationWarning={true}>ログインしていません。</div>
            )}
        </div>
    );
}

export default Header;
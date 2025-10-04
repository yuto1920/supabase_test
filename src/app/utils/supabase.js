import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,       // セッションをlocalStorageに保存
      autoRefreshToken: true,     // アクセストークンを自動更新
      detectSessionInUrl: true,   // OAuthリダイレクトの検出
    },
  }
);


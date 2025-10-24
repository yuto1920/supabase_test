"use client"
import { getProfile } from "../utils/supabaseFunction"
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
const Profile = () => {
  const router = useRouter();
  const clickHandler = () => {
    router.push("/Todo")
  }
  useEffect(() => {
        const plotProfile = async () => {
            try {
                const fetchedProfile = await getProfile();
                // fetchedTodosがundefinedの場合に備えて空配列をセット
            } catch (error) {
                console.error("データの取得に失敗しました:", error);
            }
          };
          plotProfile();
      }, []);
  
  return (
    <div>
        <div>プロフィール</div>
        <div>名前</div>
        <div>職業</div>
        <div>達成率</div> 
        <button onClick = {clickHandler}>戻る</button>
    </div>
  )
}

export default Profile
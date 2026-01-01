"use client"
import { getProfile } from "../utils/supabaseFunction"
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
const Profile = () => {
  const [ profile, setProfile] = useState(null)
  const router = useRouter();
  const clickHandler = () => {
    router.push("/Todo")
  }
  useEffect(() => {
        const plotProfile = async () => {
            try {
                const fetchedProfile = await getProfile();
                setProfile(fetchedProfile || null); 
                // fetchedTodosがundefinedの場合に備えて空配列をセット
                 console.log(fetchedProfile)
            } catch (error) {
                console.error("データの取得に失敗しました:", error);
            }
          };
          plotProfile(); 
      }, []);
  const editClickHandler = () => {
    router.push("/profile/edit")
  }
  useEffect(() => {
    console.log("Stateが更新されました:", profile);
  }, [profile]);
  if (!profile) {
    return <div>読み込み中...</div>;
  }
  return (
    <div>
        <div>プロフィール</div>
        <div>名前:{profile.username}</div>
        <div>出身</div>
        <div>年齢</div> 
        <div>
          <button onClick={editClickHandler}>編集</button>
        </div>
        <button onClick = {clickHandler}>戻る</button>
    </div>
  )
}

export default Profile
import React from 'react'
import Link from 'next/link'
const Start = () => {
  return (
    <>
        <div>Start</div>
        <Link href='/Login' as='/Login' passHref>
            ログイン画面へ
        </Link>
        <Link href="/signup" as='/signup' > 
            新規登録
        </Link>
    
    </>
    
  )
}

export default Start
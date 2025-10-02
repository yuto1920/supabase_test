import React from 'react'
import Link from 'next/link'
const Head = () => {
  return (
        <div>
            <div>
                <Link href='Login' as='./login'>ログインへ</Link> 
            </div>
            <div>
                <LInk>新規登録へ</LInk>
            </div> 
        </div>
    
  )
}

export default Head
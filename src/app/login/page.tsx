'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function page() {
    const loginInWithGoogle = () => signIn('google',{callbackUrl:process.env.NEXT_PUBLIC_URL})

  return (
    <div>
      This is login Page
      <button onClick={loginInWithGoogle}>Login with Google</button>
    </div>
  )
}

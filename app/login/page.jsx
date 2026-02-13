'use client'

import React  from 'react'
import { supabase } from '@/lib/supabaseClient'
import { FcGoogle } from "react-icons/fc";
const Login = () => {
     

     const loginWithGoogle = async () => {
        
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }
  return (
     <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Smart Bookmark App</h1>
        <button
          onClick={loginWithGoogle}
          className="flex items-center gap-2  shadow border px-4 py-2 rounded"
        >
          <FcGoogle /> Login with Google
        </button>
      </div>
      </div>
  )
}

export default Login
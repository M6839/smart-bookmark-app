'use client'

import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
export default function Home() {
 const {user}=useContext(UserContext);

  return (
    <div className='min-h-screen'>
    <div className='flex flex-col gap-4 justify-center items-center h-[80vh]'>
      <h1 className='font-bold text-center text-blue-500 text-[32px]'>Welcome to Smart BookMark Application</h1>
     <Link href={`${user?'/dashboard':'/login'}`}><button className="flex gap-2 items-center bg-blue-500 text-white font-bold rounded-full px-6 py-2">Get Started<BiRightArrowAlt className="text-[28px]"/></button></Link>
    </div>
    </div>
    
  )
}

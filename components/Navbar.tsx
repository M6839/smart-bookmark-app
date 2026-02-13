'use client'
import React, { useContext} from 'react'
import { supabase } from '@/lib/supabaseClient'
import { UserContext } from '@/context/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiRightArrowAlt } from "react-icons/bi";
const Navbar = () => {
    
const router = useRouter();
    const { user } = useContext(UserContext);
    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }
    return (
        <div className="sticky z-45 top-0 bg-white flex justify-between items-center shadow px-2 md:px-8 py-2">
            <Link href={'/'}><h1 className="text-blue-500 text-xl md:text-2xl font-bold">Bookmark-App</h1></Link>
            {
                user ? (<div className='flex items-center gap-2'>
                    <Image src={user.user_metadata.picture} width={36} height={36} alt='profile' className='rounded-full'></Image>
                    <div className=''>
                        <p className='hidden md:block'>{user?.email}</p>
                        <button onClick={logout} className=" text-red-500 cursor-pointer">
                            Logout 
                        </button>
                    </div>
                </div>) :<Link href='/login'><button className='flex items-center gap-2 font-bold bg-blue-500 rounded-lg text-white cursor-pointer px-6 py-2'>Login <BiRightArrowAlt className='text-[20px]'/></button></Link>
            }
        </div>
    )
}

export default Navbar
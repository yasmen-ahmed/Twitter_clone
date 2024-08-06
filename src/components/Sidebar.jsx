
"use client"
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import Link from 'next/link'
import { signIn, signOut ,useSession} from 'next-auth/react';
import Image from 'next/image';

export default function Sidebar() {

const {data:session} =useSession()

  return (
    <div className='flex flex-col gap-4 p-3'>
      <div>
        <Link href='/'>
        <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200'/>
        </Link> 

        <Link href='/' className='flex justify-between items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
        <HiHome className='w-7 h-7 '/> 
            <span className='font-bold hidden xl:inline'>Home</span>
            </Link> 
            {session ? (
   <button className='bg-blue-400 text-white w-48 h-9 rounded-full
   px-4 mt-4 hover:brightness-95 transition-all duration-200
   shadow-md hidden xl:inline font-semibold'
    onClick={()=>signOut()}
   >Sign Out</button>
):(
 <button className='bg-blue-400 text-white w-48 h-9 rounded-full
 px-4 mt-4 hover:brightness-95 transition-all duration-200
 shadow-md hidden xl:inline font-semibold'
  onClick={()=>signIn()}
 >Sign in</button>
)}
     </div>
     {
      session &&(
        <div className='text-gray-700 text-sm flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200'>
          <Image className='p-1 xl-mr-2 rounded-full ' src={session.user.image} width={50} height={50} alt='user image'/>
          <div className='hidden xl'>
            <h4>{session.user.name}</h4>
            <p>{session.user.username}</p>
          </div>
          </div>
      )
     }
    </div>
  )
}

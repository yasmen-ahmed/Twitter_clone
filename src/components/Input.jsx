"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { HiOutlinePhotograph } from 'react-icons/hi';

export default function Input() {
    const {data:session} = useSession(); 
    if(!session) return null;
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
        <Image className='p-1 xl-mr-2 rounded-full !h-[100%] hover:brightness-95 cursor-pointer' src={session.user.image} width={50} height="100" alt='user image'/>
        <div className='w-full divide-y divide-gray-200'>
            <textarea className='w-full border-none outline-none tracking-wide text-gray-700 min-h-[50px] ' name="" id="" rows="2" placeholder='Whats happening ?' ></textarea>

            <div className='flex justify-between items-center pt-2.5'>
                <HiOutlinePhotograph className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer '/>
                <button disabled 
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95
                disabled:opacity-50'
                >Post</button>
            </div>
        </div>
    </div>
  )
} 


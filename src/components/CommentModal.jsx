"use client"

import { useRecoilState } from "recoil"

import { modalState,postIdState } from "../atom/modalAtom"
import Modal from "react-modal"
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { app } from "@/firebase";
import { doc,onSnapshot ,getFirestore } from "firebase/firestore";

const {useSession} = require('next-auth/react')

export default function CommentModal(){

    const [modalOpen, setModalOpen] = useRecoilState(modalState) 
    const [postId,setPostId]=useRecoilState(postIdState);
    const [post,setPost] = useState()
    const {data:session} = useSession();
    const db = getFirestore(app)

    useEffect(()=>{
        if(postId !== ''){
            const postRef = doc(db,'posts',postId)
            const unsubscribe = onSnapshot(
                postRef,
                (snapshot) => {
                    if(snapshot.exists()){
                        setPost(snapshot.data())
                    }else{
                   console.log('No Such document!');
            
                     }         
            }) 
                     return ()=>unsubscribe();
        }
        
    },[postId])

    


    return (
        <div>
     
        {modalOpen && 
        
        <Modal
        isOpen={modalOpen}
        onRequestClose={()=>setModalOpen(false)}
        ariaHideApp={false}
        className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200
        rounded-xl shadow-md'
        >

            <div className="p-4">
                <div className="border-b border-gray-200 py-2 px-1.5 ">
                    <HiX className="text-2xl text-gray-700 p-1
                    hover:bg-gray-200 rounded-full cursor-pointer"
                    onClick={()=>setModalOpen(false)}
                    />
                </div>
            </div>
            <div className="p-4 flex items-center space-x-l relative">
                <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"/>
               <img src={post?.profileImg} alt='user image' className='h-12 w-12 rounded-full mr-4'/>
               <h4 className="font-bold sm:text-[16px] text-[15px] hover:underline truncate">{post?.name}</h4>
               <span className="text-sm:text-[15px] truncate">@{post?.username}</span>
            </div>

            <p>{post?.text}</p>

        </Modal>

        }
        </div>
    )
}
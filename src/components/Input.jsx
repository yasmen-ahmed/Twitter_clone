"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { HiOutlinePhotograph } from 'react-icons/hi';
import {app} from '../firebase'
import {getStorage , ref ,uploadBytesResumable,getDownloadURL} from 'firebase/storage'

export default function Input() {
    const {data:session} = useSession(); 
    const imagePickRef = useRef(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [selectedFile,setSelectedFile] = useState(null)
    const [imageFileUploading,setImageFileUploading] = useState(false)

useEffect(() => {
    if(selectedFile){
      uploadImageToStorage()  
    }
},[selectedFile])

const uploadImageToStorage =()=>{
    setImageFileUploading(true)
    // const storageRef = firebase.storage().ref(`images/${selectedFile.name}`)
    // const uploadTask = storageRef.put(selectedFile)
    const storage = getStorage(app)
    const fileName =new Date().getTime()+ "-" +selectedFile.name
    const storageRef =ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
    (error)=>{
        console.log(error);
        setImageFileUrl(null);
        setImageFileUploading(false);
        setSelectedFile(null)
        
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setImageFileUploading(false);
          });
    }
    )

}

    const addImageToPost = (e) => {
        const file = e.target.files[0];
        
        if(file){
            setSelectedFile(file)
            setImageFileUrl(URL.createObjectURL(file));
           

        }
    }

    if(!session) return null;
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
        <Image className='p-1 xl-mr-2 rounded-full !h-[100%] hover:brightness-95 cursor-pointer' src={session.user.image} width={50} height="100" alt='user image'/>
        <div className='w-full divide-y divide-gray-200'>
            <textarea className='w-full border-none outline-none tracking-wide text-gray-700 min-h-[50px] ' name="" id="" rows="2" placeholder='Whats happening ?' ></textarea>

            {
                selectedFile && (

                        <Image
                        className='w-full max-h-[250px] cursor-pointer object-cover'
                        src={imageFileUrl}
                        alt='image'
                        width={100}
                        height={100}
                        />
                       // <button className='w-12 h-8 bg-red-400 text-white text-sm rounded-full hover:bg-red-500 px-2 py-1'>Delete</button>
                   

                )
            }
            <div className='flex justify-between items-center pt-2.5'>
                <HiOutlinePhotograph
                onClick={()=>imagePickRef.current.click()}
                 className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer '/>
               <input type="file" accept='image/*'
               className=''
               ref={imagePickRef}
               onChange={addImageToPost}
               hidden
               />
                <button disabled 
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95
                disabled:opacity-50'
                >Post</button>
            </div>
        </div>
    </div>
  )
} 


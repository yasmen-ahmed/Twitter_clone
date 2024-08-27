"use client"

import { useRecoilState } from "recoil"

import { modalState } from "../atom/modalAtom"
import { useSession } from "next-auth/react"

export default function CommentModal(){
    const [modalOpen, setModalOpen] = useRecoilState(modalState) 

    return (
        <div>
        <h1>Comment Modal</h1>
        {modalOpen && 
        <h1>The modal is open</h1>
        }
        </div>
    )
}
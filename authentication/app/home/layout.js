'use client'

import React from 'react';
import Sidenav from '../ui/sidenav';
import { sendPost } from '@/actions';

export default function Layout({ children }) {

    const [post, setPost] = React.useState('');
    const [showPost, setShowPost] = React.useState(false);

    const togglePost = ()=>{
        setShowPost(prev => !prev);
        return;
    }

    const handlePost = async () => {
        if (!post) {
            alert("type something")
            return;
        }

        const response = await sendPost(post)
        if (!response) {
            alert("uanlbe to send post")
            return;
        }
        alert("posted");
        setPost("");
        setShowPost(false)
    }   

    return (
        <main className='flex min-h-screen w-full mt-0'>
            <div className='hidden sm:flex'>
                <Sidenav togglePost={togglePost}/>
            </div>

            <div className=' w-full flex'>
                    {children}
            </div>

            <div>
                { showPost &&<div className='bg-zinc-900 p-5 min-h-[100px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col gap-4'>
                    <input
                        placeholder='post'
                        value={post}
                        onChange={(e)=>{setPost(e.target.value)}}
                        className='text-white border-b bg-zinc-900 focus:outline-none'
                    />
                    <div className='flex justify-end'>
                        <button
                            className='text-white border hover:text-black hover:bg-slate-200 p-2 rounded-xl'
                            onClick={handlePost}
                        >
                            post
                        </button>
                    </div>
                   
                </div>}
            </div>
        </main>
    )
}
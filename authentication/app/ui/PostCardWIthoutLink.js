'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { likePost } from '@/actions';

export default function PostCardWithoutLink({ content, likes, replies, username, isLiked, id, profile }) {

    const [liked, setLiked] = useState(isLiked);

    const [likesCount, setLikesCount] = useState(likes)

    const [bookMarked, setBookMarked] = useState(false);

    const [showReport, setShowReport] = useState(false)

    const reportClick = () => {
        setShowReport(prev => !prev)
    }

    const handleLike = async () => {
        if (!liked) {
            setLikesCount(prev => prev+1)
            
            const response = await likePost(id);
            if (!response) {
                alert("error liking the post")
            }
            setLiked(prev => !prev);
        }
        
        return;
    }

    const handleBookmark = () => {
        setBookMarked(prev => !prev);
    }


    return (
        <main className='flex flex-col text-lg bg-surface py-3 px-10 gap-3  my-2 max-w-[550px] text-slate-100 border-b'>
            <section className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div className={` text-xl flex gap-2 items-center rounded-xl`}>
                            <div className='bg-zinc-900 w-10 h-10 rounded-xl'>
                                <img
                                    src={profile}
                                    className='rounded-xl'
                                />
                            </div>
                            {username ? username : "username"} 
                        </div>
                        <div className='relative'>
                            <Image
                                src="/more.svg"
                                alt="more icon"
                                width={24}
                                height={24}
                                className='invert hover:bg-gray-300 hover:rounded-xl'
                                onClick={reportClick}
                            />
                            {showReport && 
                                <div className='absolute right-0 bg-zinc-700 text-white p-2 rounded-md hover:bg-zinc-600 cursor-default'>
                                    Report
                                </div>
                            }
                        </div>
                    </div>
            </section>

                <section className='text-md font-light pb-4 pt-3 border-b border-gray-500'>
                    <p className='ml-4'>
                        {content}
                    </p>
                </section>
            
            
            <section className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    <div className='flex gap-1 justify-center items-center text-gray-300 text-base hover:bg-zinc-800 p-1 rounded-md transition-all duration-300 ease-in-out cursor-pointer'
                        onClick={handleLike}
                    >
                        { liked ? 
                        <Image
                            src='/liked.svg'
                            alt='liked icon'
                            width={24}
                            height={24}
                            className='invert'
                        />
                        :
                        <Image
                            src='/like.svg'
                            alt='like icon'
                            width={24}
                            height={24}
                            className='invert cursor-pointer'
                        />}
                        <p>{likesCount}</p>
                    </div>

                        <div className='flex gap-1 justify-center items-center text-gray-300 text-base hover:bg-zinc-800 p-1 rounded-md transition-all duration-300 ease-in-out'>
                            <Image
                                width={23}
                                src={'/reply.svg'}
                                height={23}
                                alt='reply'
                                className='invert'
                            />
                            <p className=''>
                                {replies ? replies.length : 0}
                            </p>
                        </div>
                </div>
                
                <div>
                        {
                            bookMarked ? 
                            <div className='hover:bg-zinc-700 w-10 py-1 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out'>
                                <Image
                                src="/bookmarked.svg"
                                alt='bookmarked icon'
                                height={24}
                                width={24}
                                className='invert cursor-pointer'
                                onClick={handleBookmark}
                                />
                            </div>
                            :
                            <div className='hover:bg-zinc-700 w-10 py-1 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out'>
                                <Image
                                src="/bookmark.svg"
                                alt='bookmark icon'
                                height={24}
                                width={24}
                                className='invert cursor-pointer'
                                onClick={handleBookmark}
                                />
                            </div>
                        }
                    </div>
            </section>
        </main>
    )
}
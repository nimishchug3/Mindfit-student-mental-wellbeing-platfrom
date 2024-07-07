import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavElements({ togglePost }) {
    return (
        <div className='flex flex-col gap-8  text-[17px] text-gray-100 '>
            <Link href={'/home'}>
                <span className=' relative'>
                <div className='flex gap-2 justify-start items-center cursor-pointer'>
                    <Image
                        src="/home.svg"
                        alt="home icon"
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <h2 className='hidden md:flex'>Home</h2>
                </div>
                </span>
            </Link>

            <Link href="/home/events">
                <span className=' relative'>
                <div className='flex gap-2 justify-start items-center cursor-pointer'>
                    <Image
                        src="/search.svg"
                        alt="search"
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <h2 className='hidden md:flex'>Events</h2>
                </div>
                </span>
            </Link>

            <Link href="/home/Messages">
                <span className=' relative  '>
                    <div className='flex gap-2 justify-start items-center cursor-pointer  '>
                        <Image
                            src="/chat.svg"
                            alt="chat icon"
                            height={29}
                            width={29}
                            className='invert'
                        />
                        <h2 className='hidden md:flex  '>Messages</h2>
                    </div>
                </span>
            </Link>

            <Link href='/home/leaderboard'>
            <span className=' relative  '>
                    <div className='flex gap-2 justify-start items-center cursor-pointer  '>
                        <Image
                            src="/chat.svg"
                            alt="chat icon"
                            height={29}
                            width={29}
                            className='invert'
                        />
                        <h2 className='hidden md:flex  '>Leaderboard</h2>
                    </div>
                </span>
            </Link>
            <span className=' relative'>
            <div className='flex gap-2 justify-start items-center cursor-pointer'>
                <Image
                    src="/notification.svg"
                    alt="alert icon"
                    height={29}
                    width={29}
                    className='invert'
                />
                <h2 className='hidden md:flex'>Alerts</h2>
            </div>
            </span>
            <Link href="/home/therapy">
                <span className=' relative'>
                <div className='flex gap-2 justify-start items-center cursor-pointer'>
                    <Image
                        src="/therapy.svg"
                        alt="settings icon"
                        height={29}
                        width={29}
                        className='invert'
                    />
                    <h2 className='hidden md:flex'>Therapy</h2>
                </div>
                </span>
            </Link>

            <span className=' flex justify-center'>
                <button
                    className='text-xl rounded-xl w-20 h-10 border hover:bg-slate-200 hover:text-black'
                    onClick={() => togglePost()}
                >
                    post
                </button>
            </span>
        </div>
    )
}
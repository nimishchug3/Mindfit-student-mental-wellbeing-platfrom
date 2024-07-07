import React from 'react';
import { karla, karma, kings } from '../fonts';
import NavElements from './navElements';
import Profile from './profile';
import Link from 'next/link';

export default function Sidenav({ togglePost }) {
    return (
        <div className='text-white h-full sm:min-w-24 justify-center xl:justify-start xl:min-w-64 border-r border-white flex flex-col gap-20 p-4'>
            <h1 className={` ${kings.className} text-2xl pl-4 pt-2 hidden md:flex`}>
                Mind Fit
            </h1>

            <div className='justify-center flex h-full'>
                <NavElements togglePost={togglePost}/>
            </div>

            <div className='flex flex-col items-center gap-4 pb-6'>
                <Link href={'/home/profile'}>
                    <Profile/>
                </Link>
                <button className={`border border-white text-gray-300  px-3 py-1 text-md rounded-2xl hover:bg-white hover:text-black ${karla.className}`}>
                    Logout
                </button>
            </div>
        </div>
    )
}
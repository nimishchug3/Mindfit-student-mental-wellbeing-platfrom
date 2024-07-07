'use client'
import { getUserData } from '@/actions';
import React, { useEffect } from 'react'



export default function Profile() {

    const [userData, setUserData] = React.useState({
        username: "",
        profilePic: "",
    });

    useEffect(()=>{
        const fetchUserData = async () => {
            const userInfo = await getUserData();
            if (!userInfo) {
                alert('error fetching user for profile');
            }
            
            setUserData({
                username: userInfo.username,
                profilePic: userInfo.profilePic
            })
        }    

        fetchUserData();
    }, [])

    return (
        <div className='flex gap-2 items-center'>
            <div>
                <img 
                    src={userData.profilePic}
                    alt="user profile"
                    width={40}
                    height={40}
                    className='rounded-2xl'
                />
            </div>
            
            <div className='flex flex-col'>
                <h2 className='text-base font-light'>{userData.username}</h2>
                <p className='text-sm text-gray-400'>your profile</p>
            </div>
        </div>
    )
}
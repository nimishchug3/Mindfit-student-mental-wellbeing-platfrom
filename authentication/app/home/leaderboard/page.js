'use client'
import { getLeaderList } from '@/actions';
import React, {useState, useEffect} from 'react';
import { karla } from '@/app/fonts';

export default function Leaderboard() {

    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        const getLeaderBoard = async () => {
            const response = await getLeaderList();

            if(!response) {
                alert("error loading the leader board");
            }
            setUserList(response);
        }

        getLeaderBoard();
    }, [])

    console.log(userList);

    const UserCard = ({ username, points, profilePic, rank }) => {
        return (
            <div className={`${karla.className} text-white text-2xl bg-zinc-900 flex justify-between max-w-[400px] p-5 rounded-2xl items-center relative`}>
                <div className='flex items-center gap-2 text-3xl'>
                    <div className='w-14 h-14 rounded-xl bg-zinc-900'>
                        <img
                            src={profilePic}
                            className='w-14 h-14 rounded-xl'
                        />
                    </div>
                    <div>
                        {username}
                    </div>
                </div>
                <div className='text-3xl'>
                    {points ? points : 0}
                </div>
                <div className='absolute -left-10'>
                    {rank}
                </div>
            </div>
        )
    }

    return(
        <div className='pl-20 w-full flex flex-col gap-4 pt-10'>
            { userList && 
                userList.map((user, index) => {
                    let rank = 0;
                    return (<UserCard
                        username = {user.username}
                        points = {user.points}
                        profilePic = {user.profilePic}
                        key={user._id}
                        rank = {++index}
                    />)
                }) 
            }
        </div>
    )
}
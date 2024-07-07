'use client'

import { getEventsForUser } from '@/actions';
import React, {useState, useEffect} from 'react'
import Link from 'next/link';

export default function YourEvents({ setSelected }) {

    const [event, setEvent] = useState([]);

    useEffect(()=>{
        const getAllTheEvents = async () => {
            const response = await getEventsForUser();
            if (!response) {
                alert("please try again later");
                return;
            }

            setEvent(response)
        }

        getAllTheEvents();
    })
    
    return (
        <div>
            <div
                onClick={()=>setSelected(0)}
                className='cursor-pointer'
            >
                back
            </div>
            <div className='pl-10 flex flex-col gap-4 mt-20'>
                { event && 
                    event.map((instance)=>{
                        return(
                            <Link href="/home/events">
                                <div className='text-2xl border-b max-w-[400px] pb-2 chat-hover relative'>
                                    {instance.name}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
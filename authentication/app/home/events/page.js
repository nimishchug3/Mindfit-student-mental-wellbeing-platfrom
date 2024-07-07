'use client'

import { getAllChallenges, getEvents } from "@/actions"
import { useEffect, useState } from "react"
import { karla } from "@/app/fonts"
import { apply } from "@/actions"

export default function Events() {

    const [events, setEvents] = useState([])

    const [selected, setSelected] = useState(1)

    const [challenges, setChallenges] = useState([]);

    useEffect(()=>{
        const getAllEvents = async () => {
            const response = await getEvents();
            
            if (!response) {
                alert("unalble to load events")
            }
            setEvents(response)
        }

        getAllEvents();
    },[])

    useEffect(()=>{
        const getAllChallengesAction = async () => {
            const response = await getAllChallenges()
            if (!response) {
                alert("unalbe to load challegnes");
                returnp
            }

            setChallenges(response)
        }

        getAllChallengesAction();
    }, [])

    console.log(events)

    const applyForEvent = async (id) => {
        const response = await apply(id);

        if (!response) {
            alert('try again later');
            return;
        }

        alert('applied successfully');
        return;
    }


    const Event = ({ date, description, location_src, name, owner, participants, id }) => {
        return (
            <div className={`${karla.className} text-slate-100 w-[800px] bg-zinc-900 rounded-2xl p-5`}>
                <div className="fixed opacity-40 backdrop-blur-xl top-0 flex text-2xl w-[600px] left-96 p-2 rounded-2xl">
                        <div className="h-10 w-[300px] flex justify-center items-center text-center relative">
                            <span className="chat-hover relative" onClick={()=>{setSelected(1)}}>Events</span>
                        </div>
                        <div className="h-10 w-[300px] flex justify-center items-center">
                            <span className="chat-hover relative" onClick={()=>{setSelected(2)}}> Challenges </span>
                        </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <div className="text-2xl">
                            { name }
                        </div>
                        <div className="text-gray-`400">
                            { owner }
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div>{ date }</div>
                        <div>
                            <button className="border w-[60px] h-[40px] rounded-xl hover:bg-slate-200 hover:text-black"
                                onClick={()=>{applyForEvent(id)}}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="max-w-[450px] text-slate-300">
                        { description}
                    </div>
                    {location_src && <div className="min-w-[200px] min-h-[150px] bg-gray-200 rounded-xl">
                        <iframe src={location_src} frameborder="0" allowfullscreen className="text-black"></iframe>
                    </div>}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 pl-20 overflow-auto max-h-screen pt-16">
            {selected === 1 && events && 
                events.map((event)=>{
                    return (<Event
                        description={event.description}
                        name={event.name}
                        location_src= {event.location_src}
                        owner={event.owner}
                        id = {event._id}
                        date={event.date}
                        participants={event.participants}
                        key={event._id}
                    />)
                })
            }

            { selected === 2 && challenges &&
                challenges.map((challenge) => {
                    return <Event
                        name={challenge.name}
                        date={challenge.date}
                    />
                })
            }
        </div>
    )
}


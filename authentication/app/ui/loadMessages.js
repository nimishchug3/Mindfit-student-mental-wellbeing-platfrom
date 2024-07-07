'use client'
import { getCompleteChat } from '@/actions';
import {useEffect, useState} from 'react'

export default function LoadMessages({ id, trigger }) {

    const [messages, setMessages] = useState();

    useEffect(()=>{
        const getAllMessages = async () => {
            const response = await getCompleteChat(id)
            if (!response) {
                alert("error loading the messages")
                return;
            }
            setMessages(response);
        }
        getAllMessages();
    }, [])

    useEffect(()=>{
        const getAllMessages = async () => {
            const response = await getCompleteChat(id)
            if (!response) {
                alert("error loading the messages")
                return;
            }
            setMessages(response);
        }
        getAllMessages();
    }, [id])


    useEffect(()=>{
        const getAllMessages = async () => {
            const response = await getCompleteChat(id)
            if (!response) {
                alert("error loading the messages")
                return;
            }
            setMessages(response);
        }
        getAllMessages();
    }, [trigger])

    const MessageCard = ({ content, otherid }) => {

        const sender = otherid === id;

        return (
            <div className={`flex items-center p-2 bg-zinc-700 text-xl text-white ${sender ? 'ml-10' : 'mr-10'} rounded-xl`}>
                {content}
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3 px-2 transition-all duration-200 ease-in-out pt-6'>
            {
                messages &&
                messages.map((message) => {
                    return <MessageCard content={message.message} otherid={message.receiverId} key={message._id}/>
                })
            }
        </div>
    )
}
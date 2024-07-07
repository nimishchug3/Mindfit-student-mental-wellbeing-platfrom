'use client'

import { getChatSidebar, sendMessage } from "@/actions";
import LoadMessages from "@/app/ui/loadMessages";
import MessageUserList from "@/app/ui/messageUserList";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function Messages() {

  const router = useRouter();

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('')
  const [message, setMessage] = useState('');

  let trigger = 0;



  const selectUser = (userId) => {
    setSelectedUser(userId)
  }

  const sendMessageToSelectedUser = async (receiverId) => {
    if (!message) return alert("message required");

    const response = await sendMessage(message, receiverId)

    if (!response) {
      alert("unalbe to send message");
      return;
    }

    trigger = trigger + 1;
    return;
  }

  console.log(trigger)
  
  useEffect(()=>{
    const getUserList = async () => {
      console.log("getting chat sidebar")
      const response = await getChatSidebar();
      if (!response) {
        alert("error getting users");
        return
      }

      setUserList(response)
    }

    getUserList();
  }, [])

  console.log(userList);
  console.log(selectedUser)

  return (
    <div className="min-w-[400px] pl-10 pt-10 flex flex-col gap-8 relative">
      { userList && 
        userList.map((user) => {
          return (
            <div
              key={user.id}
              onClick={()=>(selectUser(user._id))}
            ><MessageUserList username={user.username} profilePic={user.profilePic}/></div>
          )
        })
      }

      <div className={`fixed w-[450px] h-full bg-zinc-900 border-l border-r border-gray-800 right-10 top-0 ${selectedUser ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ease-in-out`}>
          <div className="relative h-full w-full">
            
            <div>
              {selectedUser && <LoadMessages id={selectedUser} trigger={trigger}/>}
            </div>

            <div className="absolute bottom-2 flex gap-2 w-full px-4">
              <input
                placeholder="message"
                className="bg-zinc-700 text-white h-10 pl-4 w-[320px] rounded-xl" 
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}} 
              />
              <div className="bg-zinc-700 w-10 h-10 rounded-xl flex justify-center items-center"
                onClick={()=>{sendMessageToSelectedUser(selectedUser)}}
              >
                <img
                  src="/send.svg"
                  width={30}
                  height={30}
                  className="invert"
                />
              </div>

              <div className="bg-zinc-700 w-10 h-10 rounded-xl flex justify-center items-center"
                onClick={()=>{router.push('/videoCall')}}             
              >
                <img
                  src="/video.svg"
                  width={30}
                  height={30}
                  className="invert"
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
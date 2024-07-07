'use client'
import React, { useEffect, useState } from 'react';
import { karla, karma } from '@/app/fonts';
import useImageHook from '@/app/imagehook';
import { changeProfilePic, getUserData } from '@/actions';
import { useRouter } from 'next/navigation';
import EditorCard from '@/app/ui/editorCard';
import Posts from '@/app/ui/posts/posts';
import Activity from '@/app/ui/activity/activity';
import Metric from '@/app/ui/metrics/metrics';

export default function ProfilePage() {

  const router = useRouter();

  const { handleImageChange, imgUrl, error, clearImage } = useImageHook();

  const [editorOpen, setEditorOpen] = useState(false)

  const [profilePicKey, setProfilePicKey] = useState(0);

  const [selectedTag, setSelectedTag] = useState(1)

  const [user, setUser] = React.useState({
    id: "",
    username: "",
    profilePic: "",
  })
  console.log(user)

  const handleSubmit = async () => {
    const response = await changeProfilePic(imgUrl);
    console.log(response)
    if (!response) {
      alert("error") 
      return
    }

    alert(response.message);

    setProfilePicKey(prevKey => prevKey + 1);
    return;
  };


  useEffect(()=>{
    const getUserDataAction = async () => {
      const response = await getUserData();
      if (!response) {
        alert("error")
        return
      }

      setUser({
        id: response._id,
        username: response.username,
        profilePic: response.profilePic,
      })
    }

    getUserDataAction();
    getUserDataAction();
  }, [profilePicKey])

  useEffect(()=>{
    const getUserDataAction = async () => {
      const response = await getUserData();
      if (!response) {
        alert("error")
        return
      }

      setUser({
        id: response._id,
        username: response.username,
        profilePic: response.profilePic,
      })
    }

    getUserDataAction();
  }, [])

  return (
    <div className='flex w-full justify-center'>
       <div className='text-white h-screen relative'>
        <section className='flex items-center gap-8 pt-10 border-b pb-10 border-gray-400'>
          <div className='min-w-40 max-w-40 min-h-40 max-h-40 rounded-full bg-gray-800'>
            { user.profilePic && <img
              key={profilePicKey}
              src={user.profilePic}
              alt="profile picture"
              height={160}
              width={160}
              className='rounded-full h-40'
            />}
          </div>
          <div className='flex gap-2 flex-col'>
            <h1 className={`text-4xl ${karma.className}`}>{user.username}</h1>
            <p className='max-w-[350px]'>
              this is my bio there and there, something in it what is the the
              best things{' '}
            </p>
          </div>
          <div>
            <button 
              className='border p-2 rounded-xl hover:bg-slate-200 hover:text-black'
              onClick={()=>{setEditorOpen(prev=> !prev)}}
            >Edit profile</button>
          </div>
        </section>
            
        <section className='flex justify-between'>
          <div 
            className={`w-full text-center hover:bg-zinc-900 cursor-pointer border-l border-r py-2 border-b text-[18px] ${karla.className} ${selectedTag === 1 ? 'bg-slate-200 text-black' : 'bg-zinc-950 text-white'}`}
            onClick={()=>{setSelectedTag(1)}}
          >
            Metrics
          </div>
          <div 
            className={`w-full text-center cursor-pointer border-l border-r py-2 border-b text-[18px] ${karla.className} ${selectedTag === 2 ? 'bg-slate-200 text-black' : 'bg-zinc-950 text-white'}`}
            onClick={()=>{setSelectedTag(2)}}  
          >
            Posts
          </div>
          <div 
            className={`w-full text-center cursor-pointer border-l border-r py-2 border-b text-[18px] ${karla.className} ${selectedTag === 3 ? 'bg-slate-200 text-black' : 'bg-zinc-950 text-white'}`}
            onClick={()=>{setSelectedTag(3)}}
          >
            Activity
          </div>
        </section>
        <div>
          {selectedTag === 1 && <Metric/>}
          {selectedTag === 2 && <Posts/>}
          {selectedTag === 3 && <Activity/>}         
        </div>
            
        { editorOpen && <div>
            <EditorCard 
              closeEditor={()=>{setEditorOpen(prev=>!prev)}}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
        </div>}
      </div>
    </div>
  );
}

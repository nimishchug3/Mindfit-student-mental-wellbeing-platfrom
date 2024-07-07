'use client'


export default function MessageUserList({ username, profilePic, speciality }) {
    
    return (
        <div className="flex items-center gap-2 text-white text-3xl border-b-[0.5px] pb-2 chat-hover relative cursor-pointer">  
            { profilePic && <div className="w-12 h-12 rounded-2xl bg-slate-600">
                <img
                    src={profilePic}
                    className="rounded-2xl"
                />
            </div>}
            <div>
                {username}
            </div>
            { speciality && <div className="text-xl pl-20 text-gray-400">
                {speciality}
            </div>}
        </div>
    )
}
'use client'
import { getPostByid, getAllRepliesForPost, reply } from "@/actions";
import PostCardWithoutLink from "@/app/ui/PostCardWIthoutLink";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Reply() {

    const params = useParams();

    const [post, setPost] = useState('')

    const [replies, setReplies] = useState([])

    const [replyContent, setReplyContent] = useState('');

    useEffect(()=>{
        const getPostAction = async () => {
            const response = await getPostByid(params.id) 
            
            if (!response) {
                alert("unable to laod post");
                return;
            }

            setPost(response);
        }

        const getAllReplies = async () => {
            const response = await getAllRepliesForPost(params.id) 
            
            if (!response) {
                alert("errors getting replies")
                return;
            }

            setReplies(response)
        }

        getPostAction();
        getAllReplies();
    }, [])

    console.log(replies)

    const sendReply = async () => {
        const response = await reply(params.id, replyContent);
        if(!response) {
            alert("unalbe to send reply");
            return;
        }
        alert('reply sent');
        setReplyContent('')
        return;
    }

    return (
        <div className="pl-40 w-full pt-10">
            { post && <div>
                <PostCardWithoutLink
                   content={post.content} 
                   likes={post.likesCount} 
                   username={post.user.username}
                   profile={post.user.profilePic}
                   replies={post.replies}
                   isLiked={post.isLiked}
                   id={post._id}
                   key={post._id}
                />
            </div>}
            <div className="mt-8 flex gap-20">
                <input
                    className="bg-black border-b w-80 focus:outline-none text-white"
                    placeholder="Reply"
                    value={replyContent}
                    onChange={(e)=>{setReplyContent(e.target.value)}}

                />

                <div className="text-white">
                    <button
                        className="p-2 rounded-2xl border hover:bg-slate-200 hover:text-black"
                        onClick={sendReply}
                    >
                        Send
                    </button>
                </div>
            </div>

            <div className="text-white mt-10 max-w-[520px] flex flex-col gap-5 items-end min-h-[470px] max-h-[470px] overflow-auto">
                { replies && 
                    replies.map((reply)=>{
                        return(
                            <div className="p-3 bg-zinc-90 min-w-[350px] max-w-[350px] bg-zinc-900 rounded-xl flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-xl">
                                    <img
                                        src={reply.user.profilePic}
                                        className="h-8 w-8 rounded-xl"
                                    />

                                    <span>{reply.user.username}</span>
                                </div>
                                {reply.content}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

'use client'
import { checkUserStatus, getAllPosts } from "@/actions"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import PostCard from "@/app/ui/postCard";

export default function Home(){

    const router = useRouter();

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const checkStatus = async ()=>{
            const userStatus = await checkUserStatus();
            if (!userStatus) router.push("/Login");

            return;
        }
        checkStatus();
        
        const getPostAction = async () => {
            const fetchedPosts = await getAllPosts();
            if (!fetchedPosts) {
                alert("unalbe to get posts")
            }
            setPosts(fetchedPosts)
        }
        getPostAction();
    },[])

    console.log(posts)

    return (
        <div className="text-white max-h-screen overflow-auto pr-10 w-full flex justify-center ">
            <div className="h-full overflow-auto pr-32">
                { posts &&
                    posts.reverse().map((post)=>{
                        return <PostCard 
                                content={post.content} 
                                likes={post.likesCount} 
                                replies={post.repliesCount}
                                username={post.user.username}
                                isLiked={post.isLiked}
                                id={post._id}
                                profile={post.user.profilePic}
                                key={post._id}
                            />
                        }
                    )
                }
            </div>
        </div>
    )
}
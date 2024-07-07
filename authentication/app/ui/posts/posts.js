'use client'
import React, {useEffect, useState} from 'react';
import PostCardWithoutLink from '../PostCardWIthoutLink';
import { getUserPosts } from '@/actions';

export default function Posts() {

    const [posts, setPosts] = useState();

    useEffect(()=>{
        const getUserPostsAction = async () => {
            const response = await getUserPosts()
            if (!response) {
                alert('unalbel to get response');
            }

            setPosts(response)
        }

        getUserPostsAction();
    }, []) 

    return (
        <div className='max-h-[550px] overflow-auto'>
            { posts &&
                posts.map((post)=>{
                    return (
                        <PostCardWithoutLink
                            content={post.content} 
                            likes={post.likesCount} 
                            replies={post.repliesCount}
                            username={post.user.username}
                            isLiked={post.isLiked}
                            id={post._id}
                            profile={post.user.profilePic}
                            key={post._id}
                        />
                    )
                })
            }
        </div>
    )
}
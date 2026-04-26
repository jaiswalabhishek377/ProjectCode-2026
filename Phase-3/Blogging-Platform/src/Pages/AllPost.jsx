import React, { useEffect, useState } from 'react'
import service from "../appwrite/conf"
import PostCard from '../components/PostCard'
import Container from '../components/Container/container'
function AllPost() {
    const [posts,setPosts] = useState([])
    useEffect(() => {
    service.getPosts([]).then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })
    },[])

  return (
    <div className='py-8 w-full block min-h-screen text-black'>
      <Container>
        <div className='flex flex-wrap -mx-2'>
            {posts.map((post) => (
                <div key={post.$id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4'>
                    <PostCard {...post} />
                </div>
        ))}
        </div>
        
      </Container>
    </div>
  )
}

export default AllPost
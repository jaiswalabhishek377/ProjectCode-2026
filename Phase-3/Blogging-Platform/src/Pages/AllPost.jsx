import React, { useEffect, useState } from 'react'
import service from "../appwrite/conf"
import PostCard from '../components/PostCard'
import Container from '../components/Container/container'
function AllPost() {
    const [posts,setPosts] = useState([])
    useEffect(() => {},[])

    service.getPosts([]).then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })

  return (
    <div className='py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
        ))}
        </div>
        
      </Container>
    </div>
  )
}

export default AllPost
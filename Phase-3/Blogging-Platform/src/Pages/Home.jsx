import React, {useState,useEffect} from 'react'
import Container from '../components/Container/container'
import service from '../appwrite/conf'
import PostCard from '../components/PostCard'

function Home() {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
    
    if(posts.length > 0){
        return (
            <div className=' w-full py-8'>
                <Container>
                    <div className='flex flex-wrap -mx-2'>
                        {posts.map((post) => (
                            <div key={post.$id} className='w-1/4 px-2 mb-4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    return (
    <div className="w-full py-8 mt-4 text-center">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        Login to read posts
                    </h1>
                </div>
            </div>
        </Container>
    </div>
    )
}

export default Home
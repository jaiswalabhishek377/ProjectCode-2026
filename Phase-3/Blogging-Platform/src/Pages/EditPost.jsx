import React, {useState,useEffect} from 'react'
import Container from '../components/Container/container'
import PostForm from '../components/Postform/PostForm'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import service from '../appwrite/conf'

function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.getPostBySlug(slug).then((post) => {
                if(post){
                    setPost(post)
                }else{
                    navigate("/")
                }
            })
        }
    },[slug,navigate])
  return (
    post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    ):null
  )
}

export default EditPost
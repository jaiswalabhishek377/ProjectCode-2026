import React from 'react'
import PostForm from '../components/Postform/PostForm'
import Container from '../components/Container/container'
function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost
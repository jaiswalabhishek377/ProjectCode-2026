import React from 'react'
import service from "../appwrite/conf"
import {Link} from "react-router-dom"

function PostCard({$id,title,featuredimgid,featuredImage}) {
  const imageId = featuredimgid || featuredImage || null;
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group'>
            <div className='w-full mb-4 relative aspect-video overflow-hidden rounded-xl bg-gray-100'>
                <img src={service.getFilePreview(imageId)} alt={title} className='object-cover w-full h-full absolute inset-0 transition-transform duration-500 group-hover:scale-105' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 line-clamp-2 leading-tight' >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
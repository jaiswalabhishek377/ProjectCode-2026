import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import RTE from '../RTE'
import service from '../../appwrite/conf'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useCallback } from 'react'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'




function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues : {
            title : post?.title || "",
            content : post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
            // featuredImage : post?.featuredImage || "",
            // category : post?.category || ""
        },
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData)
    const submit = async (data) => {
       if(post){
        const file = data.image[0] ? service.uploadFile(data.image[0]) : null

        if(file){
            service.deleteFile(post.featuredImage)
        }
        const dbPost = await service.updatePost(post.$id,{
            ...data,
            featuredimgid : file ? file.$id : undefined,
        })
        if(dbPost){
            navigate(`/post/${post.$id}`)
        }
        }else{
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
            if(file){
                const fileId= file.$id
                data.featuredimgid = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userid : userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
    if(!value) return ""
    return value
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
},[])

    useEffect(() => {
        const subscription = watch((value,{name,}) => {
            if(name === "title"){
                const slug = slugTransform(value.title)
                setValue("slug",slug)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}



export default PostForm
import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage, lazyload, placeholder} from '@cloudinary/react';
import PostEditForm from './PostEditForm';

const PostCard = ({post, onDelete, onEditPost}) => {
  const {currentUser} = useContext(UserContext)
  const [openEditForm, setOpenEditForm] = useState(false)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const handleDelete = () => {
    fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    }).then(()=> onDelete(post.id))
  }

  const handleEdit = () => {
    console.log("open edit form/overlay")
    setOpenEditForm(!openEditForm)
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {post.updated_at ? 
        <h2>Edited at {post.updated_at}</h2> :
        <h2>{post.post_date}</h2> 
      }
      <h3>{post.user.username}</h3>
      <p>{post.body}</p>
      <AdvancedImage cldImg={cld.image(post.photo)} plugins={[lazyload(), placeholder({mode: 'blur'})]}/>
      {currentUser.id === post.user.id ?
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
          {openEditForm ? <PostEditForm post={post} onEditPost={onEditPost} setOpenEditForm={setOpenEditForm} openEditForm={openEditForm}/> : null}
        </> :
          null
      }

    </div>
  )
}

export default PostCard

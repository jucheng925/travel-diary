import React from 'react'

const PostCard = ({post}) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.post_date}</h2>
      <h3>{post.user.username}</h3>
      <p>{post.body}</p>
      <p>Image</p>
    </div>
  )
}

export default PostCard

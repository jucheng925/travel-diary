import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { halftone16x16Orthogonal } from '@cloudinary/url-gen/qualifiers/dither'

const AllPosts = () => {
  const { currentUser } = useContext(UserContext)
  const myPosts = currentUser.posts
  console.log(myPosts)

  if (currentUser) {
    return (
      <div>
        All Posts
        {myPosts.map((post) => <h1 key={post.id}>{post.title}</h1>)}
      </div>
    )
  }}

export default AllPosts

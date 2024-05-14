import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'


const AllPosts = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <div>
      All Posts
      {currentUser.posts.map((post) => <h1 key={post.id}>{post.title}</h1>)}
    </div>
  )
  }

export default AllPosts
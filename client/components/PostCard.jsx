import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

const PostCard = ({post}) => {
  const {currentUser} = useContext(UserContext)
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.post_date}</h2>
      <h3>{post.user.username}</h3>
      <p>{post.body}</p>
      <p>Image</p>
      {currentUser.id === post.user.id ?
        <>
          <button>Delete</button>
          <button>Edit</button>
        </> :
          null
      }

    </div>
  )
}

export default PostCard

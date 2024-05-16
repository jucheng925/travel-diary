import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import PostCardSummary from './PostCardSummary'
import { Box, Stack } from '@mui/material'


const AllPosts = () => {
  const { currentUser } = useContext(UserContext)

  const displayPosts = currentUser.posts
  displayPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date))

  return (
    <Stack spacing={2} m={2} alignItems="center">
      <Box>
        Search and Filter
      </Box>
      {displayPosts.map((post) => (
      <PostCardSummary key={post.id} post={post}/>
      ))}
    </Stack>
  )
  }

export default AllPosts

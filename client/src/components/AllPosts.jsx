import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import PostCardSummary from './PostCardSummary'
import { Box, Stack } from '@mui/material'
import SearchBar from './SearchBar'


const AllPosts = () => {
  const { currentUser } = useContext(UserContext)
  const [displayPosts, setDisplayPosts] = useState(currentUser.posts)

  const sortedPosts =  currentUser.posts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date)) 

  const searchPosts = (term) =>{
    const searchPosts = sortedPosts?.filter(post => post.title.toLowerCase().includes(term.toLowerCase()) || 
                      post.body.toLowerCase().includes(term.toLowerCase()) ||
                      post.trip.country.toLowerCase().includes(term.toLowerCase()) ||
                      post.trip.city_state?.toLowerCase().includes(term.toLowerCase()))
    setDisplayPosts(searchPosts)
  }

  const filterRating = (rating)=> {
    const filteredPosts = sortedPosts.filter((post)=> {
      if (rating == "all") {
        return true
      } else {
        return (post.feeling_score === parseInt(rating))
      }
    })
    setDisplayPosts(filteredPosts)
  }

  return (
    <Stack spacing={2} m={2} alignItems="center">
      <Box>
        <SearchBar onSearch={searchPosts} filterRating={filterRating}/>
      </Box>
      {displayPosts.map((post) => (
      <PostCardSummary key={post.id} post={post}/>
      ))}
    </Stack>
  )
  }

export default AllPosts

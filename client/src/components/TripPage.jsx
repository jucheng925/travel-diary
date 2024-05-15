import React, {useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import PostCard from './PostCard';
import PostAddForm from './PostAddForm';
import { Box, Stack } from '@mui/material';
import TripInfoCard from './TripInfoCard';

const TripPage = () => {
  const params = useParams()
  const {currentUser, contextAddPost, contextDeletePost, contextEditPost} = useContext(UserContext)
  const [trip, setTrip] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showAddPost, setShowAddPost] = useState(false)

  
  useEffect(()=> {
    fetch(`/api/trips/${params.id}`)
    .then(resp=>resp.json())
    .then(data => {
      setTrip(data)
      setIsLoading(false)
    })
  }, [])

  const updateTripBack = (public_id) => {
    fetch(`/api/trips/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
         "Accept" : "application/json"
     },
     body: JSON.stringify({cover_image: public_id}),
     })
     .then(resp => resp.json())
     .then(data => setTrip(data))
    }

  const sortByDate = () => {
    let posts = trip.posts
    posts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date))
    return posts
  }

  const filterMyOffer = trip.offers ? trip.offers.filter((offer)=> offer.user_id == currentUser.id) : []


  const addPost = (newPost) => {
    contextAddPost(newPost)
    const updatedPosts = [...trip.posts, newPost]
    setTrip({...trip, posts: updatedPosts})

  }

  const deletePost = (deletePostId) => {
    contextDeletePost(deletePostId)
    const updatedPosts = trip.posts.filter((post) => post.id !== deletePostId)
    setTrip({...trip, posts: updatedPosts})
  }

  const editPost = (editPost) => {
    contextEditPost(editPost)
    const updatedPosts = trip.posts.map((post)=> {
      if (post.id === editPost.id) {
        return editPost
      } else {
        return post
      }
    })
    setTrip({...trip, posts: updatedPosts})
  }

  const OfferStatus = ({offer}) => {
    return (
      <div>
        <p>Collabaration Invite sent to {offer.recipient_email} {offer.status == "pending" ? "is" : "was"} {offer.status}</p>
      </div>
    )
  }
  
  return (
    <>
    {isLoading ? 
      <h1>Loading...</h1>
    : 
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <TripInfoCard trip={trip} updateTripBack={updateTripBack}/>


        <Box flex={8} p={2} bgcolor="lightcoral">
          <h3>All Posts for this Trip</h3>
          <button onClick={()=>setShowAddPost(!showAddPost)}>
            {showAddPost ? "Close Form" : "Create a new post"}
          </button>
          <div>
            {showAddPost ? <PostAddForm trip={trip} onAddPost={addPost}/> : null}
          </div>
          {sortByDate().map((post) => <PostCard key={post.id} post={post} onDelete={deletePost} onEditPost={editPost}/>)}
        </Box>

        {trip.public ? 
          <Box p={2} flex={1} bgcolor="pink" >
            <h2>Collaboration</h2>
            <Link to={"/trips/request"} state={{trip}}>Add another user</Link>
            <div>
              {filterMyOffer.map((offer) => <OfferStatus key ={offer.id} offer={offer}/>)}
            </div>
          </Box> :
          null}

      </Stack>
    }
    </>)
}

export default TripPage

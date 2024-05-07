import React, {useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import UploadWidget from './UploadWidget';
import PostCard from './PostCard';
import PostAddForm from './PostAddForm';

const TripPage = () => {
  const params = useParams()
  const [trip, setTrip] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showAddPost, setShowAddPost] = useState(false)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });
  
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

  const addPost = (newPost) => {
    const updatedPosts = [...trip.posts, newPost]
    setTrip({...trip, posts: updatedPosts})
  }

  const deletePost = (deletePostId) => {
    const updatedPosts = trip.posts.filter((post) => post.id !== deletePostId)
    setTrip({...trip, posts: updatedPosts})
  }

  const editPost = (editPost) => {
    const updatedPosts = trip.posts.map((post)=> {
      if (post.id === editPost.id) {
        return editPost
      } else {
        return post
      }
    })
    setTrip({...trip, posts: updatedPosts})
  }
  
  return (
    <>
    {isLoading ? 
      <h1>Loading...</h1>
    : 
      <>
        <div>
          <ul>{trip.country}</ul>
          <ul>{trip.city_state}</ul>
          <ul>{trip.vacation_type}</ul>
          {/* <AdvancedImage cldImg={cld.image(trip.cover_image)}/>

          <UploadWidget uploadPreset={'trip_cover'} onUpload={updateTripBack}/> */}
        </div>

        {trip.public ? 
          <div>
            <h2>Collaboration</h2>
            <Link to={"/trips/request"} state={{trip}}>Add another user</Link>
          </div> :
          null}

        <div>
          <h3>All Posts for this Trip</h3>
          <button onClick={()=>setShowAddPost(!showAddPost)}>
            {showAddPost ? "Close Form" : "Create a new post"}
          </button>
          <div>
            {showAddPost ? <PostAddForm trip={trip} onAddPost={addPost}/> : null}
          </div>
          {sortByDate().map((post) => <PostCard key={post.id} post={post} onDelete={deletePost} onEditPost={editPost}/>)}
        </div>
      </>
    }
    </>)
}

export default TripPage

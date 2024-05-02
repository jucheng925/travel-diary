import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import UploadWidget from './UploadWidget';
import PostCard from './PostCard';

const TripPage = () => {
  const params = useParams()
  const [trip, setTrip] = useState({})
  const [isLoading, setIsLoading] = useState(true)

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
    posts.sort((a, b) => a.post_date - b.post_date)
    console.log(posts)
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
          <AdvancedImage cldImg={cld.image(trip.cover_image)}/>

          <UploadWidget uploadPreset={'trip_cover'} updateBackEnd={updateTripBack}/>
        </div>

        <div>
          <h3>All Posts</h3>
          {sortByDate()}
          {trip.posts.map((post) => <PostCard key={post.id} post={post}/>)}
        </div>
      </>
    }
    </>)
}

export default TripPage

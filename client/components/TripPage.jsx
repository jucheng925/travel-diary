import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import UploadWidget from './UploadWidget';

const TripPage = () => {
  const params = useParams()
  const [trip, setTrip] = useState({})

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });
  
  useEffect(()=> {
    fetch(`/api/trips/${params.id}`)
    .then(resp=>resp.json())
    .then(data => setTrip(data))
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
  
  return (
    <>
      <div>
        <ul>{trip.country}</ul>
        <ul>{trip.city_state}</ul>
        <ul>{trip.vacation_type}</ul>
        <AdvancedImage cldImg={cld.image(trip.cover_image)}/>


        <UploadWidget uploadPreset={'trip_cover'} updateBackEnd={updateTripBack}/>

      </div>
      <div>
        {trip.posts}
      </div>
    </>
  )
}

export default TripPage

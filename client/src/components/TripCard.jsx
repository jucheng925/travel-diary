import { Cloudinary } from '@cloudinary/url-gen';
import { Card, CardMedia } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'wanderlog'
  }
});

const TripCard = ({attendance}) => {
  const trip = attendance.trip
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{height : 140}}
        image={cld.image(trip.cover_image).toURL()}
        title="trip"/>

      <Link to={`/trips/${trip.id}`}>
        <p>{trip.country}</p>
        <p>{attendance.start_date}</p>
        <p>{attendance.end_date}</p>
      </Link>

    </Card>
  )
}

export default TripCard

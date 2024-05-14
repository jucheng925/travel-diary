import { Cloudinary } from '@cloudinary/url-gen';
import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { StyledFont } from '../styled/styledcomponent';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'wanderlog'
  }
});

const tripImage = (trip) => {
  const selectSource = trip.cover_image ? trip.cover_image : "default_bw6tas"
  return cld.image(selectSource).toURL()
}

const TripCard = ({attendance}) => {
  const trip = attendance.trip
  return (
    <Card sx={{ maxWidth: 333, bgcolor: "success.main", boxShadow: 5 }}>
      <CardActionArea component={Link} to={`/trips/${trip.id}`}>
        <CardMedia
          sx={{height : 200}}
          component="img"
          image={tripImage(trip)}
          title="trip cover image"/>

        <CardContent>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            divider={<hr/>}
            >
            <StyledFont>{trip.country}, {trip.city_state}</StyledFont>
            <StyledFont>Start Date: {attendance.start_date}</StyledFont>
            <StyledFont>End Date: {attendance.end_date}</StyledFont>
            <StyledFont>{trip.public ? 'PUBLIC' : ""}</StyledFont>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TripCard

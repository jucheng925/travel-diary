import { Cloudinary } from '@cloudinary/url-gen';
import { Card, CardActionArea, CardContent, CardMedia, Stack } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
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
            spacing={1}
            divider={<hr/>}
            >
            <StyledFont><span style={{fontWeight:"bold"}}>Location:</span> <br/> {trip.country}{trip.city_state ? "," : ""} {trip.city_state}</StyledFont>
            <StyledFont><span style={{fontWeight:"bold"}}>Date Range:</span> <br/>{attendance.start_date} to {attendance.end_date}</StyledFont>
            <StyledFont><span style={{fontWeight:"bold"}}>{trip.public ? 'PUBLIC' : "PRIVATE"}</span> <br/> {trip.public ? <PublicIcon/> : <LockIcon/>}</StyledFont>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TripCard

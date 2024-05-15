import { Avatar, AvatarGroup, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledFont } from '../styled/styledcomponent'
import { AdvancedImage } from '@cloudinary/react'
import UploadWidget from './UploadWidget'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

const TripInfoCard = ({trip, updateTripBack}) => {
  const [usersAttend, setUsersAttend] = useState([])

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  useEffect(()=> {
    fetch(`/api/usersattendtrip/${trip.id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((users) => setUsersAttend(users));
      }
    });
  }, [])

  const avatarURL = (user) => cld.image(user.profile_pic).resize(thumbnail().width(50).height(50).zoom(0.85).gravity(focusOn(FocusOn.face()))).toURL()
  const avatarsArray = usersAttend.map((user) => {
    <Avatar key={user.id}
    alt={user.username}
    src={avatarURL(user)} 
    sx={{ bgcolor: '#97ead2'}}/>
  })


  return (
    <Box flex={4} position="sticky" bgcolor="skyblue" p={2} sx={{ display: { xs: "none", sm: "block" }}}>
      <StyledFont p={1} variant='h4'>{trip.city_state}, {trip.country} </StyledFont>
      <StyledFont p={1} variant="h6" >{trip.vacation_type}</StyledFont>
      <AdvancedImage cldImg={cld.image(trip.cover_image)}/>

      <div style={{padding: "5px 0"}}>
        <StyledFont>Edit Trip Cover Image: <UploadWidget uploadPreset={'trip_cover'} onUpload={updateTripBack}/></StyledFont>
      </div>

      <Box p={2} >
        {trip.public? 
        <Box>
          <AvatarGroup max={6} p={2} sx={{justifyContent: "center"}}>
            <StyledFont sx={{fontWeight: "bold"}}>**PUBLIC**</StyledFont>
            <StyledFont sx={{margin: "0 15px"}}>Contributors: </StyledFont>
              {usersAttend.map((user) => (
                <Avatar key={user.id}
                  alt={user.username}
                  src={avatarURL(user)} 
                  sx={{ bgcolor: '#97ead2'}}/>
              ))}
          </AvatarGroup>
        </Box> : <StyledFont sx={{fontWeight: "bold"}}>**PRIVATE**</StyledFont>}
      </Box>
    </Box>
  )
}

export default TripInfoCard

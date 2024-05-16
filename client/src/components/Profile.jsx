import React, { useContext } from 'react'
import EditProfile from './EditProfile'
import { UserContext } from '../context/UserContext'
import UploadWidget from './UploadWidget'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import { Box, Stack, Typography } from '@mui/material'


const Profile = () => {
  const {currentUser, updatedUser} = useContext(UserContext)
  
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const updateBackEnd = (publicId) => {
    const values = {profile_pic : publicId}
    updatedUser(values)
  }

  return (
    <Stack direction="row">
      <EditProfile />
      <Box flex={2} p={4}>
        <Typography color="secondary.main" variant='h4'> Current Avatar</Typography>
        <div>
          <AdvancedImage cldImg={cld.image(currentUser.profile_pic)}/> 
          <br/>
          <Typography color="secondary.main">Edit your avatar: </Typography>
          <UploadWidget onUpload={updateBackEnd} uploadPreset={'upload_profile'}/>
        </div>
      </Box>
    </Stack>
  )
}

export default Profile



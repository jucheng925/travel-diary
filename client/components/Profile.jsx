import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import { UserContext } from '../context/UserContext'
import UploadWidget from './UploadWidget'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';


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
    <div className='body'>
      <EditProfile />
      <div>
        <h3>Profile Pic</h3>
        <AdvancedImage cldImg={cld.image(currentUser.profile_pic)}/>
        
        {/* <UploadWidget onUpload={updateBackEnd} uploadPreset={'upload_profile'}/> */}
        {/* <button id="upload_widget" class="cloudinary-button">Edit profile pic</button> */}
      </div>
      <Link to="/"> Return to Home Page </Link>
    </div>
  )
}

export default Profile



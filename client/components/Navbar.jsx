import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Toolbar, AppBar, styled, Typography, Box, Avatar } from '@mui/material';
import "../styled/app.css"
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";


const Navbar = () => {
  const {currentUser, logout} = useContext(UserContext)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const AvatarPic = currentUser ? cld.image(currentUser.profile_pic).resize(thumbnail().width(50).height(50).zoom(0.85).gravity(focusOn(FocusOn.face()))) : null
  AvatarPic ? console.log(AvatarPic.toURL()): null
  const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent: "space-between"
  })

  const Icons = styled(Box)(({theme}) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    }
  }));

  const UserBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    }
  }));

  const activeState = ({isActive}) => {
    return {
      color: isActive ? "#97ead2" : "",
      fontWeight: isActive ? "bold" : "",
    }
  }

  
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant="h6">
          <NavLink to= "/" style = {activeState} className="nav-link">
            WanderLog
          </NavLink>
        </Typography>
        <Icons>
          {currentUser ? 
            <>
              <Avatar 
                alt={currentUser.username}
                src={AvatarPic.toURL()} />
                  
                {/* <AdvancedImage cldImg={AvatarPic} /> 
              </Avatar> */}
              <NavLink className="nav-link"to= "/profile/edit" style = {activeState}> 
                  Edit Profile
              </NavLink>
              <NavLink className="nav-link"to="/trips/add" style = {activeState}> 
                  Add a trip
              </NavLink>
              <NavLink to= "/logout" className="nav-link" onClick={logout} style = {activeState}>
                  Logout
              </NavLink>

            </>
            : null }
        </Icons>
        </StyledToolbar>
    </AppBar>
  )
}

export default Navbar

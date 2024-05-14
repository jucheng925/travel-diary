import React, {useContext, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Toolbar, AppBar, styled, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";


const Navbar = () => {
  const {currentUser, logout} = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const AvatarPic = currentUser ? cld.image(currentUser.profile_pic).resize(thumbnail().width(50).height(50).zoom(0.85).gravity(focusOn(FocusOn.face()))) : null

  const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent: "space-between",
    padding: "10px"
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
    <AppBar position='sticky' color='primary'>
      <StyledToolbar>
      <Typography variant="h6">
        <NavLink to= "/" style = {activeState} className="nav-link">
          WanderLog
        </NavLink>
      </Typography>
        {currentUser ? 
          <>
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
              <NavLink className="nav-link"to="/trips/add" style = {activeState}> 
                <AddLocationIcon fontSize='35px'/> Add a trip
              </NavLink>
            </Typography>
        <Icons>
            <Avatar 
              alt={currentUser.username}
              src={AvatarPic.toURL()} 
              sx={{ bgcolor: '#97ead2'}}/>
            <NavLink className="nav-link"to= "/profile/edit" style = {activeState}> 
                Edit Profile
            </NavLink>
            <NavLink to= "/logout" className="nav-link" onClick={logout} style = {activeState}>
              Logout
            </NavLink>
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar 
            alt={currentUser.username}
            src={AvatarPic.toURL()} 
            sx={{ bgcolor: '#97ead2' }}/>
          {currentUser.username}
        </UserBox>
            </>
            : null }
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <NavLink className="nav-link-small"to="/trips/add" > 
            Add a trip
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink className="nav-link-small"to= "/profile/edit"> 
            Edit Profile
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to= "/logout" className="nav-link-small" onClick={logout} >
              Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar

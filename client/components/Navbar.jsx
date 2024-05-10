import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Toolbar, AppBar } from '@mui/material';

const Navbar = () => {
  const {currentUser, logout} = useContext(UserContext)

  
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <NavLink to= "/" className="nav-link">
          Home
        </NavLink>
        {currentUser ? 
          <>
            <NavLink className="nav-link"to= "/profile/edit"> 
                Edit Profile
            </NavLink>
            <NavLink className="nav-link"to="/trips/add"> 
                Add a trip
            </NavLink>
            <NavLink to= "/logout" className="nav-link" onClick={logout}>
                Logout
            </NavLink>

          </>
          : null }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar

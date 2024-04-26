import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const {currentUser, logout} = useContext(UserContext)

  
  return (
    <nav>
      <NavLink to= "/" className="nav-link">
        Home
      </NavLink>
      {currentUser ? 
        <>
          <NavLink to= "/profile/edit">
            Edit Profile
          </NavLink>
          <NavLink to= "/logout" className="nav-link" onClick={logout}>
              Logout
          </NavLink>

        </>
        : null }
    </nav>
  )
}

export default Navbar

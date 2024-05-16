import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
  

  return (
    <Box>
      <Typography color="secondary.main" fontWeight="bold" fontSize={40} textAlign="center">
        Thank you for visiting Wanderlog!
      </Typography>
      <Typography fontWeight="bold" color="otherColor.light" fontSize={30} textAlign="center">
        <Link to="/"> Click to return Home </Link>
      </Typography>


    </Box>
  )
}

export default Logout

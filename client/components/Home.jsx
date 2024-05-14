import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { UserContext } from '../context/UserContext'
import TripCard from './TripCard'
import OfferStatus from './OfferStatus'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { ColorButton } from '../styled/button'


const Home = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <div className='home'>
      <Box
        sx={{ mx: 'auto', width: 500, my: 3,
        textAlign: 'center', fontWeight: '500', color:'#FFF7BA' }}>
        Wanderlog: An on-the-go travel diary where you can make a post or upload a picture on the fly. When going on a vacation, there are tons of memories to make. 
        Now you do not know to worry about remembering it all. Just make a post everyday.
      </Box>

      {currentUser ? 
        <Stack direction="column"
          bgcolor="primary.main"
          color="secondary.main"
          padding={2}
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={4}
          divider={<Divider flexItem sx={{borderColor: 'otherColor.main'}}/>}
          >

          <Typography fontWeight={"900"} fontSize={'2rem'}>
            Welcome, {currentUser.username}!
          </Typography>
          <OfferStatus/>
          <div>
            <Typography variant='h5' fontWeight={"500"} mb={2}>All Trips</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {currentUser.attendances.map((attendance)=> (
                <Grid item xs={2} sm={4} md={4} key={attendance.id}>
                  <TripCard attendance={attendance}/>
                </Grid>
              ))}
            </Grid>
          </div>
          <div>
            <Button variant='contained' color='secondary'>
              <Link className="link-styles" to={'/all'} >
                  See All Posts
              </Link>
              </Button>
          </div>
        </Stack>
      
          : <Login />}
    </div>
  )
}

export default Home

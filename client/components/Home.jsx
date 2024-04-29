import React, {useContext} from 'react'
import Login from './Login'
import { UserContext } from '../context/UserContext'
import TripCard from './TripCard'

const Home = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <div>
      <h1>Wanderlog</h1>

      {currentUser ? 
        <>
        <p><strong>Welcome, {currentUser.username}!</strong></p>
        <div>
          <h3>All Trips</h3>
          {currentUser.attendances.map((attendance)=> (
            <TripCard attendance={attendance}/>
          ))}
          <div>
            <p>All Trips</p>
          </div>
        </div>
        </>
          : <Login />}
    </div>
  )
}

export default Home

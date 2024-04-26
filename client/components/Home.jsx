import React, {useContext} from 'react'
import Login from './Login'
import { UserContext } from '../context/UserContext'

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
          {console.log(currentUser.attendances)}
          {currentUser.attendances.map((attendance)=> (
            <li>{attendance.trip.country}</li>
          ))}
        </div>
        </>
          : <Login />}
    </div>
  )
}

export default Home

import React from 'react'
import { Link } from 'react-router-dom'

const TripCard = ({attendance}) => {
  const trip = attendance.trip
  return (
    <div style={{backgroundColor:'lightblue'}}>
      <Link to={`/trips/${trip.id}`}>
        <p>{trip.country}</p>
        <p>{attendance.start_date}</p>
        <p>{attendance.end_date}</p>
      </Link>
    </div>
  )
}

export default TripCard

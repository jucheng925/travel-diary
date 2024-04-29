import React from 'react'

const TripCard = ({attendance}) => {
  const trip = attendance.trip
  console.log(trip)
  return (
    <div>
      <p>{trip.country}</p>
      <p>{attendance.start_date}</p>
      <p>{attendance.end_date}</p>
    </div>
  )
}

export default TripCard

import React from 'react'
import { useParams } from 'react-router-dom'

const TripPage = () => {
  const params = useParams()
  console.log(params.id)
  return (
    <div>
      Hello
    </div>
  )
}

export default TripPage

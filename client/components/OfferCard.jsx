import React from 'react'

const OfferCard = ({offer}) => {
  console.log(offer)
  return (
    <div>
      <p>{offer.user.username} is inviting you to collaborate on Trip to {offer.trip.country}, {offer.trip.city_state}. </p>
      <button>Accept</button>
      <button>Decline</button>
    </div>
  )
}

export default OfferCard

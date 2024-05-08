import React from 'react'

const OfferCard = ({offer}) => {
  console.log(offer)
  const handleDecline = () => {
    console.log("patch method to offer, changing status from pending to decline, use context")
  }

  return (
    <div>
      <p>{offer.user.username} is inviting you to collaborate on Trip to {offer.trip.country}, {offer.trip.city_state}. </p>
      <button>Accept</button>
      <button onClick={handleDecline}>Decline</button>
    </div>
  )
}

export default OfferCard

import React, {useState} from 'react'
import OfferAccept from './OfferAccept'


const OfferCard = ({offer, onUpdate}) => {
  const [showAccept, setShowAccept] = useState(false)

  const handleOfferChange = (status_change) => {
    fetch(`/api/offers/${offer.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
          "Accept" : "application/json"
      },
      body: JSON.stringify({status: status_change}),
      })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => onUpdate(data))
      }
    })
  }

  return (
    <div>
      <p>{offer.user.username} is inviting you to collaborate on Trip to {offer.trip.country}, {offer.trip.city_state}. </p>
      <button onClick = {()=>setShowAccept(!showAccept)}>Accept</button>
      {showAccept ? <OfferAccept offer={offer} handleOfferChange={handleOfferChange}/> : null}
      <button onClick={()=>handleOfferChange("declined")}>Decline</button>
    </div>
  )
}

export default OfferCard

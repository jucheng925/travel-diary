import React, { useEffect, useState } from 'react'
import OfferCard from './OfferCard'

const OfferStatus = () => {
  const [myOffers, setMyOffers] = useState([])
  const [showOffers, setShowOffers] = useState(false)

  useEffect(()=>{
    fetch('/api/checkMyOffers')
    .then((resp) => {
      if (resp.ok) {
        resp.json()
        .then((data) => setMyOffers(data));
      }
    })
  }, [])

  
  const updatedOffer = (offerObj) => {
    const newOffersList = myOffers.filter((offer) => offer.id !== offerObj.id)
    setMyOffers(newOffersList)
  }


  return (
    <div>
      <p>You have {myOffers.length} pending invitation. </p>
      {myOffers.length !== 0 ? <button onClick={()=>setShowOffers(!showOffers)}>View More Info</button> : null}
      <div>
        {showOffers ? 
          <>
            {myOffers.map((offer)=> <OfferCard key={offer.id} offer={offer} onUpdate={updatedOffer}/>)}
          </>
          : null}
      </div>
    </div>
  )
}

export default OfferStatus

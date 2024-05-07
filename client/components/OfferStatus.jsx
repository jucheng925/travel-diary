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
  return (
    <div>
      <p>You have {myOffers.length} pending invitation. </p>
      <button onClick={()=>setShowOffers(!showOffers)}>View More Info</button>
      <div>
        {showOffers ? 
          <>
            {myOffers.map((offer)=> <OfferCard id={offer.id} offer={offer}/>)}
          </>
          : null}
      </div>
    </div>
  )
}

export default OfferStatus

import React, { useEffect, useState } from 'react'
import OfferCard from './OfferCard'
import { Box, Stack, Typography } from '@mui/material'
import { ColorButton } from '../styled/styledcomponent'

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
    <Stack direction="row" spacing={4}>
      <Box>
        <Typography variant='subtitle1'>You have {myOffers.length} pending invitation(s).</Typography>
        {myOffers.length !== 0 ? 
          <ColorButton onClick={()=>setShowOffers(!showOffers)}>
            {showOffers ? "Hide invitation" : "View More Info"}
          </ColorButton> 
          : null}
      </Box>
      <Box>
        {showOffers ? 
          <Stack direction="row" spacing={1}>
            {myOffers.map((offer)=> <OfferCard key={offer.id} offer={offer} onUpdate={updatedOffer}/>)}
            </Stack>
          : null}
      </Box>
    </Stack>
  )
}

export default OfferStatus

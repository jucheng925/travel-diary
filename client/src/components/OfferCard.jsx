import React, {useState} from 'react'
import OfferAccept from './OfferAccept'
import { Box, Button, Typography } from '@mui/material'
import { SecondButton } from '../styled/styledcomponent'


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
    <Box>
      <Typography variant='subtitle1'>
        {offer.user.username} is inviting you to collaborate on <br/> the Trip to {offer.trip.country}, {offer.trip.city_state}.
      </Typography>
      <SecondButton onClick = {()=>setShowAccept(!showAccept)}>Accept</SecondButton>
      <SecondButton onClick={()=>handleOfferChange("declined")}>Decline</SecondButton>
      {showAccept ? <OfferAccept offer={offer} handleOfferChange={handleOfferChange}/> : null}
    </Box>
  )
}

export default OfferCard

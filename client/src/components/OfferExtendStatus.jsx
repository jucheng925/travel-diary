import { ListItem, ListItemText } from '@mui/material'
import React from 'react'

const OfferExtendStatus = ({offer}) => {
  return (
    <ListItem disablePadding>
        <ListItemText
        primary={offer.recipient_email}
        secondary={offer.status}
        />

        {/* <p>Collabaration Invite sent to {offer.recipient_email} {offer.status == "pending" ? "is" : "was"} {offer.status}</p> */}
    </ListItem>
  )
}

export default OfferExtendStatus

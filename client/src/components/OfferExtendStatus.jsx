import { ListItem, ListItemText } from '@mui/material'
import React from 'react'

const OfferExtendStatus = ({offer}) => {
  return (
    <ListItem disablePadding>
        <ListItemText
        primary={offer.recipient_email}
        secondary={offer.status}
        />

    </ListItem>
  )
}

export default OfferExtendStatus

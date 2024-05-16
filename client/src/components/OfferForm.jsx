import React, {useContext, useState} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { ColorButton} from '../styled/styledcomponent'
import { Typography } from '@mui/material'

const OfferForm = () => {
  const location = useLocation()
  const {trip} = location.state
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const [error, setError] = useState(null)


  const formSchema = yup.object().shape({
    recipient_email: yup.string().email('Please enter a valid email').required("Email is required")
  });

  const formik = useFormik({
    initialValues: {
      recipient_email: "",
      trip_id: trip.id,
      user_id: currentUser.id,
      status: "pending"
    },
    validationSchema: formSchema,
    onSubmit: submitform
  })

  function submitform(values) {
    fetch("/api/offers", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
         "Accept" : "application/json"
     },
     body: JSON.stringify(values),
     })
     .then(resp => {
       if (resp.ok) {
         resp.json().then(data => {
          setError(null)
          navigate(`/trips/${trip.id}`)
         })
       } else {
        resp.json().then((err)=> setError(err.error))
       }
    })
  }

  const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  return (
    <div className='body'>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant='h4' color="secondary.main" p={3} sx={{fontWeight: "bold", textAlign: "center"}}>Add an user to collaborate with 
            <br/> Trip {trip.country}, {trip.city_state} </Typography>
          <hr />
        <div className ='formcontainer'>
          <div>
            <label htmlFor="recipient_email"><strong> Recipient email:  </strong></label>
            <input type="text" id='recipient_email' value={formik.values.recipient_email} onChange={formik.handleChange} />
            {displayErrors(formik.errors.recipient_email)}
          </div>
          <ColorButton type="submit">Send a request</ColorButton>
          {displayErrors(error)}
        </div>
        <Typography variant='h6' p={2} sx={{textAlign: "center"}}>
          <Link to={`/trips/${trip.id}`} style={{color: '#3A2449'}}>Return to Previous Page</Link>
        </Typography> 
      </form>
    </div>
  )
}

export default OfferForm

import React, {useContext, useState} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import * as yup from 'yup'
import {useFormik} from 'formik'

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
        <h1>Add another user to collaborate</h1>
        <h2>Trip: {trip.country}, {trip.city_state}</h2>
        <div className ='formcontainer'>
          <hr />
          <div>
            <label htmlFor="recipient_email"><strong> Recipient email:  </strong></label>
            <input type="text" id='recipient_email' value={formik.values.recipient_email} onChange={formik.handleChange} />
            {displayErrors(formik.errors.recipient_email)}
          </div>
          <button type="submit">Send a request</button>
          {displayErrors(error)}
        </div>
      </form>
      <Link to={`/trips/${trip.id}`}>Return to Previous Page</Link>
    </div>
  )
}

export default OfferForm

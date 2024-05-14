import React, {useContext} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'

const OfferAccept = ({offer, handleOfferChange}) => {
  const {userAddedTrip} = useContext(UserContext)
  const offer_attendance = offer.trip.attendances.find(attendance => attendance.trip_id === offer.trip.id)

  const formSchema = yup.object().shape({
    start_date: yup.date(),
    end_date: yup.date().min(yup.ref('start_date'), "End date can not be before start date")
  })

  const formik = useFormik({
    initialValues: {
      start_date: offer_attendance.start_date,
      end_date: offer_attendance.end_date,
      trip_id: offer.trip.id
    },
    validationSchema: formSchema,
    onSubmit: submitform
  })

  function submitform(values) {
    fetch("/api/attendances", {
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
           userAddedTrip(data)
           handleOfferChange("accepted")
         })
       } 
    })

  }

  const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  

  return (
    <form onSubmit = {formik.handleSubmit}>
      <p>Do you want to edit your attendance for this trip? </p>
      <div className ='formcontainer'>
        <label htmlFor="start_date"><strong> Start Date:  </strong></label>
        <input type="date" id="start_date" value={formik.values.start_date} onChange={formik.handleChange} />
        {displayErrors(formik.errors.start_date)}

        <label htmlFor="end_date"><strong>Trip end date: </strong></label>
        <input type="date" id="end_date" value={formik.values.end_date} onChange={formik.handleChange} />
        {displayErrors(formik.errors.end_date)}
      </div>
      <button type="submit"> Accept invitation </button>
    </form>
    )
  }

export default OfferAccept

import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'

const TripAddForm = () => {
  const {userAddedTrip} = useContext(UserContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const formSchema = yup.object().shape({
    country: yup.string().required("Country is required"),
    city_state: yup.string(),
    vacation_type: yup.string().matches(/(Sightseeing|Cruises|Adventure|Culinary|Nature|RoadTrip|Family|Friends)/, { excludeEmptyString: true }),
    cover_image: yup.string(),
    public: yup.boolean(),
    start_date: yup.date(),
    end_date: yup.date().min(yup.ref('start_date'), "End date can not be before start date")
  });

  const formik = useFormik({
    initialValues: {
      country: "",
      city_state: "",
      vacation_type: "",
      cover_image: "",
      public: false,
      start_date: "",
      end_date: ""
    },
    validationSchema: formSchema,
    onSubmit: submitform
  });

  function submitform(values) {
    console.log(values)
    fetch("/api/trips", {
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
            navigate('/')
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
        <h1>Create a New Trip</h1>
        <div className='formcontainer'>
        <hr />
          <div>
            <label htmlFor="country"><strong>Trip Country: </strong></label>
            <input type="text" id="country" value={formik.values.country} onChange={formik.handleChange} />
            {displayErrors(formik.errors.country)}

            <label htmlFor="city_state"><strong>Trip City, State: </strong></label>
            <input type="text" id="city_state" value={formik.values.city_state} onChange={formik.handleChange} />
            {displayErrors(formik.errors.city_state)}

            <label htmlFor="vacation_type"><strong> Vacation Category: </strong></label>
            <select name="vacation_type" id="vacation_type" value={formik.values.vacation_type} onChange={formik.handleChange}>
              <option value=""> Select a vacation category</option>
              <option value="Sightseeing"> Sightseeing </option>
              <option value="Cruises"> Cruises </option>
              <option value="Adventure"> Adventure </option>
              <option value="Culinary"> Culinary </option>
              <option value="Nature"> Nature </option>
              <option value="Roadtrip"> Roadtrip </option>
              <option value="Family"> Family </option>
              <option value="Friends"> Friends </option>
            </select>
            {displayErrors(formik.errors.vacation_type)}
            

            {/* <UploadWidget uploadPreset={'add_post'} onUpload={createPreview}/>

            {uploadPic ? <AdvancedImage cldImg={cld.image(uploadPic) }/> : null} */}

            <label htmlFor="start_date"><strong>Trip start date: </strong></label>
            <input type="date" id="start_date" value={formik.values.start_date} onChange={formik.handleChange} />
            {displayErrors(formik.errors.start_date)}

            <label htmlFor="end_date"><strong>Trip end date: </strong></label>
            <input type="date" id="end_date" value={formik.values.end_date} onChange={formik.handleChange} />
            {displayErrors(formik.errors.end_date)}
            
            <p><strong>Public or Private?</strong></p>
            <input type="radio" className='radio name' name="public" id="Public" value="true" checked={formik.values.public == 'true'} onChange={formik.handleChange} />
            <label htmlFor="Public" className='radio'>Public</label>

            <input type="radio" className='radio name' name="public" id="Private" value="false" checked={formik.values.public == 'false'} onChange={formik.handleChange} />
            <label htmlFor="Private" className='radio'>Private</label>
          
            {displayErrors(formik.errors.public)}

            </div>
          <button type="submit">Add trip </button>
          {displayErrors(error)}

        </div>
      </form>
    </div>
  )
}


export default TripAddForm

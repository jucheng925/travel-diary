import React, {useContext, useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'

const TripAddForm = () => {
  const {currentUser} = useContext(UserContext)
  const [error, setError] = useState(null)

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
            
            {/* <div>
              <p>Select the vacation Category</p>
              <input type="radio" className='radio name' name="vacation_type" id="Sightseeing" value="Sightseeing" checked={formik.values.vacation_type == 'Sightseeing'} onChange={formik.handleChange} />
              <label htmlFor="Sightseeing" className='radio'>Sightseeing</label>

              <input type="radio" className='radio name' name="vacation_type" id="Cruises" value="Cruises" checked={formik.values.vacation_type == 'Cruises'} onChange={formik.handleChange} />
              <label htmlFor="Cruises" className='radio'>Cruises</label>

              <input type="radio" className='radio name' name="vacation_type" id="Adventure" value="Adventure" checked={formik.values.vacation_type == 'Adventure'} onChange={formik.handleChange} />
              <label htmlFor="Adventure" className='radio'>Adventure</label>

              <input type="radio" className='radio name' name="vacation_type" id="Culinary" value="Culinary" checked={formik.values.vacation_type == 'Culinary'} onChange={formik.handleChange} />
              <label htmlFor="Culinary" className='radio'>Culinary</label>

              <input type="radio" className='radio name' name="vacation_type" id="Nature" value="Nature" checked={formik.values.vacation_type == 'Nature'} onChange={formik.handleChange} />
              <label htmlFor="Nature" className='radio'>Nature</label>

              <input type="radio" className='radio name' name="vacation_type" id="RoadTrip" value="RoadTrip" checked={formik.values.vacation_type == 'RoadTrip'} onChange={formik.handleChange} />
              <label htmlFor="RoadTrip" className='radio'>RoadTrip</label>

              <input type="radio" className='radio name' name="vacation_type" id="Family" value="Family" checked={formik.values.vacation_type == 'Family'} onChange={formik.handleChange} />
              <label htmlFor="Family" className='radio'>Family</label>

              <input type="radio" className='radio name' name="vacation_type" id="Friends" value="Friends" checked={formik.values.vacation_type == 'Friends'} onChange={formik.handleChange} />
              <label htmlFor="Friends" className='radio'>Friends</label>
              {displayErrors(formik.errors.vacation_type)}
            </div> */}

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

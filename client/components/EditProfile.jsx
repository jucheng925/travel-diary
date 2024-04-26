import React, { useState, useContext } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'


const EditProfile = () => {
    const [error, setError] = useState(null)
    const {currentUser, updatedUser} = useContext(UserContext)

    const formSchema = yup.object().shape({
      username: yup.string().required("Username is required").max(15).min(3),
      email: yup.string().required("Email is required").email("Please provide a valid email")
    });
  
    const formik = useFormik({
      initialValues: {
        username: "",
        email: "",
      },
      validationSchema: formSchema,
      onSubmit: submitform
    })
  
    const checkBackendErrors = (data) => {
      if (data.error) {
              setError(data.error)
      }
    }
  
      function submitform(values) {
        setError(null)
        updatedUser(values, checkBackendErrors)
      }
  
      const displayErrors =(error) => {
          return error ? <p style={{color: "red"}}>{error}</p> : null
      }
  
    return (
      <div className='body'>
        <form onSubmit={formik.handleSubmit}>
          <h1>Edit Form</h1>
          <div className='formcontainer'>
              <hr />
              {displayErrors(error)}
              <div className='container'>
                  <h3>Current Username: {currentUser.username}</h3>
                  <label htmlFor='username'><strong>Change Username: </strong></label>
                  <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on'/>
                  {displayErrors(formik.errors.username)}
                  
                  <h3>Current Email: {currentUser.email}</h3>
                  <label htmlFor="email"><strong>Change Email: </strong></label>
                  <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} />
                  {displayErrors(formik.errors.email)}
              </div>
              <button type="submit">Edit Profile</button>
          </div>
        </form>
      </div>
    )
  }
  
  export default EditProfile
  
  
  
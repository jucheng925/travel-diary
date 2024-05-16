import React, { useState, useContext } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'
import { Box } from '@mui/material'
import { ColorButton } from '../styled/styledcomponent'


const EditProfile = () => {
  const [error, setError] = useState(null)
  const {currentUser, updatedUser} = useContext(UserContext)

  const formSchema = yup.object().shape({
    username: yup.string().max(15).min(3),
    email: yup.string().email("Please provide a valid email")
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
    let resultValues = {}
    for (let key in values) {
      if (values[key] !== "") {
        resultValues[key] = values[key]
      } else {
        resultValues[key] = currentUser[key]
      }
    }
    updatedUser(resultValues, checkBackendErrors)
      formik.resetForm()
    }
  
    const displayErrors =(error) => {
      return error ? <p style={{color: "red"}}>{error}</p> : null
    }
  
    return (
      <Box flex={4} p={4}>
        <form onSubmit={formik.handleSubmit} style={{width: "75%"}}>
          <h1>Edit Profile</h1>
          <div className='formcontainer'>
            <hr />
            <div className='container'>
              <h3>Current Username: {currentUser.username}</h3>
              <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on' placeholder='Enter a new username...'/>
              {displayErrors(formik.errors.username)}
                  
              <h3>Current Email: {currentUser.email}</h3>
              <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} placeholder='Enter a new email...' />
              {displayErrors(formik.errors.email)}
            </div>
            <ColorButton type="submit">Edit Profile</ColorButton>
            {displayErrors(error)}
          </div>
        </form>
      </Box>
    )
  }
  
  export default EditProfile
  
  
  
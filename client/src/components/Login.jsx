import React, {useContext, useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { ColorButton } from '../styled/styledcomponent'
import { Typography } from '@mui/material'


const Login = () => {
  const [error, setError] = useState(null)
  const {login} = useContext(UserContext)

  const formSchema = yup.object().shape({
      username: yup.string().required("Username is required").max(15).min(3),
      password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
      initialValues: {
          username: "",
          password: "",
      },
      validationSchema: formSchema,
      onSubmit: submitform
  })

  function submitform(values) {
      fetch("/api/login", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json",
              "Accept" : "application/json"
          },
          body: JSON.stringify(values),
      })
      .then((resp) => {
        if (resp.ok) {
            resp.json().then((data) => {
                login(data)
            })
        } else {
            resp.json().then((err)=>setError(err.error))
        }
      })
  }

  const displayErrors =(error) => {
      return error ? <p style={{color: "red"}}>{error}</p> : null
  }

return (

  <div className='body'>
    <form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div className='formcontainer'>
        <hr />
        <div className='container'>
            <label htmlFor='username'><strong>Username: </strong></label>
            <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on'/>
            {displayErrors(formik.errors.username)}
            <label htmlFor="password"><strong>Password:</strong></label>
            <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} autoComplete='new-password'/>
            {displayErrors(formik.errors.password)}
        </div>
        <ColorButton sx={{width: '100%'}} type="submit">Log In</ColorButton>
        {displayErrors(error)}
        </div>
        <Typography sx={{ paddingLeft: "50px", paddingBottom: "10px", color: "secondary.main" }}>
            Not a current user? <Link className='link-styles' to="/signup">  Signup</Link>
        </Typography>
    </form>
    </div>


)}

export default Login


import React, { useState, useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'


const Signup = () => {
    const [error, setError] = useState(null)
    const {login} = useContext(UserContext)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Username is required").max(15).min(3),
        password: yup.string().required("Password is required"),
        confirmpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        email: yup.string().required("Email is required").email("Please provide a valid email")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmpassword: "",
            email: "",
        },
        validationSchema: formSchema,
        onSubmit: submitform
    })

    const checkBackendErrors = (data) => {
        if (data.error) {
            setError(data.error)
        } else {
            login(data)
            navigate("/")
        }
    }

    function submitform(values) {
        setError(null)
        
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(resp => resp.json())
        .then(data => {
            checkBackendErrors(data)
        })

    }

    const displayErrors =(error) => {
        return error ? <p style={{color: "red"}}>{error}</p> : null
    }

  return (
    <div className='body'>
    <form onSubmit={formik.handleSubmit}>
    <h1>SignUp</h1>
    <div className='formcontainer'>
        <hr />
        {displayErrors(error)}
        <div className='container'>
            <label htmlFor='username'><strong>Username: </strong></label>
            <input type="text" id="username" value={formik.values.username} onChange={formik.handleChange} autoComplete='on'/>
            {displayErrors(formik.errors.username)}

            <label htmlFor="password"><strong>Password: </strong></label>
            <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} autoComplete='new-password'/>
            {displayErrors(formik.errors.password)}

            <label htmlFor="confirmpassword"><strong>Password Confirmation: </strong></label>
            <input type="password" id='confirmpassword' value={formik.values.confirmpassword} onChange={formik.handleChange} autoComplete='new-password'/>
            {displayErrors(formik.errors.confirmpassword)}

            <label htmlFor="email"><strong>Email: </strong></label>
            <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} />
            {displayErrors(formik.errors.email)}
        </div>
        
        <button type="submit">Sign Up</button>
    </div>
    </form>
    </div>
  )
}

export default Signup

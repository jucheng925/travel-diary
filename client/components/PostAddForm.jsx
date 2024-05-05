import React, {useContext, useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'
import UploadWidget from './UploadWidget'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';

const PostAddForm = ({trip, onAddPost}) => {
  const {currentUser} = useContext(UserContext)
  const [error, setError] = useState(null)
  const [uploadPic, setUploadPic] = useState("")

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'wanderlog'
    }
  });

  const formSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    body: yup.string().min(3).max(500),
    photo: yup.string(),
    feeling_score: yup.number().integer().min(0).max(10)
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      photo: "",
      feeling_score: 0,
      trip_id: trip.id,
      user_id: currentUser.id
    },
    validationSchema: formSchema,
    onSubmit: submitform
  });


  function submitform(values) {
    values = {...values, photo: uploadPic}

    fetch("/api/posts", {
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
            onAddPost(data)
            setUploadPic("")
            formik.resetForm()

          })
        } else {
          resp.json().then((err)=> setError(err.error))
        }
      })
    }
  
  const displayErrors =(error) => {
    return error ? <p style={{color: "red"}}>{error}</p> : null
  }

  const createPreview = (public_id) => {
    if (public_id) {
      console.log("Public id", public_id)
      setUploadPic(public_id)
    }
  }

  return (
    <div className='body'>
      <form onSubmit={formik.handleSubmit}>
        <h1>Create a New Post</h1>
        <div className='formcontainer'>
        <hr />
          <label htmlFor="title"><strong>Post title: </strong></label>
          <input type="text" id="title" value={formik.values.title} onChange={formik.handleChange} />
          {displayErrors(formik.errors.title)}

          <label htmlFor="body"><strong>Body: </strong></label>
          <input type="textarea" id="body" value={formik.values.body} onChange={formik.handleChange} />
          {displayErrors(formik.errors.body)}
          
          <label htmlFor="feeling_score"><strong>Post feeling_score: </strong></label>
          <input type="number" id="feeling_score" value={formik.values.feeling_score} onChange={formik.handleChange} />
          {displayErrors(formik.errors.feeling_score)}

          <UploadWidget uploadPreset={'add_post'} onUpload={createPreview}/>

          {uploadPic ? <AdvancedImage cldImg={cld.image(uploadPic) }/> : null}
          {/* <label htmlFor="photo"><strong>Post photo: </strong></label>
          <input type="text" id="photo" value={formik.values.photo} onChange={formik.handleChange} />
          {displayErrors(formik.errors.photo)} */}
          <br />

          <button type="submit">Add post </button>
          {displayErrors(error)}

        </div>
      </form>
    </div>
  )
}

export default PostAddForm

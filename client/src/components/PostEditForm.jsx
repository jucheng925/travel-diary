import React, {useContext, useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { UserContext } from '../context/UserContext'
import UploadWidget from './UploadWidget'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import { ColorButton } from '../styled/styledcomponent'

const PostEditForm = ({post, setOpenEditForm, openEditForm, onEditPost}) => {
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
    feeling_score: yup.number().integer().min(0).max(5)
  });

  const formik = useFormik({
    initialValues: {
      title: post.title,
      body: post.body,
      photo: post.photo,
      feeling_score: post.feeling_score,
    },
    validationSchema: formSchema,
    onSubmit: submitform
  });


  function submitform(values) {
    values = {...values, photo: uploadPic}
    fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
         "Content-Type" : "application/json",
          "Accept" : "application/json"
      },
      body: JSON.stringify(values),
      })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            onEditPost(data)
            setOpenEditForm(!openEditForm)
            setUploadPic("")
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
      setUploadPic(public_id)
    }
  }

  return (
    <div className='body'>
      <form onSubmit={formik.handleSubmit} style={{width:"75%"}}>
        <h1>Edit Post</h1>
        <div className='formcontainer'>
        <hr />
          <div>
            <label htmlFor="title"><strong>Post title: </strong></label>
            <input type="text" id="title" value={formik.values.title} onChange={formik.handleChange} />
            {displayErrors(formik.errors.title)}

            <label htmlFor="body"><strong>Body: </strong></label>
            <textarea id="body" cols="55" rows="5" value={formik.values.body} onChange={formik.handleChange} />
            {displayErrors(formik.errors.body)}
            
            <label htmlFor="feeling_score"><strong>Post feeling_score: </strong></label>
            <input type="number" id="feeling_score" value={formik.values.feeling_score} onChange={formik.handleChange} />
            {displayErrors(formik.errors.feeling_score)}

            {uploadPic ? <AdvancedImage cldImg={cld.image(uploadPic) }/> : <AdvancedImage cldImg={cld.image(post.photo)}/>}
            
            <UploadWidget uploadPreset={'add_post'} onUpload={createPreview} />

          </div>
          <ColorButton sx={{m: "10px"}} type="submit">Edit post </ColorButton>
          <ColorButton sx={{m: "10px"}} onClick={()=>setOpenEditForm(!openEditForm)}>Close Form</ColorButton>
          {displayErrors(error)}

        </div>
      </form>
    </div>
  )
}

export default PostEditForm

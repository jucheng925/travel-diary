import React, {useEffect, useRef} from 'react'

const UploadWidget = ({onUpload, uploadPreset}) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'wanderlog',
      uploadPreset: uploadPreset,
      sources: ['local', 'url', 'camera']
    }, (error, result) => {
      onUpload(result.info.public_id)})
  }, [])

  return (
    <button onClick={(e)=> {
      e.preventDefault()
      widgetRef.current.open()
      }}>
      Upload Picture
    </button>
  )
}

export default UploadWidget

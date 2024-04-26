import React, {useEffect, useRef} from 'react'

const UploadWidget = ({updateBackEnd}) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'wanderlog',
      uploadPreset: 'upload_profile'
    }, (error, result) => updateBackEnd(result.info.public_id))
  }, [])

  return (
    <button onClick={()=> widgetRef.current.open()}>
      Upload new Profile Pic
    </button>
  )
}

export default UploadWidget

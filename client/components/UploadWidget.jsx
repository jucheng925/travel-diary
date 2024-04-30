import React, {useEffect, useRef} from 'react'

const UploadWidget = ({updateBackEnd, uploadPreset}) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'wanderlog',
      uploadPreset: uploadPreset,
    }, (error, result) => updateBackEnd(result.info.public_id))
  }, [])

  return (
    <button onClick={()=> widgetRef.current.open()}>
      Upload Picture
    </button>
  )
}

export default UploadWidget

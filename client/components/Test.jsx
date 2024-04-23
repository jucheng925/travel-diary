import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

const Test = () => {
  const {currentUser} = useContext(UserContext)

  return (
    <div>
      {currentUser}
    </div>
  )
}

export default Test

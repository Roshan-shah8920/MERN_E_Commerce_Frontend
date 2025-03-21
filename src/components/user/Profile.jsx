import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'


const Profile = () => {
  const {user} = useContext(AppContext)
  return (
    <>
    <div className="container text-center my-5">
      <h1>welcome {user?.name}</h1>
      <h4>{user?.email}</h4>
    </div>
    </>
  )
}

export default Profile
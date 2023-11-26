import React from 'react'
import Header from '../Header'
import ProfilePage from '../ProfilePage'
import './Layout.css'

function ProfileLayout() {
  return (
    <div className='home_layout'>
        <Header />
        <ProfilePage />
    </div>
  )
}

export default ProfileLayout
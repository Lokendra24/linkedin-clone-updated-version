import React from 'react'
import Home from '../Home'
import Header from '../Header'
import './Layout.css'

function HomeLayout() {
  return (
    <div className='home_layout' >
        <Header />
        <Home />
    </div>
  )
}

export default HomeLayout
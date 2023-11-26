import React from 'react'
import './Layout.css'
import Header from '../Header'
import Connections from '../Connections'


function ConnectionLayout() {
  return (
    <div className='home_layout' >
        <Header />
        <Connections />
    </div>
  )
}

export default ConnectionLayout
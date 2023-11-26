import React, { useEffect, useState } from 'react'
import '../Css/Connections.css'
import {  getAllUserDataForConnection, getCurrentUser } from '../firebase/firebase'

import ConnectionCard from './ConnectionCard';

function Connections() {
    const [currentUser,setCurrentUser]=useState()
    const [usersData,getUsersData]=useState([])
    
    useEffect(()=>{
          getAllUserDataForConnection(getUsersData)
          getCurrentUser(setCurrentUser)
    },[])

    
  return (
    <div  className='conn_container' >
        <div className='conn_card_container' >
          {
           usersData.map((element)=> 
           <ConnectionCard 
             key={element.id}
             element={element} 
             currentUser={currentUser}
             />)   
          }
        </div>
    </div>
  )
}

export default Connections
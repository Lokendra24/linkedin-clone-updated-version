import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function Protected(props) {
    const {Component,path}=props

    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    
    useEffect(()=>{
      onAuthStateChanged(auth, async (res)=>{ 

       const login= JSON.parse(localStorage.getItem('loginStatus'))

        if(!login)  //here we can also use res?.accessToken to verified user login or not but i am using context api state here
        {
          setLoading(false)
          navigate('/') 
        }
        else if(login)
         {
          setLoading(false)
          navigate(`/${path}`)
        }
      })
    },[])
   
  return (
    <div style={{width:"100%"}} >
       {loading ? <CircularProgress sx={{marginLeft:'50%',marginTop:'30%'}} /> : <Component />}
    </div>
  )
}

export default Protected
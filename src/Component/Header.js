import React, { useEffect, useState } from 'react'

import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import '../Css/Header.css'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, getAllUsersData, getUserProfileData } from '../firebase/firebase';
import Search from './Search';

function Header() {

  const navigate=useNavigate()

  const mainUserEmail=JSON.parse(localStorage.getItem('email'))
  const [userData,setUserData]=useState([])
  const [fullSearchBars,setFullSearchBar]=useState(false)

  const [allUsersData,setAllUsersData]=useState([])
  const [inputCss,setInputCss]=useState(false)
  const [open,setOpen]=useState(false)

  const HandleProfileClick= ()=>{
      if(open)
       setOpen(false)
      else
       setOpen(true)
  }

  const HandleLogout= async()=>{

     localStorage.setItem('loginStatus',JSON.stringify(false))

     try {
      signOut(auth)
      navigate('/')
      setOpen(false)
     } catch (error) {
      console.log('An error accurs',error)
     }

  }

  const HandleProfile=()=>{
      localStorage.setItem('localemail',userData.email)  
      navigate('/profile')
      setOpen(false)
  }

  useEffect(()=>{
    getUserProfileData(mainUserEmail,setUserData) 
    getAllUsersData(setAllUsersData)
  },[])
    // console.log(mainUserEmail)
  return (
    <div className='header_container' >
      <div className='header_first' >
         <img src='https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png' alt=''/>
         <div className='input_container' >
           <Search  
            setInputCss={setInputCss} 
            allUsersData={allUsersData} 
            fullSearchBars={fullSearchBars}
            setFullSearchBar={setFullSearchBar}
             />
         </div>
      </div>
      {
      !fullSearchBars &&
      <div className='header_second' >
        <div onClick={()=>navigate('/home')} >
         <HomeIcon fontSize='medium' sx={{opacity:"0.7",cursor:"pointer"}} />
         <p>Home</p>
        </div>
        <div onClick={()=>navigate('/connections')} >
         <PeopleAltIcon fontSize='medium' sx={{opacity:"0.7",cursor:"pointer"}} />
         <p>My Networks</p>       
        </div>
        <div>
         <WorkIcon fontSize='medium' sx={{opacity:"0.7",cursor:"pointer"}} />
         <p>Jobs</p>
        </div>
        <div>
         <TextsmsOutlinedIcon fontSize='medium' sx={{opacity:"0.7",cursor:"pointer"}} />
         <p>Messaging</p>
        </div>
        <div>
         <NotificationsActiveOutlinedIcon fontSize='medium' sx={{opacity:"0.7",cursor:"pointer"}} />
         <p>Notifications</p>
        </div>
        <div className='user_profile' >
         <div onClick={HandleProfileClick} >
          <img src={userData.userimage} alt='user' />
         </div>
         {
          open &&
          <div className='profile_div' >
            <span>
             <p>{userData.username}</p>
             <p>{userData.Headline}</p>
            </span>
            <div>
             <p onClick={HandleProfile} >View Profile</p>
             <p onClick={HandleLogout} >Logout</p>
            </div>
          </div>
         }
        </div>
      </div>}
    </div>
  )
}

export default Header
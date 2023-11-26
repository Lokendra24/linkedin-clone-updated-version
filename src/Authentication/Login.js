import React, { Fragment, useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

import { Alert,IconButton, LinearProgress, Snackbar } from '@mui/material'
import { CloseSharp } from '@mui/icons-material'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'

function Login() {
  const navigate=useNavigate()

  const [open, setOpen] = useState(false);
  const [errorMassage,setErrorMassage]=useState('Enter Wrong Email or Password !')

  const [loading,setLoading]=useState(false)

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const HandleEmailChange = (e) => {
    setInput({ ...input, email: e.target.value });
  };
  
  const HandlePassChange = (e) => {
    setInput({ ...input, password: e.target.value });
  };
  
  const HandleSubmit = async (e) => {
    e.preventDefault();

    if(input.email==='' && input.password==='')
     { 
      setErrorMassage('Please Enter Email or Password !')
      handleClick()
      return
    }
        
    try {

      setLoading(true)

      const user= await signInWithEmailAndPassword( auth, input.email, input.password );
      console.log(user)
      
      localStorage.setItem('loginStatus', JSON.stringify(true));  
      localStorage.setItem('username', JSON.stringify(user.user.displayName));
      localStorage.setItem('email', JSON.stringify(input.email));  

      navigate('/home')
      
    } catch (error) {
      
      console.log("en error accurs", error);
      setErrorMassage('Enter Wrong Email or Password !')
      handleClick()
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(()=>{
    localStorage.setItem('loginStatus', JSON.stringify(false)); 
  },[])

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseSharp fontSize="small" />
      </IconButton>
    </Fragment>
  );

  console.log(errorMassage)

  return (
    <>
    {
      !loading ?
      (<div className='signin_container' >
        <img src='https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png' alt=''/>
        <h4>Sign in</h4>
        <p>Stay updated on your professional world</p>
        <form className='signin_form' onSubmit={HandleSubmit} >
           <input type='email' placeholder='Email or Phone' onChange={HandleEmailChange} />
           <input type='password' placeholder='Password' onChange={HandlePassChange} />
           <input type='submit' value={'Sign In'} />
        </form>
        <hr className='hr_text' data-content='or' />
        <p>New to LinkedIn?<span onClick={()=>navigate('/signup')}> Join now</span></p>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
         <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMassage}
         </Alert>
      </Snackbar>
    </div>):
    (
      <div className='home_loader' >
        <img src='https://seeklogo.com/images/L/linkedin-logo-1F483B3A8B-seeklogo.com.png' alt='' />
        <LinearProgress className='linear_progress' />
      </div>
    )
    }
    </>
  )
}

export default Login
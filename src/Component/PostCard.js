import React, { useEffect, useState } from 'react'
import '../Css/Postcard.css'
import { useNavigate } from 'react-router-dom'
import LikeButton from './Common/LikeButton'
import { db, getCurrentPostUser, removePost, updatePostData } from '../firebase/firebase'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

import { CloseOutlined } from '@mui/icons-material'
import CircularWithValueLabel from './CircularProgress/CircularProgress'
import { uploadPostImage } from '../UploadImage/UploadImage'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { doc, updateDoc } from 'firebase/firestore'


function PostCard({element,userId,userName,currUserEmail,setDeletePost}) {

  const navigate=useNavigate()
  const [PostUserImage,setPostUserImage]=useState({})

  const [open, setOpen] = useState(false);
  const [imageOpen,setImageOpen]=useState(false)
  const [updatedValue,setUpdatedValue]=useState(element?.message)

  const [getupdatedImage, setGetUpatededImage] = useState(element?.postimage);
  const [progress,setProgress]=useState(0);


  const HandleDeletePost=()=>{
      removePost(element.id)
      setDeletePost(true)
  }

  const EditPostOnClick=()=>{
    updatePostData(element.id,updatedValue)  // this function is used for message update
    updateDoc(doc(db,'posts',element.id),{postimage:getupdatedImage}) // this fucntion is used for image update

    setOpen(false)
  }

  const HandleFileChange=(e)=>{
    const file=e.target.files[0]
    uploadPostImage(file,setGetUpatededImage,setProgress,element.id)
    setProgress(0)
}


  useEffect(()=>{
    getCurrentPostUser(setPostUserImage,element.email)  
    // this is for findding cuurent post posted user image
  },[element.email])


  return (
    <div className="single_post" >
         <div>
           <div className='userdetail_div' >
            <img src={PostUserImage} alt='' />
            <span>
               <p onClick={()=>{navigate('/profile');localStorage.setItem('localemail',element.email)}} >{element.username}</p>
               <p>{element.date}</p>
             </span>
             <div className='edit_delete_container' >
                {
                  currUserEmail === element?.email &&
                  <div onClick={()=>setOpen(true)} >
                    <EditIcon sx={{cursor:'pointer'}} />
                 </div>
                 }
                <div onClick={HandleDeletePost} >
                 <DeleteForeverIcon sx={{cursor:'pointer'}} />
                </div>
             </div>
            </div>
           {
            element?.postimage ?
            (
            <div onClick={()=>setImageOpen(true)} >
              <img src={getupdatedImage} alt=''/>
            </div>
            ) : (
              <div style={{height:"0"}} >
                
              </div>
            )

           } 
           
           <div dangerouslySetInnerHTML={{__html:element.message}} ></div>

         </div>  
         <div>
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <div className="dailog" >
              <DialogTitle>Create a post</DialogTitle>
              <div onClick={()=>setOpen(false)} ><CloseOutlined className="close_icon" /></div> 
            </div>
         <DialogContent className="dialog_content" >
            <ReactQuill 
              theme="snow"
              placeholder="Share Something Usefull"
              value={updatedValue} 
              onChange={setUpdatedValue} 
            />  
           
           { <img src={getupdatedImage} alt=""/>}
           {(progress>0 && progress<100) && <CircularWithValueLabel value={progress} />}

         </DialogContent>
          <DialogActions className="dialogactions" > 
            <label htmlFor="upload-post-image" >
               <img src={require('../Assets/uploadicon.jpg')} alt=""/>
             </label> 
            <input type="file" id="upload-post-image" onChange={HandleFileChange} />
            <Button onClick={EditPostOnClick} disabled={updatedValue?.length>0 ? false : true} >Update Post</Button>
          </DialogActions>
        </Dialog>

      {/* Image popup on click modal */}
         
      <Dialog
        open={imageOpen}
        onClose={()=>setImageOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions id="alert-dialog-title">
          <div  onClick={()=>setImageOpen(false)} ><CloseOutlined /></div>
        </DialogActions>
        <DialogContent className='popu_modal_image' >
          <img src={getupdatedImage} alt=''/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setImageOpen(false)} >
            Close
          </Button>
        </DialogActions>
      </Dialog>

    {/* like functionality container */}

      </div> 
         <div className='singlepost_like' >
            <LikeButton element={element} userId={userId} userName={userName}/>
         </div> 
    </div>
  )
}

export default PostCard
import React, { useEffect, useState } from "react";
import "../Css/PostUpdate.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import moment from "moment/moment";
import { addDoc, collection } from "firebase/firestore";
import { db, getConnectedUserData, getCurrentUser } from "../firebase/firebase";
import PostCard from "./PostCard";

import { uploadPostImage } from "../UploadImage/UploadImage";
import CircularWithValueLabel from "./CircularProgress/CircularProgress";

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

function PostUpdate() {
  const [open, setOpen] = useState(false);
  const [posts,setPosts]=useState([])
  const [inputValue,setInputValue]=useState('')
  const [currentUser,setCurrentUser]=useState()
  const [deletePost,setDeletePost]=useState(false)

  const [getUploadedImage, setGetUploadedImage] = useState(null);
  const [progress,setProgress]=useState(0);

  const currentDate=moment().format('LLL')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const PostOnClick = () => {
    const username=JSON.parse(localStorage.getItem('username'))
    const email=JSON.parse(localStorage.getItem('email'))
     addDoc(collection(db,'posts'),{
         date:currentDate,
         message:inputValue,
         username:username,
         email:email,
         postimage:getUploadedImage
    })
    setGetUploadedImage(null);
    setProgress(0)
    setOpen(false);
    setInputValue('')
    // getAllUserPostData(setPosts)
  };

  const HandleFileChange=(e)=>{
      const file=e?.target?.files[0]
      uploadPostImage(file,setGetUploadedImage,setProgress)
  }

  useEffect(()=>{
    // getAllUserPostData(setPosts)    // this is for all user post data 
    getConnectedUserData(setPosts)    // this shows data of users which is connected to you from connection page
    getCurrentUser(setCurrentUser)

    if(deletePost === true)
     setDeletePost(false)

  },[open,deletePost])

  // console.log(posts.length,deletePost)

  return (
    <div className="pu_container">
      <div className="profile_container">
        <img
          src={currentUser?.userimage}
          alt=""
        />
        <p>{currentUser?.username}</p>
        <p>{currentUser?.Headline}</p>
      </div>
      <div className="post_container">
        <img
          src={currentUser?.userimage}
          alt=""
        />
        <input type="text" placeholder="start a post" onClick={handleClickOpen} />
      </div>
      <div>
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <div className="dailog" >
              <DialogTitle>Create a post</DialogTitle>
              <div onClick={()=>{setOpen(false);setGetUploadedImage();setProgress(0)}} ><CloseOutlined className="close_icon" /></div> 
            </div>
          <DialogContent className="dialog_content" >
          <ReactQuill 
              theme="snow"
              placeholder="Share Something Usefull"
              value={inputValue} 
              onChange={setInputValue} 
            /> 
           {progress===100 && <img src={getUploadedImage} alt=""/>}
           {(progress>0 && progress<100) && <CircularWithValueLabel value={progress} />}
          </DialogContent>
          <DialogActions className="dialogactions" > 
             <label htmlFor="upload-post-image" >
               <img src={require('../Assets/uploadicon.jpg')} alt=""/>
             </label> 
            <input type="file" id="upload-post-image" onChange={HandleFileChange} />
            <Button onClick={PostOnClick} disabled={inputValue?.length>0 ? false : true} >Post</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="posted_container">
      {
        posts.map((element,index)=> 
        <PostCard 
          key={element?.id} 
          element={element} 
          userId={currentUser?.id} 
          userName={currentUser?.username} 
          currUserEmail={currentUser?.email}
          setDeletePost={setDeletePost}
          />
        )
      }
      </div>
    </div>
  );
}

export default PostUpdate;

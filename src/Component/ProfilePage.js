import React, { useEffect, useState } from "react";
import "../Css/Profilepage.css";
import { CloseOutlined, Edit } from "@mui/icons-material";

import EditProfile from "./EditProfile/EditProfile";
import PostCard from "./PostCard";
import {
  getCurrentUser,
  getSingleUserPostData,
  getUserProfileData,
} from "../firebase/firebase";
import {
  uploadImage as uploadImageAPI,
} from "../UploadImage/UploadImage";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CircularWithValueLabel from "./CircularProgress/CircularProgress";

function ProfilePage() {

  const mainUserEmail = JSON.parse(localStorage.getItem("email"));
  const otherUserEmail = localStorage.getItem("localemail");

  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [uploadImage, setUploadImage] = useState(null);
  const [getUploadedImage, setGetUploadedImage] = useState();
  const [progress,setProgress]=useState(0);
  const [open, setOpen] = useState(false);

  const HandleEdit = () => {
    if (edit) setEdit(false);
    else setEdit(true);
  };

  const HandleUplaodChange = (e) => {
    setUploadImage(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  const HandleUpload = () => {
    uploadImageAPI(uploadImage, setGetUploadedImage,setProgress);
  };

  useEffect(() => {
    getUserProfileData(otherUserEmail, setUserData);
    getSingleUserPostData(otherUserEmail, setPosts);
    getCurrentUser(setCurrentUser);
  }, []);

  // console.log('uploadImage')
  return (
    <div className="profilepage_container">
      {!edit ? (
        <div className="profilepage_main_container">
          <div className="profilepage_content_container">
            <div className="profile_banner">
              <img
                src="https://i.pinimg.com/1200x/98/4e/0e/984e0ed881c73755d4614b338c998b76.jpg"
                alt=""
              />
              <img
                src={ userData.userimage }
                alt="profileimage"
                onClick={()=>setOpen(true)}
              />
              {
                <Dialog
                  open={open}
                  onClose={()=>setOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {/* <DialogContentText>Add a Profile Image</DialogContentText> */}
                    <DialogActions onClick={()=>setOpen(false)} >
                      <CloseOutlined sx={{cursor:"pointer"}} />
                    </DialogActions>
                  </DialogTitle>
                  <DialogContent className="dialog_input" >
                    <p>{uploadImage?.name}</p>
                    <label htmlFor="alert-dialog-description" className="btn" >Add Image</label>
                    <input type="file" id="alert-dialog-description" onChange={HandleUplaodChange} />
                    {progress>0 && <CircularWithValueLabel value={progress} />}
                  </DialogContent>
                  <DialogActions className="btn_actions" >
                    {
                      progress === 100 ?
                      (
                        <Button onClick={()=>{setProgress(0);setUploadImage(null);setOpen(false)}} variant="contained" >
                          close
                        </Button> 
                      ):
                      (
                        uploadImage === null ?
                           <Button onClick={HandleUpload} variant="contained" disabled > Upload Profile Picture
                           </Button> 
                           :
                          <Button onClick={HandleUpload} variant="contained" >
                            Upload Profile Picture
                          </Button>
                      )
                    }
                  </DialogActions>
                </Dialog>
              }
            </div>
            <div>
              {mainUserEmail === otherUserEmail && (
                <div onClick={HandleEdit}>
                  <Edit className="edit_icon" />
                </div>
              )}
            </div>
            <div className="profile_details_container">
              <div className="pd_first">
                <p>{userData.username}</p>
                <p>{userData.Headline}</p>
                <p>
                  {userData.City}, {userData.Country}
                </p>
                <p>
                  500+ connections, more info goto{" "}
                  <a href={userData.Website}>{userData.Website}</a>
                </p>
              </div>
              <div className="pd_second">
                <p>{userData.Company}</p>
                <p>{userData.College}</p>
              </div>
            </div>
          </div>
          <div className="profilepage_posts">
            {posts.map((element, index) => (
              <PostCard
                key={element?.id} 
                element={element}
                userId={currentUser?.id}
                userName={currentUser?.username}
                currUserEmail={currentUser?.email}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="profilepage_edit_conatiner">
          <div>
            <div className="close_icon" onClick={HandleEdit}>
              <CloseOutlined className="edit_icon" />
            </div>
          </div>
          <EditProfile setEdit={setEdit} userData={userData} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

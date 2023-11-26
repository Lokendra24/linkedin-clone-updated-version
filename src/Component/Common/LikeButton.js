import React, { useEffect, useState } from 'react'
import './Css/Likebutton.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';

import { addUserComment, getUserComments, getUserLikes, likePost } from '../../firebase/firebase';
import { Divider } from '@mui/material';

import moment from "moment/moment";


function LikeButton({element,userId,userName}) {

    let postId=element.id
    const [likeCount,setLikeCount]=useState(0)
    const [liked,setLiked]=useState(false)
    const [showCommentBox,setShowCommentBox]=useState(false)
    const [addComment,setAddComment]=useState('')
    const [comments,setComments]=useState([])
    
    const currentDate=moment().format('LLL')
    
    const HandleClick=()=>{
      if(liked)
      {
        likePost(liked,postId,userId)
        setLiked(false)
      }
      else
      {
        likePost(liked,postId,userId)
        setLiked(true)
      }
}

const HandelCommentBox=()=>{
  if(showCommentBox)
   setShowCommentBox(false)
  else
   setShowCommentBox(true)
}

  const HandleComment=()=>{
      addUserComment(addComment,userId,postId,currentDate,userName)
      setAddComment('')
  }

useEffect(()=>{
  getUserLikes(userId,postId,setLikeCount,setLiked)
  getUserComments(setComments,postId)
},[liked])

  //  console.log('first')

  return (
    <div className='like_container' >
      <p>{likeCount} people Like this post</p>
      <Divider />
      <div className='like_container_content' >
        <div onClick={HandleClick} >
            { !liked && <ThumbUpOffAltIcon className='like_icon' />}
            { liked && <ThumbUpIcon className='like_icon' />}
            <p>Like</p>
        </div>
        <div onClick={HandelCommentBox} >
          <CommentIcon sx={{cursor:"pointer"}} />
        </div>
      </div>  
      {
     
      showCommentBox &&
       <div className='coment_input_cntainer' >
         <input type='text' placeholder='Add a comment' onChange={(e)=>setAddComment(e.target.value)} value={addComment} />
         <button onClick={HandleComment} >Add Comment</button>
    
          <div className='comment_box_container' >
            {comments.map((comment,index)=> 
              <div  key={index} className='comment_box' >
                <div>
                  <p>{comment.username}</p>
                  <p>{comment.currentdate}</p>
                </div>
                <p >{comment.comment}</p>
              </div>
            )}
         </div>
        </div>
      }
    </div>
  )
}

export default LikeButton
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, setDoc, updateDoc, where}  from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgEwAiLIoP-42pnuzA2viqa-mr6Lb9M4s",
  authDomain: "linkedin-clone-d9ab3.firebaseapp.com",
  projectId: "linkedin-clone-d9ab3",
  storageBucket: "linkedin-clone-d9ab3.appspot.com",
  messagingSenderId: "806797512349",
  appId: "1:806797512349:web:c2dbae4bf8c73a40d44e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)


export const updateUserData = async (userData)=>{

  const getemail=localStorage.getItem(('email'))
  const q=query(collection(db,'users'),where("email", "==",JSON.parse(getemail)))

//update user profile data  
  onSnapshot(q,(querySnapshot)=>{
    querySnapshot.docs.forEach( async (docSnapshot)=>{
      const docRef = doc(db, "users", docSnapshot.id);
      await updateDoc(docRef,userData);  
    })
  })

// update post data as well  
console.log(userData.username)
   if(userData.username)
   {
     const qq=query(collection(db,'posts'),where("email", "==",JSON.parse(getemail)))
     onSnapshot(qq,(querySnapshot)=>{
       querySnapshot.docs.forEach( async (docSnapshot)=>{
         const docRef = doc(db, "posts", docSnapshot.id);
         await updateDoc(docRef,{username:userData.username});  
       })
     })
   }
}  

export const getUserProfileData = (email,setUserData)=>{

  const q=query(collection(db,'users'),where("email", "==",email))

  onSnapshot(q, (querySnapshot) => {
    
    querySnapshot.forEach((doc) => {
      setUserData(doc.data())
    });
    
  });
}

export const getAllUserPostData = (setPosts)=>{

    const q=query(collection(db,'posts'))
    onSnapshot(q,(querySnapshot)=>{
      setPosts([])
      querySnapshot.forEach((docSnapshot)=>{
        const data={...docSnapshot.data(),id:docSnapshot.id}
        // console.log(data)
        setPosts((prev)=>[...prev,data])
      })
    })    
}

export const getSingleUserPostData = (email,setPosts)=>{
  
  const q=query(collection(db,'posts'),where("email", "==",email))
  onSnapshot(q,(querySnapshot)=>{
    setPosts([])  // ** if you not use this then same keys error occur
    querySnapshot.forEach((docSnapshot)=>{
      const data={...docSnapshot.data(),id:docSnapshot.id}
      setPosts((prev)=>[...prev,data])
    })
  })
  
}
export const getSingleUserPostData1 = (email,setPosts)=>{

  const q=query(collection(db,'posts'),where("email", "==",email))
  onSnapshot(q,(querySnapshot)=>{
    // setPosts([])  // ** if you not use this then same keys error occur
    querySnapshot.forEach((docSnapshot)=>{
      const data={...docSnapshot.data(),id:docSnapshot.id}
      setPosts((prev)=>[...prev,data])
    })
  })

}

export const getAllUsersData=(setAllUsersData)=>{
  
  const q=query(collection(db,'users'))
  onSnapshot(q,(querySnapshot)=>{
    setAllUsersData([])
       querySnapshot.forEach((docSnapshot)=>{
            const data={...docSnapshot.data(),id:docSnapshot.id}
            setAllUsersData((prev)=>[...prev,data])
       })
  })
}

export const getCurrentUser=(setCurrentUser)=>{
    
   const getemail=localStorage.getItem('email')
   const q=query(collection(db,'users'),where('email','==',JSON.parse(getemail)))

   onSnapshot(q,(querySnapshot)=>{
     querySnapshot.forEach((docSnapshot)=>{
      setCurrentUser({...docSnapshot.data(),id:docSnapshot.id})
     })
   })
}

export const getAllUserDataForConnection=(getUsersData)=>{

  const getemail=localStorage.getItem('email')
  const q=query(collection(db,'users'),where('email','!=',JSON.parse(getemail)))

  onSnapshot(q,(querySnapshot)=>{
    getUsersData([])
    querySnapshot.forEach((docSnapshot)=>{
       const data={...docSnapshot.data(),id:docSnapshot.id}
       getUsersData((prev)=>[...prev,data])
    })
  })

}

export const getRestDataForConnections=(currentUser,setIsConnected,targetuserid)=>{

        const q=query(collection(db,'connections'))

        onSnapshot(q,(querySnapshot)=>{
         let connectData=querySnapshot.docs.map((docSnapshot)=> docSnapshot.data() )

         let currentuser= connectData.some((data)=> (data.currentuser === currentUser.id) && (data.targetuser === targetuserid) )

         if(currentuser)
          setIsConnected(true)
        })     
}

export const addConnection=(element,currentUser)=>{

  const targetuser=element.id
  const currentuser=currentUser.id

  const collectionData={
    targetuser:element.id,
    targetuseremail:element.email,
    currentuser:currentUser.id,

  }

  setDoc(doc(db,'connections',`${targetuser}_${currentuser}`),collectionData)
    
}


export const getConnectedUserData=(setConnectedUserData)=>{

  const currentUser=(data)=>{

    const q=query(collection(db,'connections'),where('currentuser','==',data.id))   
    onSnapshot(q,(querySnapshot)=>{
      
       // add fresh data before every render of function
       setConnectedUserData([])

        // adding current user posts
        getSingleUserPostData(data.email,setConnectedUserData)
        
        querySnapshot.forEach((docSnapshot)=>{
        // add connected user posts
        getSingleUserPostData1(docSnapshot.data().targetuseremail,setConnectedUserData)
      })
     })

    }

    getCurrentUser(currentUser)  
}


export const getCurrentPostUser=(setPostUserImage,email)=>{

  const q=query(collection(db,'users'),where('email','==',email))
  onSnapshot(q,(querySnapshot)=>{
    querySnapshot.forEach((docSnapshot)=>{
      setPostUserImage(docSnapshot.data().userimage)
    })
  })

}

export const likePost=  (liked,postId,userId)=>{

    try {
      let docToLike = doc(collection(db,'likes'), `${userId}_${postId}`);
      if (liked) {
        deleteDoc(docToLike);
      } else {
        setDoc(docToLike, { userid:userId, postid:postId });
      }
    } catch (err) {
      console.log(err);
    }
}

export const getUserLikes= async (userId,postId,setLikeCount,setLiked)=>{

  try {

    let likeQuery = query(collection(db,'likes'), where("postid", "==", postId));
    
    onSnapshot(likeQuery, (response) => {
    let likes = response.docs.map((doc) => doc.data());
    let likesCount = likes?.length;

    likes.forEach((like)=>{
      if(like.userid === userId)
       setLiked(true)
    })

    setLikeCount(likesCount);
  });
} catch (err) {
  console.log(err);
}
   
}

export const addUserComment= async (addComment,userId,postId,currentDate,userName)=>{

  try {
   await addDoc(collection(db,'comments'),{
    comment:addComment,
    userid:userId,
    postid:postId,
    currentdate:currentDate,
    username:userName
  })
  } catch (error) {
    console.log('an error accured',error)
  }
     
}

export const getUserComments=(setComments,postId)=>{
  const q=query(collection(db,'comments'),where('postid','==',postId))
  onSnapshot(q,(querySnapshot)=>{
    setComments([])
      querySnapshot.forEach((docSnapshot)=>{
        setComments((prev)=> [...prev,docSnapshot.data()])
      })
  })
}

export const removePost=(postid)=>{
    const docRef=doc(db,'posts',postid)
    deleteDoc(docRef)
}

export const updatePostData=(postid,updatedData)=>{
    const docRef=doc(db,'posts',postid)
    updateDoc(docRef,{message:updatedData})
}

import { ref, uploadBytesResumable , getDownloadURL} from "firebase/storage";
import { storage, updateUserData } from "../firebase/firebase";
// import { doc, updateDoc } from "firebase/firestore";

export const uploadImage=(file,setGetUploadedImage,setProgress)=>{

    const storageRef= ref(storage,`image/${file?.name}`)
    const uploadTask= uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed',(snapshot)=>{
       const progress= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
       setProgress(progress)
       console.log(progress)
    },
    (error)=>{
        console.log(error)
    },
    ()=>{
        getDownloadURL(uploadTask?.snapshot?.ref)
         .then((downloadUrl)=>{
            setGetUploadedImage(downloadUrl)
            const profileImage={userimage:downloadUrl}
            updateUserData(profileImage)
            console.log(downloadUrl)
         })
    }
    )
}

export const uploadPostImage=(file,setGetUploadedImage,setProgress,postid)=>{

    const storageRef= ref(storage,`postimage/${file?.name}`)
    const uploadTask= uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed',(snapshot)=>{
       const progress= Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
       setProgress(progress)
       console.log(progress)
    },
    (error)=>{
        console.log(error)
    },
    ()=>{
        getDownloadURL(uploadTask?.snapshot?.ref)
         .then((downloadUrl)=>{
            setGetUploadedImage(downloadUrl)
            console.log(downloadUrl)
         })
    }
    )
}

// export const downloadUploadedImage=()=>{
//     const downloadRef=ref(storage,'gs://linkedin-clone-d9ab3.appspot.com/image/Untitled design.png')

//     getDownloadURL(downloadRef)
//      .then((url)=>{
//         console.log(url)
//      })
// }
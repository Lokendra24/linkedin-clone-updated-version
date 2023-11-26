import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const HandleNameChange = (e) => {
    setInput({ ...input, name: e.target.value });
  };

  const HandleEmailChange = (e) => {
    setInput({ ...input, email: e.target.value });
  };

  const HandlePassChange = (e) => {
    setInput({ ...input, password: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
        
       const user=await createUserWithEmailAndPassword( auth, input.email, input.password );

       await updateProfile(auth.currentUser,{
        displayName:input.name
       })
       console.log(user)

       await addDoc(collection(db,'users'),{
        username:user.user.displayName,
        email:input.email,
        userimage:'https://firebasestorage.googleapis.com/v0/b/linkedin-clone-d9ab3.appspot.com/o/image%2Fdummyprofile.png?alt=media&token=1d910d5f-5657-4185-aa78-fe7a78a89a41'
       })

       localStorage.setItem('username', JSON.stringify(user.user.displayName)); 
       localStorage.setItem('email', JSON.stringify(input.email)); 
  
       setInput({name:'',email:'',password:''})
       navigate('/')

    } catch (error) {

      console.log("en error accurs", error);
    }
  };

  return (
    <div className="signup_container">
      <img
        src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
        alt=""
      />
      <h4>Make the most of your professional life</h4>
      <form className="signup_form" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={input.name}
          onChange={HandleNameChange}
          pattern={`^[A-Za-z]{3,16}$`}
          required
        />
        <input
          type="email"
          placeholder="Email or Phone"
          value={input.email}
          onChange={HandleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={HandlePassChange}
          required
        />
        <input type="submit" value={"Sign Up"} />
      </form>
      <hr className="hr_text" data-content="or" />
      <p>
        Already on LinkedIn?<span onClick={() => navigate("/")}> Sign in</span>
      </p>
    </div>
  );
}

export default Signup;

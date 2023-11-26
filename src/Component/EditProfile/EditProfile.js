import React, { useState } from "react";
import InputForm from "./InputForm";
import "./Css/EditProfile.css";

import { updateUserData } from "../../firebase/firebase";

function EditProfile({setEdit, userData:data}) {

  const [userData, setUserData] = useState(data);

  const HandleSubmit = (e) => {
    e.preventDefault();

    if(userData.username)    
      localStorage.setItem('username',JSON.stringify(userData.username))
    
    updateUserData( userData)    
    setEdit(false)

  };
  console.log(userData)
  return (
    <div>
      <form className="form_container" onSubmit={HandleSubmit}>
        <InputForm
          type="text"
          label="Name"
          placeholder="Name"
          name="username"
          userData={userData}
          value={userData.username || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="Headline"
          placeholder="Headline"
          name="Headline"
          userData={userData}
          value={userData.Headline || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="Country"
          placeholder="Country"
          name="Country"
          value={userData.Country || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="City"
          placeholder="City"
          name="City"
          value={userData.City || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="Company"
          placeholder="Company"
          name="Company"
          value={userData.Company || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="Industry"
          placeholder="Industry"
          name="Industry"
          value={userData.Industry || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="College"
          placeholder="College"
          name="College"
          value={userData.College || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="Website"
          placeholder="Website"
          name="Website"
          value={userData.Website || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="About"
          placeholder="About"
          name="About"
          value={userData.About || ''}
          setUserData={setUserData}
        />
        <InputForm
          type="text"
          label="Skills"
          placeholder="Skills"
          name="Skills"
          value={userData.Skills || ''}
          setUserData={setUserData}
        />
        <span>
          <input type="submit" value={"Save"} />
        </span>
      </form>
    </div>
  );
}

export default EditProfile;

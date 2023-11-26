import React, { useEffect, useState } from "react";
import '../Css/Connections.css'

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { addConnection, getRestDataForConnections } from '../firebase/firebase'


function ConnectionCard({element,currentUser}) {

    const targetuserid=element.id
    const [isConnected,setIsConnected]=useState(false)

    const HandleConnectionClick=()=>{
        addConnection(element,currentUser)
        getRestDataForConnections(currentUser,setIsConnected,targetuserid)
    }

    useEffect(()=>{
      getRestDataForConnections(currentUser,setIsConnected,targetuserid)
      },[])

  return (
    <>

    {
     !isConnected &&   
    <div className="conn_card" key={element.id}>
      <img src={element.userimage} alt="" />
      <p>{element.username}</p>
      <p>{element.Headline}</p>
      <button onClick={HandleConnectionClick}>
        <GroupAddIcon /> Connect
      </button>
    </div>
    }
    </>
  );
}

export default ConnectionCard;

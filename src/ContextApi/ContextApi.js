import React, { createContext, useState } from 'react'

const userContext=createContext()

function ContextApi(props) {
    const [login,setLogin]=useState(false)
    const [userName,setUserName]=useState()
  return (
    <userContext.Provider value={{
        login,
        setLogin,
        userName,
        setUserName
    }} >
      {props.children}
    </userContext.Provider>
  )
}

export default ContextApi
export {userContext}
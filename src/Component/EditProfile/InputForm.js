import React from 'react'
import './Css/InputForm.css'

function InputForm({type,label,placeholder,value,userData,setUserData,name}) {
  
  const HandleChange=(e)=>{
    setUserData({...userData,[name]:e.target.value})
  }
  return (
    <div className='inputform_container' >
        <label>{label}</label>
        { label !== 'About' && <input type={type} placeholder={placeholder} name={name} value={value} onChange={HandleChange} />}
        { label ==='About' && <textarea type={type} placeholder={placeholder} name={name} value={value} onChange={HandleChange} />}
    </div>
  )
}

export default InputForm
import React, { useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import '../Css/Header.css'
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@mui/icons-material';


function Search({setInputCss,allUsersData,fullSearchBars,setFullSearchBar}) {

    const navigate=useNavigate()

    const [inputValue,setInputValue]=useState('')
    const [searchResult,setSearchResult]=useState(null)
    const [width,setWidth]=useState(window.innerWidth)

    const HandleChange=(e)=>{
       let searchResult = allUsersData.filter((data)=> data.username.includes(e.target.value))
       setSearchResult(searchResult)
       setInputValue(e.target.value)
    }

    const HandleClick=(element)=>{
        localStorage.setItem('localemail',element.email)
        navigate('/profile')
        setInputValue('')
    }

    const HandleSearchIcon=()=>{
        if(window.innerWidth <= 1024)
          setFullSearchBar(true)
    }

    const HandleCloseIcon=()=>{
      setFullSearchBar(false)
    }

    useEffect(()=>{
      window.addEventListener("resize",function(){
        setWidth(window.innerWidth)  
      });
    },[width])

    // console.log(width)

  return (
      <>
          <div className='searchIcon' onClick={HandleSearchIcon} ><SearchOutlinedIcon fontSize='medium' /></div>
          { width>1024 && <input type='text' placeholder='search' onChange={HandleChange} onClick={()=>setInputCss(true)} value={inputValue} />}
          { fullSearchBars && <input type='text' placeholder='search' onChange={HandleChange} onClick={()=>setInputCss(true)} value={inputValue} />}
          { fullSearchBars && <div className='closeicon' onClick={HandleCloseIcon} ><CloseOutlined fontSize='medium' /></div>}
          {
            inputValue && 
            <div className='search_container' >
              {
              searchResult.length === 0 ? (<p>No data found..</p>
              ):(
              
              searchResult?.map((element)=> 
            
              <div className='search_result' onClick={()=>HandleClick(element)} key={element.id} >
                <img src={element.userimage} alt=''/>
                <p>{element.username}</p>
              </div>
              ))
              }
          </div>
          }
      </>
  )
}

export default Search
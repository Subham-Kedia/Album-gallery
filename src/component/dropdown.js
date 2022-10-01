import React, { useEffect, useState } from 'react'
import '../styles/dropdown.css'

const Dropdown=(props)=> {
    const [searchFilter,setSearchFilter] = useState([]);

    useEffect(()=>{
      if(props.query!=='')
        setSearchFilter(props.localStore.filter((item)=>item.includes(props.query)));
    },[props.query])
    
  return (
    <div className='dropdown'>
        {searchFilter.map((ele,i)=>{
            return(
            <li key={i} onClick={()=>props.handleInput(ele)}>{ele}</li>
            )
        })}
    </div>
  )
}
export default Dropdown;

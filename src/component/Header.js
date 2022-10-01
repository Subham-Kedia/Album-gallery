import React,{useCallback, useState} from "react";
import '../styles/header.css';
import Dropdown from "./dropdown";


const Header=(props)=>{
  const debounce = (func) => {
    let timer;
    return (function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 600);
    })
  };
  
  const optimizedFn = useCallback(debounce(props.handleInput), []);
   
  return(
    <>
      <header className="header">
        <h1 className="header-title">  Search Photos  </h1>
        <span>
          <input  id="input"
            type="text"
            placeholder="Type to search photos"
            onChange={(e)=>{optimizedFn(e.target.value);}}
          />
          <span className="material-symbols-outlined" >
            Search
          </span>
            <Dropdown localStore={props.localStore} query={props.query} handleInput={props.handleInput}/>
        </span>
      </header>
    </>
  )
}

export default Header;

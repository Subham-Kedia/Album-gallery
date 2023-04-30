import React from "react"
import "../styles/header.css"

const Header = ({ handleInputChange }) => {
  const debounced = () => {
    let timer
    return (event) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        handleInputChange(event.target.value)
      }, 600)
    }
  }

  return (
    <div className="header-container">
      <p className="header-title"> Search Photos </p>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          id="input"
          type="text"
          placeholder="Type to search photos"
          onChange={debounced()}
        />
        <span className="material-symbols-outlined">Search</span>
      </div>
    </div>
  )
}

export default Header

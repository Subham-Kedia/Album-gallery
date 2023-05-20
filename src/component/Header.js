import React, { useState, useEffect, useRef } from "react"

import Dropdown from "./dropdown"
import "../styles/header.css"

const Header = ({ handleInputChange, query, queriesList }) => {
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (query) {
      setSuggestions(
        queriesList.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      )
    } else {
      setSuggestions([])
    }
  }, [query, queriesList])

  const debounced = () => {
    let timer
    return (event) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        handleInputChange(event.target.value)
      }, 600)
    }
  }

  const handleClickSuggestion = (value) => {
    handleInputChange(value)
    if (inputRef) inputRef.current.value = value
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
          ref={inputRef}
          onChange={debounced()}
        />
        <span className="material-symbols-outlined">Search</span>
        {suggestions && suggestions.length > 0 && (
          <Dropdown
            suggestions={suggestions}
            handleClick={handleClickSuggestion}
          />
        )}
      </div>
    </div>
  )
}

export default Header

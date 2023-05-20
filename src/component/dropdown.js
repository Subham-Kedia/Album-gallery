import React from "react"
import "../styles/dropdown.css"

const Dropdown = ({ suggestions, handleClick }) => {
  return (
    <div className="dropdown">
      {suggestions.map((ele, index) => {
        if (index >= 10) return null
        return (
          <li key={index} onClick={() => handleClick(ele)}>
            {ele}
          </li>
        )
      })}
    </div>
  )
}
export default Dropdown

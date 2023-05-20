import React from "react"
import "../styles/dropdown.css"

const Dropdown = ({ suggestions, handleClick }) => {
  return (
    <div className="dropdown">
      {suggestions.map((ele, i) => {
        return (
          <li key={i} onClick={() => handleClick(ele)}>
            {ele}
          </li>
        )
      })}
    </div>
  )
}
export default Dropdown

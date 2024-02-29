import React from "react";
import "../../styles/dropdown.css";

const Dropdown = ({ isFocused, query, suggestions, handleClick }) => {
  return (
    <div
      tabIndex="0"
      className="dropdown"
      style={{ display: isFocused ? "block" : "none" }}
    >
      {suggestions
        .filter((sugg) => sugg.includes(query))
        .slice(0, 10)
        .map((ele, index) => (
          <li key={index} onClick={() => handleClick(ele)}>
            {ele}
          </li>
        ))}
    </div>
  );
};
export default Dropdown;

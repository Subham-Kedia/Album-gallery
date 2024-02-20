import React, { useState } from "react";

import Dropdown from "../Dropdown";
import "../../styles/header.css";

const Header = ({ handleInputChange, queriesList }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleClickSearch();
    }
  };

  const handleQueryChange = (event) => {
    setTextInput(event.target.value);
    if (event.target.value) {
      setSuggestions(
        queriesList.filter((item) =>
          item.toLowerCase().includes(textInput.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleClickSearch = () => {
    handleInputChange(textInput);
    setSuggestions([]);
  };

  const handleClickSuggestion = (value) => {
    setTextInput(value);
    handleInputChange(value);
    setSuggestions([]);
  };

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
          value={textInput}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
        />
        <span
          className="material-symbols-outlined search-icon"
          onClick={handleClickSearch}
        >
          Search
        </span>
        {suggestions && suggestions.length > 0 && (
          <Dropdown
            suggestions={suggestions}
            handleClick={handleClickSuggestion}
          />
        )}
      </div>
    </div>
  );
};

export default Header;

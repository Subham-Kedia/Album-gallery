import React, { useState } from "react";

import Dropdown from "../Dropdown";
import { getDataFromLocalStorage } from "../../data/utils";
import { LOCAL_STORAGE_KEYS } from "../../data/constants";
import "../../styles/header.css";

const Header = ({ handleInputChange }) => {
  const [suggestions, setSuggestions] = useState(
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.ALB_GAL_QUERIES, [])
  );
  const [textInput, setTextInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleClickSearch();
    }
  };

  const handleQueryChange = (event) => {
    setTextInput(event.target.value);
    setIsFocused(true)
  };

  const handleClickSearch = () => {
    handleInputChange(textInput);
    const updateSuggestions = [...suggestions, textInput];
    setSuggestions(updateSuggestions);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ALB_GAL_QUERIES,
      JSON.stringify(updateSuggestions)
    );
    setIsFocused(false);
  };

  const handleClickSuggestion = (value) => {
    setTextInput(value);
    handleInputChange(value);
    setIsFocused(false);
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
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={(e) => {
            if (e.relatedTarget?.className !== "dropdown") setIsFocused(false);
          }}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <span
          className="material-symbols-outlined search-icon"
          onClick={handleClickSearch}
        >
          Search
        </span>
        {suggestions && suggestions.length > 0 && (
          <Dropdown
            isFocused={isFocused}
            query={textInput}
            suggestions={suggestions}
            handleClick={handleClickSuggestion}
          />
        )}
      </div>
    </div>
  );
};

export default Header;

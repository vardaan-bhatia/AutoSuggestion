import React, { useEffect, useState } from "react";

const AutoSuggestion = ({
  fetchSuggestions,
  onSelect = () => {},
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  datakey = "",
  loading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    debounceFetchSuggestions(e.target.value);
  };

  const getSuggestions = async (value) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await fetchSuggestions(value);
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFetchSuggestions = debounce(getSuggestions, 300);

  useEffect(() => {
    if (inputValue.length > 1) {
      debounceFetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  // Function to highlight matching text
  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => (
      <span
        key={index}
        style={
          part.toLowerCase() === highlight.toLowerCase()
            ? { fontWeight: "bold", color: "blue" }
            : {}
        }
      >
        {part}
      </span>
    ));
  };

  const handleSuggestionClick = (item) => {
    onSelect(item);
    setInputValue(item[datakey]);
    setSuggestions([]);
  };

  return (
    <div className="relative w-96">
      <input
        type="text"
        name="suggestion"
        id="suggestion"
        className="mt-6 p-2 border-2 border-gray-600 w-full rounded-xl"
        placeholder="Type here..."
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        value={inputValue}
      />
      {isLoading && (
        <div className="absolute left-0 right-0 mt-2">{loading}</div>
      )}
      {error && (
        <div className="absolute left-0 right-0 mt-2 text-red-500">{error}</div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(item)}
            >
              {highlightText(item[datakey], inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggestion;

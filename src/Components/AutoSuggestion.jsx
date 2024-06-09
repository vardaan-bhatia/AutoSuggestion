import React, { useState } from "react";

const AutoSuggestion = (
  fetchsuggestions,
  StaticData,
  onSelect = () => {},
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
  datakey = "",
  loading = "Loading..."
) => {
  const [inputvalue, setinputvalue] = useState("");
  const [suggestion, setsuggestion] = useState("");
  const [loading, setloading] = useState("");
  const [error, seterror] = useState("");
  const handleInputChange = (e) => {
    setinputvalue(e.target.value);
    onchange(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        name="suggestion"
        id="suggestion"
        className="mt-6 p-2 border-2 border-gray-600 w-96 rounded-xl"
        placeholder="Type here..."
        onBlur={onblur}
        onFocus={onfocus}
        onChange={handleInputChange}
      />
    </>
  );
};

export default AutoSuggestion;

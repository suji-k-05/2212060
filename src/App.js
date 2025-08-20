import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleClick = () => {
    if (!inputValue) {
      alert("Please enter a URL!");
      return;
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + 5 * 60000); 

    setStartTime(now.toLocaleString());
    setEndTime(expiry.toLocaleString());

    alert("URL Shortened: " + inputValue);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL SHORTENED CREATION AND EXPIRY</h1>
      <input
        type="text"
        placeholder="Enter URL here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: "2px",
          width: "100px",
          marginRight: "2px",
          borderRadius: "2px",
          border: "1px solid black",
        }}
      />

      <button
        onClick={handleClick}
        style={{
          padding: "2px 5px",
          border: "none",
          borderRadius: "3px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Shorten
      </button>
      {startTime && endTime && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>URL:</strong> {inputValue}</p>
          <p><strong>Start Time:</strong> {startTime}</p>
          <p><strong>End Time (Expiry):</strong> {endTime}</p>
        </div>
      )}
    </div>
  );
}

export default App;


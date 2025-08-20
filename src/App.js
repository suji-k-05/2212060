import React, { useState, useEffect } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [validity, setValidity] = useState(5);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleGenerate = () => {
    if (!longUrl.trim()) {
      alert("Please enter a URL!");
      return;
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + validity * 60 * 1000);

    setCreatedTime(now.toLocaleString());
    setExpiryTime(expiry.toLocaleString());

    const code = generateCode();
    setShortUrl(window.location.origin + "/" + code);

    setSecondsLeft(validity * 60);
  };

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      setShortUrl("");
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? "0" : ""}${rem}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>URL Shortener with Custom Expiry</h2>

      <input
        type="text"
        placeholder="Enter a long URL here..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          borderRadius: "6px",
          border: "1px solid #444",
          marginRight: "10px",
        }}
      />

      <select
        value={validity}
        onChange={(e) => setValidity(Number(e.target.value))}
        style={{ padding: "8px", borderRadius: "6px", marginRight: "10px" }}
      >
        <option value={1}>1 Minute</option>
        <option value={5}>5 Minutes</option>
        <option value={10}>10 Minutes</option>
        <option value={30}>30 Minutes</option>
        <option value={60}>1 Hour</option>
      </select>

      <button
        onClick={handleGenerate}
        style={{
          padding: "8px 15px",
          backgroundColor: "#222",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Generate
      </button>

      {createdTime && (
        <div style={{ marginTop: "25px" }}>
          <p>
            <b>Original URL:</b> {longUrl}
          </p>
          <p>
            <b>Shortened URL:</b>{" "}
            {shortUrl ? (
              <a href={longUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
            ) : (
              "Expired"
            )}
          </p>
          <p>
            <b>Created At:</b> {createdTime}
          </p>
          <p>
            <b>Expires At:</b> {expiryTime}
          </p>
          <p>
            <b>Time Left:</b>{" "}
            {secondsLeft > 0 ? formatTime(secondsLeft) : "Expired"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

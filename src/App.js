import React, { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const createShortCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleShorten = () => {
    if (!url.trim()) {
      alert("Enter a valid URL!");
      return;
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + 5 * 60 * 1000);

    setCreatedAt(now.toLocaleString());
    setExpiresAt(expiry.toLocaleString());

    const shortCode = createShortCode();
    setShortLink(window.location.origin + "/" + shortCode);

    setTimeRemaining(5 * 60);
  };

  useEffect(() => {
    if (timeRemaining === null) return;
    if (timeRemaining <= 0) {
      setShortLink(null);
      return;
    }

    const tick = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(tick);
  }, [timeRemaining]);

  const formatClock = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Simple URL Shortener with Expiry</h1>
      <input
        type="text"
        placeholder="Paste your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          padding: "6px",
          width: "280px",
          marginRight: "8px",
          borderRadius: "5px",
          border: "1px solid #333",
        }}
      />
      <button
        onClick={handleShorten}
        style={{
          padding: "6px 12px",
          background: "#222",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Shorten
      </button>

      {createdAt && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Original:</b> {url}</p>
          <p>
            <b>Shortened:</b>{" "}
            {shortLink ? (
              <a href={url} target="_blank" rel="noreferrer">
                {shortLink}
              </a>
            ) : (
              "Expired"
            )}
          </p>
          <p><b>Created At:</b> {createdAt}</p>
          <p><b>Expires At:</b> {expiresAt}</p>
          <p><b>Time Left:</b> {timeRemaining > 0 ? formatClock(timeRemaining) : "Expired"}</p>
        </div>
      )}
    </div>
  );
}

export default App;

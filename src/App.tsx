import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import m from "./assets/c.MOV";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%" });
  const [yesScale, setYesScale] = useState(1);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Will you be my Valentine? 🥺💖";

  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = React.useRef(null);

  const startMusic = () => {
    if (!musicStarted && audioRef?.current?.play) {
      audioRef.current.play();
      setMusicStarted(true);
    }
  };

  // Typewriter Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Sparkle Cursor Trail
  useEffect(() => {
    const sparkle = (e) => {
      const star = document.createElement("div");
      star.className = "sparkle";
      star.style.left = e.pageX + "px";
      star.style.top = e.pageY + "px";
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 600);
    };

    window.addEventListener("mousemove", sparkle);
    return () => window.removeEventListener("mousemove", sparkle);
  }, []);

  const moveNoButton = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;

    setNoPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });

    setYesScale((prev) => prev + 0.2);
  };

  const handleYes = () => {
    setAccepted(true);

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="container" onClick={startMusic}>
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source
          src="https://www.bensound.com/bensound-music/bensound-romantic.mp3"
          type="audio/mp3"
        />
      </audio>

      {/* Floating Hearts */}
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>💖</span>
        ))}
      </div>

      {!accepted ? (
        <>
          <h1 className="title">{displayedText}</h1>

          <img
            className="gif"
            src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
            alt="begging puppy"
          />

          <button
            className="yesButton"
            style={{ transform: `scale(${yesScale})` }}
            onClick={handleYes}
          >
            Yes 💕
          </button>

          <button
            className="noButton"
            style={{ top: noPosition.top, left: noPosition.left }}
            onMouseEnter={moveNoButton}
          >
            No 🙈
          </button>
        </>
      ) : (
        <>
          <h1 className="title">YAYYYYY!!! 💖💖💖</h1>

          <video
            className="celebrationVideo"
            src={m} // ← Put your video inside public folder
            autoPlay
            loop
            muted={true}
            controls={false}
          />

          <p className="subtitle">
            You just made me the happiest person alive 🥰✨
          </p>
        </>
      )}
    </div>
  );
}

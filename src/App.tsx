// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import me from "./assets/c8.gif";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%" });
  const [yesScale, setYesScale] = useState(1);
  const [displayedText, setDisplayedText] = useState("");
  const [triedNo, setTriedNo] = useState(false);
  const [showTease, setShowTease] = useState(false);
  const [isLaptop, setIsLaptop] = useState(true);

  const fullText = "Will you be my Valentine? 🥺💖";

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
    setTriedNo(true); // She attempted No

    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;

    setNoPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });

    setYesScale((prev) => prev + 0.2);
  };

  const handleYes = () => {
    if (!triedNo) {
      setShowTease(true);
      return;
    }
    setAccepted(true);

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth < 1024) {
        setIsLaptop(false);
      } else {
        setIsLaptop(true);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isLaptop) {
    return (
      <div className="mobileBlock">
        <h1>Oops! 🙈</h1>
        <p>This love story is only meant to be viewed on a laptop 💻💖</p>
        <p>Please open it on a bigger screen 🥺</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Floating Hearts */}
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>💖</span>
        ))}
      </div>

      {showTease && !accepted! && (
        <p className="teaseMessage">
          I knew you would click Yes right away 😌💖 <br />
          Try going for No just for fun 🙈
        </p>
      )}

      <div style={{ display: accepted ? "none" : "block" }}>
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
      </div>
      <div style={{ display: accepted ? "block" : "none" }}>
        <h1 className="title">YAYYYYY!!! 💖💖💖</h1>

        <img
          className="celebrationVideo"
          src={me} // ← Put your video inside public folder
          alt="me"
        />

        <p className="subtitle">
          You just made me the happiest person alive 🥰✨
        </p>
      </div>
    </div>
  );
}

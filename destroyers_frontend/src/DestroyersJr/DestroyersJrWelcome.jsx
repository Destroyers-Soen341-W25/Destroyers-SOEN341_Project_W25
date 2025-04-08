import React from "react";
import "./DestroyersJrWelcome.css";

const moods = [
  { emoji: "😎", label: "Chill", animation: "animate-pulse" },
  { emoji: "🤯", label: "Stressed", animation: "animate-wiggle" },
  { emoji: "😴", label: "Tired", animation: "animate-fade" },
  { emoji: "🧠", label: "Focused", animation: "animate-zoom" },
];

export default function DestroyersJrWelcome({ onClose }) {
  return (
    <div className="welcome-slide-in">
      <div className="welcome-box">
        <h2>Hi there,I am Destroyers Jr.</h2>
        <p>
          Welcome to <strong>ChatHaven</strong>.<br />
          How are you feeling today?
        </p>
        <div className="mood-grid">
          {moods.map((mood, i) => (
            <button
              key={i}
              className={`mood-btn ${mood.animation}`}
              onClick={onClose}
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
}

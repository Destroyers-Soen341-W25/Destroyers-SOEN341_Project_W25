import React, { useState } from "react";
import "./DestroyersJrWelcome.css";
import jrIcon from './destroyers-logo.png';

const moods = [
  { emoji: "😎", label: "Chill", animation: "animate-pulse" },
  { emoji: "🤯", label: "Stressed", animation: "animate-wiggle" },
  { emoji: "😴", label: "Tired", animation: "animate-fade" },
  { emoji: "🧠", label: "Focused", animation: "animate-zoom" },
];

export default function DestroyersJrWelcome({ onClose }) {
  const [moodPicked, setMoodPicked] = useState(null);

  const handleClick = (mood) => {
    setMoodPicked(mood.label);
    setTimeout(() => onClose(), 2000); // show mood response for a sec
  };

  return (
    <div className="welcome-slide-in">
      <div className="welcome-box">
        <div className="jr-header">
          <img src={jrIcon} alt="Destroyers Jr." className="jr-avatar" />
          <h2>👋 Hi, I’m <strong>Destroyers Jr.</strong></h2>
        </div>
        <p>
          Welcome to <strong>ChatHaven</strong>.<br />
          How are you feeling today?
        </p>

        <div className="mood-grid">
          {moods.map((mood, i) => (
            <button
              key={i}
              className={`mood-btn ${mood.animation}`}
              onClick={() => handleClick(mood)}
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>

        {moodPicked && (
          <p className="jr-response">
            Destroyers Jr.: {
              moodPicked === 'Chill' ? 'Vibing initiated 😎' :
              moodPicked === 'Stressed' ? 'Take a breath. I gotchu 🤖' :
              moodPicked === 'Tired' ? 'Go recharge, legend 😴' :
              'Let’s grind! 🧠'
            }
          </p>
        )}

        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
}


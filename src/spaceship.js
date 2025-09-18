import React from "react";

function Spaceship({ tasks, typing }) {
  const completed = tasks.filter((t) => t.done).length; 
  const crewCount = completed; // 1 astronaut per completed task
  const starCount = 40;

  return (
    <div className={`space-container ${typing ? "typing-stars" : ""}`}>
      {/* Stars */}
      <div className="stars">
        {[...Array(starCount)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Astronauts floating */}
      {Array.from({ length: crewCount }).map((_, i) => (
        <div
          key={i}
          className="astronaut"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          🧑‍🚀
        </div>
      ))}

      {/* Spaceship bottom-right */}
      <div className="spaceship">🚀</div>
       {/* moon top-left */}
      <div className="moon">🌕</div>
    </div>
  );
}

export default Spaceship;

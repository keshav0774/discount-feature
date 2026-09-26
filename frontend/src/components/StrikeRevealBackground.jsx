import { useState } from 'react';

export default function StrikeRevealBackground({ children }) {
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const [active, setActive] = useState(false);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      className="relative overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Hidden STRIKE dashboard image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/Strike.jpg')",
          backgroundRepeat: 'no-repeat',

          // Large canvas behind Hero + CodeShowcase
          backgroundSize: '1800px auto',
          backgroundPosition: 'center top',

          opacity: active ? 0.22 : 0,

          WebkitMaskImage: `
            radial-gradient(
              circle 300px at ${mouse.x}px ${mouse.y}px,
              black 0%,
              rgba(0,0,0,0.9) 25%,
              rgba(0,0,0,0.5) 50%,
              transparent 75%
            )
          `,

          maskImage: `
            radial-gradient(
              circle 300px at ${mouse.x}px ${mouse.y}px,
              black 0%,
              rgba(0,0,0,0.9) 25%,
              rgba(0,0,0,0.5) 50%,
              transparent 75%
            )
          `,

          transition: 'opacity 200ms ease',
        }}
      />

      {/* Hero + CodeShowcase stay above image */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
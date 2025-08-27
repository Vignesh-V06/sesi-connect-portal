import React, { useState, useEffect, useRef } from 'react';

const styles = `
.solar-intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at center, #0a0a1f 0%, #050510 50%, #000000 100%);
  overflow: hidden;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.solar-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
.skip-button {
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 12px 24px;
  border-radius: 6px;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.5px;
  cursor: pointer;
  backdrop-filter: blur(15px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10000;
  text-transform: uppercase;
}
.skip-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}
.intro-fade-out {
  opacity: 0;
  transition: opacity 1s ease-out;
}
.sesi-logo {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  opacity: 0;
  animation: logoFadeIn 1.5s ease-in-out 1.5s forwards;
}
.sesi-title {
  font-size: 2.8rem;
  font-weight: 300;
  letter-spacing: 8px;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}
.sesi-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.sesi-chapter {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  letter-spacing: 1px;
}
@keyframes logoFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
@media (max-width: 768px) {
  .sesi-title { font-size: 2rem; }
  .sesi-subtitle { font-size: 1rem; }
  .skip-button {
    top: 15px;
    right: 15px;
    padding: 10px 20px;
    font-size: 12px;
  }
}
`;

const SolarIntro = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioRef = useRef(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const startTime = useRef(Date.now());
  const zoomPhase = useRef(false);
  const initialZoom = useRef(1);
  const sunSize = 30;

  const planets = [
    { name: 'Mercury', radius: sunSize + 20, size: 3, color: '#b1b1b1', speed: 0.035 },
    { name: 'Venus', radius: sunSize + 35, size: 5, color: '#e6c173', speed: 0.028 },
    { name: 'Earth', radius: sunSize + 50, size: 5, color: '#6db2f7', speed: 0.022, hasMoon: true },
    { name: 'Mars', radius: sunSize + 65, size: 4, color: '#ff6b4a', speed: 0.018 },
    { name: 'Jupiter', radius: sunSize + 90, size: 10, color: '#d1a979', speed: 0.014 },
    { name: 'Saturn', radius: sunSize + 115, size: 9, color: '#f5e8b0', speed: 0.011, rings: true }
  ].map(p => ({ ...p, angle: Math.random() * Math.PI * 2, secondaryColor: '#000' }));

  const planetStates = useRef(planets);

  useEffect(() => {
    const audio = new Audio('/solar-intro-music.mp3');
    audio.loop = true;
    audio.volume = 0.8;
    audio.preload = 'auto';
    audioRef.current = audio;

    const play = () => {
      audio.play().catch(() => {
        const clickToPlay = () => {
          audio.play().catch(() => { });
          document.removeEventListener('click', clickToPlay);
        };
        document.addEventListener('click', clickToPlay);
      });
    };

    setTimeout(play, 1000);
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - startTime.current) / 1000;
      ctx.fillStyle = '#000008';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 300; i++) {
        const x = (i * 9641 + elapsed * 8) % canvas.width;
        const y = (i * 9643) % canvas.height;
        const twinkle = Math.sin(elapsed * 1.5 + i) * 0.3 + 0.7;
        const brightness = (i % 5) * 0.4 + 0.8;
        const finalBrightness = Math.min(brightness * twinkle, 1);
        ctx.fillStyle = i % 20 === 0
          ? `rgba(255, 255, 255, ${finalBrightness})`
          : `rgba(255, 255, 255, ${finalBrightness * 0.9})`;
        ctx.beginPath();
        ctx.fillRect(x, y, i % 20 === 0 ? 2.5 : 1.2, i % 20 === 0 ? 2.5 : 1.2);
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (elapsed > 2 && !zoomPhase.current) {
        zoomPhase.current = true;
        initialZoom.current = 1;
      }

      let zoom = 1;
      let sunZoomSize = 35;

      if (zoomPhase.current) {
        const zoomProgress = Math.min((elapsed - 2) / 3, 1);
        zoom = 1 + zoomProgress * 12;
        sunZoomSize = 35 + zoomProgress * 180;
        if (zoomProgress >= 1 && !isSkipped) {
          setTimeout(() => {
            setFadeOut(true);
            if (audioRef.current) audioRef.current.pause();
            setTimeout(() => onComplete(), 1000);
          }, 500);
          return;
        }
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(zoom, zoom);

      // Draw sun
      const sunGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sunZoomSize);
      sunGradient.addColorStop(0, '#fffbe6');
      sunGradient.addColorStop(0.3, '#ffd54f');
      sunGradient.addColorStop(0.6, '#f57c00');
      sunGradient.addColorStop(1, 'rgba(245, 124, 0, 0.2)');
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(0, 0, sunZoomSize, 0, Math.PI * 2);
      ctx.fill();

      // Orbits
      planetStates.current.forEach(planet => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1 / zoom;
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Planets
      planetStates.current.forEach(planet => {
        planet.angle += planet.speed;
        const x = Math.cos(planet.angle) * planet.radius;
        const y = Math.sin(planet.angle) * planet.radius;

        ctx.save();
        ctx.translate(x, y);

        // Saturn's rings
        if (planet.rings) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 2 / zoom;
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.size * 2.2, planet.size * 1.2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Jupiter Great Red Spot
        if (planet.name === 'Jupiter') {
          ctx.fillStyle = 'rgba(255, 80, 80, 0.5)';
          ctx.beginPath();
          ctx.ellipse(planet.size * 0.3, planet.size * 0.2, 2, 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Planet body
        const gradient = ctx.createRadialGradient(-planet.size * 0.3, -planet.size * 0.3, 0, 0, 0, planet.size);
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, planet.secondaryColor || '#000');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Earth Moon
        if (planet.name === 'Earth') {
          const moonAngle = elapsed * 2.5;
          const moonDist = planet.size + 16;
          const mx = Math.cos(moonAngle) * moonDist;
          const my = Math.sin(moonAngle) * moonDist;
          ctx.fillStyle = '#ccc';
          ctx.beginPath();
          ctx.arc(mx, my, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      ctx.restore();

      if (!isSkipped) animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isSkipped, onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    setFadeOut(true);
    if (audioRef.current) audioRef.current.pause();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setTimeout(() => onComplete(), 500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`solar-intro ${fadeOut ? 'intro-fade-out' : ''}`}>
        <canvas ref={canvasRef} className="solar-canvas" />
        <button className="skip-button" onClick={handleSkip}>Skip Intro →</button>
        <div className="sesi-logo">
          <div className="sesi-title">SESI</div>
          <div className="sesi-subtitle">Solar Energy Society of India</div>
          <div className="sesi-chapter">VIT Chapter</div>
        </div>
      </div>
    </>
  );
};

const MainContent = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px'
  }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to SESI-VIT</h1>
    <p style={{ fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
      Exploring renewable energy solutions and sustainable technologies for a brighter, cleaner future. Join us in harnessing the power of the sun!
    </p>
    <div style={{ marginTop: '40px' }}>
      <button style={{
        background: '#ffc107',
        color: '#000',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '25px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        margin: '0 10px'
      }}>Our Projects</button>
      <button style={{
        background: 'transparent',
        color: '#fff',
        border: '2px solid #fff',
        padding: '15px 30px',
        borderRadius: '25px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        margin: '0 10px'
      }}>Join SESI</button>
    </div>
  </div>
);

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  return <>{showIntro ? <SolarIntro onComplete={() => setShowIntro(false)} /> : <MainContent />}</>;
};

export default App;
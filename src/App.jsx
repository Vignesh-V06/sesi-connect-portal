import React, { useState, useEffect, useRef } from 'react';
import Home from './component/home/home';
import HeaderOnly from './component/header/header';
import Footer from './component/footer/footer.';
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
  const zoomCompleted = useRef(false);
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

    const drawSun = (rCore, rCorona) => {
      const core = ctx.createRadialGradient(-rCore * 0.15, -rCore * 0.15, rCore * 0.05, 0, 0, rCore);
      core.addColorStop(0, '#fffde7');
      core.addColorStop(0.35, '#ffe15a');
      core.addColorStop(0.7, '#ffb300');
      core.addColorStop(1, '#ff8f00');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(0, 0, rCore, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = Math.max(1, rCore * 0.02);
      ctx.strokeStyle = '#ff8f00';
      ctx.beginPath();
      ctx.arc(0, 0, rCore * 0.995, 0, Math.PI * 2);
      ctx.stroke();

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const corona = ctx.createRadialGradient(0, 0, rCore * 0.9, 0, 0, rCorona);
      corona.addColorStop(0, 'rgba(255, 200, 70, 0.25)');
      corona.addColorStop(0.5, 'rgba(255, 150, 40, 0.12)');
      corona.addColorStop(1, 'rgba(255, 120, 0, 0)');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(0, 0, rCorona, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawMoon = (mx, my, r) => {
      ctx.save();
      ctx.translate(mx, my);

      const grad = ctx.createRadialGradient(-r * 0.5, -r * 0.6, r * 0.2, 0, 0, r);
      grad.addColorStop(0, '#e0e0e0');
      grad.addColorStop(0.5, '#c6c6c6');
      grad.addColorStop(1, '#8f8f8f');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      const shade = ctx.createRadialGradient(r * 0.2, r * 0.3, r * 0.2, 0, 0, r * 1.2);
      shade.addColorStop(0, 'rgba(0,0,0,0.0)');
      shade.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.35;
      const craters = [
        { x: -r * 0.2, y: -r * 0.1, rr: r * 0.25 },
        { x: r * 0.3, y: r * 0.05, rr: r * 0.18 },
        { x: -r * 0.05, y: r * 0.35, rr: r * 0.15 },
        { x: r * -0.35, y: r * 0.25, rr: r * 0.12 }
      ];
      craters.forEach(c => {
        const cg = ctx.createRadialGradient(c.x - c.rr * 0.3, c.y - c.rr * 0.3, c.rr * 0.2, c.x, c.y, c.rr);
        cg.addColorStop(0, '#a8a8a8');
        cg.addColorStop(0.6, '#7a7a7a');
        cg.addColorStop(1, 'rgba(0,0,0,0.3)');
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.rr, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - startTime.current) / 1000;

      const w = canvas.width, h = canvas.height;
      const centerX = w / 2, centerY = h / 2;
      ctx.fillStyle = '#000008';
      ctx.fillRect(0, 0, w, h);

      if (!zoomCompleted.current) {
        // stars
        for (let i = 0; i < 300; i++) {
          const x = (i * 9641 + elapsed * 8) % w;
          const y = (i * 9643) % h;
          const twinkle = Math.sin(elapsed * 1.5 + i) * 0.3 + 0.7;
          const brightness = (i % 5) * 0.4 + 0.8;
          const finalBrightness = Math.min(brightness * twinkle, 1);
          ctx.fillStyle = i % 20 === 0
            ? `rgba(255,255,255,${finalBrightness})`
            : `rgba(255,255,255,${finalBrightness * 0.9})`;
          ctx.fillRect(x, y, i % 20 === 0 ? 2.5 : 1.2, i % 20 === 0 ? 2.5 : 1.2);
        }
      }

      if (elapsed > 2 && !zoomPhase.current) zoomPhase.current = true;

      let zoom = 1;
      let sunCore = 35;
      let sunCorona = 80;

      if (zoomPhase.current && !zoomCompleted.current) {
        // extend duration for smoother zoom
        const zoomProgress = Math.min((elapsed - 2) / 5, 1);

        // apply easing (easeInOutCubic)
        const easeInOutCubic = t =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const easedProgress = easeInOutCubic(zoomProgress);

        // use eased progress for zoom
        zoom = 1 + easedProgress * 26.5;
        //sunCore = 35 + zoomProgress * 180;
        //sunCorona = sunCore * 1.6;

        if (zoomProgress >= 1) {
          zoomCompleted.current = true;
          setTimeout(() => {
            setFadeOut(true);
            if (audioRef.current) audioRef.current.pause();
            setTimeout(() => onComplete(), 800);
          }, 200);
        }
      } else if (zoomCompleted.current) {
        zoom = 30;
        //sunCore = 215;
        //sunCorona = 215 * 1.6;
      }

      ctx.save();
      ctx.translate(centerX, centerY);

      // 🔥 SCALE THE WHOLE SYSTEM (sun + planets)
      ctx.scale(zoom, zoom);

      // Sun
      drawSun(sunCore, sunCorona);

      // Planets always drawn, they scale with ctx.scale
      planetStates.current.forEach(planet => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1 / zoom;
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
        ctx.stroke();

        planet.angle += planet.speed;
        const x = Math.cos(planet.angle) * planet.radius;
        const y = Math.sin(planet.angle) * planet.radius;

        ctx.save();
        ctx.translate(x, y);

        if (planet.rings) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 2 / zoom;
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.size * 2.2, planet.size * 1.2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        const gradient = ctx.createRadialGradient(
          -planet.size * 0.3, -planet.size * 0.3, 0,
          0, 0, planet.size
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, planet.secondaryColor || '#000');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2);
        ctx.fill();

        if (planet.name === 'Earth') {
          const moonAngle = elapsed * 2.2;
          const moonDist = planet.size + 16;
          const mx = Math.cos(moonAngle) * moonDist;
          const my = Math.sin(moonAngle) * moonDist;
          drawMoon(mx, my, 2.6);
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
  return <>{showIntro ? <SolarIntro onComplete={() => setShowIntro(false)} /> : <Home />} <HeaderOnly/> <Footer/></>;
};

export default App;
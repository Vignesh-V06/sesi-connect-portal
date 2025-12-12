import React, { useEffect } from "react";

// Inject global vanilla CSS directly so we don't need an external App.css file
const globalStyles = `
:root {
  --bg: #050816;
  --bg-alt: #070b1f;
  --accent: #ffb347;
  --accent-strong: #ff8c00;
  --text-main: #f9fafb;
  --text-muted: #a1a5b5;
  --card-bg: #0b1024;
  --border-soft: rgba(255, 255, 255, 0.06);
  --radius-xl: 26px;
  --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.55);
  --nav-height: 70px;
  --transition-fast: 0.45s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#root {
  height: 100%;
}

body {
  scroll-behavior: smooth;
  background: var(--bg);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif;
  overflow-x: hidden;
}

.sesi-root {
  min-height: 100vh;
  position: relative;
}

.solar-bg {
  position: fixed;
  inset: -20%;
  z-index: -2;
  background: radial-gradient(
      circle at 10% 0%,
      rgba(255, 255, 255, 0.08) 0,
      transparent 55%
    ),
    radial-gradient(
      circle at 80% 100%,
      rgba(255, 140, 0, 0.25) 0,
      transparent 60%
    ),
    radial-gradient(
      circle at 50% 30%,
      rgba(255, 179, 71, 0.22) 0,
      transparent 55%
    ),
    linear-gradient(145deg, #020617, #020617 35%, #050816, #020617 100%);
  pointer-events: none;
  filter: saturate(110%);
  transition: transform 0.3s ease-out;
}

nav-inner {
  pointer-events: auto;
  width: min(1120px, 100%);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}

.logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(255, 179, 71, 0.5);
  display: grid;
  place-items: center;
  background: radial-gradient(
      circle at 30% 10%,
      rgba(255, 255, 255, 0.24) 0,
      transparent 55%
    ),
    radial-gradient(circle at 70% 90%, rgba(255, 140, 0, 0.9) 0, transparent 70%);
  box-shadow: 0 0 18px rgba(255, 179, 71, 0.65);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #1f2937;
}

.logo-text-main {
  font-weight: 650;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.logo-text-sub {
  font-size: 0.68rem;
  color: var(--text-muted);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 1.2rem;
  font-size: 0.82rem;
  background: linear-gradient(
    to right,
    rgba(15, 23, 42, 0.8),
    rgba(15, 23, 42, 0.9)
  );
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  backdrop-filter: blur(20px);
}

nav button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  position: relative;
  padding-block: 0.2rem;
  font-size: 0.82rem;
}

nav button::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.25rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-strong));
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease-out;
}

nav button:hover {
  color: var(--text-main);
}

nav button:hover::after {
  transform: scaleX(1);
}

main {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: calc(var(--nav-height) + 0.5rem) 1.6rem 3rem;
}

section {
  min-height: auto;
  padding-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  scroll-margin-top: var(--nav-height);
}

.section-inner {
  width: 100%;
}

.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-height));
  background: radial-gradient(
      circle at 50% 20%,
      rgba(255,180,80,0.18) 0%,
      rgba(255,140,0,0.12) 22%,
      rgba(255,115,0,0.08) 40%,
      transparent 70%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255,200,120,0.12) 0%,
      transparent 60%
    );
  background-blend-mode: screen;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 2.2rem;
  align-items: center;
}

@media (max-width: 880px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

.hero-title-big {
  font-size: clamp(3rem, 6vw, 4.6rem);
  line-height: 0.9;
  letter-spacing: 0.21em;
  text-transform: uppercase;
  font-weight: 800;
  color: var(--accent);
}

.hero-title-big span {
  display: inline-block;
  /* Static SESI title, no glow or animation */
  transform: translateY(0);
  opacity: 1;
  filter: none;
}

.hero-subtitle {
  margin-top: 1.2rem;
  font-size: 0.9rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.hero-heading-full {
  margin-top: 0.6rem;
  font-size: 1.35rem;
  font-weight: 500;
  max-width: 22rem;
  line-height: 1.3;
}

.hero-tagline {
  margin-top: 1rem;
  font-size: 0.96rem;
  color: var(--text-muted);
  max-width: 28rem;
}

.hero-orbit {
  position: relative;
  width: min(320px, 78vw);
  height: min(320px, 78vw);
  margin-inline: auto;
}

/* orbit balls (ensure they sit exactly on ring circumference) */
.orbit-balls { position: absolute; inset: 0; z-index: 3; pointer-events: none }
.ball-wrap { position: absolute; inset: 0; transform-origin: 50% 50%; animation: orbitSpin 9s linear infinite }
.ball-wrap--b { animation-delay: -4.5s }
.orbit-ball { position: absolute; left: 50%; transform: translateX(-50%); width: 14px; height: 14px; border-radius: 999px; background: radial-gradient(circle at 30% 10%, #fff 0, #f97316 100%); box-shadow: 0 0 22px rgba(249,115,22,0.95) }
/* place a ball at the top of the ring */
.ball-wrap .orbit-ball {
  top: 0%; /* increased radius so orb sits farther from center */
}
/* slightly offset second ball to a different radius */
.ball-wrap--b .orbit-ball {
  top: 3%; /* matching increased outer radius */
}

@keyframes orbitSpin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

.hero-orbit { position: relative; width: min(320px, 78vw); height: min(320px, 78vw); margin-inline: auto }


.hero-orbit-core {
  /* Dual-ring border addition */
  position: relative;
  /* existing styles continue below */
  border: 4px solid rgba(255,255,255,0.35); /* NEW: clearer circle border */
  border: 3px solid rgba(255, 180, 80, 0.65); /* NEW: stronger, sun‑themed border */
  opacity: 0;
  animation: heroCoreIn 1.8s ease-out forwards;

  position: absolute;
  inset: 17%;
  border-radius: 50%;
  background: radial-gradient(
      circle at 30% 0%,
      rgba(255, 255, 255, 0.9) 0,
      transparent 40%
    ),
    radial-gradient(
      circle at 70% 100%,
      rgba(255, 140, 0, 0.85) 0,
      transparent 55%
    );
  box-shadow: 0 0 40px rgba(255, 179, 71, 0.85),
    0 0 90px rgba(255, 140, 0, 0.95);
  display: grid;
  place-items: center;
  overflow: hidden;
  /* Inner static border */
  box-shadow: 0 0 40px rgba(255,179,71,0.85), 0 0 90px rgba(255,140,0,0.95);
}

/* Outer ring */
.hero-orbit-core::after {
  content: "";
  position: absolute;
  inset: -10px; /* ring spacing */
  border-radius: 50%;
  border: 2px solid rgba(255,180,80,0.45);
  box-shadow: 0 0 22px rgba(255,140,0,0.45);
  pointer-events: none;
}

.hero-orbit-core {
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* masked image inside the circular core */
.hero-orbit-core::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: url("https://developing-silver-vozpfni45x-860cpm6sc9.edgeone.app/WhatsApp%20Image%202025-09-28%20at%2019.25.59_fc438593.jpg");
  background-size: cover;
  background-position: center;
  opacity: 1; /* 70% transparent */
  filter: none;
  pointer-events: none;
  pointer-events: none;
  transform-origin: 50% 50%;
  transition: transform 360ms cubic-bezier(.2,.9,.2,1), filter 360ms ease, opacity 320ms ease;
}

/* expanded card that appears outside the circle on hover */
.hero-orbit-card {
  position: fixed;
  left: 50%;
  top: 50%;
  width: min(840px, 92vw);
  height: auto;
  padding: 0;
  transform: translate(-50%, -50%) scale(0.6);
  border-radius: 18px;
  background: rgba(7,11,31,0.92);
  opacity: 0;
  pointer-events: none;
  z-index: 200;
  box-shadow: 0 35px 95px rgba(0,0,0,0.85);
  transition: transform 420ms cubic-bezier(.2,.9,.2,1), opacity 320ms ease;
  overflow: hidden;

}

/* inner layout */
.hero-orbit-card-inner { display: flex; gap: 1rem; align-items: center; }
.card-image {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 10;
  background-image: url("https://developing-silver-vozpfni45x-860cpm6sc9.edgeone.app/WhatsApp%20Image%202025-09-28%20at%2019.25.59_fc438593.jpg");
  background-size: cover;
  background-position: center;
}
.card-meta { padding: 0.6rem 0.8rem; color: var(--text-main); }
.card-title { font-weight:700; font-size:1.05rem; margin-bottom:0.2rem }
.card-sub { font-size:0.86rem; color:var(--text-muted) }

/* show as palette in center when hovering the circular region (hero-orbit) */
.hero-orbit:hover .hero-orbit-card {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}

/* on mobile, keep it subtle — don't pop to center */
@media (max-width: 880px) {
  .hero-orbit-card { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%) scale(0.9); width: min(86vw, 560px); grid-template-columns: 1fr; }
}


/* reveal the expanded card when hovering the hero-orbit region */
.hero-orbit:hover .hero-orbit-card {
  opacity: 1;
  transform: translate(-50%, -62%) scale(1);
}

/* when expanded card visible, slightly scale down the masked core to emphasize pop-out */
.hero-orbit:hover .hero-orbit-core::before {
  transform: scale(0.94);
  filter: brightness(0.96);
}

/* Image layer inside the orbit core */
.hero-orbit-core::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: url("https://developing-silver-vozpfni45x-860cpm6sc9.edgeone.app/WhatsApp%20Image%202025-09-28%20at%2019.25.59_fc438593.jpg");
  background-size: cover;
  background-position: center;
  opacity: 1;
  filter: none;
  pointer-events: none;
}

.hero-honeycomb {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 3px;
  pointer-events: auto;
  z-index: 1;
}

.honey-cell {
  width: 22%;
  aspect-ratio: 1 / 1.1;
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(1px);
  transition: background 0.25s ease;
}

.honey-cell:hover {
  background: transparent;
}

.hero-orbit-core span {
  position: relative;
  z-index: 2;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #111827;
}

.hero-orbit-ring {
  position: absolute;
  inset: 3%;
  border-radius: 50%;
  border: 1px dashed rgba(249, 250, 251, 0.18);
  animation: ringRotate 18s linear infinite;
}

.hero-orbit-ring::before { content: none; }

.hero-orbit-ring::before {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.hero-orbit-ring::after { content: none; }

@keyframes heroCoreIn {
  0% { opacity: 0; transform: scale(0.8); filter: blur(6px); }
  60% { opacity: 1; transform: scale(1.05); filter: blur(0); }
  100% { opacity: 1; transform: scale(1); }
}

.hero-blur-bg {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(0px);
  background: rgba(0,0,0,0.0);
  opacity: 0;
  pointer-events: none;
  transition: opacity 320ms ease, backdrop-filter 320ms ease;
  z-index: 150;
}

.hero-orbit:hover ~ .hero-blur-bg,
.hero-orbit:hover .hero-blur-bg {
  opacity: 1;
  backdrop-filter: blur(8px);
  background: rgba(0,0,0,0.45);
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-scroll-hint {
  position: absolute;
  bottom: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: var(--text-muted);
}

.scroll-dot {
  width: 13px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  position: relative;
  overflow: hidden;
}

.scroll-dot::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--accent);
  left: 50%;
  transform: translateX(-50%);
  animation: scrollDotMove 1.7s infinite;
}

@keyframes scrollDotMove {
  0% { top: 4px; opacity: 1; }
  70% { top: 12px; opacity: 1; }
  100% { top: 16px; opacity: 0; }
}

/* Motto section */
.motto-wrapper {
  align-items: stretch;
}

.motto-wrapper .section-inner {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: 2rem;
}

@media (max-width: 960px) {
  .motto-wrapper .section-inner {
    grid-template-columns: 1fr;
  }
}

.motto-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 0.5rem;
}

.motto-timeline-label {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.motto-step {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  opacity: 0.6;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.motto-step-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: 1px solid rgba(248, 250, 252, 0.5);
  position: relative;
}

.motto-step-dot::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: inherit;
  background: radial-gradient(circle, var(--accent) 0, transparent 70%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.motto-step-number {
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.motto-step-label {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.motto-step.active {
  opacity: 1;
  transform: translateX(4px);
}

.motto-step.active .motto-step-dot::after {
  opacity: 1;
}

.motto-section {
  position: relative;
}

.motto-card {
  border-radius: var(--radius-xl);
  background: radial-gradient(
      circle at 0% 0%,
      rgba(148, 163, 184, 0.15) 0,
      transparent 50%
    ),
    linear-gradient(135deg, #020617, #020617 40%, #020617 100%);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: var(--shadow-soft);
  padding: 2rem 1.8rem;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 2rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    border-color 0.3s ease;
  max-width: 540px;
  margin-inline: auto;
}

.motto-section[data-motto="capture"] .motto-card,
.motto-section[data-motto="sustain"] .motto-card {
  margin-left: auto;
  margin-right: 0;
}

.motto-section[data-motto="convert"] .motto-card {
  margin-left: -320px;
  margin-right: auto;
  justify-self: start;
}

@media (max-width: 960px) {
  .motto-section[data-motto="convert"] .motto-card {
    margin-left: auto;
    margin-right: auto;
  }
}

.motto-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.9);
  border-color: rgba(249, 250, 251, 0.35);
}

@media (max-width: 880px) {
  .motto-card {
    grid-template-columns: 1fr;
    padding: 1.7rem 1.4rem;
  }
}

.motto-label {
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.motto-word {
  font-size: clamp(2.1rem, 4.6vw, 3rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.motto-desc {
  margin-top: 0.8rem;
  font-size: 0.94rem;
  color: var(--text-muted);
  max-width: 26rem;
}

.motto-meta {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: rgba(148, 163, 184, 0.85);
}

.motto-chip {
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.8);
}

.motto-visual {
  position: relative;
  min-height: 160px;
  animation: mottoFloat 4s ease-in-out infinite;
}

@keyframes mottoFloat {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

.motto-orbit {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  border: 1px dashed rgba(148, 163, 184, 0.3);
  animation: mottoOrbitSpin 14s linear infinite;
}

@keyframes mottoOrbitSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.motto-planet {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 10%, #fff 0, #fb923c 100%);
  box-shadow: 0 0 25px rgba(251, 146, 60, 0.9);
  animation: planetPulse 2.4s ease-in-out infinite;
}

@keyframes planetPulse {
  0% { transform: scale(1); box-shadow: 0 0 18px rgba(251,146,60,0.65); }
  50% { transform: scale(1.17); box-shadow: 0 0 32px rgba(251,146,60,0.95); }
  100% { transform: scale(1); box-shadow: 0 0 18px rgba(251,146,60,0.65); }
}

.motto-glow {
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249,115,22,0.8) 0, transparent 60%);
  filter: blur(6px);
  opacity: 0.7;
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0% { opacity: 0.55; }
  50% { opacity: 0.95; }
  100% { opacity: 0.55; }
}

.motto-section[data-motto="capture"] .motto-word {
  color: #f97316;
}

.motto-section[data-motto="convert"] .motto-word {
  color: #fbbf24;
}

.motto-section[data-motto="sustain"] .motto-word {
  color: #22c55e;
}

.motto-section[data-motto="capture"] .motto-planet {
  top: -6px;
  left: 10%;
}

.motto-section[data-motto="convert"] .motto-planet {
  top: 40%;
  right: -8px;
}

.motto-section[data-motto="sustain"] .motto-planet {
  bottom: -6px;
  left: 60%;
}

.info-section {
  align-items: stretch;
}

.info-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  margin-top: 1.8rem;
  justify-items: center;

}

@media (max-width: 880px) {
  .info-grid {
    row-gap: 1.6rem;
  }
}

.section-title {
  font-size: 1.1rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.section-heading {
  font-size: 1.55rem;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
}

.section-intro {
  font-size: 0.94rem;
  color: var(--text-muted);
  max-width: 34rem;
}

.info-card {
  border-radius: var(--radius-xl);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), #020617);
  border: 1px solid var(--border-soft);
  padding: 1.3rem 1.3rem 1.4rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
  position: relative;
  overflow: hidden;
  transform: translateY(0) scale(1);
  transition: transform 0.3s ease, box-shadow 0.3s.ease,
    border-color 0.3s ease, background 0.3s ease;
  max-width: 520px;
}

@media (min-width: 900px) {
  .info-card--left {
    justify-self: flex-start;
  }

  .info-card--right {
    justify-self: flex-end;
  }
}

@media (max-width: 899px) {
  .info-card {
    justify-self: center;
  }
}

.info-card::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(
    circle at 0% 0%,
    rgba(255, 183, 77, 0.22) 0,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.info-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.95);
  border-color: rgba(249, 250, 251, 0.5);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  position: relative;
  z-index: 1;
}

.info-orbit-system {
  position: absolute;
  inset: 12% 4% 4% 4%;
  pointer-events: none;
  z-index: 0;
}

.info-orbit-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.25;
  animation: gridFloat 18s linear infinite;
}

@keyframes gridFloat {
  from { transform: translateY(0); }
  to { transform: translateY(-40px); }
}

.info-orbit-beam {
  position: absolute;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(255,180,80,0.9), transparent);
  opacity: 0.55;
  animation: beamSweep 6s ease-in-out infinite;
}

.info-orbit-beam-1 { top: 28%; left: 12%; right: 12%; }
.info-orbit-beam-2 { top: 66%; left: 12%; right: 12%; animation-delay: 1.8s; }

.info-orbit-beam-3 {
  top: 100%;   /* moved fully to the bottom edge of the card region */
  left: 12%;
  right: 12%;
  animation-delay: 3.1s;
}

@keyframes beamSweep {
  0% { transform: translateX(-20%); opacity: 0.2; }
  50% { transform: translateX(20%); opacity: 0.6; }
  100% { transform: translateX(-20%); opacity: 0.2; }
}

.info-orbit-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(252, 211, 77, 0.9);
  box-shadow: 0 0 22px rgba(251, 191, 36, 0.9);
  background: radial-gradient(
    circle at 30% 0%,
    #ffffff 0,
    #fee2b3 40%,
    #f97316 100%
  );
  transform: translate(-50%, -50%);
  animation: orbitCoreDrift 6s ease-in-out infinite alternate;
}

@keyframes orbitCoreDrift {
  0% { transform: translate(-60%, -46%) scale(0.9); }
  50% { transform: translate(-40%, -60%) scale(1.05); }
  100% { transform: translate(-50%, -40%) scale(0.96); }
}

.info-rocket {
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 0%, #ffffff 0, #fed7aa 40%, #ea580c 100%);
  box-shadow: 0 0 18px rgba(248, 171, 79, 0.9);
  transform: translate(-50%, -50%);
}

.info-icon {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 179, 71, 0.5) 0,
    transparent 65%
  );
  border: 1px solid rgba(251, 191, 36, 0.7);
  position: relative;
  overflow: hidden;
}

.info-icon::before {
  content: "";
  position: absolute;
  inset: 20%;
  border-radius: 999px;
}

.info-icon--sesi::before {
  border: 2px solid rgba(252, 211, 77, 0.9);
}

.info-icon--vit::before {
  left: 45%;
  right: 45%;
  top: 15%;
  bottom: 15%;
  border-radius: 8px;
  background: linear-gradient(
    to bottom,
    rgba(248, 250, 252, 0.9),
    rgba(251, 191, 36, 0.9)
  );
}

.info-icon--join::before {
  content: "";
  position: absolute;
  inset: 18%;
  background: transparent;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  border: 2px solid rgba(248, 250, 252, 0.95);
}

.info-card:hover .info-icon {
  transform: translateY(-2px) scale(1.06);
  box-shadow: 0 0 22px rgba(251, 191, 36, 0.9);
}

.info-card:hover::before {
  opacity: 1;
}

.info-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(148, 163, 184, 0.9);
}

.info-heading {
  margin-top: 0.4rem;
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
}

.info-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  position: relative;
  z-index: 1;
}

.info-list {
  margin-top: 0.7rem;
  list-style: none;
  font-size: 0.88rem;
  color: var(--text-muted);
  position: relative;
  z-index: 1;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
}

.info-bullet {
  margin-top: 0.3rem;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--accent);
  flex-shrink: 0;
}

.section-animate {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(40px) scale(0.98);
  transition: opacity var(--transition-fast),
    transform var(--transition-fast),
    filter var(--transition-fast);
}

.section-animate.in-view {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

footer {
  padding: 1.4rem 1.6rem 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted);
}

footer span {
  color: rgba(248, 250, 251, 0.85);
}
`;

const Home = () => {
  useEffect(() => {
    const solarBg = document.getElementById("solar-bg");

    const handleScroll = () => {
      const maxShift = 32;
      const scrollHeight =
        document.body.scrollHeight - window.innerHeight || 1;
      const scrollFraction = window.scrollY / scrollHeight;
      const translateY = -scrollFraction * maxShift;
      if (solarBg) solarBg.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.3 }
    );

    const animatedSections = document.querySelectorAll(".section-animate");
    animatedSections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      animatedSections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="sesi-root">
      <style>{globalStyles}</style>
      <div className="solar-bg" id="solar-bg" />

      

      <main>
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="section-inner hero-grid section-animate">
            <div>
              <div className="hero-title-big">
                <span>S</span>
                <span>E</span>
                <span>SI</span>
              </div>
              <div className="hero-subtitle">
                Solar Energy Society of India
              </div>
              <h1 className="hero-heading-full">
                VIT Vellore Student Chapter
              </h1>
              <p className="hero-tagline">
                Build, break, reinvent – together we engineer the future.
              </p>
            </div>

            <div>
              <div className="hero-orbit">
                <div className="hero-orbit-ring" />

                <div className="orbit-balls">
                  <div className="ball-wrap">
                    <div className="orbit-ball" />
                  </div>
                  <div className="ball-wrap ball-wrap--b">
                    <div className="orbit-ball" />
                  </div>
                </div>

                <div className="hero-orbit-core">
                  <span>SESI</span>
                </div>

                {/* palette card — pops to center of screen on hover of the circular region */}
                <div className="hero-blur-bg" aria-hidden></div>
                <div className="hero-orbit-card" aria-hidden>
                  <div className="hero-orbit-card-inner">
                    <div className="card-image" />
                    <div className="card-meta">
                      <div className="card-title">SESI VIT — Chapter</div>
                      <div className="card-sub">Solar Energy Society of India</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-scroll-hint">
            <div className="scroll-dot" />
            <span>Scroll to begin the journey</span>
          </div>
        </section>

        {/* MOTTO SEQUENCE */}
        <section id="mottos" className="motto-wrapper">
          <div className="section-inner">
            <aside className="motto-timeline section-animate">
              <div className="motto-timeline-label">Motto journey</div>
              <div className="motto-step active">
                <div className="motto-step-dot" />
                <div>
                  <div className="motto-step-number">01</div>
                  <div className="motto-step-label">Capture</div>
                </div>
              </div>
              <div className="motto-step">
                <div className="motto-step-dot" />
                <div>
                  <div className="motto-step-number">02</div>
                  <div className="motto-step-label">Convert</div>
                </div>
              </div>
              <div className="motto-step">
                <div className="motto-step-dot" />
                <div>
                  <div className="motto-step-number">03</div>
                  <div className="motto-step-label">Sustain</div>
                </div>
              </div>
            </aside>

            <div>
              <section
                className="motto-section section-animate"
                data-motto="capture"
              >
                <div className="motto-card">
                  <div>
                    <div className="motto-label">Our Motto · Phase 01</div>
                    <div className="motto-word">Capture</div>
                    <p className="motto-desc">
                      We begin at the source — sunlight, captured through
                      optimized PV and sensing.
                    </p>
                    <div className="motto-meta">
                      <span className="motto-chip">
                        Solar resource 
                      </span>
                      <span className="motto-chip">PV arrays &amp; sensors</span>
                    </div>
                  </div>
                  <div className="motto-visual">
                    <div className="motto-orbit" />
                    <div className="motto-glow" />
                    <div className="motto-planet" />
                  </div>
                </div>
              </section>

              <section
                className="motto-section section-animate"
                data-motto="convert"
              >
                <div className="motto-card">
                  <div>
                    <div className="motto-label">Our Motto · Phase 02</div>
                    <div className="motto-word">Convert</div>
                    <p className="motto-desc">
                      Transforming photons to usable energy with PE, inverters &amp;
                      smart control.
                    </p>
                    <div className="motto-meta">
                      <span className="motto-chip">Power electronics</span>
                      <span className="motto-chip">Smart inverters</span>
                    </div>
                  </div>
                  <div className="motto-visual">
                    <div className="motto-orbit" />
                    <div className="motto-glow" />
                    <div className="motto-planet" />
                  </div>
                </div>
              </section>

              <section
                className="motto-section section-animate"
                data-motto="sustain"
              >
                <div className="motto-card">
                  <div>
                    <div className="motto-label">Our Motto · Phase 03</div>
                    <div className="motto-word">Sustain</div>
                    <p className="motto-desc">
                      Driving long-term adoption through outreach, analytics, and
                      campus projects.
                    </p>
                    <div className="motto-meta">
                      <span className="motto-chip">Sustainability</span>
                      <span className="motto-chip">Community impact</span>
                    </div>
                  </div>
                  <div className="motto-visual">
                    <div className="motto-orbit" />
                    <div className="motto-glow" />
                    <div className="motto-planet" />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* INFO SECTION */}
        <section id="about" className="info-section">
          <div className="section-inner section-animate">
            <div>
              <div className="section-title">The Chapter</div>
              <h2 className="section-heading">
                Solar Energy Society of India · VIT Vellore
              </h2>
              <p className="section-intro">
                SESI VIT is a student chapter that brings together engineers,
                designers, and innovators passionate about solar energy and
                sustainability. We exist to bridge the gap between classroom
                concepts and real, impactful solar solutions.
              </p>
            </div>

            <div className="info-grid">
              <div className="info-orbit-system">
                <div className="info-orbit-grid" />
                <div className="info-orbit-beam info-orbit-beam-1" />
                <div className="info-orbit-beam info-orbit-beam-2" />
                <div className="info-orbit-beam info-orbit-beam-3" />
                
                <div className="info-rocket" />
              </div>

              <article className="info-card info-card--left">
                <div className="info-card-header">
                  <div className="info-icon info-icon--sesi" />
                  <div>
                    <div className="info-label">About SESI</div>
                    <h3 className="info-heading">
                      National body for solar enthusiasts
                    </h3>
                  </div>
                </div>
                <p className="info-body">
                  The Solar Energy of India (SESI), established in 1978, having its Secretariat in New Delhi, is the Indian Section of the International Solar Energy Society (ISES). Its interests cover all aspects of renewable energy, including characteristics, effects and methods of use, and it provides a common ground to all those concerned with the nature and utilization of this renewable non-polluting resource.
The Society is interdisciplinary in nature, with most of the leading energy researchers and manufacturers of renewable energy systems and devices of the country as its members. High academic attainments are not a prerequisite for membership and any person engaged in research, development or utilization of renewable energy or in fields related to renewable energy and interested in the promotion of renewable energy utilization can become a member of the society.

                </p>
              </article>

              <article className="info-card info-card--right">
                <div className="info-card-header">
                  <div className="info-icon info-icon--vit" />
                  <div>
                    <div className="info-label">SESI at VIT</div>
                    <h3 className="info-heading">A living lab for solar innovation</h3>
                  </div>
                </div>
                <p className="info-body">
                  The Solar Energy of India, Vellore Institute of Technology (SESI-VIT) is the official student chapter of the Solar Energy Society of India in Vellore Institute of Technology in Vellore, Tamil Nadu. It focuses on raising awareness, encouraging innovation, and supporting research in renewable energy among students at VIT Vellore. Our chapter shares the mission of SESI and ISES. We bring together enthusiastic individuals from various fields to explore sustainable energy solutions through workshops, events, technical sessions, projects, and outreach activities. SESI-VIT is open to everyone. It serves as a platform to learn, collaborate, and guide the shift to a greener future.
                </p>
              </article>

              <article id="join" className="info-card info-card--left">
                <div className="info-card-header">
                  <div className="info-icon info-icon--join" />
                  <div>
                    <div className="info-label">Why join us?</div>
                    <h3 className="info-heading">Turn curiosity into clean impact</h3>
                  </div>
                </div>
                <p className="info-body">
                  SESI isn’t just another logo on your resume — it’s a place to
                  build things that change how energy is seen and used on
                  campus.
                </p>
                <ul className="info-list">
                  <li>
                    <span className="info-bullet" />
                    <span>
                      Work in interdisciplinary teams on real solar installations
                      &amp; simulations.
                    </span>
                  </li>
                  <li>
                    <span className="info-bullet" />
                    <span>
                      Guidance from mentors, alumni, and faculty passionate
                      about energy.
                    </span>
                  </li>
                  <li>
                    <span className="info-bullet" />
                    <span>
                      Present your work in events, competitions, and SESI
                      platforms.
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;

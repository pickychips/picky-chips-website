import React, { useEffect, useState } from 'react';

// INSTRUCTIONS:
// This component now automatically checks localStorage for a 'custom_logo_url'.
// You can set this via the Dashboard > Settings page in the UI.
// Alternatively, you can hardcode a fallback URL below.
const HARDCODED_LOGO_URL = ""; 

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for a custom logo set via the UI
    const storedLogo = localStorage.getItem('custom_logo_url');
    if (storedLogo) {
      setCustomLogo(storedLogo);
    }
  }, []);

  // Priority: 1. UI Setting (LocalStorage), 2. Hardcoded Constant, 3. Default SVG
  const activeLogoUrl = customLogo || HARDCODED_LOGO_URL;

  if (activeLogoUrl) {
    return (
      <img 
        src={activeLogoUrl} 
        alt="Company Logo" 
        className={`object-contain ${className}`} 
      />
    );
  }

  // PHOTOREALISTIC GOLD STETHOSCOPE
  // Uses multi-layered paths to simulate 3D tube volume and lighting
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      fill="none" 
      className={className}
      style={{ overflow: 'visible' }} // Allow glow to spill over
    >
      <defs>
        {/* Main Body Gold Gradient */}
        <linearGradient id="goldBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#F9F295" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#F9F295" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>

        {/* Darker Edge for 3D depth */}
        <linearGradient id="goldShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a600d" />
          <stop offset="100%" stopColor="#5c3a05" />
        </linearGradient>

        {/* Chest Piece Radial Shine */}
        <radialGradient id="chestShine" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="20%" stopColor="#FFF8D1" stopOpacity="0.8"/>
          <stop offset="60%" stopColor="#FFD700" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#B8860B" stopOpacity="1"/>
        </radialGradient>

        {/* Glow Filter */}
        <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* 
        SHAPE DEFINITION 
        Corrected "Pretzel Loop" shape.
        1. Start at Chest Piece (Left, approx 32,45)
        2. Curve deeply down and right (Bottom loop)
        3. Curve up and left (Top inner loop)
        4. Curve down and right (Crossing over)
        5. Up to Headset (75, 25)
      */}
      <defs>
        {/* 
           M 32 45: Start at bottom of chest piece
           C 22 80, 55 92, 60 70: Curve down-left, then swoop right-bottom to start loop
           C 62 58, 45 58, 40 72:  Loop top-inner
           C 35 92, 68 95, 75 30:  Swoop under and up to headset
        */}
        <path id="tubePath" d="M 32 45 C 22 80, 55 92, 60 70 C 62 58, 45 58, 40 72 C 35 92, 68 95, 75 30" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Headset Arms */}
        <path id="headsetLeft" d="M 75 30 C 75 20, 62 23, 60 17" strokeLinecap="round" />
        <path id="headsetRight" d="M 75 30 C 75 20, 88 23, 90 17" strokeLinecap="round" />
      </defs>

      <g filter="url(#goldGlow)">
        {/* LAYER 1: Deep Shadow / Outline (Creates volume from behind) */}
        <use href="#tubePath" stroke="url(#goldShadow)" strokeWidth="7" />
        <use href="#headsetLeft" stroke="url(#goldShadow)" strokeWidth="6" />
        <use href="#headsetRight" stroke="url(#goldShadow)" strokeWidth="6" />

        {/* LAYER 2: Main Gold Body */}
        <use href="#tubePath" stroke="url(#goldBody)" strokeWidth="5" />
        <use href="#headsetLeft" stroke="url(#goldBody)" strokeWidth="4" />
        <use href="#headsetRight" stroke="url(#goldBody)" strokeWidth="4" />

        {/* LAYER 3: Specular Highlight (The "Shiny Plastic/Metal" look) */}
        <use href="#tubePath" stroke="white" strokeWidth="1.5" opacity="0.6" transform="translate(-1, -1)" fill="none" />
        <use href="#headsetLeft" stroke="white" strokeWidth="1" opacity="0.6" transform="translate(-0.5, -0.5)" fill="none" />
        <use href="#headsetRight" stroke="white" strokeWidth="1" opacity="0.6" transform="translate(-0.5, -0.5)" fill="none" />
        
        {/* EAR TIPS */}
        <circle cx="60" cy="17" r="3.5" fill="url(#goldBody)" stroke="#8a600d" strokeWidth="1" />
        <circle cx="90" cy="17" r="3.5" fill="url(#goldBody)" stroke="#8a600d" strokeWidth="1" />
        
        {/* CHEST PIECE (The Head) */}
        <g>
          {/* Outer Rim Shadow */}
          <circle cx="32" cy="40" r="11" fill="#8a600d" />
          
          {/* Main Body */}
          <circle cx="32" cy="40" r="10" fill="url(#chestShine)" />
          
          {/* Inner Rim Detail */}
          <circle cx="32" cy="40" r="7" fill="none" stroke="#F9F295" strokeWidth="1" opacity="0.8" />
          
          {/* Center Dome */}
          <circle cx="32" cy="40" r="4" fill="url(#goldBody)" />
          
          {/* Sparkle / Lens Flare (Star Shape) */}
          <path 
            d="M 32 33 L 33 38 L 38 39 L 33 42 L 32 47 L 31 42 L 26 39 L 31 38 Z" 
            fill="white" 
            opacity="0.9"
            filter="drop-shadow(0 0 2px white)"
          >
             <animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="3s" repeatCount="indefinite" additive="sum" />
          </path>
        </g>
      </g>
    </svg>
  );
};
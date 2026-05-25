import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/lib/sound';

interface CinematicCanvasProps {
  chapter: number;
  resonance: number; // 0 to 100
  speedMultiplier: number; // 0.1 to 3
  isTimeDilated: boolean; // holding space/button slows down time
  palette: 'original' | 'sunset' | 'aurora' | 'eclipse';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  originalAlpha: number;
  targetAlpha: number;
  orbitAngle?: number;
  orbitRadius?: number;
  soulType: 'leo' | 'maya' | 'ambient';
}

export function CinematicCanvas({ chapter, resonance, speedMultiplier, isTimeDilated, palette }: CinematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, isPressed: false, targetX: 0, targetY: 0 });
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }[]>([]);
  const frameRef = useRef<number>(0);
  const currentChapterRef = useRef<number>(chapter);

  useEffect(() => {
    currentChapterRef.current = chapter;
    // Play a transition sweep on sound
    sound.playTransition();
    sound.updateChapterFrequency(chapter);
  }, [chapter]);

  // Handle click sound chime
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add a ripple effect
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 150 + Math.random() * 100,
      alpha: 1.0
    });

    // Play a harmonic chime based on click vertical position
    const pitchIdx = Math.floor((1 - y / window.innerHeight) * 6);
    sound.playChime(pitchIdx);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Colors mapping
    const getColors = () => {
      switch (palette) {
        case 'sunset': return { leo: '#f97316', maya: '#ec4899' };
        case 'aurora': return { leo: '#10b981', maya: '#8b5cf6' };
        case 'eclipse': return { leo: '#eab308', maya: '#3b82f6' };
        case 'original':
        default: return { leo: '#f43f5e', maya: '#06b6d4' };
      }
    };
    const colors = getColors();

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      const tempParticles: Particle[] = [];

      // 1. Ambient Stardust (120 particles)
      for (let i = 0; i < 120; i++) {
        tempParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.5 + 0.5,
          color: '#ffffff',
          alpha: Math.random() * 0.4 + 0.1,
          originalAlpha: Math.random() * 0.4 + 0.1,
          targetAlpha: Math.random() * 0.4 + 0.1,
          soulType: 'ambient'
        });
      }

      // 2. Soul Leo (Red/Orange cluster - 80 particles)
      for (let i = 0; i < 80; i++) {
        const radius = Math.random() * 80 + 10;
        const angle = Math.random() * Math.PI * 2;
        tempParticles.push({
          x: w * 0.3 + Math.cos(angle) * radius,
          y: h * 0.5 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 3 + 1,
          color: colors.leo,
          alpha: Math.random() * 0.6 + 0.3,
          originalAlpha: Math.random() * 0.6 + 0.3,
          targetAlpha: Math.random() * 0.6 + 0.3,
          orbitAngle: angle,
          orbitRadius: radius,
          soulType: 'leo'
        });
      }

      // 3. Soul Maya (Blue/Cyan cluster - 80 particles)
      for (let i = 0; i < 80; i++) {
        const radius = Math.random() * 80 + 10;
        const angle = Math.random() * Math.PI * 2;
        tempParticles.push({
          x: w * 0.7 + Math.cos(angle) * radius,
          y: h * 0.5 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 3 + 1,
          color: colors.maya,
          alpha: Math.random() * 0.6 + 0.3,
          originalAlpha: Math.random() * 0.6 + 0.3,
          targetAlpha: Math.random() * 0.6 + 0.3,
          orbitAngle: angle,
          orbitRadius: radius,
          soulType: 'maya'
        });
      }

      particlesRef.current = tempParticles;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const ch = currentChapterRef.current;

      // Deep Space Fade Background to create trails
      ctx.fillStyle = 'rgba(10, 10, 18, 0.15)'; // Slightly trails
      ctx.fillRect(0, 0, w, h);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Base speeds
      const timeScale = isTimeDilated ? 0.15 : 1.0;
      const totalSpeed = speedMultiplier * timeScale;

      // Update and Draw Ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += 3 * timeScale;
        ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.15})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return ripple.radius < ripple.maxRadius;
      });

      // Update Particles
      particlesRef.current.forEach((p, idx) => {
        // ── Physics and Motion based on Chapters ──
        if (p.soulType === 'ambient') {
          // Drifts slowly in space
          p.x += p.vx * totalSpeed;
          p.y += p.vy * totalSpeed;

          // Wrap edges
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
          
          // Twinkle
          if (Math.random() < 0.01) {
            p.targetAlpha = Math.random() * 0.4 + 0.1;
          }
          p.alpha += (p.targetAlpha - p.alpha) * 0.05;

        } else {
          // Leo and Maya souls
          if (ch === 0) {
            // Chapter 0: Isolated orbits
            const centerX = p.soulType === 'leo' ? w * 0.3 : w * 0.7;
            const centerY = h * 0.5;
            p.orbitAngle! += 0.005 * totalSpeed * (p.soulType === 'leo' ? 1 : -1);
            
            const targetX = centerX + Math.cos(p.orbitAngle!) * p.orbitRadius!;
            const targetY = centerY + Math.sin(p.orbitAngle!) * p.orbitRadius!;
            
            p.x += (targetX - p.x) * 0.05 * totalSpeed;
            p.y += (targetY - p.y) * 0.05 * totalSpeed;
            p.alpha += (p.originalAlpha - p.alpha) * 0.05;

          } else if (ch === 1) {
            // Chapter 1: The Echo (Closer, responsive to mouse ripples)
            const centerX = p.soulType === 'leo' ? w * 0.4 : w * 0.6;
            const centerY = h * 0.5;
            p.orbitAngle! += 0.003 * totalSpeed * (p.soulType === 'leo' ? 1.2 : -0.8);
            
            let targetX = centerX + Math.cos(p.orbitAngle!) * (p.orbitRadius! * 1.3);
            let targetY = centerY + Math.sin(p.orbitAngle!) * (p.orbitRadius! * 1.3);
            
            // Mouse push/pull
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (200 - dist) / 200;
              // Attract Leo to mouse, Maya repels, creating a dance
              if (p.soulType === 'leo') {
                targetX += (dx / dist) * 80 * force;
                targetY += (dy / dist) * 80 * force;
              } else {
                targetX -= (dx / dist) * 60 * force;
                targetY -= (dy / dist) * 60 * force;
              }
            }

            p.x += (targetX - p.x) * 0.03 * totalSpeed;
            p.y += (targetY - p.y) * 0.03 * totalSpeed;
            
          } else if (ch === 2) {
            // Chapter 2: The Rainy Night (slide down like rain streaks, forming swirling ripples near mouse)
            p.vy = (p.vy + 0.1) * 0.95; // Gravity
            p.y += (2.5 + p.size * 0.5) * totalSpeed;
            p.x += Math.sin(frameRef.current * 0.01 + p.orbitRadius!) * 0.25 * totalSpeed;

            // Reset at top
            if (p.y > h) {
              p.y = -20;
              p.x = Math.random() * w;
            }

            // Mouse magnetizes rain particles to swirl around it
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
              const force = (250 - dist) / 250;
              // Add a swirling orbital force
              const angle = Math.atan2(dy, dx) + Math.PI / 2 + 0.2;
              p.x += Math.cos(angle) * 8 * force * totalSpeed;
              p.y += Math.sin(angle) * 8 * force * totalSpeed;
              p.alpha = Math.min(1.0, p.originalAlpha + 0.3);
            } else {
              p.alpha = p.originalAlpha;
            }

          } else if (ch === 3) {
            // Chapter 3: Resonance
            // Blending paths. Floating waves orbiting each other based on Resonance value
            const resFactor = resonance / 100;
            const centerX = w * 0.5;
            const centerY = h * 0.5;
            
            // Adjust orbit size and speed based on resonance
            p.orbitAngle! += (0.008 + resFactor * 0.012) * totalSpeed * (p.soulType === 'leo' ? 1 : -1);
            
            // At 100% resonance they intersect perfectly, forming a spinning heart/infinity path
            const orbitR = p.orbitRadius! * (1.8 - resFactor * 1.1);
            let targetX, targetY;

            if (p.soulType === 'leo') {
              targetX = centerX - 60 * (1 - resFactor) + Math.cos(p.orbitAngle!) * orbitR;
              targetY = centerY + Math.sin(p.orbitAngle! * 2) * (orbitR * 0.5);
            } else {
              targetX = centerX + 60 * (1 - resFactor) + Math.sin(p.orbitAngle!) * orbitR;
              targetY = centerY + Math.cos(p.orbitAngle! * 2) * (orbitR * 0.5);
            }

            p.x += (targetX - p.x) * 0.04 * totalSpeed;
            p.y += (targetY - p.y) * 0.04 * totalSpeed;

            // Pulse opacity in resonance frequency
            const pulse = Math.sin(frameRef.current * 0.05 + idx) * 0.2 * resFactor;
            p.alpha = Math.max(0.2, Math.min(1.0, p.originalAlpha + pulse));

          } else if (ch === 4) {
            // Epilogue: Constellation (completely merged in center, lines connect neighboring particles)
            const centerX = w * 0.5;
            const centerY = h * 0.45;
            
            p.orbitAngle! += 0.002 * totalSpeed * (idx % 2 === 0 ? 0.7 : -0.7);
            const targetX = centerX + Math.cos(p.orbitAngle!) * (p.orbitRadius! * 1.5);
            const targetY = centerY + Math.sin(p.orbitAngle!) * (p.orbitRadius! * 1.5);

            p.x += (targetX - p.x) * 0.03 * totalSpeed;
            p.y += (targetY - p.y) * 0.03 * totalSpeed;
            p.alpha = p.originalAlpha * 0.75;
          }
        }

        // ── Render Particles ──
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        let pColor = p.color;
        if (p.soulType === 'leo' || p.soulType === 'maya') {
          const baseColor = p.soulType === 'leo' ? colors.leo : colors.maya;
          pColor = baseColor;
          
          if (ch === 3) {
            // As resonance increases, colors blend into beautiful violet/rose
            const res = resonance / 100;
            if (p.soulType === 'leo') {
              pColor = res > 0.5 ? '#a855f7' : colors.leo; // Blends to purple
            } else {
              pColor = res > 0.5 ? '#d946ef' : colors.maya; // Blends to fuchsia
            }
          } else if (ch === 4) {
            // Fully merged stardust constellation
            pColor = idx % 2 === 0 ? '#c084fc' : '#818cf8'; // Violet and Indigo stardust
          }
        }

        ctx.fillStyle = pColor;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = ch === 3 || ch === 4 ? p.size * 2 : 0;
        ctx.shadowColor = pColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // ── Draw Constellation Lines (Only Chapter 4) ──
      if (ch === 4) {
        ctx.globalAlpha = 0.07;
        ctx.lineWidth = 1.0;
        const souls = particlesRef.current.filter(p => p.soulType !== 'ambient');

        for (let i = 0; i < souls.length; i++) {
          for (let j = i + 1; j < souls.length; j++) {
            const p1 = souls[i];
            const p2 = souls[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect nearby stars
            if (dist < 75) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              
              const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              grad.addColorStop(0, p1.color);
              grad.addColorStop(1, p2.color);
              
              ctx.strokeStyle = grad;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1.0;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [resonance, speedMultiplier, isTimeDilated, palette]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 block w-full h-full cursor-pointer z-0 select-none bg-[#07070d]"
    />
  );
}

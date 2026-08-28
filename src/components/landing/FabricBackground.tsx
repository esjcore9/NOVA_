import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

export const FabricBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking with lerping (smooth lag)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    const ripples: Ripple[] = [];
    let lastRippleTime = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;

      const now = performance.now();
      if (now - lastRippleTime > 140) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 180,
          strength: 1.0,
          speed: 1.8,
        });
        lastRippleTime = now;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial ambient ripple
    ripples.push({
      x: width * 0.5,
      y: height * 0.35,
      radius: 0,
      maxRadius: 220,
      strength: 0.8,
      speed: 1.2,
    });

    const GRID_SPACING = 28; // Spacing for fine digital-fabric micro-grid
    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.strength *= 0.985;
        if (r.radius >= r.maxRadius || r.strength <= 0.02) {
          ripples.splice(i, 1);
        }
      }

      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      // Draw Grid Nodes & Fluid Micro-deformation
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const originX = col * GRID_SPACING;
          const originY = row * GRID_SPACING;

          // 1. Organic calm-water surface wave simulation (harmonic sine/cosine)
          const wavePhaseX = originX * 0.008;
          const wavePhaseY = originY * 0.008;
          const calmWave = Math.sin(wavePhaseX + time * 0.8) * Math.cos(wavePhaseY + time * 0.6) * 3.5;
          const calmWave2 = Math.sin((originX + originY) * 0.006 - time * 0.5) * 2;

          let dispX = Math.cos(wavePhaseY + time) * calmWave;
          let dispY = calmWave + calmWave2;
          let extraGlow = 0;

          // 2. Ripple displacement from cursor interactions (mimicking water surface wavelets)
          for (let k = 0; k < ripples.length; k++) {
            const rip = ripples[k];
            const dx = originX - rip.x;
            const dy = originY - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ringDist = Math.abs(dist - rip.radius);

            if (ringDist < 45) {
              const waveEnvelope = Math.sin((1 - ringDist / 45) * Math.PI);
              const factor = (waveEnvelope * rip.strength * 7) / (1 + dist * 0.01);
              dispX += (dx / (dist || 1)) * factor;
              dispY += (dy / (dist || 1)) * factor;
              extraGlow += waveEnvelope * rip.strength * 0.6;
            }
          }

          // 3. Proximity glow to cursor
          const distToMouse = Math.hypot(originX - mouse.x, originY - mouse.y);
          const mouseGlow = Math.max(0, 1 - distToMouse / 220);

          const finalX = originX + dispX;
          const finalY = originY + dispY;

          // Alpha and color determination
          const baseAlpha = 0.12;
          const totalGlow = Math.min(1, baseAlpha + mouseGlow * 0.45 + extraGlow * 0.4);

          ctx.fillStyle = totalGlow > 0.3
            ? `rgba(185, 167, 255, ${totalGlow.toFixed(3)})` // Soft Lavender near ripples/cursor
            : `rgba(139, 92, 246, ${totalGlow.toFixed(3)})`; // Electric Violet for resting fabric

          // Render micro-cross or fine dot node
          if (mouseGlow > 0.25 || extraGlow > 0.2) {
            // Draw delicate crosshair node for illuminated fabric points
            const crossSize = 2;
            ctx.fillRect(finalX - crossSize, finalY, crossSize * 2 + 1, 1);
            ctx.fillRect(finalX, finalY - crossSize, 1, crossSize * 2 + 1);
          } else {
            // Tiny 1px dot for resting micro-grid
            ctx.fillRect(finalX, finalY, 1.2, 1.2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fabric-container" aria-hidden="true">
      {/* Ambient background glows */}
      <div className="ambient-glow-primary" />
      <div className="ambient-glow-secondary" />
      <div className="ambient-glow-tertiary" />
      
      {/* Dynamic 2D Fluid Fabric Canvas */}
      <canvas ref={canvasRef} className="fabric-canvas" />

      {/* Subtle depth overlay */}
      <div className="fabric-grid-overlay" />
    </div>
  );
};

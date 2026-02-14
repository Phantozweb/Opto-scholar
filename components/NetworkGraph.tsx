
import React, { useEffect, useRef } from 'react';
import { ArticleSummary } from '../types';

interface NetworkGraphProps {
  articles: ArticleSummary[];
  totalResults: number;
  query: string;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
}

interface Node {
  id: string;
  type: 'hub' | 'result' | 'satellite';
  label?: string;
  x: number;
  y: number;
  targetRadius: number;
  currentRadius: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
  spawnDelay: number;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ articles, totalResults, query }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>(0);
  
  // Refs for animation state to avoid closure staleness
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const frameRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);

  // Responsive check
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const THEME = {
    bg: '#0B1120',
    hub: '#008080',       // Teal Hub
    hubGlow: 'rgba(0, 128, 128, 0.4)',
    result: '#F8FAFC',    // White/Slate result
    active: '#2DD4BF',    // Bright Teal
    satellite: '#94A3B8', 
    line: 'rgba(148, 163, 184, 0.1)',
    activeLine: 'rgba(45, 212, 191, 0.5)',
    particle: 'rgba(148, 163, 184, 0.5)'
  };

  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 500;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;

    // --- A. Generate Galaxy Particles ---
    // Count scales logarithmically with results to look "stunning" but maintain performance
    // Base 150 + log scale. 5,000 results => approx 400-500 particles. 
    // We visually represent "magnitude" rather than 1:1 mapping.
    const magnitude = Math.min(totalResults, 20000);
    const particleCount = isMobile ? 100 : 150 + Math.floor(Math.sqrt(magnitude) * 3);
    
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
        // Spiral distribution for galaxy look
        const r = Math.random() * maxRadius * 1.4;
        const spiralOffset = (r / maxRadius) * Math.PI; // Twist effect
        const a = Math.random() * Math.PI * 2 + spiralOffset;

        newParticles.push({
            x: centerX + Math.cos(a) * r,
            y: centerY + Math.sin(a) * r,
            baseX: centerX,
            baseY: centerY,
            angle: a,
            radius: r,
            speed: (0.0005 + Math.random() * 0.001) * (r < maxRadius * 0.5 ? 1.5 : 1), // Inner moves faster
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.6 + 0.1,
            color: Math.random() > 0.8 ? '#2DD4BF' : '#64748B' // Occasional teal spark
        });
    }
    particlesRef.current = newParticles;

    // --- B. Generate Graph Nodes ---
    const newNodes: Node[] = [];

    // HUB
    newNodes.push({
        id: 'hub',
        type: 'hub',
        label: query,
        x: centerX,
        y: centerY,
        targetRadius: 0,
        currentRadius: 0,
        angle: 0,
        speed: 0,
        size: isMobile ? 30 : 45,
        opacity: 1,
        spawnDelay: 0
    });

    // RESULTS (Foreground Orbit)
    articles.forEach((art, i) => {
        newNodes.push({
            id: art.uid,
            type: 'result',
            label: art.title,
            x: centerX,
            y: centerY,
            targetRadius: isMobile ? maxRadius * 0.6 : maxRadius * 0.55, 
            currentRadius: 0,
            angle: (i / articles.length) * Math.PI * 2,
            speed: 0.002, 
            size: isMobile ? 6 : 8,
            opacity: 0,
            spawnDelay: 20 + (i * 10)
        });
    });

    nodesRef.current = newNodes;
    frameRef.current = 0;
    activeIndexRef.current = 0;

  }, [articles, totalResults, query, isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        // Center recalculation
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        particlesRef.current.forEach(p => { p.baseX = cx; p.baseY = cy; });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        // Update Frame
        const frame = frameRef.current++;
        const resultNodes = nodesRef.current.filter(n => n.type === 'result');
        if (frame % 250 === 0 && resultNodes.length > 0) {
            activeIndexRef.current = (activeIndexRef.current + 1) % resultNodes.length;
        }

        // 1. Draw Galaxy Particles
        particlesRef.current.forEach(p => {
            p.angle += p.speed;
            const x = centerX + Math.cos(p.angle) * p.radius;
            const y = centerY + Math.sin(p.angle) * p.radius;
            
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // 2. Nodes & Connections
        ctx.globalAlpha = 1;
        nodesRef.current.forEach(node => {
            if (frame < node.spawnDelay) return;

            // Physics
            if (node.opacity < 1) node.opacity += 0.02;
            if (node.type !== 'hub') {
                if (node.currentRadius < node.targetRadius) {
                    node.currentRadius += (node.targetRadius - node.currentRadius) * 0.05;
                }
                node.angle += node.speed;
                node.x = centerX + Math.cos(node.angle) * node.currentRadius;
                node.y = centerY + Math.sin(node.angle) * node.currentRadius;
            }

            // Draw Lines
            if (node.type === 'result') {
                const resultIndex = resultNodes.indexOf(node);
                const isActive = resultIndex === activeIndexRef.current;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(node.x, node.y);
                ctx.strokeStyle = isActive ? THEME.activeLine : THEME.line;
                ctx.lineWidth = isActive ? 1.5 : 1;
                ctx.globalAlpha = isActive ? 0.6 : 0.1;
                ctx.stroke();
            }
        });

        // 3. Draw Nodes (Hub & Results)
        nodesRef.current.forEach(node => {
            if (node.opacity <= 0.01 || frame < node.spawnDelay) return;

            if (node.type === 'hub') {
                // Glow
                const grad = ctx.createRadialGradient(node.x, node.y, node.size * 0.2, node.x, node.y, node.size + 30);
                grad.addColorStop(0, THEME.hubGlow);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size + 30, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = THEME.hub;
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Label
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const fontSize = isMobile ? 10 : 12;
                ctx.font = `700 ${fontSize}px Inter, sans-serif`;
                
                const label = node.label || '';
                const display = label.length > 10 ? label.substring(0, 9) + '..' : label;
                ctx.fillText(display, node.x, node.y);
            } else if (node.type === 'result') {
                const resultIndex = resultNodes.indexOf(node);
                const isActive = resultIndex === activeIndexRef.current;
                
                // Pulse
                const pulse = isActive ? Math.sin(frame * 0.1) * 3 : 0;
                
                ctx.fillStyle = isActive ? THEME.active : THEME.result;
                ctx.globalAlpha = node.opacity;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
                ctx.fill();

                // Active Label
                if (isActive && node.label) {
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 4;
                    
                    const fontSize = isMobile ? 12 : 14;
                    ctx.font = `600 ${fontSize}px Inter, sans-serif`;
                    const labelText = node.label.length > 40 ? node.label.substring(0, 40) + '...' : node.label;
                    const metrics = ctx.measureText(labelText);
                    const pad = 10;
                    
                    const boxX = node.x - metrics.width/2 - pad;
                    const boxY = node.y + 20;
                    
                    // Label Bg
                    ctx.fillStyle = 'rgba(255,255,255,0.9)';
                    ctx.beginPath();
                    ctx.roundRect(boxX, boxY, metrics.width + pad*2, fontSize + pad*2, 4);
                    ctx.fill();
                    
                    // Label Text
                    ctx.shadowColor = 'transparent';
                    ctx.fillStyle = '#0f172a';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.fillText(labelText, boxX + pad, boxY + pad);
                }
            }
        });

        animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [articles, totalResults, query, isMobile]);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 bg-[#0B1120] overflow-hidden rounded-2xl touch-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

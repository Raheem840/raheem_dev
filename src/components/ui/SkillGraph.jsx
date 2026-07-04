import { useEffect, useRef } from 'react';

// Each node is a skill — position and velocity are random on mount
const SKILLS = [
  'React', 'JavaScript', 'HTML/CSS', 'Python',
  'Node.js', 'PostgreSQL', 'Git', 'Tailwind',
  'TCP/IP', 'Subnetting', 'Linux', 'n8n',
  'Figma', 'REST APIs', 'Three.js', 'GSAP',
];

const CONNECTION_DISTANCE = 120; // how close two nodes must be to draw a line
const SPEED = 0.3;               // how fast nodes drift

export default function SkillGraph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // '2d' = flat drawing context (vs 'webgl' for 3D)

    // Size the canvas to its container
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Build node objects — random start position, random drift direction
    const nodes = SKILLS.map((label) => ({
      label,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED, // velocity x (-0.5 to 0.5 range, then * speed)
      vy: (Math.random() - 0.5) * SPEED, // velocity y
      radius: 3,
    }));

    let animId;

    // requestAnimationFrame loop — browser calls this ~60 times per second
    // Same concept as Three.js's useFrame — this IS what useFrame wraps
    const draw = () => {
      // Clear last frame before drawing new one
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move each node, bounce off walls
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw lines between nodes that are close enough
      // This is O(n²) — checking every pair — fine for small n like ours
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy); // Pythagoras — distance between two points

          if (dist < CONNECTION_DISTANCE) {
            // Fade the line out as distance increases — opacity 1 when touching, 0 at max dist
            const opacity = 1 - dist / CONNECTION_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(224, 255, 79, ${opacity * 0.3})`; // lime, subtle
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes and labels
      nodes.forEach((node) => {
        // Outer glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224, 255, 79, 0.06)';
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#e0ff4f';
        ctx.fill();

        // Label
        ctx.font = '9px Space Mono, monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(node.label, node.x + 8, node.y + 4);
      });

      // Schedule next frame — this is the loop
      animId = requestAnimationFrame(draw);
    };

    draw(); // kick it off

    // Cleanup — cancel the loop when component unmounts
    // Without this, the loop keeps running even after you navigate away
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []); // empty array = run once on mount, exactly like starting the loop once

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
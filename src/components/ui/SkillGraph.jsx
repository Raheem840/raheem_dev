import { useEffect, useRef } from 'react';

// Groups define BOTH color AND which skills are related
// Same-group skills are ALWAYS connected — that's the Obsidian behavior
const SKILL_GROUPS = [
  { id: 'frontend', color: '#e0ff4f', skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind', 'Three.js', 'GSAP'] },
  { id: 'backend',  color: '#4fffb0', skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'Python'] },
  { id: 'network',  color: '#b04fff', skills: ['TCP/IP', 'Subnetting', 'Linux', 'Cisco'] },
  { id: 'tools',    color: '#ff914d', skills: ['Git', 'n8n', 'Figma', 'Docker'] },
];

const SPEED = 0.35;
const NODE_RADIUS = 5;
const HOVER_DIST = 22;      // how close mouse must be to trigger hover
const CROSS_DIST = 160;     // max distance for cross-group proximity lines

export default function SkillGraph() {
  const canvasRef = useRef(null);

  // mouseRef instead of useState — we read mouse position inside the animation
  // loop 60x per second. useState would trigger 60 re-renders per second. useRef
  // gives us a mutable box that the loop can read without causing any re-renders.
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas internal resolution to match CSS size
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const PAD = 60;

    // Build nodes AFTER canvas is sized so positions are within real bounds
    const nodes = [];
    SKILL_GROUPS.forEach((group) => {
      group.skills.forEach((skill) => {
        nodes.push({
          label:   skill,
          groupId: group.id,
          color:   group.color,
          x:  PAD + Math.random() * Math.max(canvas.width  - PAD * 2, 1),
          y:  PAD + Math.random() * Math.max(canvas.height - PAD * 2, 1),
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
        });
      });
    });

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Re-clamp nodes inside new bounds on resize
      nodes.forEach((node) => {
        node.x = Math.min(Math.max(node.x, PAD), canvas.width  - PAD);
        node.y = Math.min(Math.max(node.y, PAD), canvas.height - PAD);
      });
    };
    window.addEventListener('resize', resize);

    // Helper — are two nodes in the same group?
    const related = (a, b) => a.groupId === b.groupId;

    // Track mouse on the canvas element itself (not window)
    // so coordinates are relative to the canvas, not the whole page
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Find hovered node ---
      const m = mouseRef.current;
      let hoveredNode = null;
      let closestDist = HOVER_DIST;
      nodes.forEach((node) => {
        const dist = Math.sqrt((node.x - m.x) ** 2 + (node.y - m.y) ** 2);
        if (dist < closestDist) { closestDist = dist; hoveredNode = node; }
      });

      // --- Move nodes, bounce off padded walls ---
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < PAD || node.x > canvas.width  - PAD) node.vx *= -1;
        if (node.y < PAD || node.y > canvas.height - PAD) node.vy *= -1;
      });

      // --- Draw connections ---
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isRelated  = related(a, b);
          const isHovering = hoveredNode === a || hoveredNode === b;

          let opacity   = 0;
          let lineColor = a.color;
          let lineWidth = 0.5;

          if (isRelated) {
            // Same group — always visible, dim by default
            opacity   = 0.18;
            lineColor = a.color;
            lineWidth = 0.8;
          }

          if (!isRelated && dist < CROSS_DIST) {
            // Cross-group proximity line — very subtle white
            opacity   = (1 - dist / CROSS_DIST) * 0.08;
            lineColor = '#ffffff';
            lineWidth = 0.5;
          }

          if (isHovering && isRelated) {
            // Hover on related — glow in group color, clearly visible
            opacity   = 0.75;
            lineColor = a.color;
            lineWidth = 1.5;
          }

          if (isHovering && !isRelated && dist < CROSS_DIST) {
            // Hover on cross-group proximity — raise slightly
            opacity   = 0.3;
            lineColor = '#ffffff';
            lineWidth = 1;
          }

          if (opacity > 0) {
            // Convert opacity float → 2-digit hex and append to 6-digit color string
            // e.g. opacity 0.75 → Math.round(0.75 * 255) = 191 → 'bf' → '#e0ff4fbf'
            const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lineColor + alphaHex;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      // --- Draw nodes ---
      nodes.forEach((node) => {
        const isHovered   = hoveredNode === node;
        const isConnected = hoveredNode && related(node, hoveredNode);

        // Radial gradient glow — createRadialGradient(x, y, innerRadius, x, y, outerRadius)
        // Fades from semi-transparent color at center to fully transparent at edge
        const glowR = isHovered ? 22 : isConnected ? 16 : 10;
        const grad  = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        grad.addColorStop(0, node.color + '44');
        grad.addColorStop(1, node.color + '00');
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Node dot — slightly bigger on hover
        const r = isHovered ? NODE_RADIUS + 3 : NODE_RADIUS;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : node.color;
        ctx.fill();

        // Label — bright on hover, group color when connected, dim otherwise
        ctx.font        = `${isHovered ? 'bold ' : ''}10px Space Mono, monospace`;
        ctx.fillStyle   = isHovered   ? '#ffffff'
                        : isConnected ? node.color
                        : 'rgba(255,255,255,0.35)';
        ctx.fillText(node.label, node.x + r + 6, node.y + 4);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
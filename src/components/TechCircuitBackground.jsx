import { useEffect, useRef } from "react";

const BG_COLOR = "#05070d";
const BLUE = "0, 212, 255";
const MAGENTA = "255, 62, 168";
const GRID = 90;

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const ICONS = [
  // robot head
  (ctx, s) => {
    roundRectPath(ctx, -s * 0.6, -s * 0.5, s * 1.2, s, s * 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-s * 0.25, -s * 0.05, s * 0.09, 0, Math.PI * 2);
    ctx.arc(s * 0.25, -s * 0.05, s * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-s * 0.2, s * 0.25);
    ctx.lineTo(s * 0.2, s * 0.25);
    ctx.moveTo(0, -s * 0.5);
    ctx.lineTo(0, -s * 0.72);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -s * 0.8, s * 0.07, 0, Math.PI * 2);
    ctx.stroke();
  },
  // CPU chip
  (ctx, s) => {
    ctx.strokeRect(-s * 0.4, -s * 0.4, s * 0.8, s * 0.8);
    ctx.strokeRect(-s * 0.15, -s * 0.15, s * 0.3, s * 0.3);
    [-0.55, -0.18, 0.18, 0.55].forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p * s, -s * 0.4);
      ctx.lineTo(p * s, -s * 0.58);
      ctx.moveTo(p * s, s * 0.4);
      ctx.lineTo(p * s, s * 0.58);
      ctx.moveTo(-s * 0.4, p * s);
      ctx.lineTo(-s * 0.58, p * s);
      ctx.moveTo(s * 0.4, p * s);
      ctx.lineTo(s * 0.58, p * s);
      ctx.stroke();
    });
  },
  // wifi signal
  (ctx, s) => {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(0, s * 0.35, s * (0.2 + i * 0.22), Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, s * 0.35, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
  },
  // code tag </>
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(-s * 0.15, -s * 0.35);
    ctx.lineTo(-s * 0.55, 0);
    ctx.lineTo(-s * 0.15, s * 0.35);
    ctx.moveTo(s * 0.15, -s * 0.35);
    ctx.lineTo(s * 0.55, 0);
    ctx.lineTo(s * 0.15, s * 0.35);
    ctx.stroke();
  },
  // satellite
  (ctx, s) => {
    ctx.strokeRect(-s * 0.18, -s * 0.18, s * 0.36, s * 0.36);
    ctx.strokeRect(-s * 0.75, -s * 0.22, s * 0.35, s * 0.44);
    ctx.strokeRect(s * 0.4, -s * 0.22, s * 0.35, s * 0.44);
    ctx.beginPath();
    ctx.moveTo(s * 0.18, -s * 0.1);
    ctx.lineTo(s * 0.5, -s * 0.5);
    ctx.moveTo(s * 0.4, -s * 0.65);
    ctx.lineTo(s * 0.62, -s * 0.55);
    ctx.lineTo(s * 0.5, -s * 0.35);
    ctx.stroke();
  },
  // neural network / brain
  (ctx, s) => {
    const pts = [
      [-s * 0.4, -s * 0.3],
      [0, -s * 0.5],
      [s * 0.4, -s * 0.3],
      [-s * 0.35, s * 0.3],
      [s * 0.35, s * 0.3],
      [0, 0],
    ];
    const links = [
      [0, 1], [1, 2], [0, 5], [2, 5], [3, 5], [4, 5], [0, 3], [2, 4],
    ];
    ctx.beginPath();
    links.forEach(([a, b]) => {
      ctx.moveTo(pts[a][0], pts[a][1]);
      ctx.lineTo(pts[b][0], pts[b][1]);
    });
    ctx.stroke();
    pts.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, s * 0.06, 0, Math.PI * 2);
      ctx.fill();
    });
  },
  // terminal window
  (ctx, s) => {
    roundRectPath(ctx, -s * 0.6, -s * 0.45, s * 1.2, s * 0.9, s * 0.1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s * 0.35, -s * 0.1);
    ctx.lineTo(-s * 0.1, s * 0.05);
    ctx.lineTo(-s * 0.35, s * 0.2);
    ctx.moveTo(0, s * 0.2);
    ctx.lineTo(s * 0.3, s * 0.2);
    ctx.stroke();
  },
  // rocket
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.6);
    ctx.quadraticCurveTo(s * 0.22, -s * 0.1, s * 0.16, s * 0.35);
    ctx.lineTo(-s * 0.16, s * 0.35);
    ctx.quadraticCurveTo(-s * 0.22, -s * 0.1, 0, -s * 0.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -s * 0.1, s * 0.08, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s * 0.16, s * 0.2);
    ctx.lineTo(-s * 0.35, s * 0.45);
    ctx.moveTo(s * 0.16, s * 0.2);
    ctx.lineTo(s * 0.35, s * 0.45);
    ctx.moveTo(-s * 0.1, s * 0.35);
    ctx.lineTo(0, s * 0.58);
    ctx.lineTo(s * 0.1, s * 0.35);
    ctx.stroke();
  },
  // server rack
  (ctx, s) => {
    ctx.strokeRect(-s * 0.45, -s * 0.55, s * 0.9, s * 1.1);
    [-0.28, 0.02, 0.32].forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(-s * 0.45, y * s);
      ctx.lineTo(s * 0.45, y * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-s * 0.32, (y - 0.13) * s, s * 0.03, 0, Math.PI * 2);
      ctx.fill();
    });
  },
  // shield
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.55);
    ctx.lineTo(s * 0.4, -s * 0.35);
    ctx.lineTo(s * 0.4, s * 0.1);
    ctx.quadraticCurveTo(s * 0.4, s * 0.45, 0, s * 0.6);
    ctx.quadraticCurveTo(-s * 0.4, s * 0.45, -s * 0.4, s * 0.1);
    ctx.lineTo(-s * 0.4, -s * 0.35);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s * 0.15, 0);
    ctx.lineTo(-s * 0.03, s * 0.15);
    ctx.lineTo(s * 0.2, -s * 0.15);
    ctx.stroke();
  },
  // globe
  (ctx, s) => {
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.2, s * 0.5, 0, 0, Math.PI * 2);
    ctx.moveTo(-s * 0.5, -s * 0.16);
    ctx.lineTo(s * 0.5, -s * 0.16);
    ctx.moveTo(-s * 0.5, s * 0.16);
    ctx.lineTo(s * 0.5, s * 0.16);
    ctx.stroke();
  },
];

function buildTraces(width, height) {
  const cols = Math.max(2, Math.floor(width / GRID));
  const rows = Math.max(2, Math.floor(height / GRID));
  const count = Math.max(10, Math.min(22, Math.floor((width * height) / 60000)));

  return Array.from({ length: count }, () => {
    let gx = Math.floor(Math.random() * cols);
    let gy = Math.floor(Math.random() * rows);
    const segments = 2 + Math.floor(Math.random() * 3);
    const points = [[gx, gy]];
    for (let i = 0; i < segments; i++) {
      const axis = Math.random() < 0.5 ? "x" : "y";
      const dir = Math.random() < 0.5 ? -1 : 1;
      if (axis === "x") gx = Math.min(cols, Math.max(0, gx + dir));
      else gy = Math.min(rows, Math.max(0, gy + dir));
      points.push([gx, gy]);
    }
    return {
      points: points.map(([x, y]) => [x * GRID, y * GRID]),
      progress: Math.random() * segments,
      speed: 0.01 + Math.random() * 0.016,
    };
  });
}

function buildIcons(width, height) {
  const count = Math.max(10, Math.min(16, Math.floor((width * height) / 85000)));
  const margin = 50;
  const usableW = Math.max(1, width - margin * 2);
  const usableH = Math.max(1, height - margin * 2);
  const cols = Math.ceil(Math.sqrt((count * usableW) / usableH));
  const rows = Math.ceil(count / cols);
  const cellW = usableW / cols;
  const cellH = usableH / rows;

  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push([c, r]);
    }
  }
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return cells.slice(0, count).map(([c, r]) => {
    const baseX = margin + c * cellW + cellW * (0.25 + Math.random() * 0.5);
    const baseY = margin + r * cellH + cellH * (0.25 + Math.random() * 0.5);
    return {
      draw: ICONS[Math.floor(Math.random() * ICONS.length)],
      baseX,
      baseY,
      size: 20 + Math.random() * 10,
      color: Math.random() < 0.5 ? BLUE : MAGENTA,
      driftX: 10 + Math.random() * 14,
      driftY: 8 + Math.random() * 12,
      speed: 0.15 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.3 + Math.random() * 0.3,
    };
  });
}

export default function TechCircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let traces = [];
    let icons = [];
    let animationId = null;
    let resizeTimeout = null;
    let start = performance.now();

    // The grid never changes between frames, only between resizes — draw it
    // once to an offscreen canvas and blit that each frame instead of
    // re-stroking every grid line ~60 times a second.
    const gridCanvas = document.createElement("canvas");
    const gridCtx = gridCanvas.getContext("2d");

    function buildStaticGrid(dpr) {
      gridCanvas.width = width * dpr;
      gridCanvas.height = height * dpr;
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridCtx.clearRect(0, 0, width, height);
      gridCtx.strokeStyle = `rgba(${BLUE}, 0.07)`;
      gridCtx.lineWidth = 1;
      for (let x = 0; x <= width; x += GRID) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, height);
        gridCtx.stroke();
      }
      for (let y = 0; y <= height; y += GRID) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(width, y);
        gridCtx.stroke();
      }
    }

    function drawTraces() {
      traces.forEach((trace) => {
        const totalSegments = trace.points.length - 1;
        const full = Math.floor(trace.progress);
        const partial = trace.progress - full;

        ctx.strokeStyle = `rgba(${BLUE}, 0.5)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < Math.min(full, totalSegments); i++) {
          const [x1, y1] = trace.points[i];
          const [x2, y2] = trace.points[i + 1];
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.stroke();

        let tipX;
        let tipY;
        if (full < totalSegments) {
          const [x1, y1] = trace.points[full];
          const [x2, y2] = trace.points[full + 1];
          tipX = x1 + (x2 - x1) * partial;
          tipY = y1 + (y2 - y1) * partial;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(tipX, tipY);
          ctx.stroke();
        } else {
          [tipX, tipY] = trace.points[totalSegments];
        }

        ctx.save();
        ctx.shadowColor = "#ff3ea8";
        ctx.shadowBlur = 9;
        ctx.fillStyle = `rgba(${MAGENTA}, 0.9)`;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function stepTraces() {
      traces.forEach((trace) => {
        trace.progress += trace.speed;
        if (trace.progress >= trace.points.length - 1) {
          trace.progress = 0;
        }
      });
    }

    function drawIcons(elapsed) {
      icons.forEach((icon) => {
        const t = elapsed * icon.speed + icon.phase;
        const x = icon.baseX + Math.sin(t) * icon.driftX;
        const y = icon.baseY + Math.cos(t * 0.8) * icon.driftY;
        const alpha = 0.35 + ((Math.sin(t * icon.pulseSpeed) + 1) / 2) * 0.4;

        ctx.save();
        ctx.translate(x, y);
        ctx.strokeStyle = `rgba(${icon.color}, ${alpha})`;
        ctx.fillStyle = `rgba(${icon.color}, ${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = icon.color === BLUE ? "#00d4ff" : "#ff3ea8";
        ctx.shadowBlur = 11;
        icon.draw(ctx, icon.size);
        ctx.restore();
      });
    }

    function render(elapsed) {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(gridCanvas, 0, 0, width, height);
      drawTraces();
      drawIcons(elapsed);
    }

    function frame(now) {
      stepTraces();
      render((now - start) / 1000);
      animationId = requestAnimationFrame(frame);
    }

    function performResize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStaticGrid(dpr);
      traces = buildTraces(width, height);
      icons = buildIcons(width, height);
      render(0);
    }

    // Debounce actual rebuilds so a window drag or a mobile browser's chrome
    // collapsing (both fire many resize events in quick succession) doesn't
    // regenerate every trace/icon layout on each individual event.
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(performResize, 150);
    }

    performResize();
    window.addEventListener("resize", handleResize);

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: BG_COLOR }}
      aria-hidden="true"
    />
  );
}

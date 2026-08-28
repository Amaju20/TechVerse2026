const palettes = {
  dark: {
    blue: "#00d4ff",
    magenta: "#ff3ea8",
    center: "#ffffff",
    gradient: "linear-gradient(90deg, #00d4ff, #8b7bff, #ff3ea8)",
    year: "rgba(255,255,255,0.55)",
  },
  light: {
    blue: "#0091b8",
    magenta: "#c22a90",
    center: "#0a0c14",
    gradient: "linear-gradient(90deg, #0091b8, #5a49c9, #c22a90)",
    year: "rgba(10,12,20,0.55)",
  },
};

export default function Logo({ variant = "dark", className = "" }) {
  const p = palettes[variant] ?? palettes.dark;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" className="shrink-0">
        <line x1="14" y1="14" x2="14" y2="4" stroke={p.blue} strokeWidth="1.4" />
        <line x1="14" y1="14" x2="24" y2="14" stroke={p.magenta} strokeWidth="1.4" />
        <line x1="14" y1="14" x2="14" y2="24" stroke={p.magenta} strokeWidth="1.4" />
        <line x1="14" y1="14" x2="4" y2="14" stroke={p.blue} strokeWidth="1.4" />
        <circle cx="14" cy="4" r="2.6" fill={p.blue} />
        <circle cx="24" cy="14" r="2.6" fill={p.magenta} />
        <circle cx="14" cy="24" r="2.6" fill={p.magenta} />
        <circle cx="4" cy="14" r="2.6" fill={p.blue} />
        <circle cx="14" cy="14" r="3.4" fill={p.center} />
      </svg>

      <div className="leading-none">
        <span
          className="font-display font-bold text-[15px] tracking-wide bg-clip-text text-transparent"
          style={{ backgroundImage: p.gradient }}
        >
          TECHVERSE
        </span>
        <div className="text-[9px] font-mono tracking-[0.25em] mt-0.5" style={{ color: p.year }}>
          2026
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { EVENT_NAME, EVENT_STARTS_AT, EVENT_VENUE } from "../data/sessions";

function getTimeLeft() {
  const diff = new Date(EVENT_STARTS_AT).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function EventHero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 620px 460px at 50% 50%, rgba(5,7,13,0.94) 0%, rgba(5,7,13,0.88) 35%, rgba(5,7,13,0.55) 60%, rgba(5,7,13,0) 82%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center">
        <div className="animate-fade-up flex items-center gap-2 font-label font-semibold text-eyebrow uppercase text-accent-soft mb-6">
          <MapPin size={13} aria-hidden="true" />
          {EVENT_VENUE}
        </div>

        <h1
          className="animate-fade-up font-display text-hero font-extrabold text-white tracking-tight text-glow"
          style={{ animationDelay: "0.05s" }}
        >
          {EVENT_NAME}
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-xl text-zinc-400 font-sans text-body"
          style={{ animationDelay: "0.12s" }}
        >
          Two days of workshops and talks for people who ship things ,design, engineering, and the business
          of small studios.
        </p>

        <div
          className="animate-fade-up flex items-center gap-3 md:gap-4 mt-10"
          style={{ animationDelay: "0.2s" }}
        >
          {units.map((u) => (
            <div key={u.label} className="glass rounded-xl px-4 py-3 md:px-5 md:py-4 min-w-[72px]">
              <p className="font-mono text-2xl md:text-3xl font-medium text-white tabular-nums">
                {String(u.value).padStart(2, "0")}
              </p>
              <p className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{u.label}</p>
            </div>
          ))}
        </div>

        <Link
          to="#schedule"
          className="animate-fade-up animate-pulse-glow mt-12 inline-flex items-center gap-2 bg-accent hover:bg-accent-soft text-white font-label font-semibold text-cta uppercase px-7 py-3.5 rounded-full transition-colors"
          style={{ animationDelay: "0.28s" }}
        >
          View the schedule
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

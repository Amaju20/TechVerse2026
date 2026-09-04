import { useState } from "react";
import { Clock, MapPin, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useRsvpStore } from "../store/rsvpStore";
import { EVENT_VENUE } from "../data/sessions";

const trackColor = {
  Design: "text-accent-soft bg-accent/10 border-accent/30",
  Engineering: "text-sky-300 bg-sky-500/10 border-sky-500/30",
  Business: "text-amber-300 bg-amber-500/10 border-amber-500/30",
};

export default function EventCard({ session, index = 0 }) {
  const user = useAuthStore((state) => state.user);
  const attending = useRsvpStore((state) => state.ids.includes(session.id));
  const toggleRsvp = useRsvpStore((state) => state.toggleRsvp);
  const navigate = useNavigate();
  const [justConfirmed, setJustConfirmed] = useState(false);

  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${EVENT_VENUE} ${session.room}`
  )}`;

  const handleRsvp = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const wasAttending = attending;
    toggleRsvp(session.id);
    if (wasAttending) {
      toast.info(`Removed "${session.title}" from your schedule`);
    } else {
      toast.success(`You're in — "${session.title}" added to your schedule`);
      setJustConfirmed(true);
      setTimeout(() => setJustConfirmed(false), 400);
    }
  };

  return (
    <div
      className="glass group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-[11px] font-label font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
            trackColor[session.track] || "text-zinc-300 bg-white/5 border-white/10"
          }`}
        >
          {session.track}
        </span>
        <span className="font-sans text-xs text-zinc-500">{session.date}</span>
      </div>

      <div>
        <h3 className="font-display text-card-title font-bold text-white leading-snug">{session.title}</h3>
        <p className="font-sans text-meta text-zinc-400 mt-1">
          {session.speaker} <span className="text-zinc-600">·</span> {session.role}
        </p>
      </div>

      <div className="flex flex-col gap-2 font-sans text-meta text-zinc-400 mt-auto pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-zinc-500" aria-hidden="true" />
          {session.time}
        </div>
        <a
          href={mapHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-accent-soft transition-colors w-fit"
        >
          <MapPin size={15} className="text-zinc-500" aria-hidden="true" />
          {session.room}
        </a>
      </div>

      <button
        onClick={handleRsvp}
        className={`mt-2 w-full rounded-xl py-2.5 font-label font-semibold text-cta uppercase transition-all active:scale-[0.97] focus-visible:shadow-glow-lg flex items-center justify-center gap-2 ${
          justConfirmed ? "animate-confirm-pop" : ""
        } ${
          attending
            ? "bg-white/5 border border-accent/40 text-accent-soft"
            : "bg-accent text-white shadow-glow hover:bg-accent-soft"
        }`}
      >
        {attending ? (
          <>
            <Check size={16} aria-hidden="true" /> Attending
          </>
        ) : (
          "RSVP now"
        )}
      </button>
    </div>
  );
}

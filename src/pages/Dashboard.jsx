import { useNavigate } from "react-router-dom";
import { LogOut, Clock, MapPin, CalendarX } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useRsvpStore } from "../store/rsvpStore";
import { EVENT_NAME, EVENT_VENUE, sessions } from "../data/sessions";

// A stable reference for "no RSVPs yet" — returning a fresh `[]` literal
// from inside a Zustand selector creates a new array every render, which
// looks like "the state changed" to useSyncExternalStore and causes an
// infinite render loop.
const EMPTY_IDS = [];

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function PassCode({ seed }) {
  const size = 7;
  const cells = [];
  for (let i = 0; i < size * size; i++) {
    const on = Math.abs(hashCode(`${seed}-${i}`)) % 5 < 2;
    cells.push(on);
  }
  return (
    <div
      className="grid gap-[3px] w-24 h-24 shrink-0"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      role="img"
      aria-label="Digital pass code"
    >
      {cells.map((on, i) => (
        <div key={i} className={on ? "bg-void" : "bg-transparent"} />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const attendingIds = useRsvpStore((state) => (user ? state.byUser[user._id] || EMPTY_IDS : EMPTY_IDS));
  const navigate = useNavigate();

  const mySessions = sessions.filter((s) => attendingIds.includes(s.id));
  const ticketId = user?._id ? user._id.slice(-8).toUpperCase() : "PENDING";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-2">Dashboard</p>
            <h1 className="font-display text-section font-bold text-white">
              Welcome back, {user?.name?.split(" ")[0] || "there"}.
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 font-label font-semibold text-cta uppercase text-zinc-400 hover:text-white border border-white/10 hover:border-white/25 rounded-full px-4 py-2 transition-colors"
          >
            <LogOut size={15} aria-hidden="true" />
            Log out
          </button>
        </div>

        <div className="glass glow-ring rounded-2xl overflow-hidden mb-12">
          <div className="p-7 flex items-center justify-between gap-6 flex-wrap">
            <div>
              <p className="font-label font-semibold text-[11px] uppercase tracking-widest text-accent-soft mb-1">Digital pass</p>
              <h2 className="font-display text-card-title font-bold text-white">{user?.name}</h2>
              <p className="font-sans text-meta text-zinc-500 mt-1">@{user?.username} · {user?.email}</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <PassCode seed={user?._id || user?.email || "guest"} />
            </div>
          </div>
          <div className="relative border-t border-dashed border-white/15">
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-void border border-white/10" />
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-void border border-white/10" />
          </div>
          <div className="px-7 py-5 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>{EVENT_NAME}</span>
            <span>{EVENT_VENUE}</span>
            <span className="text-accent-soft tracking-widest">#{ticketId}</span>
          </div>
        </div>

        <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-4">
          Your sessions ({mySessions.length})
        </p>

        {mySessions.length === 0 ? (
          <div className="glass rounded-2xl p-10 flex flex-col items-center text-center gap-3">
            <CalendarX size={28} className="text-zinc-600" aria-hidden="true" />
            <p className="text-white font-medium">No RSVPs yet</p>
            <p className="font-sans text-meta text-zinc-500 max-w-xs">
              Head back to the schedule and reserve your seat at a session.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mySessions.map((s) => (
              <div
                key={s.id}
                className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <p className="text-white font-medium">{s.title}</p>
                  <p className="font-sans text-meta text-zinc-500 mt-0.5">
                    {s.speaker} <span className="text-zinc-700">·</span> {s.role}
                  </p>
                </div>
                <div className="flex items-center gap-4 font-sans text-xs text-zinc-400 shrink-0">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} aria-hidden="true" />
                    {s.date}, {s.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} aria-hidden="true" />
                    {s.room}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

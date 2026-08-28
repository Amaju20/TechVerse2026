import { useState } from "react";
import { sessions } from "../data/sessions";
import EventCard from "./EventCard";

const tracks = ["All", "Design", "Engineering", "Business"];

export default function ScheduleGrid() {
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? sessions : sessions.filter((s) => s.track === filter);

  return (
    <section id="schedule" className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-2">Schedule</p>
          <h2 className="font-display text-section font-bold text-white">Two days, five sessions.</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3.5 py-1.5 rounded-full font-label font-semibold text-cta uppercase border transition-all active:scale-[0.95] ${
                filter === t
                  ? "bg-accent text-white border-accent"
                  : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((session, index) => (
          <EventCard key={session.id} session={session} index={index} />
        ))}
      </div>
    </section>
  );
}

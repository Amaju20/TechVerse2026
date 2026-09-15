import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EventHero from "../components/EventHero";
import { sessions } from "../data/sessions";

const stats = [
  { value: "2", label: "Days" },
  { value: "5", label: "Sessions" },
  { value: "300", label: "Seats, capped" },
  { value: "1", label: "Track, no parallel picks" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <EventHero />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-white">{s.value}</p>
              <p className="font-label text-[11px] uppercase tracking-widest text-zinc-500 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-2">Who's speaking</p>
            <h2 className="font-display text-section font-bold text-white">Five talks, no filler.</h2>
          </div>
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 font-label font-semibold text-cta uppercase text-white bg-white/5 border border-white/10 hover:border-white/25 focus-visible:shadow-glow px-5 py-2.5 rounded-full transition-all w-fit"
          >
            View full schedule
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sessions.map((s) => (
            <div key={s.id} className="glass rounded-2xl p-6">
              <p className="font-display text-card-title font-bold text-white leading-snug">{s.speaker}</p>
              <p className="font-sans text-meta text-zinc-500 mt-0.5">{s.role}</p>
              <p className="font-sans text-meta text-zinc-400 mt-4 leading-relaxed">{s.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

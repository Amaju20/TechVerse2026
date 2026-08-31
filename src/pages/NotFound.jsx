import { Link } from "react-router-dom";
import { Radar, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="animate-fade-up glass glow-ring rounded-2xl p-10 max-w-sm text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
          <Radar size={24} className="text-accent-soft" aria-hidden="true" />
        </div>
        <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft">404</p>
        <h1 className="font-display text-card-title font-bold text-white">
          This page isn't on our schedule.
        </h1>
        <p className="font-sans text-meta text-zinc-400">
          The link's broken, or the page never existed. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 font-label font-semibold text-cta uppercase text-white bg-accent hover:bg-accent-soft px-6 py-2.5 rounded-full shadow-glow transition-colors"
        >
          Return home
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

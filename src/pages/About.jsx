import { Mail } from "lucide-react";
import { EVENT_NAME, EVENT_VENUE_NAME, EVENT_VENUE_ADDRESS, EVENT_MAPS_URL } from "../data/sessions";
import VenueLink from "../components/VenueLink";

const values = [
  {
    title: "Capped at 300 seats",
    body: "Small enough that you'll actually talk to the people sitting next to you, not just the speakers on stage.",
  },
  {
    title: "No sales tracks",
    body: "Every session is taught by someone who ships the thing they're talking about, not a vendor pitch in disguise.",
  },
  {
    title: "One track at a time",
    body: "No parallel sessions to choose between. Everyone in the room saw the same five talks.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-24">
        <h1 className="font-display text-hero font-extrabold text-white leading-tight max-w-2xl">
          A conference for people who'd rather ship than mingle.
        </h1>

        <p className="mt-8 max-w-2xl text-zinc-400 font-sans text-body">
          {EVENT_NAME} started as a dinner conversation between five people tired of conferences that felt
          like trade shows. Two years later it's grown into two days of workshops covering design,
          engineering, and the economics of running a small studio deliberately kept small enough that
          you leave knowing people, not just business cards.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mt-14">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6">
              <h3 className="font-display text-card-title text-white font-bold mb-2">{v.title}</h3>
              <p className="font-sans text-meta text-zinc-400 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-2">Venue</p>
            <VenueLink name={EVENT_VENUE_NAME} address={EVENT_VENUE_ADDRESS} mapsUrl={EVENT_MAPS_URL} />
          </div>
          <a
            href="mailto:hello@Techverse2026.com"
            className="inline-flex items-center gap-2 font-sans text-meta font-medium text-white bg-accent hover:bg-accent-soft px-5 py-2.5 rounded-full shadow-glow transition-colors w-fit"
          >
            <Mail size={15} aria-hidden="true" />
            hello@Techverse2026.com
          </a>
        </div>
      </main>
    </div>
  );
}

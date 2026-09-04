import { MapPin, ExternalLink } from "lucide-react";

/**
 * Clickable venue pill — opens the venue in Google Maps in a new tab.
 * Used inside the "Venue" card on About and can be dropped into any
 * event/contact details card.
 */
export default function VenueLink({ name, address, mapsUrl, className = "" }) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name} on Google Maps`}
      className={`group inline-flex items-center gap-2.5 bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 rounded-2xl px-4 py-3 transition-all focus-visible:shadow-glow ${className}`}
    >
      <MapPin size={17} className="text-accent-soft shrink-0" aria-hidden="true" />

      <span className="flex flex-col min-w-0 text-left">
        <span className="font-sans text-sm font-semibold text-white truncate">{name}</span>
        <span className="font-mono text-[11px] text-zinc-500 truncate">{address}</span>
      </span>

      <ExternalLink
        size={13}
        className="text-zinc-600 group-hover:text-accent-soft transition-colors shrink-0 ml-1"
        aria-hidden="true"
      />
    </a>
  );
}

import { Link } from "react-router-dom";
import { EVENT_NAME, EVENT_VENUE } from "../data/sessions";
import Logo from "./Logo";

function XIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.2" cy="5.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6.6" cy="7" r="0.9" fill="currentColor" />
      <path d="M6.6 9.3v4.3M9.9 13.6V10c0-1 0.7-1.6 1.6-1.6s1.5 0.6 1.5 1.6v3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const socials = [
  { icon: XIcon, label: "X" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: LinkedinIcon, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row sm:items-start justify-between gap-8">
        <div className="flex flex-col gap-4">
          <Logo variant="dark" />
          <div className="flex items-center gap-4 font-label font-medium text-cta uppercase text-zinc-400">
            <Link to="/#schedule" className="hover:text-white transition-colors">
              Schedule
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/25 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-zinc-500">
          <p>
            {EVENT_NAME} · {EVENT_VENUE}
          </p>
          <p>{new Date().getFullYear()} {EVENT_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-300 transition-colors cursor-default">Privacy</span>
            <span className="hover:text-zinc-300 transition-colors cursor-default">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

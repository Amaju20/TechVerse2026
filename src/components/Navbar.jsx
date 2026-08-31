import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Logo from "./Logo";

const navLinks = [
  { to: "/#schedule", label: "Schedule" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <Logo variant="dark" />
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hidden sm:inline font-label font-medium text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-soft focus-visible:outline-offset-4 focus-visible:rounded-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {!loading &&
            (user ? (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="font-label font-semibold text-cta uppercase text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-white/25 focus-visible:shadow-glow transition-all"
                >
                  My dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Log out"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <LogOut size={17} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline font-label font-semibold text-cta uppercase text-white bg-accent px-4 py-2 rounded-full shadow-glow hover:bg-accent-soft focus-visible:shadow-glow-lg transition-all"
              >
                Login
              </Link>
            ))}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="sm:hidden text-white"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="sm:hidden glass border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="font-label font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {!loading &&
            (user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="font-label font-semibold text-cta uppercase text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded-full text-center hover:border-white/25 transition-all"
                >
                  My dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-label font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="font-label font-semibold text-cta uppercase text-white bg-accent px-4 py-2.5 rounded-full shadow-glow text-center hover:bg-accent-soft transition-all"
              >
                Login
              </Link>
            ))}
        </div>
      )}
    </header>
  );
}

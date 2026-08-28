import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Logo from "./Logo";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <Logo variant="dark" />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/#schedule"
            className="hidden sm:inline font-label font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Schedule
          </Link>
          <Link
            to="/about"
            className="hidden sm:inline font-label font-medium text-zinc-400 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hidden sm:inline font-label font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Contact
          </Link>

          {!loading &&
            (user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="font-label font-semibold text-cta uppercase text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-white/25 transition-colors"
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
                className="font-label font-semibold text-cta uppercase text-white bg-accent px-4 py-2 rounded-full shadow-glow hover:bg-accent-soft transition-colors"
              >
                Login
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
}

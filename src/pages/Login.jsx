import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../utils/getErrorMessage";
import Logo from "../components/Logo";
import PasswordField, { INPUT_CLASSES } from "../components/PasswordField";

export default function Login() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    let loggedInUser;
    try {
      loggedInUser = await login(formData.identifier, formData.password);
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    toast.success(`Welcome back, ${loggedInUser.name.split(" ")[0]}!`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex justify-center mb-8">
          <Logo variant="dark" />
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="font-display text-card-title font-bold text-white mb-1">Welcome back</h1>
          <p className="font-sans text-meta text-zinc-400 mb-7">Log in to manage your RSVPs.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Email or username
              </label>
              <input
                type="text"
                required
                name="identifier"
                autoComplete="username"
                value={formData.identifier}
                onChange={handleChange}
                className={INPUT_CLASSES}
              />
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Password
              </label>
              <PasswordField
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full bg-accent hover:bg-accent-soft disabled:opacity-50 text-white font-label font-semibold text-cta uppercase py-3 rounded-lg shadow-glow focus-visible:shadow-glow-lg transition-all flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-meta text-zinc-500 mt-6">
          No account yet?{" "}
          <Link to="/signup" className="text-accent-soft hover:text-white transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

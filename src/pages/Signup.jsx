import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import Logo from "../components/Logo";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const newUser = await signup(formData.name, formData.username, formData.email, formData.password);
      toast.success(`Welcome to Techverse, ${newUser.name.split(" ")[0]}!`);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex justify-center mb-8">
          <Logo variant="dark" />
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="font-display text-card-title font-bold text-white mb-1">Create your account</h1>
          <p className="font-sans text-meta text-zinc-400 mb-7">Reserve your seat at Techverse 2026.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                minLength={3}
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
              />
              <p className="text-[11px] text-zinc-500 mt-1.5">
                3+ characters — letters, numbers, and underscores only.
              </p>
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
              />
              <p className="text-[11px] text-zinc-500 mt-1.5">
                8+ characters, with an uppercase letter, a lowercase letter, and a number.
              </p>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full bg-accent hover:bg-accent-soft disabled:opacity-50 text-white font-label font-semibold text-cta uppercase py-3 rounded-lg shadow-glow transition-colors flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
              {submitting ? "Creating account..." : "Sign up"}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-meta text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent-soft hover:text-white transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

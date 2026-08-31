import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Check, Circle } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../utils/getErrorMessage";
import Logo from "../components/Logo";
import PasswordField, { INPUT_CLASSES } from "../components/PasswordField";

const passwordRules = [
  { label: "8+ characters", test: (pw) => pw.length >= 8 },
  { label: "Uppercase and lowercase letter", test: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
  { label: "At least one number", test: (pw) => /\d/.test(pw) },
];

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
    let newUser;
    try {
      newUser = await signup(formData.name, formData.username, formData.email, formData.password);
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    toast.success(`Welcome to Techverse, ${newUser.name.split(" ")[0]}!`);
    navigate("/dashboard");
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
                className={INPUT_CLASSES}
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
                className={INPUT_CLASSES}
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
                className={INPUT_CLASSES}
              />
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Password
              </label>
              <PasswordField
                name="password"
                minLength={8}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <ul className="mt-2 flex flex-col gap-1">
                {passwordRules.map(({ label, test }) => {
                  const met = test(formData.password);
                  return (
                    <li
                      key={label}
                      className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                        met ? "text-accent-soft" : "text-zinc-500"
                      }`}
                    >
                      {met ? (
                        <Check size={12} aria-hidden="true" />
                      ) : (
                        <Circle size={12} aria-hidden="true" />
                      )}
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full bg-accent hover:bg-accent-soft disabled:opacity-50 text-white font-label font-semibold text-cta uppercase py-3 rounded-lg shadow-glow focus-visible:shadow-glow-lg transition-all flex items-center justify-center gap-2"
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

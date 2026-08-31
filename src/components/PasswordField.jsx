import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const INPUT_CLASSES =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent focus:shadow-glow transition-all";

export default function PasswordField({ name, value, onChange, autoComplete, minLength, required = true }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        required={required}
        minLength={minLength}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`${INPUT_CLASSES} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
      >
        {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}

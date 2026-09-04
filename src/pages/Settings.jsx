import { useState } from "react";
import { Loader2, Check, Circle, User as UserIcon, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../utils/getErrorMessage";
import PasswordField, { INPUT_CLASSES } from "../components/PasswordField";

const passwordRules = [
  { label: "8+ characters", test: (pw) => pw.length >= 8 },
  { label: "Uppercase and lowercase letter", test: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
  { label: "At least one number", test: (pw) => /\d/.test(pw) },
];

export default function Settings() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const changePassword = useAuthStore((state) => state.changePassword);

  const [name, setName] = useState(user?.name || "");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");
    setSavingProfile(true);
    try {
      await updateProfile(name);
      toast.success("Profile updated");
    } catch (err) {
      setProfileError(getErrorMessage(err));
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name: field, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setSavingPassword(true);
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success("Password updated");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPasswordError(getErrorMessage(err));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-2">Settings</p>
        <h1 className="font-display text-section font-bold text-white mb-10">Account</h1>

        <form onSubmit={handleProfileSubmit} className="glass rounded-2xl p-7 flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <UserIcon size={16} className="text-accent-soft" aria-hidden="true" />
            <h2 className="font-display text-card-title font-bold text-white">Profile</h2>
          </div>

          <div>
            <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={INPUT_CLASSES}
            />
          </div>

          <div>
            <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
              Username
            </label>
            <input type="text" disabled value={user?.username || ""} className={`${INPUT_CLASSES} opacity-50`} />
          </div>

          <div>
            <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
              Email
            </label>
            <input type="text" disabled value={user?.email || ""} className={`${INPUT_CLASSES} opacity-50`} />
          </div>

          {profileError && <p className="text-xs text-red-400">{profileError}</p>}

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-1 w-fit bg-accent hover:bg-accent-soft disabled:opacity-50 text-white font-label font-semibold text-cta uppercase px-6 py-2.5 rounded-full shadow-glow focus-visible:shadow-glow-lg transition-all flex items-center justify-center gap-2"
          >
            {savingProfile && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
            {savingProfile ? "Saving..." : "Save profile"}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="glass rounded-2xl p-7 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Lock size={16} className="text-accent-soft" aria-hidden="true" />
            <h2 className="font-display text-card-title font-bold text-white">Change password</h2>
          </div>

          <div>
            <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
              Current password
            </label>
            <PasswordField
              name="currentPassword"
              autoComplete="current-password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
              New password
            </label>
            <PasswordField
              name="newPassword"
              minLength={8}
              autoComplete="new-password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
            <ul className="mt-2 flex flex-col gap-1">
              {passwordRules.map(({ label, test }) => {
                const met = test(passwordForm.newPassword);
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-1.5 text-[11px] transition-colors ${
                      met ? "text-accent-soft" : "text-zinc-500"
                    }`}
                  >
                    {met ? <Check size={12} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>

          {passwordError && <p className="text-xs text-red-400">{passwordError}</p>}

          <button
            type="submit"
            disabled={savingPassword}
            className="mt-1 w-fit bg-accent hover:bg-accent-soft disabled:opacity-50 text-white font-label font-semibold text-cta uppercase px-6 py-2.5 rounded-full shadow-glow focus-visible:shadow-glow-lg transition-all flex items-center justify-center gap-2"
          >
            {savingPassword && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
            {savingPassword ? "Updating..." : "Update password"}
          </button>
        </form>
      </main>
    </div>
  );
}

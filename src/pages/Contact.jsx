import { useState } from "react";
import { toast } from "react-toastify";
import {
  Mail,
  Clock,
  MapPin,
  Send,
  User,
  MessageSquare,
  MessageCircle,
  Briefcase,
  Newspaper,
  Mic,
} from "lucide-react";
import { EVENT_VENUE } from "../data/sessions";

const CONTACT_EMAIL = "johnsonamaju@gmail.com";

const categories = [
  { id: "general", label: "General", icon: MessageCircle },
  { id: "sponsorship", label: "Sponsorship", icon: Briefcase },
  { id: "press", label: "Press", icon: Newspaper },
  { id: "speaking", label: "Speaking", icon: Mic },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    category: "general",
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const selectCategory = (id) => {
    setFormData((prev) => ({ ...prev, category: id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Enter your name";
    if (!formData.email.trim()) nextErrors.email = "Enter your email";
    if (!formData.message.trim()) nextErrors.message = "Enter a message";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const categoryLabel = categories.find((c) => c.id === formData.category)?.label || "General";
    const subject = encodeURIComponent(`[${categoryLabel}] Message from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    toast.success("Opening your email client...");
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-6 pt-40 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <div className="animate-fade-up">
            <p className="font-label font-semibold text-eyebrow uppercase text-accent-soft mb-3">
              Get in touch
            </p>
            <h1 className="font-display text-hero font-extrabold text-white leading-tight">
              Let's talk.
            </h1>
            <p className="mt-5 max-w-md text-zinc-400 font-sans text-body">
              Questions about tickets, partnering with us, covering the event, or speaking on stage. Tell us which, and we'll route it to the right person.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-flex items-center gap-2 font-label font-semibold text-cta uppercase text-white bg-accent hover:bg-accent-soft px-5 py-2.5 rounded-full shadow-glow transition-colors w-fit"
            >
              <Mail size={15} aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 font-sans text-meta text-zinc-400">
                <Clock size={16} className="text-accent-soft shrink-0" aria-hidden="true" />
                We typically reply within 2 business days.
              </div>
              <div className="flex items-center gap-3 font-sans text-meta text-zinc-400">
                <MapPin size={16} className="text-accent-soft shrink-0" aria-hidden="true" />
                {EVENT_VENUE}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="animate-fade-up glass glow-ring rounded-2xl p-7 sm:p-8 flex flex-col gap-5"
            style={{ animationDelay: "0.1s" }}
          >
            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-2.5">
                What's this about?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectCategory(id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-label font-medium text-tagline uppercase transition-all active:scale-[0.97] ${
                      formData.category === id
                        ? "bg-accent/15 border-accent/50 text-accent-soft"
                        : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
                />
              </div>
              {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-label font-semibold text-eyebrow uppercase text-zinc-500 mb-1.5">
                Message
              </label>
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-zinc-500" aria-hidden="true" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-1 w-full bg-accent hover:bg-accent-soft text-white font-label font-semibold text-cta uppercase py-3 rounded-lg shadow-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Send size={15} aria-hidden="true" />
              Send message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

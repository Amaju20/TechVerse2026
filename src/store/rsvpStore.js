import { create } from "zustand";

const STORAGE_KEY = "pulse_rsvps";

// Stored shape: { [userId]: sessionId[] } — keyed per user so one account's
// RSVPs never show up under a different account on the same browser.
function loadAll() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export const useRsvpStore = create((set) => ({
  byUser: loadAll(),

  toggleRsvp: (userId, sessionId) =>
    set((state) => {
      const current = state.byUser[userId] || [];
      const next = current.includes(sessionId)
        ? current.filter((id) => id !== sessionId)
        : [...current, sessionId];
      const nextByUser = { ...state.byUser, [userId]: next };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextByUser));
      } catch {
        // localStorage unavailable (e.g. private browsing) — state still
        // updates for this session, it just won't persist across reloads.
      }
      return { byUser: nextByUser };
    }),
}));

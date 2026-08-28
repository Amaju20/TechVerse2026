import { create } from "zustand";

const STORAGE_KEY = "pulse_rsvps";

function loadInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export const useRsvpStore = create((set) => ({
  attending: loadInitial(),

  toggleRsvp: (sessionId) =>
    set((state) => {
      const next = new Set(state.attending);
      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return { attending: next };
    }),
}));

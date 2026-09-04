import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";

// RSVPs live in the real database now (GET/POST /api/rsvps), scoped to
// the logged-in user by their session cookie — no more per-user keying
// needed on the frontend, and no localStorage.
const EMPTY_IDS = [];

export const useRsvpStore = create((set, get) => ({
  ids: EMPTY_IDS,
  loaded: false,

  // Called on app mount and right after login/signup — a 401 here just
  // means "not logged in yet", not a real failure, so it resolves to an
  // empty list rather than surfacing an error.
  loadRsvps: async () => {
    try {
      const res = await axiosInstance.get("/rsvps");
      set({ ids: res.data.sessionIds, loaded: true });
    } catch {
      set({ ids: EMPTY_IDS, loaded: true });
    }
  },

  clearRsvps: () => set({ ids: EMPTY_IDS, loaded: false }),

  toggleRsvp: async (sessionId) => {
    const wasAttending = get().ids.includes(sessionId);

    // Optimistic update — the UI flips immediately; if the request fails
    // we roll it back below rather than making every RSVP click wait on
    // a round trip.
    set((state) => ({
      ids: wasAttending ? state.ids.filter((id) => id !== sessionId) : [...state.ids, sessionId],
    }));

    try {
      await axiosInstance.post(`/rsvps/${sessionId}`);
    } catch {
      set((state) => ({
        ids: wasAttending ? [...state.ids, sessionId] : state.ids.filter((id) => id !== sessionId),
      }));
      toast.error("Couldn't update your RSVP — try again");
    }
  },
}));

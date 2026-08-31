import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  loadUser: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ user: res.data.user, loading: false });
    } catch (err) {
      // Only a genuine 401 means the session is actually invalid — a network
      // error, timeout, or transient server error doesn't mean the user is
      // logged out, so don't clear anything on those.
      if (err.response?.status === 401) {
        set({ user: null, loading: false });
      } else {
        set({ loading: false });
      }
    }
  },

  login: async (identifier, password) => {
    const res = await axiosInstance.post("/auth/login", { identifier, password });
    set({ user: res.data.user });
    return res.data.user;
  },

  signup: async (name, username, email, password) => {
    const res = await axiosInstance.post("/auth/signup", { name, username, email, password });
    set({ user: res.data.user });
    return res.data.user;
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      // Even if the request fails, still clear local state below — the user
      // clicked logout and expects to be logged out client-side regardless.
    }
    set({ user: null });
    toast.info("Logged out");
  },
}));

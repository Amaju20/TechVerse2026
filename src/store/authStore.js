import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true,

  loadUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ user: res.data.user, loading: false });
    } catch (err) {
      localStorage.removeItem("token");
      set({ token: null, user: null, loading: false });
    }
  },

  login: async (identifier, password) => {
    const res = await axiosInstance.post("/auth/login", { identifier, password });
    localStorage.setItem("token", res.data.token);
    set({ token: res.data.token, user: res.data.user });
    return res.data.user;
  },

  signup: async (name, username, email, password) => {
    const res = await axiosInstance.post("/auth/signup", { name, username, email, password });
    localStorage.setItem("token", res.data.token);
    set({ token: res.data.token, user: res.data.user });
    return res.data.user;
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
    toast.info("Logged out");
  },
}));

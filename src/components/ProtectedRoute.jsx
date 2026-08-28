import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-accent-soft animate-spin-reverse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

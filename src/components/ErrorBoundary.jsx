import { Component } from "react";
import { AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-void px-6">
          <div className="glass rounded-2xl p-8 max-w-sm text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <AlertTriangle size={22} className="text-accent-soft" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-card-title font-bold text-white mb-2">Something broke</h1>
              <p className="font-sans text-meta text-zinc-400">
                An unexpected error occurred. Reloading usually fixes it.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-1 font-label font-semibold text-cta uppercase text-white bg-accent hover:bg-accent-soft px-6 py-2.5 rounded-full shadow-glow transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, send directly to dashboard
    if (user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* background glow objects */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-royal blur-[120px] opacity-60 animate-float-slow" />
      <div className="pointer-events-none absolute right-[-5rem] bottom-10 h-72 w-72 rounded-full bg-gold/15 blur-[100px] animate-float-slower" />

      {/* Sparkles */}
      {[
        { top: "15%", left: "10%", delay: "0s" },
        { top: "75%", left: "20%", delay: "1.2s" },
        { top: "25%", left: "80%", delay: "0.5s" },
        { top: "80%", left: "85%", delay: "1.8s" },
      ].map((s, i) => (
        <span
          key={i}
          className="sparkle-dot absolute block h-1.5 w-1.5 rounded-full bg-gold/70 animate-sparkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

      <div className="w-full max-w-md animate-reveal-up">
        {/* Logo / Branding header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full glass">
              <span className="font-display text-gold-gradient text-xl">I</span>
            </span>
            <span className="font-display text-2xl tracking-wide">Invite Studio</span>
          </Link>
          <p className="mt-3 text-sm text-foreground/50 uppercase tracking-[0.2em]">
            Sign in to your luxury workspace
          </p>
        </div>

        {/* Card panel */}
        <div className="glass-strong gradient-border rounded-3xl p-8 sm:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          <h2 className="font-display text-2xl text-center mb-6 text-foreground">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-6 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 outline-none transition focus:border-gold/50 focus:bg-white/10"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-foreground/60">
                  Password
                </label>
                <a href="#" className="text-xs text-gold/80 hover:text-gold transition">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 outline-none transition focus:border-gold/50 focus:bg-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold btn-gold-hover w-full py-3.5 mt-2 text-sm select-none"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-noir" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-foreground/50 border-t border-white/10 pt-6">
            New to Invite Studio?{" "}
            <Link to="/register" className="text-gold/85 hover:text-gold font-semibold transition">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

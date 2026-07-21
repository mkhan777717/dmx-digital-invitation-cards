import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X, User, LayoutDashboard, Compass, CreditCard, Mail } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="font-display text-sm tracking-widest text-gold animate-glow-pulse">
            LOADING STUDIO...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const navLinks = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Templates", to: "/templates", icon: Compass },
    { label: "My Invitations", to: "/my-invitations", icon: Mail },
    { label: "Profile & Settings", to: "/profile", icon: User },
  ];

  const handleSignOut = async () => {
    try {
      await logout();
      navigate({ to: "/" });
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* Background radial gradients for consistency with landing page */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-royal/30 blur-[150px]" />
        <div className="absolute right-[-10rem] top-1/3 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <header className="relative z-40 border-b border-white/5 bg-noir/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/dashboard" className=" animate-slide-left flex items-center gap-3 floating text">
            <span className="grid h-9 w-9 place-items-center rounded-full glass">
              <span className="font-display text-gold-gradient text-base font-semibold">I</span>
            </span>
            <span className="font-display text-lg tracking-wide shimmer-text">Invite Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex animate-fade-up">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`animate-slide-right flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-all duration-500 hover:-translate-y-0.5 ${isActive
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-foreground/70 border border-transparent hover:bg-white/5 hover:text-foreground"
                    }`}
                  style={{
                    animationDelay: `${navLinks.indexOf(link) * 120}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <link.icon size={13} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Actions */}
          <div className=" animate-slide-right hidden items-center gap-4 md:flex">
            <span className="text-xs text-foreground/60">
              Logged in as <span className="text-gold font-medium">{user.userName || user.email}</span>
            </span>
            <button
              onClick={handleSignOut}
              className="animate-fade-up flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-foreground/70 hover:border-gold/30 hover:text-foreground hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="animate-slide-right rounded-lg p-2 text-foreground/75 hover:bg-white/5 hover:text-foreground md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-full z-40 border-b border-white/5 bg-noir/95 backdrop-blur-lg p-6 animate-fade-up md:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`animate-slide-left flex items-center gap-3 rounded-2xl p-3 text-sm transition-all duration-500 hover:translate-x-1 ${isActive
                      ? "bg-gold/15 text-gold font-medium border border-gold/20"
                      : "text-foreground/80 hover:bg-white/5"
                      }`}
                    style={{
                      animationDelay: `${navLinks.indexOf(link) * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center justify-between p-2">
                <span className="text-xs text-foreground/50">
                  {user.userName || user.email}
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main workspace area */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 py-10 animate-fade-up">
        {children}
      </main>

      {/* Luxury dashboard footer */}
      <footer className="relative z-10 border-t border-white/5 bg-noir/20 py-8 text-center text-xs text-foreground/40 animate-fade-up">
        <p>© {new Date().getFullYear()} Invite Studio. Crafted with luxury guidelines.</p>
      </footer>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { User, Lock, CreditCard, CheckCircle2, ShieldCheck, Mail, Key } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const [username, setUsername] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notification, setNotification] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setNotification("Profile details updated successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  const tabs = [
    { id: "profile", label: "General", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
  ];

  const plans = [
    { name: "Essential", price: "$19", desc: "Perfect for intimate family events.", features: ["3 invitations / month", "RSVP tracking", "Standard audio soundtrack", "Email support"] },
    { name: "Signature", price: "$49", desc: "Recommended for weddings & large scale events.", features: ["Unlimited invites", "Full luxury template catalog", "Dynamic ambient audio presets", "Detailed guest count analytics", "Priority concierge assistance"], active: true },
    { name: "Atelier", price: "Custom", desc: "For brands, high-profile galas & art galleries.", features: ["Bespoke tailored assets", "Custom typography & motif matching", "Envelope printed deliveries", "24/7 dedicated support representative"] }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-reveal-up max-w-5xl mx-auto">
        {/* Header */}
        <div className="border-b border-white/5 pb-8">
          <h1 className="font-display text-4xl text-foreground">
            Bespoke <em className="text-gold-gradient not-italic">Settings</em>
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Configure your publisher details, security keys, and monthly subscription tiers.
          </p>
        </div>

        {/* Outer Tabs Shell */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_3fr]">
          {/* Vertical Menu Buttons */}
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-2xl p-4 text-xs uppercase tracking-widest text-left transition ${
                    isSelected
                      ? "bg-gold/10 text-gold border border-gold/20"
                      : "bg-white/5 text-foreground/75 border border-white/5 hover:border-white/20"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form/Details Panel */}
          <div className="glass gradient-border rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-noir/20">
            {notification && (
              <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3.5 text-xs text-emerald-400">
                {notification}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <h3 className="font-display text-2xl text-foreground border-b border-white/5 pb-4">
                  General Profile Info
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-foreground/60">
                      Studio Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-foreground/60">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-gold btn-gold-hover !py-3 !px-8 text-xs uppercase tracking-widest">
                    Save General Changes
                  </button>
                </div>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-foreground border-b border-white/5 pb-4">
                  Credentials & Shield
                </h3>

                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-foreground/60">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-foreground/60">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-foreground/60">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => {
                      setNotification("Security password keys modified successfully!");
                      setTimeout(() => setNotification(""), 3000);
                    }}
                    className="btn-gold btn-gold-hover !py-3 !px-8 text-xs uppercase tracking-widest"
                  >
                    Modify Passwords
                  </button>
                </div>
              </div>
            )}

            {/* Billing / Plans Tab */}
            {activeTab === "billing" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="font-display text-2xl text-foreground">
                    Subscription Studio Tiers
                  </h3>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-[10px] uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5 animate-pulse">
                    <ShieldCheck size={12} />
                    Active: Signature Tier
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {plans.map((p) => (
                    <div
                      key={p.name}
                      className={`rounded-2xl p-5 border flex flex-col justify-between ${
                        p.active
                          ? "border-gold/50 bg-gold/5"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div>
                        <h4 className="font-display text-lg text-foreground">{p.name}</h4>
                        <p className="text-[10px] text-foreground/50 mt-1">{p.desc}</p>
                        <div className="my-4 flex items-end gap-1">
                          <span className="font-display text-3xl text-gold-gradient font-bold">{p.price}</span>
                          {p.price !== "Custom" && <span className="text-[10px] text-foreground/45 mb-1.5">/mo</span>}
                        </div>
                        <ul className="space-y-2 mt-4 pt-4 border-t border-white/5 text-[11px] text-foreground/80 leading-normal">
                          {p.features.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 size={12} className="text-gold shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!p.active && (
                        <button
                          onClick={() => {
                            setNotification(`Request to modify subscription to ${p.name} tier submitted.`);
                            setTimeout(() => setNotification(""), 3000);
                          }}
                          className="mt-6 w-full rounded-full border border-white/10 py-2 text-[10px] uppercase tracking-widest text-foreground/70 hover:border-gold hover:text-gold transition font-medium"
                        >
                          Select Plan
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

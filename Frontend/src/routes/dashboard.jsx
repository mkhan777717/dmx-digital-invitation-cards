import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { invitationService } from "../services/invitation.service";
import { templateService } from "../services/template.service";
import { Plus, ArrowRight, Eye, Edit2, Trash2, Calendar, FileText, CheckCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const titleRef = useRef(null);

  function Typewriter({ text, speed = 40 }) {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      let i = 0;

      const timer = setInterval(() => {
        setDisplay(text.slice(0, i + 1));
        i++;

        if (i >= text.length) clearInterval(timer);
      }, speed);

      return () => clearInterval(timer);
    }, [text, speed]);

    return (
      <span>
        {display}
        <span className="animate-pulse text-gold">|</span>
      </span>
    );
  }
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [invs, tpls] = await Promise.all([
          invitationService.getInvitations(),
          templateService.getTemplates()
        ]);
        setInvitations(invs);
        setTemplates(tpls);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this invitation?")) {
      try {
        await invitationService.deleteInvitation(id);
        const updated = await invitationService.getInvitations();
        setInvitations(updated);
      } catch (err) {
        alert("Failed to delete invitation");
      }
    }
  };

  const getTemplateImage = (tplId) => {
    const tpl = templates.find((t) => t._id === tplId);
    return tpl ? tpl.previewImage : "";
  };

  const getTemplateTitle = (tplId) => {
    const tpl = templates.find((t) => t._id === tplId);
    return tpl ? tpl.title : "Luxury Template";
  };

  // Compute Stats
  const totalInvites = invitations.length;
  const publishedInvites = invitations.filter((i) => i.status === "Published").length;
  const pendingInvites = invitations.filter((i) => i.paymentStatus === "Pending").length;
  // Mock page views
  const mockPageViews = totalInvites * 342 + 45;

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-reveal-up">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-8">
          <div>
            <h1
              ref={titleRef}
              className="animate-slide-left floating-text font-display text-4xl text-foreground"
            >
              <Typewriter text="Your Studio" speed={35} /><em className="text-gold-gradient not-italic">Dashboard</em>
            </h1>
            <p className="animate-slide-right mt-2 text-sm text-foreground/60">
              Manage your bespoke digital invitation campaigns and templates.
            </p>
          </div>
          <Link to="/templates" className="animate-fade-up btn-gold btn-gold-hover self-start text-xs uppercase tracking-widest gap-2">
            <Plus size={14} />
            Create Invitation
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Campaigns", val: totalInvites, desc: "Created campaigns", icon: FileText },
            { label: "Live Invitations", val: publishedInvites, desc: "Published and active", icon: CheckCircle },
            { label: "Pending Payments", val: pendingInvites, desc: "Awaiting settlement", icon: Clock },
            { label: "Estimated Page Views", val: totalInvites > 0 ? mockPageViews.toLocaleString() : 0, desc: "Total guest impressions", icon: Eye },
          ].map((stat, i) => (
            <div key={i} className="glass gradient-border rounded-3xl p-6 relative overflow-hidden animate-fade-up hover:-translate-y-1 transition animate-fade-up hover:-translate-y-1 duration-500"
              style={{
                animationDelay: `${i * 120}ms`,
                animationFillMode: "both",
              }}>
              <div className="absolute right-4 top-4 text-gold/30">
                <stat.icon size={22} />
              </div>
              <p className="animate-slide-right text-xs uppercase tracking-widest text-foreground/50">{stat.label}</p>
              <h3 className="animate-slide-left mt-4 font-display text-3xl text-gold-gradient">{stat.val}</h3>
              <p className="animate-slide-right mt-2 text-xs text-foreground/40">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Invitations Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Recent Invitations */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="animate-slide-left font-display text-2xl text-foreground">Recent Campaigns</h2>
              {invitations.length > 0 && (
                <Link to="/my-invitations" className="text-xs text-gold/80 hover:text-gold flex items-center gap-1 transition">
                  View All <ArrowRight size={12} />
                </Link>
              )}
            </div>

            {loading ? (
              <div className="glass rounded-3xl p-10 flex justify-center items-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              </div>
            ) : invitations.length === 0 ? (
              <div className="glass rounded-3xl p-10 text-center border border-dashed border-white/10">
                <p className="text-sm text-foreground/50 mb-6">No invitation campaigns created yet.</p>
                <Link to="/templates" className="btn-gold btn-gold-hover text-xs uppercase tracking-widest">
                  Browse Templates
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.slice(0, 3).map((inv) => (
                  <div key={inv._id} className="glass gradient-border rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center justify-between hover:border-gold/30 transition">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden bg-noir border border-white/10 shrink-0">
                        <img
                          src={getTemplateImage(inv.templateId)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gold">
                          {getTemplateTitle(inv.templateId)}
                        </span>
                        <h4 className="animate-slide-left font-display text-lg text-foreground mt-1 truncate">
                          {inv.eventDetails.brideName && inv.eventDetails.groomName
                            ? `${inv.eventDetails.brideName} & ${inv.eventDetails.groomName}`
                            : inv.eventDetails.celebrantName || inv.eventDetails.eventTitle || "Bespoke Invitation"}
                        </h4>
                        <p className="animate-slide-right text-xs text-foreground/45 flex items-center gap-1 mt-1">
                          <Calendar size={11} /> {inv.eventDetails.date || "Date Undefined"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                      {/* Status Pills */}
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-semibold border ${inv.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}>
                          {inv.status}
                        </span>
                        <span className="text-[10px] text-foreground/40">
                          Payment: <span className={inv.paymentStatus === "Paid" ? "text-emerald-400" : "text-amber-400"}>{inv.paymentStatus}</span>
                        </span>
                      </div>

                      {/* Actions Buttons */}
                      <div className="flex gap-2">
                        {inv.status === "Published" && (
                          <Link
                            to={`/invitations/${inv._id}`}
                            className="p-2.5 rounded-full glass hover:text-gold transition border border-white/10"
                            title="View Live Website"
                          >
                            <Eye size={14} />
                          </Link>
                        )}
                        <Link
                          to={`/create`}
                          search={{ id: inv._id }}
                          className="p-2.5 rounded-full glass hover:text-gold transition border border-white/10"
                          title="Edit Details"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={(e) => handleDelete(inv._id, e)}
                          className="p-2.5 rounded-full glass hover:text-rose-400 transition border border-white/10"
                          title="Delete Campaign"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-6">
            <h2 className="animate-slide-left font-display text-2xl text-foreground">Quick Tools</h2>
            <div className="glass gradient-border rounded-3xl p-6 space-y-4">
              <Link to="/templates" className="animate-slide-left flex items-center justify-between rounded-2xl bg-white/5 border border-white/5 p-4 hover:border-gold/30 hover:bg-white/10 transition group">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Browse Art Library</h4>
                  <p className="text-xs text-foreground/50 mt-1">Select designers' couture templates</p>
                </div>
                <ArrowRight size={14} className="text-gold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              <Link to="/profile" className="animate-slide-left flex items-center justify-between rounded-2xl bg-white/5 border border-white/5 p-4 hover:border-gold/30 hover:bg-white/10 transition group">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Billing & Subscriptions</h4>
                  <p className="text-xs text-foreground/50 mt-1">Manage Atelier / Signature subscription</p>
                </div>
                <ArrowRight size={14} className="text-gold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
                <h4 className="text-sm font-medium text-gold">Concierge Service</h4>
                <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">
                  Need custom fine paper foils or design changes reviewed by our master art director? Contact our studio support.
                </p>
                <a href="mailto:concierge@invitestudio.com" className="inline-block mt-3 text-xs font-semibold text-gold hover:underline">
                  Email Concierge →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

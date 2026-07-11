import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { invitationService } from "../services/invitation.service";
import { templateService } from "../services/template.service";
import { Search, Plus, Calendar, Eye, Edit2, Trash2, CreditCard, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/my-invitations")({
  component: MyInvitations,
});

function MyInvitations() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

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
        console.error("Error loading invitations", err);
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

  const getTemplateTitle = (tplId) => {
    const tpl = templates.find((t) => t._id === tplId);
    return tpl ? tpl.title : "Luxury Template";
  };

  const getTemplateImage = (tplId) => {
    const tpl = templates.find((t) => t._id === tplId);
    return tpl ? tpl.previewImage : "";
  };

  // Filter and Sort Logic
  const filteredInvitations = invitations
    .filter((inv) => {
      const matchSearch =
        getTemplateTitle(inv.templateId).toLowerCase().includes(search.toLowerCase()) ||
        (inv.eventDetails.brideName && inv.eventDetails.brideName.toLowerCase().includes(search.toLowerCase())) ||
        (inv.eventDetails.groomName && inv.eventDetails.groomName.toLowerCase().includes(search.toLowerCase())) ||
        (inv.eventDetails.celebrantName && inv.eventDetails.celebrantName.toLowerCase().includes(search.toLowerCase())) ||
        (inv.eventDetails.venue && inv.eventDetails.venue.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = statusFilter === "All" || inv.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "eventDate") {
        return new Date(a.eventDetails.date || 0) - new Date(b.eventDetails.date || 0);
      }
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-reveal-up">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
          <div>
            <h1 className="font-display text-4xl text-foreground">
              Bespoke <em className="text-gold-gradient not-italic">Campaigns</em>
            </h1>
            <p className="mt-2 text-sm text-foreground/60">
              Overview of all drafts, pending settlements, and live digital invitation websites.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative w-full max-w-xs sm:w-60">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-5 text-xs text-foreground placeholder:text-foreground/35 outline-none transition focus:border-gold/50 focus:bg-white/10"
              />
            </div>

            <Link to="/templates" className="btn-gold btn-gold-hover !py-2 !px-5 text-xs uppercase tracking-widest gap-2">
              <Plus size={14} />
              New Invite
            </Link>
          </div>
        </div>

        {/* Filter and Sort Panel */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", "Published", "Draft"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                  statusFilter === status
                    ? "bg-gold/15 text-gold border border-gold/30 font-medium"
                    : "bg-white/5 text-foreground/60 border border-white/5 hover:border-white/20"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-foreground/45">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-noir border border-white/10 rounded-full px-4 py-1.5 text-foreground/80 text-xs outline-none focus:border-gold/50 cursor-pointer"
            >
              <option value="newest">Created Date (Newest)</option>
              <option value="oldest">Created Date (Oldest)</option>
              <option value="eventDate">Event Date (Ascending)</option>
            </select>
          </div>
        </div>

        {/* Lists Container */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : filteredInvitations.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center border border-dashed border-white/10">
            <p className="text-sm text-foreground/50">No campaigns found matching selected settings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInvitations.map((inv) => (
              <article key={inv._id} className="glass gradient-border rounded-3xl overflow-hidden flex flex-col justify-between hover:border-gold/30 transition-all duration-300">
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-noir border-b border-white/5">
                    <img
                      src={getTemplateImage(inv.templateId)}
                      alt=""
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/90 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full glass border border-white/10 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-gold font-semibold">
                      {getTemplateTitle(inv.templateId)}
                    </span>
                    <span className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest border font-semibold ${
                      inv.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-display text-xl text-foreground">
                      {inv.eventDetails.brideName && inv.eventDetails.groomName
                        ? `${inv.eventDetails.brideName} & ${inv.eventDetails.groomName}`
                        : inv.eventDetails.celebrantName || inv.eventDetails.eventTitle || "Bespoke Invitation"}
                    </h3>

                    <div className="space-y-2 text-xs text-foreground/60 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-gold/60 shrink-0" />
                        <span>Date: {inv.eventDetails.date || "Undefined"}</span>
                      </div>
                      <div className="truncate max-w-full">
                        <span>Venue: {inv.eventDetails.venue || "Undefined"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Foot Details and operations */}
                <div className="border-t border-white/5 p-5 bg-noir/20 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-foreground/45">Payment Status</span>
                    <span className={`text-xs font-semibold mt-0.5 ${
                      inv.paymentStatus === "Paid" ? "text-emerald-400" : "text-amber-400 animate-pulse"
                    }`}>
                      {inv.paymentStatus === "Paid" ? "Completed" : "Pending Action"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {inv.status === "Published" && (
                      <Link
                        to={`/invitations/${inv._id}`}
                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-foreground/75 hover:text-gold hover:border-gold/50 transition"
                        title="View Live Webpage"
                      >
                        <Eye size={13} />
                      </Link>
                    )}
                    <Link
                      to={`/create`}
                      search={{ id: inv._id }}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-foreground/75 hover:text-gold hover:border-gold/50 transition"
                      title="Edit Campaign"
                    >
                      <Edit2 size={13} />
                    </Link>
                    <button
                      onClick={(e) => handleDelete(inv._id, e)}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-foreground/75 hover:text-rose-400 hover:border-rose-400/50 transition"
                      title="Delete Campaign"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

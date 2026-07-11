import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { templateService } from "../services/template.service";
import { Search, Sparkles, Filter, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/templates")({
  component: TemplatesGallery,
});

function TemplatesGallery() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await templateService.getTemplates();
        setTemplates(data);
      } catch (err) {
        console.error("Error fetching templates", err);
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  }, []);

  const categories = ["All", "Wedding", "Birthday", "Corporate Events", "Baby Shower"];

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-reveal-up">
        {/* Gallery Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
          <div>
            <h1 className="font-display text-4xl text-foreground">
              Bespoke <em className="text-gold-gradient not-italic">Art Library</em>
            </h1>
            <p className="mt-2 text-sm text-foreground/60">
              Select an editorially art-directed design template to begin customizing your luxury announcement.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search design styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-5 text-xs text-foreground placeholder:text-foreground/35 outline-none transition focus:border-gold/50 focus:bg-white/10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider transition ${
                categoryFilter === cat
                  ? "bg-gold text-noir font-medium border border-gold shadow-[0_4px_15px_-4px_rgba(212,175,55,0.4)]"
                  : "bg-white/5 text-foreground/75 border border-white/10 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center border border-dashed border-white/10">
            <p className="text-sm text-foreground/50">No template styles match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((t, i) => (
              <article
                key={t._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-1.5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] overflow-hidden bg-noir/40">
                  <img
                    src={t.previewImage}
                    alt={t.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent opacity-95" />
                  
                  {/* Category Badge */}
                  <span className="absolute left-5 top-5 rounded-full glass border border-white/10 px-3.5 py-1 text-[9px] uppercase tracking-widest text-gold font-semibold">
                    {t.category}
                  </span>

                  {/* Overlaid CTA Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                      Couture Layout
                    </span>
                    <h3 className="font-display text-2xl text-foreground mt-1.5">
                      {t.title}
                    </h3>
                    <div className="h-px bg-white/10 my-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <p className="text-xs text-white/60 line-clamp-2 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500">
                      Designed with responsive countdowns, elegant typography scaling, and deep gold borders.
                    </p>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="flex items-center justify-between border-t border-white/5 p-6 bg-noir/20">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-foreground/45 uppercase tracking-widest">Pricing</span>
                    <span className="text-gold-gradient font-display text-lg font-semibold">{t.price}</span>
                  </div>
                  <Link
                    to="/create"
                    search={{ templateId: t._id }}
                    className="btn-gold btn-gold-hover !py-2.5 !px-5 text-xs uppercase tracking-widest flex items-center gap-1 bg-gradient-to-r"
                  >
                    Select Design
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import tplWedding from "@/assets/template-wedding.jpg";
import tplBirthday from "@/assets/template-birthday.jpg";
import tplCorporate from "@/assets/template-corporate.jpg";
import tplBaby from "@/assets/template-baby.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});


/* ---------------- Small helpers ---------------- */

function ArrowIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className || undefined}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className || undefined}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconBadge({ path }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/30 to-royal/40 text-gold">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={path} /></svg>
    </div>
  );
}


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useMouseGlow() {
  useEffect(() => {
    const handler = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
}

function Counter({ to, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="font-display text-gold-gradient">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- Sections ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = ["Templates", "Features", "Pricing", "Blog"];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center animate-slide-left"
          style={{
            animationDelay: ".2s",
            animationFillMode: "both",
          }}>
          <span className="grid h-10 w-10 place-items-center rounded-full glass">
            <span className="font-display text-gold-gradient text-lg">I</span>
          </span>
          <span className="font-display text-lg tracking-wide">Invite Studio</span>
        </a>
        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-2 transition-all md:flex ${scrolled ? "glass" : ""
            }`}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm text-foreground/80 transition hover:bg-white/5 hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <div
          className="flex items-center gap-3 animate-fade-down"
          style={{
            animationDelay: ".2s",
            animationFillMode: "both",
          }}
        >
          <Link to="/login" className="hidden text-sm text-foreground/80 hover:text-foreground sm:inline">
            Sign in
          </Link>
          <Link to="/create" className="btn-gold animate scale btn-gold-hover text-sm">
            Create Invite
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {

  function Typewriter({
    text,
    speed = 45,
    className = "",
  }) {
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
      <span className={className}>
        {display}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1280}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 animate-bg-parallax"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noir/70 via-royal/40 to-noir" />
      {/* floating shapes */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-royal blur-3xl animate-float-slow opacity-60" />
      <div className="pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-gold/20 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute bottom-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/10 blur-2xl animate-glow-pulse" />
      {/* Rotating gold ring */}
      <div className="pointer-events-none absolute right-[-8rem] bottom-[-8rem] h-[28rem] w-[28rem] animate-spin-slow opacity-30">
        <div className="h-full w-full rounded-full border border-gold/30" />
        <div className="absolute inset-6 rounded-full border border-gold/20" />
        <div className="absolute inset-16 rounded-full border border-gold/10" />
      </div>
      {/* Sparkles */}
      {[
        { top: "18%", left: "22%", delay: "0s" },
        { top: "34%", left: "78%", delay: "0.8s" },
        { top: "62%", left: "14%", delay: "1.4s" },
        { top: "72%", left: "68%", delay: "2.1s" },
        { top: "28%", left: "52%", delay: "0.4s" },
        { top: "80%", left: "40%", delay: "1.8s" },
      ].map((s, i) => (
        <span key={i} className="sparkle-dot animate-sparkle" style={{ top: s.top, left: s.left, animationDelay: s.delay }} />
      ))}
      {/* mouse light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-32 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-reveal-up">
          <span className="animate-slide-right inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-glow-pulse" />
            Handcrafted digital invitations
          </span>
          <h1 className="mt-8 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <Typewriter
              text="Invitations that feel"
              speed={40}
            />

            <br />

            <span
              className="inline-block animate-slide-left"
              style={{
                animationDelay: ".6s",
                animationFillMode: "both",
              }}
            >
              like an{" "}
              <em className="text-gold-gradient not-italic">
                occasion
              </em>
              .
            </span>
          </h1>
          <p
            className="animate-slide-left mt-6 max-w-xl text-lg text-foreground/70"
            style={{
              animationDelay: ".9s",
              animationFillMode: "both",
            }}
          >
            Design cinematic, couture-grade invitations in minutes. Powered by AI,
            perfected by taste — for weddings, galas, and moments worth remembering.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{
              animationDelay: "1.2s",
              animationFillMode: "both",
            }}
          >
            <Link to="/create" className="btn-gold btn-gold-hover">
              Start Designing
              <ArrowIcon />
            </Link>
            <a href="#templates" className="btn-ghost-gold hover:bg-white/5">
              Browse Templates
            </a>
          </div>
          <div className="mt-14 flex items-center gap-8">
            <div>
              <div className="text-3xl"><Counter to={120000} suffix="+" /></div>
              <div className="text-xs uppercase tracking-widest text-foreground/60">Invites sent</div>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div>
              <div className="text-3xl"><Counter to={4} suffix=".9★" /></div>
              <div className="text-xs uppercase tracking-widest text-foreground/60">Client rating</div>
            </div>
          </div>
        </div>

        {/* Floating hero card stack */}
        <div className="relative mx-auto h-[520px] w-full max-w-md">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gold/30 to-royal/40 blur-3xl opacity-70 animate-glow-pulse" />
          <div className="absolute left-4 top-6 h-[420px] w-[280px] overflow-hidden rounded-3xl glass-strong animate-tilt-loop">
            <img src={tplWedding} alt="" className="h-full w-full object-cover img-breathe" loading="lazy" />
          </div>
          <div className="absolute right-0 top-16 h-[420px] w-[280px] overflow-hidden rounded-3xl glass-strong animate-tilt-loop-r">
            <img src={tplBirthday} alt="" className="h-full w-full object-cover img-breathe" loading="lazy" />
          </div>
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full glass px-4 py-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-glow-pulse" />
            Live preview available
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60">
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <span className="relative h-10 w-px bg-gradient-to-b from-gold to-transparent">
            <span className="absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-gold animate-glow-pulse" />
          </span>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const brands = ["MAISON", "AURELIA", "NOIRÉ", "VELVET & CO", "MONARCH", "ROYALE"];
  const loop = [...brands, ...brands];
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-6 text-center reveal">
        <p className="animate-slide-left text-xs uppercase tracking-[0.4em] text-foreground/50">
          Trusted by 12,000+ hosts, planners & studios
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max gap-16 animate-marquee">
            {loop.map((b, i) => (
              <div key={i} className="font-display text-lg tracking-[0.25em] text-foreground/50 transition hover:text-gold whitespace-nowrap">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="mx-auto max-w-3xl text-center reveal animate-fade-up">
      <span className="text-xs uppercase tracking-[0.35em] text-gold animate-slide-right">
        {eyebrow}
      </span>

      <div className="mx-auto mt-4 h-px w-16 gold-line" />

      <h2 className="animate-slide-left floating-text mt-6 font-display text-4xl sm:text-5xl">
        {title}
      </h2>

      {sub && (
        <p className="animate-slide-right mt-5 text-foreground/70">
          {sub}
        </p>
      )}
    </div>
  );
}

function WhyUs() {
  const items = [
    { t: "Couture Aesthetic", d: "Every template is art-directed by studio designers — no generic themes.", i: "M12 2l2.4 6.9L22 10l-6 4.4L18 22l-6-3.6L6 22l2-7.6L2 10l7.6-1.1L12 2z" },
    { t: "AI at Your Service", d: "Describe your vision and our AI drafts a cinematic invitation in seconds.", i: "M13 2L3 14h7l-1 8 10-12h-7l1-8z" },
    { t: "Guest Experience", d: "RSVPs, gifting, seating, and reminders — beautifully unified.", i: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" },
    { t: "White-glove Service", d: "A dedicated concierge for premium clients, from draft to delivery.", i: "M12 20l9-16H3l9 16z" },
  ];
  return (
    <section id="features" className="relative py-32">
      <SectionHeader
        eyebrow="Why Invite Studio"
        title={<>A different <em className="text-gold-gradient not-italic">standard</em> of invitation.</>}
        sub="We combine the craftsmanship of a print atelier with the intelligence of modern software."
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.t} className="reveal glass gradient-border tilt-card rounded-3xl p-8" style={{ transitionDelay: `${i * 80}ms` }}>
            <IconBadge path={it.i} />
            <h3 className="animate-slide-left mt-6 font-display text-xl">
              {it.t}
            </h3>
            <p className="animate-slide-right mt-3 text-sm text-foreground/70">
              {it.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { name: "Weddings", count: 12 },
    { name: "Birthdays", count: 8 },
    { name: "Corporate", count: 10 },
    { name: "Baby Shower", count: 6 },
    { name: "Anniversaries", count: 9 },
    { name: "Gala & Charity", count: 7 },
    { name: "Engagements", count: 11 },
    { name: "Cultural", count: 5 },
  ];
  return (
    <section className="relative py-32">
      <SectionHeader
        eyebrow="Categories"
        title={<>Curated for every <em className="text-gold-gradient not-italic">occasion</em>.</>}
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 px-6 sm:grid-cols-4">
        {cats.map((c, i) => (
          <a
            key={c.name}
            href="#templates"
            className="reveal group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="absolute inset-x-0 bottom-0 h-px gold-line opacity-40 transition group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <h3 className="animate-slide-left font-display text-lg">{c.name}</h3>
              <span className="text-xs text-foreground/50">{c.count}</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-gold opacity-0 transition group-hover:opacity-100">
              Explore
              <ArrowIcon size={12} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Templates() {
  const tpls = [
    {
      img: tplWedding,
      name: "Aurelia Noir",
      tag: "Wedding",
      price: "$29",
    },
    {
      img: tplBirthday,
      name: "Golden Deco",
      tag: "Birthday",
      price: "$19",
    },
    {
      img: tplCorporate,
      name: "Onyx Gala",
      tag: "Corporate",
      price: "$34",
    },
    {
      img: tplBaby,
      name: "Blush Botanica",
      tag: "Baby Shower",
      price: "$22",
    },
  ];
  return (
    <section id="templates" className="relative py-32">
      <SectionHeader
        eyebrow="Featured Templates"
        title={<>A collection <em className="text-gold-gradient not-italic animate-slide-left">worth framing</em>.</>}
        sub="Every template is fully customizable — swap fonts, palettes, motifs, and motion in one click."
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {tpls.map((t, i) => (
          <article
            key={t.name}
            className="reveal tilt-card group relative overflow-hidden rounded-3xl glass"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={t.img} alt={t.name} loading="lazy" className="img-motion h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent opacity-90" />
              <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/80">{t.tag}</span>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <h3 className="animate-slide-left font-display text-lg">{t.name}</h3>
                <p className="animate-slide-right text-xs text-foreground/60">Includes RSVP & motion</p>
              </div>
              <span className="animate-fade-up text-gold">{t.price}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex justify-center reveal">
        <a href="#" className="btn-ghost-gold hover:bg-white/5">View entire collection</a>
      </div>
    </section>
  );
}

function LivePreview() {
  const palettes = [
    { name: "Royal Noir", colors: ["#2D0A54", "#D4AF37", "#F8F6F2"] },
    { name: "Ivory Gold", colors: ["#F8F6F2", "#D4AF37", "#0B0B12"] },
    { name: "Emerald Dusk", colors: ["#0e3b2e", "#c9a24c", "#f5efe0"] },
  ];
  const [pi, setPi] = useState(0);
  const p = palettes[pi];
  return (
    <section className="relative py-32">
      <SectionHeader
        eyebrow="Live Preview"
        title={<>See your invitation <em className="text-gold-gradient not-italic">breathe</em>.</>}
        sub="Every change updates instantly with cinematic motion — try it below."
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="reveal glass-strong gradient-border rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Palette</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {palettes.map((pl, i) => (
              <button
                key={pl.name}
                onClick={() => setPi(i)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${i === pi ? "border-gold text-foreground" : "border-white/10 text-foreground/70 hover:border-white/30"
                  }`}
              >
                <span className="flex -space-x-1">
                  {pl.colors.map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full border border-white/20" style={{ background: c }} />
                  ))}
                </span>
                {pl.name}
              </button>
            ))}
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">Motif</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Botanical", "Art Deco", "Minimal"].map((m) => (
              <div key={m} className="rounded-2xl glass p-4 text-center text-sm">{m}</div>
            ))}
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">Motion</p>
          <input type="range" defaultValue={60} className="mt-3 w-full accent-[color:var(--gold)]" />
        </div>
        <div className="reveal">
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] transition duration-700"
            style={{ background: `linear-gradient(160deg, ${p.colors[0]}, ${p.colors[2]})` }}
          >
            <div className="absolute inset-6 flex flex-col items-center justify-center border p-8 text-center" style={{ borderColor: p.colors[1] }}>
              <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: p.colors[1] }}>Save the date</span>
              <div className="my-6 h-px w-16" style={{ background: p.colors[1] }} />
              <h3 className="font-display text-4xl" style={{ color: p.colors[1] }}>Alma <br /> & Julien</h3>
              <p className="mt-6 text-sm" style={{ color: p.colors[2] }}>June 14, 2026 · Villa Bellini</p>
            </div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 left-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: "shimmer 4s linear infinite" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Choose a base", d: "Pick a couture template or start from a blank canvas." },
    { n: "02", t: "Personalize", d: "Colors, typography, motion, and motifs — refined to your taste." },
    { n: "03", t: "Invite AI", d: "Let our AI draft wording, layouts and matching stationery in seconds." },
    { n: "04", t: "Send & host", d: "Share by link, manage RSVPs, and delight your guests." },
  ];
  return (
    <section className="relative py-32">
      <SectionHeader eyebrow="Process" title={<>From idea to invitation in <em className="text-gold-gradient not-italic">minutes</em>.</>} />
      <div className="relative mx-auto mt-20 max-w-6xl px-6">
        <div className="absolute inset-x-6 top-14 hidden h-px gold-line md:block" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full glass-strong gradient-border">
                <span className="font-display text-sm text-gold">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-xl">{s.t}</h3>
              <p className="mt-3 text-sm text-foreground/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIGenerator() {
  const [q, setQ] = useState("Elegant black-tie wedding in Amalfi, June sunset");
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal glass-strong gradient-border relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-royal blur-3xl animate-float-slower" />
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-gold">AI Studio</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                Describe it. We'll <em className="text-gold-gradient not-italic">design it.</em>
              </h2>
              <p className="mt-5 max-w-xl text-foreground/70">
                Our AI composes wording, palette, typography, and motion tuned to your moment — reviewed by human designers.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-full glass p-2 pl-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M12 2l2 6h6l-5 4 2 7-7-4-7 4 2-7-5-4h6z" /></svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
                  placeholder="Describe your event…"
                />
                <button className="btn-gold btn-gold-hover !py-2 !px-5 text-sm">Generate</button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {["Wedding · Boho", "Corporate · Gala", "Birthday · Minimal", "Anniversary · Vintage"].map((c) => (
                  <button key={c} onClick={() => setQ(c)} className="rounded-full border border-white/10 px-3 py-1.5 text-foreground/70 hover:border-gold/50 hover:text-foreground">
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="tilt-card mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl glass animate-float-slow">
                <img src={tplCorporate} alt="" loading="lazy" className="h-full w-full object-cover img-breathe" />
              </div>
              <div className="absolute -right-4 -top-4 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-widest text-gold animate-glow-pulse">AI · v2</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const feats = [
    { t: "Motion Presets", d: "Cinematic reveals, particles, and parallax — tastefully applied." },
    { t: "RSVP & Guestbook", d: "Beautiful RSVP flows with dietary, seating, and gifting options." },
    { t: "Multilingual", d: "Draft in 40+ languages with elegant typographic pairings." },
    { t: "Envelope Delivery", d: "Send by email, WhatsApp, or a shareable private link." },
    { t: "Analytics", d: "Track opens, RSVPs and guest interactions in real time." },
    { t: "Concierge", d: "Real designers on standby for final polish and printing." },
  ];
  return (
    <section className="relative py-32">
      <SectionHeader eyebrow="Premium Features" title={<>Everything a host <em className="text-gold-gradient not-italic">could wish for</em>.</>} />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-3">
        {feats.map((f, i) => (
          <div key={f.t} className="reveal glass rounded-2xl p-8 transition hover:border-gold/40" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="h-1 w-8 gold-line" />
            <h3 className="mt-5 font-display text-xl">{f.t}</h3>
            <p className="mt-3 text-sm text-foreground/70">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "The invitation was the most complimented detail of our wedding.", a: "Elena & Marco", r: "Lake Como, Italy" },
    { q: "Studio-grade design without the studio timeline. Simply magical.", a: "Amara Okonkwo", r: "Event Director, LAGOS" },
    { q: "Our brand gala felt sharper, warmer, and unmistakably ours.", a: "James Whitmore", r: "CMO, Maison Aurelia" },
  ];
  return (
    <section className="relative py-32">
      <SectionHeader eyebrow="Loved by Hosts" title={<>Stories from <em className="text-gold-gradient not-italic">unforgettable</em> nights.</>} />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {items.map((t, i) => (
          <figure key={i} className="reveal glass gradient-border rounded-3xl p-8" style={{ transitionDelay: `${i * 100}ms` }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-gold/70"><path d="M7 7h4v4H7v4a4 4 0 004-4V7zm10 0h-4v4h4v4a4 4 0 004-4V7z" /></svg>
            <blockquote className="mt-4 font-display text-xl leading-snug">"{t.q}"</blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm">
              <div className="text-foreground">{t.a}</div>
              <div className="text-foreground/60 text-xs">{t.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { n: "Essential", p: "$19", d: "Perfect for intimate gatherings.", f: ["3 invitations / month", "RSVP tracking", "Basic motion presets", "Email delivery"] },
    { n: "Signature", p: "$49", d: "Our most-loved plan.", f: ["Unlimited invitations", "Premium templates", "AI generator", "Guest analytics", "Priority support"], },
    { n: "Atelier", p: "Custom", d: "White-glove for weddings & brands.", f: ["Dedicated designer", "Bespoke templates", "Concierge onboarding", "Print production", "Priority SLA"] },
  ];
  return (
    <section id="pricing" className="relative py-32">
      <SectionHeader eyebrow="Pricing" title={<>Simple, <em className="text-gold-gradient not-italic">refined</em> plans.</>} sub="Cancel anytime. Every plan includes our design guarantee." />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <div
            key={p.n}
            className={`reveal relative rounded-3xl p-8 ${p.highlight ? "glass-strong gradient-border" : "glass"}`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-3 py-1 text-[10px] uppercase tracking-widest text-noir">
                Most loved
              </span>
            )}
            <h3 className="font-display text-2xl">{p.n}</h3>
            <p className="mt-2 text-sm text-foreground/60">{p.d}</p>
            <div className="mt-6 flex items-end gap-2">
              <span className="font-display text-5xl text-gold-gradient">{p.p}</span>
              {p.p !== "Custom" && <span className="mb-2 text-xs text-foreground/60">/month</span>}
            </div>
            <div className="my-6 h-px gold-line" />
            <ul className="space-y-3 text-sm">
              {p.f.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 text-gold" />
                  <span className="text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>
            <a href="#cta" className={`mt-8 block text-center ${p.highlight ? "btn-gold btn-gold-hover" : "btn-ghost-gold hover:bg-white/5"}`}>
              {p.p === "Custom" ? "Talk to us" : "Choose plan"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    { q: "Can I customize every element of a template?", a: "Absolutely. Fonts, colors, motion, motifs — even envelope liners. Nothing is locked." },
    { q: "Do you support printed invitations?", a: "Yes. Our Atelier plan includes concierge print production with premium papers and foil finishes." },
    { q: "How does the AI generator work?", a: "Describe your event and vibe. Our AI produces layouts, wording, and matching stationery in seconds." },
    { q: "Is my guest data secure?", a: "Data is encrypted at rest and in transit, and we never share guest information with third parties." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-32">
      <SectionHeader eyebrow="FAQ" title={<>Answers, <em className="text-gold-gradient not-italic">gracefully</em>.</>} />
      <div className="mx-auto mt-16 max-w-3xl px-6">
        {qs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="reveal border-b border-white/10">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="font-display text-lg">{f.q}</span>
                <span className={`grid h-8 w-8 place-items-center rounded-full glass text-gold transition ${isOpen ? "rotate-45" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className={`grid overflow-hidden text-sm text-foreground/70 transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                <div className="min-h-0">{f.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Blog() {
  const posts = [
    {
      t: "The art of a modern save-the-date",
      c: "Design",
      img: tplWedding,
    },
    {
      t: "Typography rules for luxury invites",
      c: "Craft",
      img: tplBirthday,
    },
    {
      t: "Hosting a black-tie gala guests remember",
      c: "Events",
      img: tplCorporate,
    },
  ];
  return (
    <section id="blog" className="relative py-32">
      <SectionHeader eyebrow="Journal" title={<>Inspiration from the <em className="text-gold-gradient not-italic">studio</em>.</>} />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <a key={p.t} href="#" className="reveal group overflow-hidden rounded-3xl glass" style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt="" loading="lazy" className="img-motion h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-widest text-gold">{p.c}</span>
              <h3 className="mt-3 font-display text-xl">{p.t}</h3>
              <div className="mt-4 flex items-center gap-2 text-xs text-foreground/60">Read article
                <ArrowIcon size={12} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal glass-strong gradient-border relative overflow-hidden rounded-[2.5rem] p-12 text-center sm:p-20">
          <div className="pointer-events-none absolute inset-0 opacity-40 animate-gradient-pan"
            style={{ background: "linear-gradient(120deg, rgba(212,175,55,0.2), rgba(45,10,84,0.6), rgba(212,175,55,0.2))" }} />
          <div className="relative">
            <span className="text-xs uppercase tracking-[0.35em] text-gold">Ready when you are</span>
            <h2 className="animate-slide-left floating-text mx-auto mt-6 max-w-3xl font-display text-4xl sm:text-6xl">
              Design an invitation your guests <em className="text-gold-gradient not-italic">won't forget</em>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-foreground/70">Start free — no credit card required. Upgrade only when you're ready to send.</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/create" className="btn-gold btn-gold-hover">Create your invitation</Link>
              <a href="#pricing" className="btn-ghost-gold hover:bg-white/5">See pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Product", l: ["Templates", "Pricing", "AI Studio", "Live Preview"] },
    { h: "Company", l: ["About", "Journal", "Careers", "Press"] },
    { h: "Support", l: ["Help Center", "Contact", "Concierge", "Status"] },
  ];
  return (
    <footer className="relative border-t border-white/10 pt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full glass">
              <span className="font-display text-gold-gradient text-lg">I</span>
            </span>
            <span className="font-display text-lg">Invite Studio</span>
          </a>
          <p className="mt-6 max-w-sm text-sm text-foreground/60">
            Couture-grade digital invitations for weddings, celebrations, and unforgettable brand moments.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG", "TW", "PN", "IN"].map((s) => (
              <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full glass text-xs text-foreground/70 hover:text-gold">
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold">{c.h}</h4>
            <ul className="mt-6 space-y-3 text-sm text-foreground/70">
              {c.l.map((x) => (
                <li key={x}><a href="#" className="hover:text-foreground">{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-foreground/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Invite Studio. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  useReveal();
  useMouseGlow();
  return (
    <div className="relative overflow-hidden">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <WhyUs />
        <Categories />
        <Templates />
        <LivePreview />
        <Process />
        <AIGenerator />
        <FeaturesGrid />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Blog />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

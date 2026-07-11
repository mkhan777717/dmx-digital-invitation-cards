import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { invitationService } from "../services/invitation.service";
import { templateService } from "../services/template.service";
import { Music, Play, Pause, Calendar, MapPin, Clock, Users, Gift, Volume2, VolumeX } from "lucide-react";

export const Route = createFileRoute("/invitations/$id")({
  component: LiveInvitation,
});

function LiveInvitation() {
  const { id } = Route.useParams();
  const [invitation, setInvitation] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Music Player
  const [audioObj, setAudioObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // RSVP Form States
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    async function loadInvite() {
      try {
        const invite = await invitationService.getInvitationById(id);
        setInvitation(invite);

        const tpls = await templateService.getTemplates();
        const tpl = tpls.find((t) => t._id === invite.templateId);
        setTemplate(tpl);

        // Initialize Audio if present
        if (invite.music?.url) {
          const audio = new Audio(invite.music.url);
          audio.loop = true;
          setAudioObj(audio);
        }
      } catch (err) {
        console.error("Error loading invitation page", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadInvite();
  }, [id]);

  // Audio Playback Toggle
  const handleToggleAudio = () => {
    if (!audioObj) return;
    if (isPlaying) {
      audioObj.pause();
      setIsPlaying(false);
    } else {
      audioObj.play().catch((err) => console.log("Audio play blocked by browser. User interaction required."));
      setIsPlaying(true);
    }
  };

  // Clean up Audio on unmount
  useEffect(() => {
    return () => {
      if (audioObj) {
        audioObj.pause();
      }
    };
  }, [audioObj]);

  // Countdown Loop
  useEffect(() => {
    if (!invitation?.eventDetails?.date) return;

    const targetDate = new Date(invitation.eventDetails.date);
    
    function updateCountdown() {
      const difference = targetDate - new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [invitation]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d12]">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent mx-auto" />
          <p className="font-display text-sm tracking-[0.25em] text-gold animate-pulse">REVEALING INVITATION...</p>
        </div>
      </div>
    );
  }

  if (notFound || !invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d12] px-4">
        <div className="max-w-md text-center space-y-6">
          <span className="text-5xl">✉️</span>
          <h2 className="font-display text-3xl text-foreground">Invitation Not Found</h2>
          <p className="text-sm text-foreground/50 leading-relaxed">
            The private invitation URL you followed may have expired or been deactivated by the host studio.
          </p>
          <Link to="/" className="btn-gold btn-gold-hover !py-2.5 !px-6 text-xs uppercase tracking-widest inline-block">
            Create Your Own
          </Link>
        </div>
      </div>
    );
  }

  const { eventDetails, images } = invitation;

  return (
    <div className="min-h-screen bg-[#0B0B12] text-[#F8F6F2] relative overflow-hidden flex flex-col items-center justify-center py-16 px-4">
      {/* Cinematic Luxury Backgrounds */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#160a2b]/60 via-[#0B0B12] to-[#0d071a]/70" />
        <div className="absolute -left-36 top-1/4 h-[30rem] w-[30rem] rounded-full bg-royal/20 blur-[130px] opacity-70" />
        <div className="absolute right-[-10rem] bottom-10 h-[30rem] w-[30rem] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      {/* Floating Sparkles */}
      {[
        { top: "12%", left: "18%", delay: "0.4s" },
        { top: "72%", left: "15%", delay: "2.3s" },
        { top: "28%", left: "82%", delay: "1.1s" },
        { top: "85%", left: "78%", delay: "0.1s" },
      ].map((s, i) => (
        <span
          key={i}
          className="sparkle-dot absolute block h-1 w-1 rounded-full bg-gold/60 animate-sparkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

      {/* Music control */}
      {audioObj && (
        <button
          onClick={handleToggleAudio}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-noir/60 backdrop-blur-md border border-gold/30 p-4 text-gold hover:bg-gold hover:text-noir transition shadow-2xl flex items-center gap-2"
        >
          {isPlaying ? (
            <>
              <Volume2 size={16} className="animate-bounce" />
              <span className="text-[10px] font-semibold tracking-wider uppercase pr-1">Mute</span>
            </>
          ) : (
            <>
              <VolumeX size={16} />
              <span className="text-[10px] font-semibold tracking-wider uppercase pr-1">Play Music</span>
            </>
          )}
        </button>
      )}

      {/* Live Invitation Frame */}
      <div className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-white/5 to-white/[0.01] border border-gold/20 rounded-[2.5rem] p-8 sm:p-16 text-center space-y-12 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)]">
        {/* Frame corner embellishments */}
        <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-gold/40" />
        <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-gold/40" />
        <div className="absolute left-6 bottom-6 h-6 w-6 border-l border-b border-gold/40" />
        <div className="absolute right-6 bottom-6 h-6 w-6 border-r border-b border-gold/40" />

        {/* Introduction */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.45em] text-gold font-semibold block">
            THE PRIVILEGE OF YOUR PRESENCE IS REQUESTED
          </span>
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        {/* Content Body */}
        {template?.templateCode === "wedding_aurelia" ? (
          <div className="space-y-6">
            <h1 className="font-display text-5xl sm:text-6xl text-gold-gradient leading-tight">
              {eventDetails.brideName || "Bride's Name"}
              <span className="block text-2xl font-serif italic text-foreground/50 my-2">and</span>
              {eventDetails.groomName || "Groom's Name"}
            </h1>
            <p className="max-w-md mx-auto text-sm text-foreground/75 leading-relaxed font-serif italic py-2">
              {eventDetails.quote || '"Together they write their story, starting with this evening under the sun."'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl text-gold-gradient leading-tight">
              {eventDetails.celebrantName || eventDetails.eventTitle || "Bespoke Event"}
            </h1>
            {eventDetails.age && (
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block">
                Celebrating {eventDetails.age} Years of Grace
              </span>
            )}
            <p className="max-w-md mx-auto text-sm text-foreground/75 leading-relaxed font-serif italic py-2">
              {eventDetails.quote || '"Let us celebrate in the warmth of good company and shared stories."'}
            </p>
          </div>
        )}

        {/* Time, Venue & Location details */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-6 border-t border-white/5 text-left max-w-lg mx-auto">
          <div className="space-y-2.5">
            <h4 className="text-[10px] uppercase tracking-widest text-gold/60 font-semibold flex items-center gap-1.5">
              <Calendar size={12} />
              Date & Schedule
            </h4>
            <p className="text-sm font-semibold text-foreground/80">{eventDetails.date || "Date Unspecified"}</p>
            <p className="text-xs text-foreground/50">{eventDetails.time || "Time Unspecified"}</p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[10px] uppercase tracking-widest text-gold/60 font-semibold flex items-center gap-1.5">
              <MapPin size={12} />
              The Pavilion Venue
            </h4>
            <p className="text-sm font-semibold text-foreground/80 leading-snug">{eventDetails.venue || "Venue Address Unspecified"}</p>
            {eventDetails.mapsUrl && (
              <a
                href={eventDetails.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-semibold text-gold hover:underline"
              >
                Get Google Maps Route →
              </a>
            )}
          </div>
        </div>

        {/* Photo Gallery Slideshow */}
        {images && images.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-white/5">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-semibold">
              MEMORIES IN FRAMES
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg mx-auto">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img src={img} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Countdown Board */}
        <div className="space-y-4 pt-6 border-t border-white/5 max-w-md mx-auto">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-semibold">
            THE MOMENT APPROACHES
          </h4>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hours" },
              { val: timeLeft.minutes, label: "Mins" },
              { val: timeLeft.seconds, label: "Secs" },
            ].map((unit, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-3">
                <span className="font-display text-2xl text-gold-gradient block font-semibold">
                  {unit.val.toString().padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-foreground/45">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RSVP CARD */}
        <div className="pt-8 border-t border-white/5 max-w-md mx-auto">
          {rsvpSubmitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 animate-reveal-up text-center space-y-3">
              <span className="text-3xl">🥂</span>
              <h4 className="font-display text-xl text-emerald-400">RSVP Confirmed</h4>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Thank you. Your attendance response has been successfully registered with the host studio. We look forward to celebrating together.
              </p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="text-[10px] uppercase tracking-widest text-gold font-semibold hover:underline"
              >
                Change Response
              </button>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
              <h3 className="font-display text-xl text-center text-foreground border-b border-white/5 pb-4">
                Confirm Attendance
              </h3>

              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/60">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter guest name..."
                    className="w-full rounded-2xl border border-white/10 bg-[#16161c] px-4 py-2.5 text-xs text-foreground placeholder:text-foreground/35 outline-none focus:border-gold/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-foreground/60">
                      Attendance
                    </label>
                    <select
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#16161c] px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold/50 cursor-pointer"
                    >
                      <option value="yes">Will Attend</option>
                      <option value="no">Cannot Attend</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-foreground/60">
                      Guests Count
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      disabled={attendance === "no"}
                      className="w-full rounded-2xl border border-white/10 bg-[#16161c] px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold/50 cursor-pointer disabled:opacity-40"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold btn-gold-hover w-full py-3 mt-4 text-xs uppercase tracking-widest font-semibold"
                >
                  Submit RSVP
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Brand footer watermark */}
      <div className="relative z-10 text-center mt-12 text-[10px] uppercase tracking-[0.3em] text-foreground/30">
        Powered by{" "}
        <a href="/" className="hover:text-gold transition">
          Invite Studio
        </a>
      </div>
    </div>
  );
}

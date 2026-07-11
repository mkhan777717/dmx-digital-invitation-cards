import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { templateService } from "../services/template.service";
import { invitationService } from "../services/invitation.service";
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Music,
  CheckCircle,
  Smartphone,
  Monitor,
  Heart,
  Lock,
  Sparkles,
  Play,
  Pause,
  Copy,
  Check
} from "lucide-react";

export const Route = createFileRoute("/create")({
  validateSearch: (search) => ({
    templateId: search.templateId || "",
    id: search.id || "",
  }),
  component: CreateWizard,
});

function CreateWizard() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { templateId: initialTemplateId, id: editId } = search;

  const [currentStep, setCurrentStep] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [formValues, setFormValues] = useState({});
  
  // Media states
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [musicOption, setMusicOption] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioObj, setAudioObj] = useState(null);

  // Loading / Submit states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [publishedInvite, setPublishedInvite] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const occasions = [
    { name: "Wedding", icon: "💍", desc: "Couture wedding suites" },
    { name: "Birthday", icon: "🎂", desc: "Golden celebration sets" },
    { name: "Corporate Events", icon: "🏛️", desc: "Gala & award evenings" },
    { name: "Baby Shower", icon: "🍼", desc: "Blush botanica themes" },
    { name: "Custom Events", icon: "✨", desc: "Bespoke designer cards" }
  ];

  const ambientTracks = [
    { name: "Royal Harp & Strings Theme", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Soft Golden Piano Vibe", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Smooth Acoustic Garden Duo", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ];

  // Fetch initial templates & optional edit invitations
  useEffect(() => {
    async function initWizard() {
      try {
        const tpls = await templateService.getTemplates();
        setTemplates(tpls);

        if (editId) {
          // Edit mode
          const invite = await invitationService.getInvitationById(editId);
          const tpl = tpls.find((t) => t._id === invite.templateId);
          setSelectedTemplate(tpl);
          setOccasion(tpl.category);
          setFormValues(invite.eventDetails);
          setUploadedImages(invite.images);
          setMusicOption(invite.music);
          setCurrentStep(3); // Go straight to form
        } else if (initialTemplateId) {
          // Start with template
          const tpl = tpls.find((t) => t._id === initialTemplateId);
          setSelectedTemplate(tpl);
          setOccasion(tpl.category);
          setCurrentStep(3);
        }
      } catch (err) {
        console.error("Error initializing wizard", err);
      } finally {
        setLoading(false);
      }
    }
    initWizard();
  }, [initialTemplateId, editId]);

  // Audio Playback handler
  const togglePlayAudio = (track) => {
    if (audioObj) {
      audioObj.pause();
      if (isPlayingAudio && musicOption?.name === track.name) {
        setIsPlayingAudio(false);
        return;
      }
    }

    const audio = new Audio(track.url);
    audio.play();
    setAudioObj(audio);
    setIsPlayingAudio(true);
    setMusicOption(track);

    audio.onended = () => {
      setIsPlayingAudio(false);
    };
  };

  useEffect(() => {
    return () => {
      if (audioObj) {
        audioObj.pause();
      }
    };
  }, [audioObj]);

  // Occasion selection handler
  const handleSelectOccasion = (occName) => {
    setOccasion(occName);
    setCurrentStep(2);
  };

  // Template selection handler
  const handleSelectTemplate = (tpl) => {
    setSelectedTemplate(tpl);
    // Initialize form fields
    const initialForm = {};
    tpl.fields.forEach((f) => {
      initialForm[f.name] = "";
    });
    setFormValues(initialForm);
    setCurrentStep(3);
  };

  // Form input changes
  const handleInputChange = (fieldName, val) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: val
    }));
  };

  // Mock upload images
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadProgress(null);
          // Add standard luxury mock images
          const newImages = [...uploadedImages];
          newImages.push(
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400"
          );
          setUploadedImages(newImages);
          return null;
        }
        return prev + 30;
      });
    }, 300);
  };

  // Save changes in memory
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      if (editId) {
        await invitationService.updateInvitation(editId, {
          eventDetails: formValues,
          images: uploadedImages,
          music: musicOption
        });
      } else {
        await invitationService.createInvitation(
          selectedTemplate._id,
          formValues,
          uploadedImages,
          musicOption
        );
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      alert("Failed to save campaign draft.");
    } finally {
      setSaving(false);
    }
  };

  // Process Mock Checkout payment
  const handleProcessPayment = async () => {
    setPaymentProcessing(true);
    try {
      let activeId = editId;
      if (!activeId) {
        const newInvite = await invitationService.createInvitation(
          selectedTemplate._id,
          formValues,
          uploadedImages,
          musicOption
        );
        activeId = newInvite._id;
      } else {
        await invitationService.updateInvitation(editId, {
          eventDetails: formValues,
          images: uploadedImages,
          music: musicOption
        });
      }

      const published = await invitationService.processPayment(activeId);
      setPublishedInvite(published);
      setPaymentModalOpen(false);
      setCurrentStep(7); // success page
    } catch (err) {
      alert("Payment processing encountered an issue.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Copy unique live invitation url
  const copyShareLink = () => {
    const fullUrl = window.location.origin + publishedInvite.deployedUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentTpl = selectedTemplate;
  const isFormValid = currentTpl?.fields.every(
    (f) => !f.required || (formValues[f.name] && formValues[f.name].trim() !== "")
  );

  // Stepper labels
  const steps = [
    { n: 1, l: "Occasion" },
    { n: 2, l: "Template" },
    { n: 3, l: "Event details" },
    { n: 4, l: "Gallery" },
    { n: 5, l: "Soundtrack" },
    { n: 6, l: "Review & Preview" }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-reveal-up relative">
        {/* Wizard Stepper Header */}
        {currentStep <= 6 && (
          <div className="border-b border-white/5 pb-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    } else {
                      navigate({ to: "/dashboard" });
                    }
                  }}
                  className="rounded-full border border-white/10 p-2 text-foreground/70 hover:border-gold hover:text-foreground transition bg-white/5"
                >
                  <ArrowLeft size={16} />
                </button>
                <h1 className="font-display text-2xl">
                  {editId ? "Edit Campaign" : "New Invitation"}
                </h1>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={handleSaveDraft}
                  disabled={saving || !currentTpl}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-foreground/80 hover:border-white/30 hover:bg-white/5 transition"
                >
                  Save Draft
                </button>
                {currentStep === 6 && (
                  <button
                    onClick={() => setPaymentModalOpen(true)}
                    className="btn-gold btn-gold-hover !py-2.5 !px-6 text-xs uppercase tracking-widest gap-1.5 shadow-md"
                  >
                    Publish Invitation
                  </button>
                )}
              </div>
            </div>

            {/* Steps pills */}
            <div className="hidden grid-cols-6 gap-3 md:grid">
              {steps.map((s) => (
                <div key={s.n} className="flex flex-col gap-1.5">
                  <div className={`h-1.5 rounded-full transition-colors duration-500 ${
                    currentStep >= s.n ? "bg-gold" : "bg-white/5"
                  }`} />
                  <span className={`text-[10px] uppercase tracking-widest transition-colors ${
                    currentStep === s.n ? "text-gold font-medium" : "text-foreground/40"
                  }`}>
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center md:hidden">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                Step {currentStep} of 6: {steps[currentStep - 1].l}
              </span>
              <span className="text-xs text-foreground/40">
                {Math.round((currentStep / 6) * 100)}% Complete
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Choose Occasion */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-3xl mx-auto py-6">
            <h2 className="font-display text-3xl text-center text-foreground">
              What is the <em className="text-gold-gradient not-italic">occasion</em>?
            </h2>
            <p className="text-sm text-foreground/60 text-center max-w-md mx-auto">
              Different templates offer uniquely tailored schemas and editorial scripts.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8">
              {occasions.map((o) => (
                <button
                  key={o.name}
                  onClick={() => handleSelectOccasion(o.name)}
                  className={`flex items-center justify-between rounded-3xl glass gradient-border p-6 text-left hover:border-gold/40 hover:-translate-y-1 transition duration-300 group ${
                    occasion === o.name ? "border-gold/60 bg-gold/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{o.icon}</span>
                    <div>
                      <h4 className="font-display text-lg text-foreground group-hover:text-gold transition">
                        {o.name}
                      </h4>
                      <p className="text-xs text-foreground/50 mt-1">{o.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Template */}
        {currentStep === 2 && (
          <div className="space-y-6 py-6">
            <h2 className="font-display text-3xl text-center text-foreground">
              Choose your <em className="text-gold-gradient not-italic">luxury layout</em>
            </h2>
            <p className="text-sm text-foreground/60 text-center max-w-md mx-auto">
              Our art-directed library for <span className="text-gold font-medium">{occasion}</span>.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
              {templates
                .filter((t) => t.category === occasion)
                .map((t) => (
                  <div
                    key={t._id}
                    onClick={() => handleSelectTemplate(t)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl glass hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="aspect-[4/5] bg-noir/20 overflow-hidden relative">
                      <img src={t.previewImage} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                          {t.price}
                        </span>
                        <h4 className="font-display text-xl text-foreground mt-1">{t.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 3: Dynamic Event Form */}
        {currentStep === 3 && currentTpl && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] max-w-5xl mx-auto py-4">
            {/* Form Side */}
            <div className="space-y-6">
              <div>
                <span className="rounded-full bg-gold/10 border border-gold/25 px-3 py-1 text-[9px] uppercase tracking-widest text-gold font-semibold">
                  {currentTpl.category} · {currentTpl.title}
                </span>
                <h2 className="font-display text-3xl text-foreground mt-4">Personalize Details</h2>
                <p className="text-xs text-foreground/50 mt-1">
                  Fill in details dynamically populated from the selected couture design sheet.
                </p>
              </div>

              <div className="glass gradient-border rounded-3xl p-6 sm:p-8 space-y-5">
                {currentTpl.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-foreground/60 font-medium">
                      {field.label} {field.required && <span className="text-gold">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        required={field.required}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label}...`}
                        className="w-full h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 outline-none focus:border-gold/50 focus:bg-white/10 transition resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label}...`}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/25 outline-none focus:border-gold/50 focus:bg-white/10 transition"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-foreground/80 hover:bg-white/5"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={!isFormValid}
                  className="btn-gold btn-gold-hover !py-2.5 !px-6 text-xs uppercase tracking-widest gap-2 flex-1"
                >
                  Continue to Gallery
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Quick Preview Card */}
            <div className="hidden lg:block">
              <div className="sticky top-6 rounded-[2.5rem] border border-white/10 bg-[#121218] p-6 shadow-2xl">
                <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-4 text-center">
                  Live details binding
                </h4>
                <div className="aspect-[3/4] rounded-3xl bg-royal-deep border border-gold/20 flex flex-col items-center justify-center p-6 text-center text-foreground relative overflow-hidden">
                  <div className="absolute inset-4 border border-gold/10 pointer-events-none" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                    SAVE THE DATE
                  </span>
                  <div className="h-px w-12 bg-gold/30 my-4" />
                  {currentTpl.templateCode === "wedding_aurelia" ? (
                    <div className="space-y-4">
                      <h3 className="font-display text-3xl leading-snug">
                        {formValues.brideName || "Bride Name"} <br /> & <br /> {formValues.groomName || "Groom Name"}
                      </h3>
                      <p className="text-xs text-foreground/75 font-serif max-w-xs mx-auto italic">
                        {formValues.quote || '"A beautiful journey starting shortly..."'}
                      </p>
                      <p className="text-xs text-gold/80 mt-6 font-semibold">
                        {formValues.date || "Date"} · {formValues.time || "Time"}
                      </p>
                      <p className="text-[10px] text-foreground/55 uppercase tracking-wider">
                        {formValues.venue || "Luxury Venue Venue"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-display text-3xl leading-snug">
                        {formValues.celebrantName || formValues.eventTitle || "Special Event"}
                      </h3>
                      {formValues.age && (
                        <p className="text-sm text-gold uppercase tracking-[0.2em]">
                          Celebrated Age: {formValues.age}
                        </p>
                      )}
                      <p className="text-xs text-gold/80 mt-6 font-semibold">
                        {formValues.date || "Date"} · {formValues.time || "Time"}
                      </p>
                      <p className="text-[10px] text-foreground/55 uppercase tracking-wider">
                        {formValues.venue || "Luxury Venue Venue"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Upload Images */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto space-y-6 py-6">
            <div className="text-center">
              <h2 className="font-display text-3xl">Design Gallery Upload</h2>
              <p className="text-sm text-foreground/60 mt-2">
                Add stunning high-resolution photos that guests will browse on the live invitation website.
              </p>
            </div>

            <div className="glass gradient-border rounded-3xl p-8 text-center space-y-6">
              <div className="border border-dashed border-gold/30 rounded-2xl p-8 bg-noir/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud size={48} className="text-gold/60 mb-4" />
                <h4 className="text-sm font-medium">Drag & drop photo assets here</h4>
                <p className="text-xs text-foreground/40 mt-1">Supports PNG, JPG, or HEIC formats</p>
              </div>

              {uploadProgress !== null && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gold">
                    <span>Uploading images to studio...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Uploaded previews */}
              {uploadedImages.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs uppercase tracking-widest text-foreground/50 text-left mb-3">
                    Gallery Assets ({uploadedImages.length})
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {uploadedImages.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-noir group">
                        <img src={img} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => {
                            setUploadedImages(uploadedImages.filter((_, idx) => idx !== i));
                          }}
                          className="absolute inset-0 bg-noir/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 font-semibold text-xs transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-foreground/80 hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="btn-gold btn-gold-hover !py-2.5 !px-6 text-xs uppercase tracking-widest gap-2"
              >
                Continue to Soundtrack
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Upload Music */}
        {currentStep === 5 && (
          <div className="max-w-2xl mx-auto space-y-6 py-6">
            <div className="text-center">
              <h2 className="font-display text-3xl">Ambient Soundtrack</h2>
              <p className="text-sm text-foreground/60 mt-2">
                Set the atmospheric soundscapes that auto-play when guests reveal their invitations.
              </p>
            </div>

            <div className="glass gradient-border rounded-3xl p-6 sm:p-8 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">
                Pre-selected Soundtracks
              </h4>
              <div className="space-y-3">
                {ambientTracks.map((track) => {
                  const isSelected = musicOption?.name === track.name;
                  const isCurrentlyPlaying = isSelected && isPlayingAudio;
                  return (
                    <div
                      key={track.name}
                      onClick={() => setMusicOption(track)}
                      className={`flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition ${
                        isSelected
                          ? "border-gold bg-gold/5"
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 rounded-full bg-gold/10 text-gold">
                          <Music size={16} />
                        </span>
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{track.name}</h4>
                          <p className="text-xs text-foreground/45 mt-0.5">MP3 Ambient Theme</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayAudio(track);
                        }}
                        className={`p-2.5 rounded-full border transition ${
                          isCurrentlyPlaying
                            ? "bg-gold text-noir border-gold"
                            : "border-white/10 hover:border-gold/50 text-foreground/80 hover:text-gold"
                        }`}
                      >
                        {isCurrentlyPlaying ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-white/10 my-6" />

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="text-xs text-foreground/50">
                  Custom track uploads are under development in our audio compressor.
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(4)}
                className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-foreground/80 hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(6)}
                className="btn-gold btn-gold-hover !py-2.5 !px-6 text-xs uppercase tracking-widest gap-2"
              >
                Continue to Review
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Review & Preview */}
        {currentStep === 6 && currentTpl && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h2 className="font-display text-3xl">Design Board Review</h2>
              <p className="text-sm text-foreground/60 mt-1">
                Toggle below to test responsive mobile layouts. Everything scales dynamically.
              </p>
            </div>

            {/* Desktop / Mobile Dual Preview Wrapper */}
            <div className="glass gradient-border rounded-3xl p-6 sm:p-10 relative bg-noir/20 flex flex-col items-center">
              <div className="w-full flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="text-xs uppercase tracking-widest text-gold font-medium">
                  SIMULATOR MODE
                </span>
                <span className="text-xs text-foreground/45">
                  Template Category: {currentTpl.category}
                </span>
              </div>

              {/* Simulation Screen */}
              <div className="w-full max-w-sm rounded-[3rem] border-8 border-noir bg-noir aspect-[9/18] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-6 bg-noir flex justify-center items-center z-20">
                  <div className="w-24 h-4 rounded-b-xl bg-noir" />
                </div>
                <div className="flex-1 bg-royal-deep text-foreground flex flex-col p-6 items-center justify-center text-center relative overflow-y-auto pt-10">
                  <div className="absolute inset-4 border border-gold/15 pointer-events-none" />
                  
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-medium">
                    SAVE THE DATE
                  </span>
                  <div className="h-px w-10 bg-gold/30 my-4" />

                  {currentTpl.templateCode === "wedding_aurelia" ? (
                    <div className="space-y-5">
                      <h3 className="font-display text-3xl text-gold-gradient">
                        {formValues.brideName || "Bride's Name"} <br />
                        <span className="text-sm font-serif italic text-white/55 my-1 block">&</span>
                        {formValues.groomName || "Groom's Name"}
                      </h3>
                      <p className="text-xs text-foreground/75 italic font-serif leading-relaxed max-w-xs">
                        {formValues.quote || '"Together they write their story, starting with this evening under the sun."'}
                      </p>
                      
                      <div className="h-px w-8 bg-gold/20 my-4 mx-auto" />
                      
                      <p className="text-xs font-semibold text-gold/80">
                        {formValues.date || "2026-09-24"} <br /> {formValues.time || "5:00 PM"}
                      </p>
                      <p className="text-[10px] text-foreground/50 uppercase tracking-widest leading-relaxed">
                        {formValues.venue || "The Grand Villa Royal, Lake Como"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-display text-3xl text-gold-gradient">
                        {formValues.celebrantName || formValues.eventTitle || "Bespoke Evening"}
                      </h3>
                      {formValues.age && (
                        <p className="text-sm text-gold uppercase tracking-[0.2em]">
                          Turning {formValues.age} Years Young
                        </p>
                      )}
                      
                      <div className="h-px w-8 bg-gold/20 my-4 mx-auto" />

                      <p className="text-xs font-semibold text-gold/80">
                        {formValues.date || "2026-07-28"} <br /> {formValues.time || "8:00 PM"}
                      </p>
                      <p className="text-[10px] text-foreground/50 uppercase tracking-widest leading-relaxed">
                        {formValues.venue || "The Onyx Ballroom, New York"}
                      </p>
                    </div>
                  )}

                  {musicOption && (
                    <div className="absolute bottom-6 inset-x-6 bg-noir/50 backdrop-blur-md rounded-2xl p-2.5 border border-white/5 flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-gold/15 text-gold rounded-full">
                          <Music size={12} className="animate-spin-slow" />
                        </span>
                        <span className="text-[9px] text-foreground/80 font-medium truncate max-w-[150px]">
                          {musicOption.name}
                        </span>
                      </div>
                      <span className="text-[8px] text-gold uppercase tracking-widest font-semibold mr-1">
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(5)}
                className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-foreground/80 hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={() => setPaymentModalOpen(true)}
                className="btn-gold btn-gold-hover !py-2.5 !px-6 text-xs uppercase tracking-widest gap-1.5"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Publishing Success Screen */}
        {currentStep === 7 && publishedInvite && (
          <div className="max-w-xl mx-auto py-10 space-y-8 text-center animate-reveal-up">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_50px_-5px_rgba(16,185,129,0.3)]">
                <CheckCircle size={40} className="animate-glow-pulse" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Campaign Live</span>
              <h2 className="font-display text-4xl text-foreground mt-4">
                Invitation Published Successfully!
              </h2>
              <p className="text-sm text-foreground/60 mt-3 max-w-sm">
                Your luxury digital announcement is now live on the global grid. You can copy the link and distribute it to your guests.
              </p>
            </div>

            {/* URL Display */}
            <div className="glass gradient-border rounded-3xl p-5 flex items-center justify-between text-left">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-foreground/45">Unique Published Link</span>
                <p className="text-sm text-gold font-mono font-medium truncate mt-1">
                  {window.location.origin + publishedInvite.deployedUrl}
                </p>
              </div>
              <button
                onClick={copyShareLink}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-foreground/75 hover:text-gold hover:border-gold/50 transition shrink-0 ml-4"
                title="Copy Link"
              >
                {copiedLink ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={publishedInvite.deployedUrl} className="btn-gold btn-gold-hover !py-3 !px-8 text-xs uppercase tracking-widest">
                View Live Site
              </Link>
              <Link to="/dashboard" className="rounded-full border border-white/10 px-8 py-3 text-xs uppercase tracking-widest text-foreground/80 hover:bg-white/5 transition">
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Razorpay/Stripe Mock Payment Modal */}
        {paymentModalOpen && selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir/80 backdrop-blur-md px-4">
            <div className="w-full max-w-md glass-strong gradient-border rounded-[2rem] p-8 shadow-2xl relative animate-reveal-up">
              <h3 className="font-display text-2xl text-foreground mb-1">
                Luxury Checkout
              </h3>
              <p className="text-xs text-foreground/40 mb-6 uppercase tracking-wider">
                Secure SSL Encrypted Gateway
              </p>

              {/* Order Summary */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-xs text-foreground/50">
                  <span>Selected Motif Style</span>
                  <span>{selectedTemplate.title} ({selectedTemplate.category})</span>
                </div>
                <div className="flex justify-between text-xs text-foreground/50">
                  <span>Hosting Service</span>
                  <span>Unlimited Live Bandwidth</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground/70">Subtotal Price</span>
                  <span className="text-gold font-display text-base">{selectedTemplate.price}</span>
                </div>
              </div>

              {/* Payment Details Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProcessPayment();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/60 mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Alexander Vance"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/60 mb-1.5">
                    Card details
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Card number"
                      maxLength={16}
                      defaultValue="4111222233334444"
                      className="w-2/3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      defaultValue="12/29"
                      className="w-1/6 rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-xs text-center text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                    <input
                      type="password"
                      required
                      placeholder="CVC"
                      maxLength={3}
                      defaultValue="123"
                      className="w-1/6 rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-xs text-center text-foreground outline-none focus:border-gold/50 focus:bg-white/10 transition"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5 mt-6">
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(false)}
                    className="rounded-full border border-white/10 px-5 py-2.5 text-xs uppercase tracking-widest text-foreground/80 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={paymentProcessing}
                    className="btn-gold btn-gold-hover !py-2.5 flex-1 text-xs uppercase tracking-widest gap-2"
                  >
                    {paymentProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-noir" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Encrypting...
                      </span>
                    ) : (
                      <>
                        <Lock size={12} />
                        Settle & Settle {selectedTemplate.price}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

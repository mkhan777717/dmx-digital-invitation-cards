import { o as __toESM } from "../_runtime.mjs";
import { s as performance_default } from "../_libs/h3+rou3+srvx+unenv.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as createFileRoute, h as useRouter, m as Link, p as createRootRouteWithContext, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D3nNRI0U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C6favStr.css";
var api = axios.create({
	baseURL: "http://localhost:5000/api",
	withCredentials: true,
	headers: { "Content-Type": "application/json" }
});
var USER_KEY = "premier_invites_user";
var authService = {
	async register(userName, email, password) {
		return (await api.post("/register", {
			userName,
			email,
			password
		})).data;
	},
	async login(email, password) {
		const response = await api.post("/login", {
			email,
			password
		});
		const user = {
			email,
			userName: email.split("@")[0]
		};
		localStorage.setItem(USER_KEY, JSON.stringify(user));
		return response.data;
	},
	async logout() {
		const response = await api.post("/logout");
		localStorage.removeItem(USER_KEY);
		return response.data;
	},
	getCurrentUser() {
		try {
			const userStr = localStorage.getItem(USER_KEY);
			return userStr ? JSON.parse(userStr) : null;
		} catch {
			return null;
		}
	},
	setCurrentUser(user) {
		if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
		else localStorage.removeItem(USER_KEY);
	}
};
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const cachedUser = authService.getCurrentUser();
		if (cachedUser) setUser(cachedUser);
		setLoading(false);
	}, []);
	const login = async (email, password) => {
		setLoading(true);
		try {
			await authService.login(email, password);
			const loggedUser = authService.getCurrentUser();
			setUser(loggedUser);
			return loggedUser;
		} finally {
			setLoading(false);
		}
	};
	const register = async (userName, email, password) => {
		setLoading(true);
		try {
			await authService.register(userName, email, password);
		} finally {
			setLoading(false);
		}
	};
	const logout = async () => {
		setLoading(true);
		try {
			await authService.logout();
			setUser(null);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			loading,
			login,
			register,
			logout,
			setUser
		},
		children
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Invite Studio — Luxury Digital Invitations, Crafted with Elegance" },
			{
				name: "description",
				content: "Invite Studio designs premium digital invitations for weddings, celebrations, and exclusive events. AI-powered, cinematic, and unforgettable."
			},
			{
				name: "author",
				content: "Invite Studio"
			},
			{
				property: "og:title",
				content: "Invite Studio — Luxury Digital Invitations, Crafted with Elegance"
			},
			{
				property: "og:description",
				content: "Invite Studio designs premium digital invitations for weddings, celebrations, and exclusive events. AI-powered, cinematic, and unforgettable."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@InviteStudio"
			},
			{
				name: "twitter:title",
				content: "Invite Studio — Luxury Digital Invitations, Crafted with Elegance"
			},
			{
				name: "twitter:description",
				content: "Invite Studio designs premium digital invitations for weddings, celebrations, and exclusive events. AI-powered, cinematic, and unforgettable."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/726c789c-6b58-46cc-b226-c0e3a8ffcfb0/id-preview-c33e7f31--74e59dac-bf08-4d20-8ec3-abf903053fbb.lovable.app-1783151370162.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/726c789c-6b58-46cc-b226-c0e3a8ffcfb0/id-preview-c33e7f31--74e59dac-bf08-4d20-8ec3-abf903053fbb.lovable.app-1783151370162.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var hero_bg_default = "/assets/hero-bg-MXWWQVUn.jpg";
var template_wedding_default = "/assets/template-wedding-CKjFj4ig.jpg";
var template_birthday_default = "/assets/template-birthday-BQI4EgVK.jpg";
var template_corporate_default = "/assets/template-corporate-I9WVIPOL.jpg";
var template_baby_default = "/assets/template-baby-DF7Aj9Al.jpg";
var Route = createFileRoute("/")({ component: Index });
function ArrowIcon({ size = 16, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		className: className || void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14M13 5l7 7-7 7" })
	});
}
function CheckIcon({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		className: className || void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6L9 17l-5-5" })
	});
}
function IconBadge({ path }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/30 to-royal/40 text-gold",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path })
		})
	});
}
function useReveal() {
	(0, import_react.useEffect)(() => {
		const els = document.querySelectorAll(".reveal");
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in-view");
					io.unobserve(e.target);
				}
			});
		}, { threshold: .12 });
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
}
function useMouseGlow() {
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
			document.documentElement.style.setProperty("--my", `${e.clientY}px`);
		};
		window.addEventListener("mousemove", handler);
		return () => window.removeEventListener("mousemove", handler);
	}, []);
}
function Counter({ to, suffix = "" }) {
	const [n, setN] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					const start = performance_default.now();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: "font-display text-gold-gradient",
		children: [n.toLocaleString(), suffix]
	});
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 20);
		on();
		window.addEventListener("scroll", on);
		return () => window.removeEventListener("scroll", on);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-full glass",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-gold-gradient text-lg",
							children: "I"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg tracking-wide",
						children: "Invite Studio"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: `hidden items-center gap-1 rounded-full px-2 py-2 transition-all md:flex ${scrolled ? "glass" : ""}`,
					children: [
						"Templates",
						"Features",
						"Pricing",
						"Blog"
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${l.toLowerCase()}`,
						className: "rounded-full px-4 py-2 text-sm text-foreground/80 transition hover:bg-white/5 hover:text-foreground",
						children: l
					}, l))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "hidden text-sm text-foreground/80 hover:text-foreground sm:inline",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create",
						className: "btn-gold btn-gold-hover text-sm",
						children: "Create Invite"
					})]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-screen items-center overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_bg_default,
				alt: "",
				width: 1920,
				height: 1280,
				className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 animate-bg-parallax"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-noir/70 via-royal/40 to-noir" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-royal blur-3xl animate-float-slow opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-gold/20 blur-3xl animate-float-slower" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute bottom-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/10 blur-2xl animate-glow-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute right-[-8rem] bottom-[-8rem] h-[28rem] w-[28rem] animate-spin-slow opacity-30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full rounded-full border border-gold/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-6 rounded-full border border-gold/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-16 rounded-full border border-gold/10" })
				]
			}),
			[
				{
					top: "18%",
					left: "22%",
					delay: "0s"
				},
				{
					top: "34%",
					left: "78%",
					delay: "0.8s"
				},
				{
					top: "62%",
					left: "14%",
					delay: "1.4s"
				},
				{
					top: "72%",
					left: "68%",
					delay: "2.1s"
				},
				{
					top: "28%",
					left: "52%",
					delay: "0.4s"
				},
				{
					top: "80%",
					left: "40%",
					delay: "1.8s"
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sparkle-dot animate-sparkle",
				style: {
					top: s.top,
					left: s.left,
					animationDelay: s.delay
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0",
				style: { background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,0.08), transparent 60%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-32 pb-24 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-reveal-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-gold animate-glow-pulse" }), "Handcrafted digital invitations"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-8 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl",
							children: [
								"Invitations that feel ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"like an ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gold-gradient not-italic",
									children: "occasion"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-foreground/70",
							children: "Design cinematic, couture-grade invitations in minutes. Powered by AI, perfected by taste — for weddings, galas, and moments worth remembering."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/create",
								className: "btn-gold btn-gold-hover",
								children: ["Start Designing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowIcon, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#templates",
								className: "btn-ghost-gold hover:bg-white/5",
								children: "Browse Templates"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-14 flex items-center gap-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
										to: 12e4,
										suffix: "+"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-foreground/60",
									children: "Invites sent"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
										to: 4,
										suffix: ".9★"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-foreground/60",
									children: "Client rating"
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto h-[520px] w-full max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-[2rem] bg-gradient-to-br from-gold/30 to-royal/40 blur-3xl opacity-70 animate-glow-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-4 top-6 h-[420px] w-[280px] overflow-hidden rounded-3xl glass-strong animate-tilt-loop",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: template_wedding_default,
								alt: "",
								className: "h-full w-full object-cover img-breathe",
								loading: "lazy"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-0 top-16 h-[420px] w-[280px] overflow-hidden rounded-3xl glass-strong animate-tilt-loop-r",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: template_birthday_default,
								alt: "",
								className: "h-full w-full object-cover img-breathe",
								loading: "lazy"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full glass px-4 py-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-glow-pulse" }), "Live preview available"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]",
					children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative h-10 w-px bg-gradient-to-b from-gold to-transparent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-gold animate-glow-pulse" })
					})]
				})
			})
		]
	});
}
function TrustedBy() {
	const brands = [
		"MAISON",
		"AURELIA",
		"NOIRÉ",
		"VELVET & CO",
		"MONARCH",
		"ROYALE"
	];
	const loop = [...brands, ...brands];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 text-center reveal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.4em] text-foreground/50",
				children: "Trusted by 12,000+ hosts, planners & studios"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max gap-16 animate-marquee",
					children: loop.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg tracking-[0.25em] text-foreground/50 transition hover:text-gold whitespace-nowrap",
						children: b
					}, i))
				})
			})]
		})
	});
}
function SectionHeader({ eyebrow, title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl text-center reveal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-[0.35em] text-gold",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-4 h-px w-16 gold-line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 font-display text-4xl sm:text-5xl",
				children: title
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-foreground/70",
				children: sub
			})
		]
	});
}
function WhyUs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Why Invite Studio",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"A different ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "standard"
				}),
				" of invitation."
			] }),
			sub: "We combine the craftsmanship of a print atelier with the intelligence of modern software."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					t: "Couture Aesthetic",
					d: "Every template is art-directed by studio designers — no generic themes.",
					i: "M12 2l2.4 6.9L22 10l-6 4.4L18 22l-6-3.6L6 22l2-7.6L2 10l7.6-1.1L12 2z"
				},
				{
					t: "AI at Your Service",
					d: "Describe your vision and our AI drafts a cinematic invitation in seconds.",
					i: "M13 2L3 14h7l-1 8 10-12h-7l1-8z"
				},
				{
					t: "Guest Experience",
					d: "RSVPs, gifting, seating, and reminders — beautifully unified.",
					i: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
				},
				{
					t: "White-glove Service",
					d: "A dedicated concierge for premium clients, from draft to delivery.",
					i: "M12 20l9-16H3l9 16z"
				}
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass gradient-border tilt-card rounded-3xl p-8",
				style: { transitionDelay: `${i * 80}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBadge, { path: it.i }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 font-display text-xl",
						children: it.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-foreground/70",
						children: it.d
					})
				]
			}, it.t))
		})]
	});
}
function Categories() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Categories",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Curated for every ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "occasion"
				}),
				"."
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 px-6 sm:grid-cols-4",
			children: [
				{
					name: "Weddings",
					count: 12
				},
				{
					name: "Birthdays",
					count: 8
				},
				{
					name: "Corporate",
					count: 10
				},
				{
					name: "Baby Shower",
					count: 6
				},
				{
					name: "Anniversaries",
					count: 9
				},
				{
					name: "Gala & Charity",
					count: 7
				},
				{
					name: "Engagements",
					count: 11
				},
				{
					name: "Cultural",
					count: 5
				}
			].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#templates",
				className: "reveal group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1",
				style: { transitionDelay: `${i * 60}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-px gold-line opacity-40 transition group-hover:opacity-100" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-foreground/50",
							children: c.count
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-2 text-xs text-gold opacity-0 transition group-hover:opacity-100",
						children: ["Explore", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowIcon, { size: 12 })]
					})
				]
			}, c.name))
		})]
	});
}
function Templates() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "templates",
		className: "relative py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Featured Templates",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"A collection ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient not-italic",
						children: "worth framing"
					}),
					"."
				] }),
				sub: "Every template is fully customizable — swap fonts, palettes, motifs, and motion in one click."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						img: template_wedding_default,
						name: "Aurelia Noir",
						tag: "Wedding",
						price: "$29"
					},
					{
						img: template_birthday_default,
						name: "Golden Deco",
						tag: "Birthday",
						price: "$19"
					},
					{
						img: template_corporate_default,
						name: "Onyx Gala",
						tag: "Corporate",
						price: "$34"
					},
					{
						img: template_baby_default,
						name: "Blush Botanica",
						tag: "Baby Shower",
						price: "$22"
					}
				].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "reveal tilt-card group relative overflow-hidden rounded-3xl glass",
					style: { transitionDelay: `${i * 90}ms` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[4/5] overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: t.img,
								alt: t.name,
								loading: "lazy",
								className: "img-motion h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent opacity-90" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/80",
								children: t.tag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-foreground/60",
							children: "Includes RSVP & motion"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold",
							children: t.price
						})]
					})]
				}, t.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex justify-center reveal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					className: "btn-ghost-gold hover:bg-white/5",
					children: "View entire collection"
				})
			})
		]
	});
}
function LivePreview() {
	const palettes = [
		{
			name: "Royal Noir",
			colors: [
				"#2D0A54",
				"#D4AF37",
				"#F8F6F2"
			]
		},
		{
			name: "Ivory Gold",
			colors: [
				"#F8F6F2",
				"#D4AF37",
				"#0B0B12"
			]
		},
		{
			name: "Emerald Dusk",
			colors: [
				"#0e3b2e",
				"#c9a24c",
				"#f5efe0"
			]
		}
	];
	const [pi, setPi] = (0, import_react.useState)(0);
	const p = palettes[pi];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Live Preview",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"See your invitation ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "breathe"
				}),
				"."
			] }),
			sub: "Every change updates instantly with cinematic motion — try it below."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass-strong gradient-border rounded-3xl p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-gold",
						children: "Palette"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-3",
						children: palettes.map((pl, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setPi(i),
							className: `flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${i === pi ? "border-gold text-foreground" : "border-white/10 text-foreground/70 hover:border-white/30"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex -space-x-1",
								children: pl.colors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-4 w-4 rounded-full border border-white/20",
									style: { background: c }
								}, c))
							}), pl.name]
						}, pl.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xs uppercase tracking-[0.3em] text-gold",
						children: "Motif"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-3 gap-3",
						children: [
							"Botanical",
							"Art Deco",
							"Minimal"
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl glass p-4 text-center text-sm",
							children: m
						}, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xs uppercase tracking-[0.3em] text-gold",
						children: "Motion"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						defaultValue: 60,
						className: "mt-3 w-full accent-[color:var(--gold)]"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "reveal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] transition duration-700",
					style: { background: `linear-gradient(160deg, ${p.colors[0]}, ${p.colors[2]})` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-6 flex flex-col items-center justify-center border p-8 text-center",
						style: { borderColor: p.colors[1] },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-[0.4em]",
								style: { color: p.colors[1] },
								children: "Save the date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "my-6 h-px w-16",
								style: { background: p.colors[1] }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-4xl",
								style: { color: p.colors[1] },
								children: [
									"Alma ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									" & Julien"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm",
								style: { color: p.colors[2] },
								children: "June 14, 2026 · Villa Bellini"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -top-1/2 left-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent",
							style: { animation: "shimmer 4s linear infinite" }
						})
					})]
				})
			})]
		})]
	});
}
function Process() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Process",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"From idea to invitation in ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "minutes"
				}),
				"."
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto mt-20 max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-6 top-14 hidden h-px gold-line md:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-8 md:grid-cols-4",
				children: [
					{
						n: "01",
						t: "Choose a base",
						d: "Pick a couture template or start from a blank canvas."
					},
					{
						n: "02",
						t: "Personalize",
						d: "Colors, typography, motion, and motifs — refined to your taste."
					},
					{
						n: "03",
						t: "Invite AI",
						d: "Let our AI draft wording, layouts and matching stationery in seconds."
					},
					{
						n: "04",
						t: "Send & host",
						d: "Share by link, manage RSVPs, and delight your guests."
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal text-center",
					style: { transitionDelay: `${i * 100}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-12 w-12 place-items-center rounded-full glass-strong gradient-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm text-gold",
								children: s.n
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl",
							children: s.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-foreground/70",
							children: s.d
						})
					]
				}, s.n))
			})]
		})]
	});
}
function AIGenerator() {
	const [q, setQ] = (0, import_react.useState)("Elegant black-tie wedding in Amalfi, June sunset");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass-strong gradient-border relative overflow-hidden rounded-[2rem] p-10 sm:p-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl animate-float-slow" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-royal blur-3xl animate-float-slower" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-[0.35em] text-gold",
								children: "AI Studio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 font-display text-4xl sm:text-5xl",
								children: ["Describe it. We'll ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gold-gradient not-italic",
									children: "design it."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-foreground/70",
								children: "Our AI composes wording, palette, typography, and motion tuned to your moment — reviewed by human designers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center gap-3 rounded-full glass p-2 pl-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "1.5",
										className: "text-gold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2l2 6h6l-5 4 2 7-7-4-7 4 2-7-5-4h6z" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: q,
										onChange: (e) => setQ(e.target.value),
										className: "w-full bg-transparent text-sm outline-none placeholder:text-foreground/40",
										placeholder: "Describe your event…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn-gold btn-gold-hover !py-2 !px-5 text-sm",
										children: "Generate"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2 text-xs",
								children: [
									"Wedding · Boho",
									"Corporate · Gala",
									"Birthday · Minimal",
									"Anniversary · Vintage"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQ(c),
									className: "rounded-full border border-white/10 px-3 py-1.5 text-foreground/70 hover:border-gold/50 hover:text-foreground",
									children: c
								}, c))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tilt-card mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl glass animate-float-slow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: template_corporate_default,
									alt: "",
									loading: "lazy",
									className: "h-full w-full object-cover img-breathe"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -right-4 -top-4 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-widest text-gold animate-glow-pulse",
								children: "AI · v2"
							})]
						})]
					})
				]
			})
		})
	});
}
function FeaturesGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Premium Features",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Everything a host ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "could wish for"
				}),
				"."
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-3",
			children: [
				{
					t: "Motion Presets",
					d: "Cinematic reveals, particles, and parallax — tastefully applied."
				},
				{
					t: "RSVP & Guestbook",
					d: "Beautiful RSVP flows with dietary, seating, and gifting options."
				},
				{
					t: "Multilingual",
					d: "Draft in 40+ languages with elegant typographic pairings."
				},
				{
					t: "Envelope Delivery",
					d: "Send by email, WhatsApp, or a shareable private link."
				},
				{
					t: "Analytics",
					d: "Track opens, RSVPs and guest interactions in real time."
				},
				{
					t: "Concierge",
					d: "Real designers on standby for final polish and printing."
				}
			].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass rounded-2xl p-8 transition hover:border-gold/40",
				style: { transitionDelay: `${i * 60}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-8 gold-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-xl",
						children: f.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-foreground/70",
						children: f.d
					})
				]
			}, f.t))
		})]
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Loved by Hosts",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Stories from ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "unforgettable"
				}),
				" nights."
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3",
			children: [
				{
					q: "The invitation was the most complimented detail of our wedding.",
					a: "Elena & Marco",
					r: "Lake Como, Italy"
				},
				{
					q: "Studio-grade design without the studio timeline. Simply magical.",
					a: "Amara Okonkwo",
					r: "Event Director, LAGOS"
				},
				{
					q: "Our brand gala felt sharper, warmer, and unmistakably ours.",
					a: "James Whitmore",
					r: "CMO, Maison Aurelia"
				}
			].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "reveal glass gradient-border rounded-3xl p-8",
				style: { transitionDelay: `${i * 100}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "currentColor",
						className: "text-gold/70",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 7h4v4H7v4a4 4 0 004-4V7zm10 0h-4v4h4v4a4 4 0 004-4V7z" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "mt-4 font-display text-xl leading-snug",
						children: [
							"\"",
							t.q,
							"\""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "mt-6 border-t border-white/10 pt-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-foreground",
							children: t.a
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-foreground/60 text-xs",
							children: t.r
						})]
					})
				]
			}, i))
		})]
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pricing",
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Pricing",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Simple, ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "refined"
				}),
				" plans."
			] }),
			sub: "Cancel anytime. Every plan includes our design guarantee."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3",
			children: [
				{
					n: "Essential",
					p: "$19",
					d: "Perfect for intimate gatherings.",
					f: [
						"3 invitations / month",
						"RSVP tracking",
						"Basic motion presets",
						"Email delivery"
					]
				},
				{
					n: "Signature",
					p: "$49",
					d: "Our most-loved plan.",
					f: [
						"Unlimited invitations",
						"Premium templates",
						"AI generator",
						"Guest analytics",
						"Priority support"
					]
				},
				{
					n: "Atelier",
					p: "Custom",
					d: "White-glove for weddings & brands.",
					f: [
						"Dedicated designer",
						"Bespoke templates",
						"Concierge onboarding",
						"Print production",
						"Priority SLA"
					]
				}
			].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `reveal relative rounded-3xl p-8 ${p.highlight ? "glass-strong gradient-border" : "glass"}`,
				style: { transitionDelay: `${i * 90}ms` },
				children: [
					p.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-3 py-1 text-[10px] uppercase tracking-widest text-noir",
						children: "Most loved"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: p.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-foreground/60",
						children: p.d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-5xl text-gold-gradient",
							children: p.p
						}), p.p !== "Custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 text-xs text-foreground/60",
							children: "/month"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 h-px gold-line" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 text-sm",
						children: p.f.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "mt-0.5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/80",
								children: f
							})]
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#cta",
						className: `mt-8 block text-center ${p.highlight ? "btn-gold btn-gold-hover" : "btn-ghost-gold hover:bg-white/5"}`,
						children: p.p === "Custom" ? "Talk to us" : "Choose plan"
					})
				]
			}, p.n))
		})]
	});
}
function FAQ() {
	const qs = [
		{
			q: "Can I customize every element of a template?",
			a: "Absolutely. Fonts, colors, motion, motifs — even envelope liners. Nothing is locked."
		},
		{
			q: "Do you support printed invitations?",
			a: "Yes. Our Atelier plan includes concierge print production with premium papers and foil finishes."
		},
		{
			q: "How does the AI generator work?",
			a: "Describe your event and vibe. Our AI produces layouts, wording, and matching stationery in seconds."
		},
		{
			q: "Is my guest data secure?",
			a: "Data is encrypted at rest and in transit, and we never share guest information with third parties."
		}
	];
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "FAQ",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Answers, ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "gracefully"
				}),
				"."
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 max-w-3xl px-6",
			children: qs.map((f, i) => {
				const isOpen = open === i;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal border-b border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(isOpen ? null : i),
						className: "flex w-full items-center justify-between py-6 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid h-8 w-8 place-items-center rounded-full glass text-gold transition ${isOpen ? "rotate-45" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" })
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid overflow-hidden text-sm text-foreground/70 transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0",
							children: f.a
						})
					})]
				}, i);
			})
		})]
	});
}
function Blog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "blog",
		className: "relative py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: "Journal",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Inspiration from the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient not-italic",
					children: "studio"
				}),
				"."
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3",
			children: [
				{
					t: "The art of a modern save-the-date",
					c: "Design",
					img: template_wedding_default
				},
				{
					t: "Typography rules for luxury invites",
					c: "Craft",
					img: template_birthday_default
				},
				{
					t: "Hosting a black-tie gala guests remember",
					c: "Events",
					img: template_corporate_default
				}
			].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#",
				className: "reveal group overflow-hidden rounded-3xl glass",
				style: { transitionDelay: `${i * 90}ms` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[4/3] overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.img,
						alt: "",
						loading: "lazy",
						className: "img-motion h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest text-gold",
							children: p.c
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl",
							children: p.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 text-xs text-foreground/60",
							children: ["Read article", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowIcon, {
								size: 12,
								className: "transition group-hover:translate-x-1"
							})]
						})
					]
				})]
			}, p.t))
		})]
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "cta",
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reveal glass-strong gradient-border relative overflow-hidden rounded-[2.5rem] p-12 text-center sm:p-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-40 animate-gradient-pan",
					style: { background: "linear-gradient(120deg, rgba(212,175,55,0.2), rgba(45,10,84,0.6), rgba(212,175,55,0.2))" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.35em] text-gold",
							children: "Ready when you are"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mx-auto mt-6 max-w-3xl font-display text-4xl sm:text-6xl",
							children: [
								"Design an invitation your guests ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gold-gradient not-italic",
									children: "won't forget"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-xl text-foreground/70",
							children: "Start free — no credit card required. Upgrade only when you're ready to send."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create",
								className: "btn-gold btn-gold-hover",
								children: "Create your invitation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pricing",
								className: "btn-ghost-gold hover:bg-white/5",
								children: "See pricing"
							})]
						})
					]
				})]
			})
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative border-t border-white/10 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-full glass",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-gold-gradient text-lg",
							children: "I"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "Invite Studio"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-sm text-sm text-foreground/60",
					children: "Couture-grade digital invitations for weddings, celebrations, and unforgettable brand moments."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex gap-3",
					children: [
						"IG",
						"TW",
						"PN",
						"IN"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "grid h-9 w-9 place-items-center rounded-full glass text-xs text-foreground/70 hover:text-gold",
						children: s
					}, s))
				})
			] }), [
				{
					h: "Product",
					l: [
						"Templates",
						"Pricing",
						"AI Studio",
						"Live Preview"
					]
				},
				{
					h: "Company",
					l: [
						"About",
						"Journal",
						"Careers",
						"Press"
					]
				},
				{
					h: "Support",
					l: [
						"Help Center",
						"Contact",
						"Concierge",
						"Status"
					]
				}
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-xs uppercase tracking-[0.3em] text-gold",
				children: c.h
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3 text-sm text-foreground/70",
				children: c.l.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					className: "hover:text-foreground",
					children: x
				}) }, x))
			})] }, c.h))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-foreground/50 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Invite Studio. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Cookies"
						})
					]
				})]
			})
		})]
	});
}
function Index() {
	useReveal();
	useMouseGlow();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustedBy, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyUs, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Categories, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Templates, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePreview, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIGenerator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturesGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blog, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var rootRouteChildren = { IndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren);
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

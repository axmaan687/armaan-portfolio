import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mail, Download, Linkedin, Github, MapPin, Check, ArrowUpRight, Sun, Moon } from "lucide-react";

const RESUME_URL =
  "https://drive.google.com/file/d/1Cxsc0pUt0ECRAjf1Gp4SYMXLCmrcxLMF/view?usp=drivesdk";
const EMAIL = "armaanchoudhury992@gmail.com";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Armaan Choudhury — Aspiring Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Armaan Choudhury — Aspiring Software Developer, Java Developer, and Frontend Web Developer based in Kolkata.",
      },
      { property: "og:title", content: "Armaan Choudhury — Software Developer" },
      {
        property: "og:description",
        content:
          "Aspiring Software Developer · Java · Frontend Web Developer based in Kolkata.",
      },
    ],
  }),
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els =
      ref.current?.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-3d, .reveal-3d-left, .reveal-3d-right",
      ) ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el, i) => {
      el.style.animationDelay = `${i * 60}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Parallax tilt: applies --tilt based on element distance from viewport center. */
function useScrollTilt() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".tilt-on-scroll");
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const delta = (center - vh / 2) / vh; // -1..1
        const tilt = Math.max(-8, Math.min(8, delta * 10));
        el.style.setProperty("--tilt", `${tilt.toFixed(2)}deg`);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/** Background parallax: shifts background layers as the user scrolls. */
function useBgParallax() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--bg-y", `${y * 0.15}px`);
      document.documentElement.style.setProperty("--bg-y-slow", `${y * 0.05}px`);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

const experience = [
  {
    title: "Frontend Development Intern",
    company: "CodeAlpha",
    period: "Apr 2026",
    location: "Remote",
    bullets: [
      "Developed responsive frontend projects using React.js and modern JavaScript.",
      "Built reusable, component-based UI focused on performance and user experience.",
      "Collaborated on frontend implementation tasks and project optimization.",
    ],
  },
  {
    title: "React.js Intern",
    company: "InternSpark",
    period: "Mar 2026",
    location: "Remote",
    bullets: [
      "Designed and developed responsive web interfaces using React.js.",
      "Worked on portfolio-style projects, hooks, routing, and feature implementation.",
      "Strengthened debugging, state management, and UI optimization skills.",
    ],
  },
  {
    title: "Goldman Sachs Risk Management Virtual Internship",
    company: "Forage",
    period: "May 2026",
    location: "Virtual",
    bullets: [
      "Explored risk management concepts used in financial institutions.",
      "Applied financial analysis to structured business decision-making.",
      "Developed analytical thinking and structured problem-solving approaches.",
    ],
  },
  {
    title: "Head Boy & School Sports Captain",
    company: "G.D. Birla Centre for Education",
    period: "2023 — 2025",
    location: "Kolkata, India",
    bullets: [
      "Led academic and extracurricular initiatives, representing the student body.",
      "Captained sports teams in inter-school competitions.",
      "Built leadership, communication, and performance-under-pressure skills.",
    ],
  },
];

const skills: Array<[string, string]> = [
  ["Languages", "Java, Python, C, JavaScript, HTML, CSS"],
  ["Web Development", "React.js, Node.js, Responsive Design, Frontend, UI Development"],
  ["Tools", "Git, GitHub, VS Code, Figma, Canva"],
  ["Concepts", "OOP, Data Structures & Algorithms, DBMS"],
  ["Soft Skills", "Leadership, Teamwork, Communication, Problem Solving"],
  ["Languages Spoken", "English, Hindi, Bengali, German (basic)"],
];

const certs = [
  "Frontend Development Libraries V8 — freeCodeCamp",
  "JPMorgan Chase Software Engineering Job Simulation",
  "Legacy Responsive Web Design V8 — freeCodeCamp",
  "Goldman Sachs Risk Management Virtual Internship",
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-foreground/15 hover:border-accent hover:text-accent transition"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Section({
  id,
  label,
  title,
  children,
  decoration,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
  decoration?: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 md:py-32 scroll-mt-20 tilt-on-scroll">
      {decoration}
      <WebCorners />
      <div className="reveal-3d">
        <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">{label}</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-12">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Subtle Spidey accent: corner webs + faint web-pattern wash for any section. */
function WebCorners() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* top-left corner web */}
      <div
        className="absolute -top-16 -left-16 text-accent/30"
        style={{ animation: "web-spin 90s linear infinite" }}
      >
        <SpiderWeb size={220} spokes={12} rings={6} strokeOpacity={0.45} />
      </div>
      {/* bottom-right corner web (counter-rotating) */}
      <div
        className="absolute -bottom-20 -right-20 text-accent/25"
        style={{ animation: "web-spin 120s linear infinite reverse" }}
      >
        <SpiderWeb size={260} spokes={14} rings={7} strokeOpacity={0.4} />
      </div>
      {/* faint crimson radial wash */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, color-mix(in oklab, var(--primary) 55%, transparent), transparent 55%)",
        }}
      />
      {/* hairline scanline */}
      <div
        className="absolute inset-x-0 h-px bg-accent/20"
        style={{ animation: "scanline 14s linear infinite" }}
      />
    </div>
  );
}

/** Designer wireframe icosahedron — SVG, rotates in 3D space. */
function WireIcosahedron({ size = 280, strokeOpacity = 0.6 }: { size?: number; strokeOpacity?: number }) {
  // 12 vertices of an icosahedron (phi-based)
  const t = (1 + Math.sqrt(5)) / 2;
  const v: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  const edges: [number, number][] = [
    [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],
    [2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],[4,5],[4,9],
    [4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11],
  ];
  const s = size / 2;
  const project = ([x, y]: [number, number, number]) => [s + x * (s * 0.4), s + y * (s * 0.4)];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
      style={{ transformStyle: "preserve-3d", animation: "spin-xy 40s linear infinite" }}
    >
      {edges.map(([a, b], i) => {
        const [x1, y1] = project(v[a]);
        const [x2, y2] = project(v[b]);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor"
            strokeOpacity={strokeOpacity}
            strokeWidth={1}
          />
        );
      })}
      {v.map((p, i) => {
        const [x, y] = project(p);
        return <circle key={i} cx={x} cy={y} r={2} fill="currentColor" opacity={0.9} />;
      })}
    </svg>
  );
}

/** Spider web: radial spokes + concentric web rings, with a subtle break for that hand-drawn feel. */
function SpiderWeb({
  size = 320,
  spokes = 14,
  rings = 7,
  strokeOpacity = 0.55,
}: {
  size?: number;
  spokes?: number;
  rings?: number;
  strokeOpacity?: number;
}) {
  const c = size / 2;
  const r = size / 2 - 4;
  const angles = Array.from({ length: spokes }, (_, i) => (i * 360) / spokes);
  const radii = Array.from({ length: rings }, (_, i) => ((i + 1) / rings) * r);
  // Build sagging web segments between adjacent spokes for each ring
  const segments: string[] = [];
  for (let ri = 0; ri < radii.length; ri++) {
    const rad = radii[ri];
    const sag = 0.78 + ri * 0.015;
    for (let si = 0; si < spokes; si++) {
      const a1 = (angles[si] * Math.PI) / 180;
      const a2 = (angles[(si + 1) % spokes] * Math.PI) / 180;
      const x1 = c + Math.cos(a1) * rad;
      const y1 = c + Math.sin(a1) * rad;
      const x2 = c + Math.cos(a2) * rad;
      const y2 = c + Math.sin(a2) * rad;
      const am = (a1 + a2) / 2;
      const mx = c + Math.cos(am) * rad * sag;
      const my = c + Math.sin(am) * rad * sag;
      segments.push(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      {/* spokes */}
      {angles.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={`s-${i}`}
            x1={c}
            y1={c}
            x2={c + Math.cos(rad) * r}
            y2={c + Math.sin(rad) * r}
            stroke="currentColor"
            strokeOpacity={strokeOpacity}
            strokeWidth={0.8}
          />
        );
      })}
      {/* sagging rings */}
      {segments.map((d, i) => (
        <path
          key={`w-${i}`}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={strokeOpacity * 0.85}
          strokeWidth={0.7}
        />
      ))}
      <circle cx={c} cy={c} r={2.5} fill="currentColor" />
    </svg>
  );
}

/** Iconic Spider-Man mask silhouette with web pattern and large lenses. */
function SpiderMask({ size = 320 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 320 368"
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <radialGradient id="mask-fill" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="oklch(0.55 0.24 27)" />
          <stop offset="60%" stopColor="oklch(0.42 0.21 27)" />
          <stop offset="100%" stopColor="oklch(0.22 0.12 27)" />
        </radialGradient>
        <radialGradient id="lens-fill" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="oklch(0.98 0.02 250)" />
          <stop offset="55%" stopColor="oklch(0.85 0.08 235)" />
          <stop offset="100%" stopColor="oklch(0.45 0.12 245)" />
        </radialGradient>
        <clipPath id="mask-clip">
          <path d="M160 8 C 92 8 36 70 36 168 C 36 250 90 332 160 360 C 230 332 284 250 284 168 C 284 70 228 8 160 8 Z" />
        </clipPath>
      </defs>

      {/* mask base */}
      <path
        d="M160 8 C 92 8 36 70 36 168 C 36 250 90 332 160 360 C 230 332 284 250 284 168 C 284 70 228 8 160 8 Z"
        fill="url(#mask-fill)"
        stroke="oklch(0.7 0.22 27)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />

      {/* web pattern clipped to mask */}
      <g clipPath="url(#mask-clip)" stroke="oklch(0.18 0.05 25)" strokeOpacity="0.85" strokeWidth="0.8" fill="none">
        {/* radial spokes from forehead origin */}
        {Array.from({ length: 22 }).map((_, i) => {
          const a = (i * 360) / 22;
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={`sp-${i}`}
              x1="160"
              y1="160"
              x2={160 + Math.cos(rad) * 260}
              y2={160 + Math.sin(rad) * 260}
            />
          );
        })}
        {/* concentric sagging rings */}
        {[24, 46, 70, 96, 124, 154, 188, 224].map((r, ri) => {
          const segs: string[] = [];
          const N = 22;
          for (let i = 0; i < N; i++) {
            const a1 = (i * 2 * Math.PI) / N;
            const a2 = ((i + 1) * 2 * Math.PI) / N;
            const sag = 0.82 + ri * 0.012;
            const x1 = 160 + Math.cos(a1) * r;
            const y1 = 160 + Math.sin(a1) * r;
            const x2 = 160 + Math.cos(a2) * r;
            const y2 = 160 + Math.sin(a2) * r;
            const am = (a1 + a2) / 2;
            const mx = 160 + Math.cos(am) * r * sag;
            const my = 160 + Math.sin(am) * r * sag;
            segs.push(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
          }
          return <path key={`r-${ri}`} d={segs.join(" ")} />;
        })}
      </g>

      {/* eye lenses */}
      <g>
        <path
          d="M 78 150 Q 100 110 150 130 Q 152 158 132 178 Q 96 188 80 172 Z"
          fill="url(#lens-fill)"
          stroke="oklch(0.15 0.04 25)"
          strokeWidth="2"
        />
        <path
          d="M 242 150 Q 220 110 170 130 Q 168 158 188 178 Q 224 188 240 172 Z"
          fill="url(#lens-fill)"
          stroke="oklch(0.15 0.04 25)"
          strokeWidth="2"
        />
        <ellipse cx="105" cy="142" rx="8" ry="5" fill="white" opacity="0.85" />
        <ellipse cx="215" cy="142" rx="8" ry="5" fill="white" opacity="0.85" />
      </g>
    </svg>
  );
}

/** City skyline silhouette — repeating buildings, parallax sway. */
function CitySkyline() {
  const buildings = [
    { x: 0,   w: 60,  h: 120, win: 5 },
    { x: 60,  w: 40,  h: 90,  win: 3 },
    { x: 100, w: 80,  h: 180, win: 7 },
    { x: 180, w: 50,  h: 110, win: 4 },
    { x: 230, w: 90,  h: 220, win: 9 },
    { x: 320, w: 45,  h: 95,  win: 4 },
    { x: 365, w: 70,  h: 160, win: 6 },
    { x: 435, w: 55,  h: 130, win: 5 },
    { x: 490, w: 85,  h: 200, win: 8 },
    { x: 575, w: 50,  h: 100, win: 4 },
    { x: 625, w: 75,  h: 170, win: 7 },
    { x: 700, w: 60,  h: 140, win: 5 },
    { x: 760, w: 90,  h: 230, win: 9 },
    { x: 850, w: 50,  h: 110, win: 4 },
    { x: 900, w: 80,  h: 175, win: 7 },
    { x: 980, w: 60,  h: 130, win: 5 },
  ];
  return (
    <svg
      viewBox="0 0 1040 240"
      preserveAspectRatio="none"
      className="block w-full h-[26vh] min-h-[160px]"
    >
      <defs>
        <linearGradient id="bld" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.06 0.01 25)" />
          <stop offset="100%" stopColor="oklch(0.02 0.01 25)" />
        </linearGradient>
      </defs>
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={240 - b.h} width={b.w - 4} height={b.h} fill="url(#bld)" />
          {Array.from({ length: b.win }).map((_, r) =>
            Array.from({ length: Math.max(2, Math.floor((b.w - 4) / 12)) }).map((_, c) => {
              const lit = (i * 7 + r * 3 + c) % 5 === 0;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={b.x + 4 + c * 10}
                  y={240 - b.h + 8 + r * 14}
                  width={4}
                  height={6}
                  fill={lit ? "oklch(0.78 0.18 60)" : "oklch(0.25 0.04 25)"}
                  opacity={lit ? 0.9 : 0.35}
                />
              );
            }),
          )}
        </g>
      ))}
    </svg>
  );
}
/** Hero accent: stacked glass cards with depth. */
function HeroGlassStack() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-16 hidden lg:block"
      style={{ perspective: "1400px" }}
    >
      <div
        className="relative h-[320px] w-[320px]"
        style={{ transformStyle: "preserve-3d", animation: "float-3d 10s ease-in-out infinite" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl border border-accent/30 backdrop-blur-md"
            style={{
              transform: `translateZ(${i * 28}px) rotateX(${10 - i * 2}deg) rotateY(${-15 + i * 3}deg)`,
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--accent) 14%, transparent), color-mix(in oklab, var(--foreground) 4%, transparent))",
              boxShadow:
                "0 30px 60px -20px color-mix(in oklab, var(--accent) 30%, transparent)",
              opacity: 0.85 - i * 0.12,
            }}
          />
        ))}
        <div
          className="absolute inset-4"
          style={{ transform: "translateZ(140px)", animation: "mask-float 6s ease-in-out infinite" }}
        >
          <SpiderMask size={280} />
        </div>
      </div>
    </div>
  );
}

/** Glowing vertical beam for the experience timeline. */
function TimelineBeam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-6 top-32 bottom-12 w-px hidden md:block"
      style={{
        background:
          "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--accent) 80%, transparent), transparent)",
        boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 40%, transparent)",
        animation: "beam-pulse 4s ease-in-out infinite",
        transformOrigin: "center",
      }}
    />
  );
}

/** Skills accent: floating wireframe sphere (rotating). */
function SkillsOrb() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-12 top-12 hidden md:block opacity-70 text-accent"
      style={{ perspective: "1100px" }}
    >
      <div style={{ animation: "orb-drift 9s ease-in-out infinite" }}>
        <div style={{ animation: "web-spin 80s linear infinite" }}>
          <SpiderWeb size={240} strokeOpacity={0.6} />
        </div>
      </div>
    </div>
  );
}

/** Education accent: thin spinning rings on a tilted axis. */
function EduRings() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -left-16 -bottom-6 hidden md:block opacity-50"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative h-72 w-72"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(70deg)" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/40"
            style={{
              transform: `rotateZ(${i * 30}deg) scale(${1 - i * 0.18})`,
              animation: `spin-y ${20 + i * 8}s linear infinite ${i % 2 ? "reverse" : ""}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Modern animated background: morphing mesh gradient + glass shards + dot field. */
function AnimatedBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* morphing mesh blobs */}
      <div
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 38%, transparent), transparent 65%)",
          filter: "blur(80px)",
          animation: "mesh-shift 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.18 250 / 0.45), transparent 70%)",
          filter: "blur(90px)",
          animation: "mesh-shift-2 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 27 / 0.35), transparent 70%)",
          filter: "blur(100px)",
          animation: "mesh-shift 22s ease-in-out infinite reverse",
        }}
      />

      {/* perspective dot field */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--foreground) 35%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
          transform: "translate3d(0, calc(var(--bg-y, 0px) * -1), 0)",
        }}
      />

      {/* floating glass shards in 3D */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "1400px",
          transform: "translate3d(0, calc(var(--bg-y, 0px) * -1), 0)",
        }}
      >
        {[
          { top: "8%", left: "6%", w: 180, h: 240, r: -18, z: 60 },
          { top: "62%", left: "78%", w: 220, h: 160, r: 14, z: 100 },
          { top: "40%", left: "82%", w: 120, h: 120, r: -8, z: 40 },
          { top: "78%", left: "12%", w: 160, h: 200, r: 10, z: 80 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-2xl border border-accent/25 backdrop-blur-[2px]"
            style={
              {
                top: s.top,
                left: s.left,
                width: s.w,
                height: s.h,
                "--r": `${s.r}deg`,
                transform: `rotate(${s.r}deg) translateZ(${s.z}px)`,
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--accent) 12%, transparent), color-mix(in oklab, var(--foreground) 4%, transparent))",
                boxShadow:
                  "0 25px 60px -25px color-mix(in oklab, var(--accent) 35%, transparent)",
                animation: `shard-float ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.6}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* big rotating wireframe icosahedron in the back */}
        {/* giant slow-rotating spider web behind everything */}
        <div
          className="absolute text-accent"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "web-pulse 8s ease-in-out infinite",
          }}
        >
          <div style={{ animation: "web-spin 120s linear infinite" }}>
            <SpiderWeb size={680} spokes={18} rings={9} strokeOpacity={0.28} />
          </div>
        </div>

        {/* twinkling dots */}
        {[
          { top: "15%", left: "30%" },
          { top: "25%", left: "70%" },
          { top: "55%", left: "20%" },
          { top: "75%", left: "60%" },
          { top: "40%", left: "50%" },
          { top: "85%", left: "40%" },
        ].map((d, i) => (
          <div
            key={`dot-${i}`}
            className="absolute h-1 w-1 rounded-full bg-accent"
            style={{
              ...d,
              boxShadow: "0 0 12px var(--accent)",
              animation: `dot-twinkle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* corner web overlays */}
      <div
        className="absolute -top-20 -left-20 text-accent/30"
        style={{ animation: "web-pulse 10s ease-in-out infinite" }}
      >
        <SpiderWeb size={360} spokes={12} rings={6} strokeOpacity={0.5} />
      </div>
      <div
        className="absolute -bottom-24 -right-24 text-accent/25"
        style={{ animation: "web-pulse 12s ease-in-out infinite", animationDelay: "1s" }}
      >
        <SpiderWeb size={320} spokes={12} rings={6} strokeOpacity={0.5} />
      </div>

      {/* swinging spider silhouette */}
      <svg
        className="absolute"
        width="64"
        height="120"
        style={{
          top: 0,
          right: "12%",
          color: "var(--foreground)",
          opacity: 0.55,
          transformOrigin: "top center",
          animation: "spider-swing 7s ease-in-out infinite",
        }}
        viewBox="0 0 64 120"
      >
        <line x1="32" y1="0" x2="32" y2="68" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.8" />
        {/* body */}
        <ellipse cx="32" cy="78" rx="9" ry="7" fill="currentColor" />
        <circle cx="32" cy="70" r="5" fill="currentColor" />
        {/* legs */}
        {[-1, 1].map((dir) =>
          [0, 1, 2, 3].map((i) => (
            <path
              key={`${dir}-${i}`}
              d={`M 32 ${74 + i * 1.5} q ${dir * (10 + i * 2)} ${4 + i} ${dir * (16 + i * 3)} ${14 + i * 2}`}
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
          )),
        )}
      </svg>

      {/* horizontal web-shooter trails */}
      {[
        { top: "22%", delay: "0s", dur: "9s", w: "55%" },
        { top: "58%", delay: "3s", dur: "11s", w: "70%" },
        { top: "82%", delay: "6s", dur: "10s", w: "45%" },
      ].map((t, i) => (
        <div
          key={`trail-${i}`}
          className="absolute h-px text-accent"
          style={{
            top: t.top,
            left: 0,
            width: t.w,
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 70%, transparent), transparent)",
            boxShadow: "0 0 12px color-mix(in oklab, var(--accent) 60%, transparent)",
            animation: `web-shoot ${t.dur} linear infinite`,
            animationDelay: t.delay,
          }}
        />
      ))}

      {/* subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* city skyline pinned to bottom */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ animation: "city-parallax 18s ease-in-out infinite" }}
      >
        <div
          className="absolute inset-x-0 -top-16 h-16"
          style={{
            background:
              "linear-gradient(to top, oklch(0.06 0.01 25) 0%, transparent 100%)",
          }}
        />
        <CitySkyline />
      </div>
    </div>
  );
}


function Portfolio() {
  const ref = useReveal();
  useScrollTilt();
  useBgParallax();

  return (
    <div ref={ref} className="relative min-h-screen text-foreground">
      <AnimatedBackground />
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/60">
        <nav className="mx-auto max-w-[960px] px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-xl font-bold text-accent tracking-tight">
            Armaan
          </a>
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <ThemeToggle />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition"
            >
              <Download className="h-3.5 w-3.5" /> Resume
            </a>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-full"
            >
              <Download className="h-3 w-3" /> Resume
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[900px] px-6 pt-32">
        {/* Hero */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32">
          <HeroGlassStack />
          <WebCorners />
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Available for internships · 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
              Armaan
              <br />
              Choudhury<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-accent font-medium">
              Aspiring Software Developer · Java Developer · Frontend Web Developer
            </p>
            <p className="mt-3 text-sm text-muted-foreground inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Kolkata, West Bengal
            </p>
          </div>

          <div
            id="about"
            className="reveal mt-12 max-w-2xl relative p-6 md:p-8 rounded-2xl border border-accent/25 bg-secondary/30 backdrop-blur-sm shadow-[0_0_60px_-20px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 text-accent/35"
              style={{ animation: "web-spin 60s linear infinite" }}
            >
              <SpiderWeb size={140} spokes={10} rings={5} strokeOpacity={0.5} />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">00 — About</p>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Passionate and detail-oriented Computer Science student with a strong interest
              in software development and modern web technologies. Skilled in Java, HTML, CSS,
              and JavaScript, with hands-on experience building responsive web applications
              and academic projects.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground/80">
              A quick learner with strong problem-solving abilities, dedicated to creating
              clean, user-friendly, and efficient solutions while contributing positively to
              collaborative teams and innovative projects.
            </p>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition"
            >
              <Mail className="h-4 w-4" /> Email Me
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:border-foreground/50 transition"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://www.linkedin.com/in/armaanchoudhury"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-foreground/15 hover:border-accent hover:text-accent transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/axmaan687"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-foreground/15 hover:border-accent hover:text-accent transition"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Experience */}
        <Section id="experience" label="01 — Work" title="Experience" decoration={<TimelineBeam />}>
          <div className="space-y-10">
            {experience.map((e) => (
              <article
                key={e.title + e.company}
                className="reveal-3d-left group relative pl-6 pr-4 py-4 border-l-2 border-accent/60 rounded-r-xl transition-all duration-500 hover:border-accent hover:bg-accent/5 hover:shadow-[0_0_40px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:-translate-y-0.5"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-2 text-accent/0 group-hover:text-accent/40 transition-colors duration-500"
                  style={{ animation: "web-spin 30s linear infinite" }}
                >
                  <SpiderWeb size={70} spokes={8} rings={4} strokeOpacity={0.6} />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl md:text-2xl font-semibold">
                    {e.title} <span className="text-muted-foreground">— {e.company}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground tracking-wider uppercase">
                    {e.period} · {e.location}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-foreground/75">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <section id="skills" className="relative py-24 md:py-32 scroll-mt-20 tilt-on-scroll">
          <SkillsOrb />
          <WebCorners />
          <div className="reveal-3d">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">02 — Stack</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-12">
              Skills &amp; Technologies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map(([cat, list], i) => (
              <div
                key={cat}
                className={`${i % 2 === 0 ? "reveal-3d-left" : "reveal-3d-right"} group relative p-5 rounded-xl border border-foreground/10 bg-secondary/30 backdrop-blur-sm transition-all duration-500 hover:border-accent/60 hover:-translate-y-1 hover:shadow-[0_0_50px_-15px_color-mix(in_oklab,var(--primary)_70%,transparent)]`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-2 right-2 text-accent/30 group-hover:text-accent/70 transition-colors"
                  style={{ animation: "web-spin 45s linear infinite" }}
                >
                  <SpiderWeb size={48} spokes={8} rings={3} strokeOpacity={0.7} />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  {cat}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{list}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certs */}
        <Section id="education" label="03 — Background" title="Education & Certifications" decoration={<EduRings />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-3d-left">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Education</h3>
              <div className="pl-6 border-l-2 border-accent/60">
                <p className="font-display text-xl font-semibold">
                  B.Tech in Computer Science &amp; Engineering
                </p>
                <p className="text-foreground/70 mt-1">
                  Honours in Innovation · KL University
                </p>
                <p className="text-sm text-muted-foreground mt-1">July 2025 — July 2029</p>
                <p className="text-sm text-muted-foreground mt-2">CGPA: 9.12 (Semester 1)</p>
              </div>
            </div>
            <div className="reveal-3d-right">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certs.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-foreground/80">
                    <Check className="h-4 w-4 mt-1 text-accent shrink-0" />
                    <span className="text-[15px] leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal-3d mt-12 p-8 border border-foreground/10 bg-secondary/40">
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Leadership</p>
            <p className="font-display text-xl">
              Head Boy &amp; School Sports Captain — G.D. Birla Centre for Education (2023–2025)
            </p>
            <p className="text-foreground/70 mt-2 text-[15px] leading-relaxed">
              Selected to lead both academic and athletic student bodies — shaping discipline,
              communication, and the ability to perform under pressure.
            </p>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" label="04 — Contact" title="Let's Connect">
          <div className="reveal max-w-2xl relative p-8 md:p-10 rounded-2xl border border-accent/30 bg-secondary/40 backdrop-blur-sm shadow-[0_0_80px_-20px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-12 -left-12 text-accent/40"
              style={{ animation: "web-spin 70s linear infinite" }}
            >
              <SpiderWeb size={180} spokes={12} rings={6} strokeOpacity={0.55} />
            </div>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed italic">
              "Available for internships, collaborative projects, and opportunities to apply
              and grow my skills in software development."
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition"
              >
                <Mail className="h-4 w-4" /> Email Me
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:border-foreground/50 transition"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/armaanchoudhury"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition"
              >
                LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/axmaan687"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-1.5 hover:text-accent transition"
              >
                {EMAIL} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Section>

        <footer className="py-10 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Armaan Choudhury</p>
          <p className="font-display tracking-wider">Built with care · Kolkata, IN</p>
        </footer>
      </main>
    </div>
  );
}

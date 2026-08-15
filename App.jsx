import React, { useState, useEffect, useRef } from "react";
import {
  Code2, Cloud, ShieldCheck, Cpu, Smartphone, LineChart,
  ArrowRight, Menu, X, CheckCircle2, Users, Award, Briefcase,
  TrendingUp, Mail, Phone, MapPin, Clock, LogOut, User as UserIcon,
  ChevronDown, Quote, Sparkles
} from "lucide-react";

/* ---------------------------------------------------------------- */
/*  Design tokens                                                    */
/* ---------------------------------------------------------------- */
const COLORS = {
  ink: "#14121A",
  surface: "#1D1A26",
  surfaceLight: "#26212F",
  border: "#332D3F",
  orange: "#FF4D2E",
  violet: "#8B5CF6",
  yellow: "#FFC53D",
  text: "#F5F2ED",
  muted: "#A79FB0",
};

const FONT_IMPORT_ID = "cf-fonts";
function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------------------------------------------------------------- */
/*  Data                                                              */
/* ---------------------------------------------------------------- */
const COURSES = [
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    icon: Code2,
    category: "Development",
    level: "Beginner to Advanced",
    duration: "24 weeks",
    price: "₹64,999",
    tags: ["React", "Node.js", "MongoDB", "REST APIs"],
    description:
      "Go from writing your first line of HTML to shipping production React and Node applications with real databases.",
    curriculum: [
      "HTML, CSS & modern JavaScript",
      "React fundamentals & hooks",
      "Node.js, Express & REST APIs",
      "MongoDB & SQL databases",
      "Auth, deployment & capstone project",
    ],
  },
  {
    id: "data-ai",
    title: "Data Science & AI",
    icon: LineChart,
    category: "Data",
    level: "Intermediate",
    duration: "20 weeks",
    price: "₹74,999",
    tags: ["Python", "Pandas", "ML", "Deep Learning"],
    description:
      "Learn to clean data, build models, and ship machine learning systems that actually make it to production.",
    curriculum: [
      "Python for data analysis",
      "Statistics & visualization",
      "Machine learning with scikit-learn",
      "Deep learning with PyTorch",
      "MLOps & deployment",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    icon: Cloud,
    category: "Infrastructure",
    level: "Intermediate",
    duration: "16 weeks",
    price: "₹58,999",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    description:
      "Master the tools that keep modern software running: containers, orchestration, and cloud infrastructure.",
    curriculum: [
      "Linux & networking fundamentals",
      "AWS core services",
      "Docker & Kubernetes",
      "CI/CD pipelines",
      "Infrastructure as code",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Ethical Hacking",
    icon: ShieldCheck,
    category: "Security",
    level: "Intermediate to Advanced",
    duration: "18 weeks",
    price: "₹69,999",
    tags: ["Network Security", "Pen Testing", "SOC"],
    description:
      "Learn how systems get broken into, so you can be the one who stops it. Hands-on labs throughout.",
    curriculum: [
      "Networking & security fundamentals",
      "Vulnerability assessment",
      "Penetration testing",
      "Security operations & incident response",
      "Certification prep",
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    icon: Smartphone,
    category: "Development",
    level: "Beginner to Advanced",
    duration: "18 weeks",
    price: "₹59,999",
    tags: ["React Native", "iOS", "Android"],
    description:
      "Build and publish real apps for iOS and Android from a single React Native codebase.",
    curriculum: [
      "JavaScript & React foundations",
      "React Native core",
      "Native device features",
      "State management at scale",
      "App store deployment",
    ],
  },
  {
    id: "python",
    title: "Python Programming Foundations",
    icon: Cpu,
    category: "Development",
    level: "Beginner",
    duration: "10 weeks",
    price: "₹24,999",
    tags: ["Python", "OOP", "Automation"],
    description:
      "A gentle, practical start for people who have never written code before — the on-ramp to every other track.",
    curriculum: [
      "Python syntax & control flow",
      "Functions & data structures",
      "Object-oriented programming",
      "File handling & automation",
      "Mini capstone project",
    ],
  },
];

const CATEGORIES = ["All", "Development", "Data", "Infrastructure", "Security"];

const TESTIMONIALS = [
  {
    name: "Ananya Reddy",
    role: "Frontend Engineer, prev. Retail Associate",
    quote:
      "I had never written code before I walked in. Six months later I had three offers on the table.",
  },
  {
    name: "Rohit Malhotra",
    role: "Cloud Engineer, prev. Mechanical Grad",
    quote:
      "The instructors treated the labs like real production incidents. That's exactly what my job feels like now.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Data Analyst, prev. College Fresher",
    quote:
      "The placement team didn't just hand me a list of companies — they prepped me for every single interview.",
  },
];

const TERMINAL_LINES = [
  { t: "const", c: COLORS.violet },
  { t: " skills = {", c: COLORS.text },
];

/* ---------------------------------------------------------------- */
/*  Storage helpers                                                  */
/* ---------------------------------------------------------------- */
async function safeGet(key) {
  try {
    const res = await window.storage.get(key);
    return res ? res.value : null;
  } catch (e) {
    return null;
  }
}
async function safeSet(key, value) {
  try {
    await window.storage.set(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

/* ---------------------------------------------------------------- */
/*  Terminal signature component                                     */
/* ---------------------------------------------------------------- */
const CODE_LINES = [
  [{ t: "const", c: "kw" }, { t: " learner = {", c: "pl" }],
  [{ t: "  background", c: "pr" }, { t: ": ", c: "pl" }, { t: "'no coding experience'", c: "str" }, { t: ",", c: "pl" }],
  [{ t: "  hours_per_week", c: "pr" }, { t: ": ", c: "pl" }, { t: "10", c: "num" }, { t: ",", c: "pl" }],
  [{ t: "};", c: "pl" }],
  [{ t: "", c: "pl" }],
  [{ t: "function", c: "kw" }, { t: " becomeJobReady(learner) {", c: "pl" }],
  [{ t: "  return", c: "kw" }, { t: " learner", c: "pl" }],
  [{ t: "    .learn(", c: "pl" }, { t: "curriculum", c: "pr" }, { t: ")", c: "pl" }],
  [{ t: "    .build(", c: "pl" }, { t: "3", c: "num" }, { t: ", ", c: "pl" }, { t: "'real projects'", c: "str" }, { t: ")", c: "pl" }],
  [{ t: "    .mentor(", c: "pl" }, { t: "'1:1'", c: "str" }, { t: ")", c: "pl" }],
  [{ t: "    .ship();", c: "pl" }],
  [{ t: "}", c: "pl" }],
  [{ t: "", c: "pl" }],
  [{ t: "becomeJobReady(you);", c: "pl" }, { t: " // → hired", c: "cmt" }],
];

const TOKEN_COLORS = {
  kw: COLORS.violet,
  pr: COLORS.yellow,
  str: "#7EE0C1",
  num: COLORS.orange,
  cmt: COLORS.muted,
  pl: COLORS.text,
};

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (visibleLines <= CODE_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 260);
      return () => clearTimeout(t);
    }
    const pause = setTimeout(() => {
      setVisibleLines(0);
      setCycle((c) => c + 1);
    }, 2600);
    return () => clearTimeout(pause);
  }, [visibleLines]);

  return (
    <div
      style={{
        background: "#0F0D14",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
        width: "100%",
        maxWidth: 480,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
        <span
          style={{
            marginLeft: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: COLORS.muted,
          }}
        >
          career.js
        </span>
      </div>
      <div style={{ padding: "20px 20px 24px", minHeight: 300, fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, lineHeight: 1.85 }}>
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={`${cycle}-${i}`}>
            {line.length === 0 ? (
              <>&nbsp;</>
            ) : (
              line.map((tok, j) => (
                <span key={j} style={{ color: TOKEN_COLORS[tok.c] }}>
                  {tok.t}
                </span>
              ))
            )}
            {i === visibleLines - 1 && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 15,
                  background: COLORS.orange,
                  marginLeft: 3,
                  verticalAlign: "-2px",
                  animation: "cf-blink 1s step-end infinite",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Shared UI bits                                                   */
/* ---------------------------------------------------------------- */
function Badge({ children, color = COLORS.orange }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11.5,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color,
        border: `1px solid ${color}55`,
        borderRadius: 999,
        padding: "5px 12px",
        background: `${color}14`,
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${COLORS.orange}, #FF7A3D)`,
        color: "#1A0E08",
        border: "none",
        borderRadius: 10,
        padding: "14px 26px",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "transform 0.15s ease",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        padding: "13px 24px",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12.5,
        color: COLORS.orange,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ width: 24, height: 1.5, background: COLORS.orange, display: "inline-block" }} />
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Nav                                                               */
/* ---------------------------------------------------------------- */
function Nav({ page, setPage, user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    ["home", "Home"],
    ["courses", "Courses"],
    ["about", "About"],
    ["contact", "Contact"],
  ];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(20,18,26,0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => setPage("home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.violet})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code2 size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.text }}>
            Codeforge <span style={{ color: COLORS.orange }}>Academy</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="cf-desktop-nav">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{
                background: "transparent",
                border: "none",
                padding: "10px 16px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: 14.5,
                color: page === id ? COLORS.orange : COLORS.muted,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="cf-desktop-nav">
          {user ? (
            <>
              <GhostButton onClick={() => setPage("dashboard")} style={{ padding: "10px 18px", fontSize: 14 }}>
                <UserIcon size={15} /> {user.name.split(" ")[0]}
              </GhostButton>
              <button
                onClick={onLogout}
                title="Log out"
                style={{
                  background: "transparent",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.muted,
                  cursor: "pointer",
                }}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <GhostButton onClick={() => setPage("login")} style={{ padding: "10px 18px", fontSize: 14 }}>
                Log in
              </GhostButton>
              <PrimaryButton onClick={() => setPage("contact")} style={{ padding: "10px 18px", fontSize: 14 }}>
                Book free demo
              </PrimaryButton>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="cf-mobile-toggle"
          style={{ display: "none", background: "transparent", border: "none", color: COLORS.text }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="cf-mobile-menu" style={{ padding: "8px 24px 20px", display: "none", flexDirection: "column", gap: 6 }}>
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setPage(id);
                setMobileOpen(false);
              }}
              style={{
                textAlign: "left",
                background: "transparent",
                border: "none",
                padding: "10px 4px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: page === id ? COLORS.orange : COLORS.text,
              }}
            >
              {label}
            </button>
          ))}
          {user ? (
            <>
              <button
                onClick={() => {
                  setPage("dashboard");
                  setMobileOpen(false);
                }}
                style={{ textAlign: "left", background: "transparent", border: "none", padding: "10px 4px", color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                My dashboard
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileOpen(false);
                }}
                style={{ textAlign: "left", background: "transparent", border: "none", padding: "10px 4px", color: COLORS.muted, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setPage("login");
                setMobileOpen(false);
              }}
              style={{ textAlign: "left", background: "transparent", border: "none", padding: "10px 4px", color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Log in
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Footer                                                            */
/* ---------------------------------------------------------------- */
function Footer({ setPage }) {
  return (
    <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 100 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32 }} className="cf-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.violet})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: COLORS.text }}>
                Codeforge Academy
              </span>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Practical, project-driven tech training with real instructors and real placement support.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: COLORS.text, marginBottom: 14, fontSize: 14 }}>
              Explore
            </p>
            {["home", "courses", "about", "contact"].map((id) => (
              <div
                key={id}
                onClick={() => setPage(id)}
                style={{ color: COLORS.muted, fontSize: 14, marginBottom: 10, cursor: "pointer", textTransform: "capitalize" }}
              >
                {id}
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: COLORS.text, marginBottom: 14, fontSize: 14 }}>
              Tracks
            </p>
            {["Full-Stack Development", "Data Science & AI", "Cloud & DevOps"].map((c) => (
              <div key={c} style={{ color: COLORS.muted, fontSize: 14, marginBottom: 10 }}>
                {c}
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: COLORS.text, marginBottom: 14, fontSize: 14 }}>
              Contact
            </p>
            <div style={{ color: COLORS.muted, fontSize: 14, marginBottom: 10, display: "flex", gap: 8 }}>
              <Mail size={15} /> admissions@codeforge.academy
            </div>
            <div style={{ color: COLORS.muted, fontSize: 14, marginBottom: 10, display: "flex", gap: 8 }}>
              <Phone size={15} /> +91 90000 12345
            </div>
            <div style={{ color: COLORS.muted, fontSize: 14, display: "flex", gap: 8 }}>
              <MapPin size={15} /> Hyderabad, India
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            marginTop: 40,
            paddingTop: 24,
            color: COLORS.muted,
            fontSize: 13,
          }}
        >
          © 2026 Codeforge Academy. All rights reserved.
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Home page                                                         */
/* ---------------------------------------------------------------- */
function StatCard({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 34, color: COLORS.text }}>
        {value}
      </div>
      <div style={{ color: COLORS.muted, fontSize: 13.5, marginTop: 6 }}>{label}</div>
    </div>
  );
}

function CourseCard({ course, onView }) {
  const Icon = course.icon;
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 11,
          background: `${COLORS.orange}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={22} color={COLORS.orange} />
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 18, color: COLORS.text }}>
        {course.title}
      </div>
      <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{course.description}</p>
      <div style={{ display: "flex", gap: 16, fontSize: 13, color: COLORS.muted, margin: "4px 0" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Clock size={14} /> {course.duration}
        </span>
        <span>{course.price}</span>
      </div>
      <button
        onClick={onView}
        style={{
          marginTop: "auto",
          background: "transparent",
          border: "none",
          color: COLORS.orange,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: 0,
        }}
      >
        View curriculum <ArrowRight size={15} />
      </button>
    </div>
  );
}

function HomePage({ setPage }) {
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const steps = [
    { n: "01", title: "Enroll & assess", body: "Start with a skills baseline so your track is tuned to where you're actually starting from." },
    { n: "02", title: "Learn by building", body: "Weekly live sessions plus hands-on labs — no lecture-only modules." },
    { n: "03", title: "Ship real projects", body: "Every track ends in a portfolio of 3+ projects reviewed by working engineers." },
    { n: "04", title: "Get placed", body: "Mock interviews, resume reviews, and direct intros to our 200+ hiring partners." },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="cf-hero-grid">
          <div>
            <Badge>200+ hiring partners</Badge>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(34px, 4.4vw, 54px)",
                lineHeight: 1.08,
                color: COLORS.text,
                margin: "20px 0 20px",
              }}
            >
              Learn to build software.<br />
              <span style={{ color: COLORS.orange }}>Get hired</span> doing it.
            </h1>
            <p style={{ color: COLORS.muted, fontSize: 17, lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
              Codeforge Academy trains beginners and career-switchers into job-ready developers,
              analysts, and engineers — with live instructors, real projects, and a placement team
              that works until you're hired.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <PrimaryButton onClick={() => setPage("courses")}>
                Explore courses <ArrowRight size={17} />
              </PrimaryButton>
              <GhostButton onClick={() => setPage("contact")}>Book a free demo</GhostButton>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Terminal />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "44px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="cf-stats-grid"
        >
          <StatCard value="12,400+" label="Students trained" />
          <StatCard value="87%" label="Placement rate" />
          <StatCard value="200+" label="Hiring partners" />
          <StatCard value="61%" label="Avg. salary hike" />
        </div>
      </div>

      {/* Featured courses */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <SectionEyebrow>Career tracks</SectionEyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 30, color: COLORS.text, margin: 0 }}>
              Pick your track
            </h2>
          </div>
          <GhostButton onClick={() => setPage("courses")} style={{ padding: "11px 20px", fontSize: 14 }}>
            View all courses <ArrowRight size={15} />
          </GhostButton>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cf-course-grid">
          {COURSES.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} onView={() => setPage("courses")} />
          ))}
        </div>
      </div>

      {/* Path */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 24px 20px" }}>
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 30, color: COLORS.text, margin: "0 0 40px" }}>
          Your path to a tech career
        </h2>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 22,
              right: 22,
              height: 1,
              background: COLORS.border,
              zIndex: 0,
            }}
            className="cf-path-line"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative", zIndex: 1 }} className="cf-path-grid">
            {steps.map((s) => (
              <div key={s.n}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: COLORS.ink,
                    border: `1px solid ${COLORS.orange}`,
                    color: COLORS.orange,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16.5, color: COLORS.text, marginBottom: 8 }}>
                  {s.title}
                </div>
                <p style={{ color: COLORS.muted, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "110px 24px 20px", textAlign: "center" }}>
        <SectionEyebrow>
          <span style={{ margin: "0 auto", display: "flex", justifyContent: "center", width: "100%" }}>Alumni</span>
        </SectionEyebrow>
        <Quote size={32} color={COLORS.orange} style={{ marginBottom: 20 }} />
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.5,
            color: COLORS.text,
            margin: "0 0 24px",
          }}
        >
          "{TESTIMONIALS[tIndex].quote}"
        </p>
        <div style={{ color: COLORS.orange, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15 }}>
          {TESTIMONIALS[tIndex].name}
        </div>
        <div style={{ color: COLORS.muted, fontSize: 13.5, marginTop: 4 }}>{TESTIMONIALS[tIndex].role}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTIndex(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: i === tIndex ? COLORS.orange : COLORS.border,
              }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1180, margin: "110px auto 20px", padding: "0 24px" }}>
        <div
          style={{
            background: `linear-gradient(120deg, ${COLORS.surface}, ${COLORS.surfaceLight})`,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 22,
            padding: "56px 40px",
            textAlign: "center",
          }}
        >
          <Sparkles size={26} color={COLORS.yellow} style={{ marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, margin: "0 0 12px" }}>
            Not sure which track fits you?
          </h2>
          <p style={{ color: COLORS.muted, fontSize: 15.5, margin: "0 0 28px" }}>
            Book a free 20-minute call with our admissions team and walk out with a plan.
          </p>
          <PrimaryButton onClick={() => setPage("contact")}>
            Book your free demo <ArrowRight size={17} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Courses page                                                      */
/* ---------------------------------------------------------------- */
function CoursesPage({ setPage, setContactCourse }) {
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = category === "All" ? COURSES : COURSES.filter((c) => c.category === category);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 40px" }}>
      <SectionEyebrow>Course catalog</SectionEyebrow>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 38, color: COLORS.text, margin: "0 0 14px" }}>
        Find your track
      </h1>
      <p style={{ color: COLORS.muted, fontSize: 15.5, maxWidth: 560, marginBottom: 36 }}>
        Every course is project-based, mentor-supported, and ends with placement assistance.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              border: `1px solid ${category === c ? COLORS.orange : COLORS.border}`,
              background: category === c ? `${COLORS.orange}18` : "transparent",
              color: category === c ? COLORS.orange : COLORS.muted,
              borderRadius: 999,
              padding: "9px 18px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {filtered.map((c) => {
          const Icon = c.icon;
          const isOpen = expanded === c.id;
          return (
            <div
              key={c.id}
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 18 }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      flexShrink: 0,
                      borderRadius: 12,
                      background: `${COLORS.orange}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={24} color={COLORS.orange} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 19, color: COLORS.text, marginBottom: 6 }}>
                      {c.title}
                    </div>
                    <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.65, margin: "0 0 10px", maxWidth: 520 }}>
                      {c.description}
                    </p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 12,
                            color: COLORS.violet,
                            background: `${COLORS.violet}18`,
                            border: `1px solid ${COLORS.violet}33`,
                            borderRadius: 999,
                            padding: "3px 10px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: 140 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.text }}>
                    {c.price}
                  </div>
                  <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 14 }}>
                    {c.duration} · {c.level}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <PrimaryButton
                      onClick={() => {
                        setContactCourse(c.title);
                        setPage("contact");
                      }}
                      style={{ padding: "9px 16px", fontSize: 13.5, justifyContent: "center" }}
                    >
                      Enquire now
                    </PrimaryButton>
                    <button
                      onClick={() => setExpanded(isOpen ? null : c.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: COLORS.muted,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      Curriculum{" "}
                      <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                  </div>
                </div>
              </div>
              {isOpen && (
                <div style={{ marginTop: 22, paddingTop: 22, borderTop: `1px solid ${COLORS.border}` }}>
                  {c.curriculum.map((m, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, color: COLORS.text, fontSize: 14 }}>
                      <CheckCircle2 size={16} color={COLORS.orange} />
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  About page                                                        */
/* ---------------------------------------------------------------- */
function AboutPage() {
  const values = [
    { icon: Users, title: "Small cohorts", body: "Live sessions capped at 25 students so instructors know your name and your code." },
    { icon: Briefcase, title: "Industry-built curriculum", body: "Every module is designed with working engineers from our hiring partners." },
    { icon: TrendingUp, title: "Outcomes over certificates", body: "We measure ourselves by placement rate and salary outcomes, not enrollment numbers." },
    { icon: Award, title: "Mentor access", body: "1:1 mentorship from engineers currently working at the companies you want to join." },
  ];

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 40px" }}>
      <SectionEyebrow>About us</SectionEyebrow>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 38, color: COLORS.text, margin: "0 0 20px", maxWidth: 640 }}>
        We built the training we wished existed when we were switching careers.
      </h1>
      <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.75, maxWidth: 680, marginBottom: 56 }}>
        Codeforge Academy started in 2018 with one instructor and eight students in a rented
        classroom. Today we've trained over 12,000 people — students, career-switchers, and
        working professionals — into developer, data, cloud, and security roles. We still teach
        the way we started: small groups, real projects, and instructors who stay reachable long
        after the course ends.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 80 }} className="cf-stats-grid">
        <StatCard value="2018" label="Founded" />
        <StatCard value="12,400+" label="Alumni" />
        <StatCard value="140+" label="Instructors & mentors" />
        <StatCard value="6" label="Campuses across India" />
      </div>

      <SectionEyebrow>What we stand for</SectionEyebrow>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, margin: "0 0 36px" }}>
        Our values
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="cf-values-grid">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 26, display: "flex", gap: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 10,
                  background: `${COLORS.violet}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} color={COLORS.violet} />
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16.5, color: COLORS.text, marginBottom: 6 }}>
                  {v.title}
                </div>
                <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{v.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Contact / enquiry page                                            */
/* ---------------------------------------------------------------- */
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13.5, color: COLORS.muted, marginBottom: 7, fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: COLORS.ink,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 9,
  padding: "12px 14px",
  color: COLORS.text,
  fontSize: 14.5,
  fontFamily: "'Inter', sans-serif",
  boxSizing: "border-box",
  outline: "none",
};

function ContactPage({ contactCourse, setContactCourse }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: contactCourse || "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contactCourse) setForm((f) => ({ ...f, course: contactCourse }));
  }, [contactCourse]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.course) e.course = "Select a course";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSaving(true);
    const key = `enquiry:${Date.now()}`;
    await safeSet(key, JSON.stringify({ ...form, submittedAt: new Date().toISOString() }));
    setSaving(false);
    setSubmitted(true);
    setContactCourse("");
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
        <CheckCircle2 size={44} color={COLORS.orange} style={{ marginBottom: 20 }} />
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, margin: "0 0 12px" }}>
          Enquiry received
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 15.5, lineHeight: 1.7 }}>
          Thanks, {form.name.split(" ")[0]}. Our admissions team will reach out at {form.email} within one
          business day to schedule your free demo.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px 100px" }}>
      <SectionEyebrow>Get in touch</SectionEyebrow>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 36, color: COLORS.text, margin: "0 0 14px" }}>
        Book your free demo class
      </h1>
      <p style={{ color: COLORS.muted, fontSize: 15.5, maxWidth: 560, marginBottom: 44 }}>
        Tell us a bit about yourself and we'll get back to you within a business day.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }} className="cf-contact-grid">
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cf-form-row">
            <Field label="Full name">
              <input style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
              {errors.name && <p style={{ color: "#F87171", fontSize: 12.5, margin: "6px 0 0" }}>{errors.name}</p>}
            </Field>
            <Field label="Phone number">
              <input style={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 90000 00000" />
              {errors.phone && <p style={{ color: "#F87171", fontSize: 12.5, margin: "6px 0 0" }}>{errors.phone}</p>}
            </Field>
          </div>
          <Field label="Email address">
            <input style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
            {errors.email && <p style={{ color: "#F87171", fontSize: 12.5, margin: "6px 0 0" }}>{errors.email}</p>}
          </Field>
          <Field label="Course you're interested in">
            <select style={inputStyle} value={form.course} onChange={(e) => update("course", e.target.value)}>
              <option value="">Select a course</option>
              {COURSES.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
            {errors.course && <p style={{ color: "#F87171", fontSize: 12.5, margin: "6px 0 0" }}>{errors.course}</p>}
          </Field>
          <Field label="Message (optional)">
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical", fontFamily: "'Inter', sans-serif" }}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Anything you'd like us to know before the call"
            />
          </Field>
          <PrimaryButton onClick={submit} style={{ width: "100%", justifyContent: "center", marginTop: 6 }}>
            {saving ? "Sending..." : "Submit enquiry"}
          </PrimaryButton>
        </div>

        <div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
              <MapPin size={18} color={COLORS.orange} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ color: COLORS.text, fontSize: 14.5, fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}>Campus</div>
                <div style={{ color: COLORS.muted, fontSize: 13.5, marginTop: 2 }}>HITEC City, Hyderabad, Telangana</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
              <Phone size={18} color={COLORS.orange} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ color: COLORS.text, fontSize: 14.5, fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}>Phone</div>
                <div style={{ color: COLORS.muted, fontSize: 13.5, marginTop: 2 }}>+91 90000 12345</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Mail size={18} color={COLORS.orange} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ color: COLORS.text, fontSize: 14.5, fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}>Email</div>
                <div style={{ color: COLORS.muted, fontSize: 13.5, marginTop: 2 }}>admissions@codeforge.academy</div>
              </div>
            </div>
          </div>
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22 }}>
            <div style={{ color: COLORS.text, fontSize: 14.5, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>
              Office hours
            </div>
            <div style={{ color: COLORS.muted, fontSize: 13.5, lineHeight: 1.8 }}>
              Mon – Sat: 9:00 AM – 7:00 PM<br />
              Sunday: 10:00 AM – 2:00 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Login / Signup                                                    */
/* ---------------------------------------------------------------- */
function AuthShell({ title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 440, margin: "0 auto", padding: "80px 24px 100px" }}>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 30, color: COLORS.text, margin: "0 0 8px", textAlign: "center" }}>
        {title}
      </h1>
      <p style={{ color: COLORS.muted, fontSize: 14.5, textAlign: "center", marginBottom: 32 }}>{subtitle}</p>
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 32 }}>{children}</div>
    </div>
  );
}

function LoginPage({ setPage, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    const raw = await safeGet(`student:${email.toLowerCase().trim()}`);
    setLoading(false);
    if (!raw) {
      setError("No account found with that email. Try signing up instead.");
      return;
    }
    const account = JSON.parse(raw);
    if (account.password !== password) {
      setError("That password doesn't match. Try again.");
      return;
    }
    onLogin({ name: account.name, email: account.email });
    setPage("dashboard");
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to view your courses and progress.">
      <Field label="Email address">
        <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
      </Field>
      <Field label="Password">
        <input type="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </Field>
      {error && <p style={{ color: "#F87171", fontSize: 13, margin: "0 0 14px" }}>{error}</p>}
      <PrimaryButton onClick={submit} style={{ width: "100%", justifyContent: "center" }}>
        {loading ? "Logging in..." : "Log in"}
      </PrimaryButton>
      <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 13.5, marginTop: 20 }}>
        Don't have an account?{" "}
        <span onClick={() => setPage("signup")} style={{ color: COLORS.orange, cursor: "pointer" }}>
          Sign up
        </span>
      </p>
    </AuthShell>
  );
}

function SignupPage({ setPage, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Fill in all fields to continue.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    const key = `student:${form.email.toLowerCase().trim()}`;
    const existing = await safeGet(key);
    if (existing) {
      setLoading(false);
      setError("An account with this email already exists. Try logging in.");
      return;
    }
    await safeSet(
      key,
      JSON.stringify({ name: form.name.trim(), email: form.email.toLowerCase().trim(), password: form.password })
    );
    setLoading(false);
    onLogin({ name: form.name.trim(), email: form.email.toLowerCase().trim() });
    setPage("dashboard");
  };

  return (
    <AuthShell title="Create your account" subtitle="Sign up to track your enrollment and progress.">
      <Field label="Full name">
        <input style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
      </Field>
      <Field label="Email address">
        <input style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
      </Field>
      <Field label="Password">
        <input type="password" style={inputStyle} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 6 characters" />
      </Field>
      <Field label="Confirm password">
        <input type="password" style={inputStyle} value={form.confirm} onChange={(e) => update("confirm", e.target.value)} placeholder="Re-enter password" />
      </Field>
      {error && <p style={{ color: "#F87171", fontSize: 13, margin: "0 0 14px" }}>{error}</p>}
      <PrimaryButton onClick={submit} style={{ width: "100%", justifyContent: "center" }}>
        {loading ? "Creating account..." : "Create account"}
      </PrimaryButton>
      <p style={{ textAlign: "center", color: COLORS.muted, fontSize: 13.5, marginTop: 20 }}>
        Already have an account?{" "}
        <span onClick={() => setPage("login")} style={{ color: COLORS.orange, cursor: "pointer" }}>
          Log in
        </span>
      </p>
    </AuthShell>
  );
}

/* ---------------------------------------------------------------- */
/*  Dashboard                                                         */
/* ---------------------------------------------------------------- */
function DashboardPage({ user, setPage }) {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px 100px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.violet})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#fff",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.text, margin: 0 }}>
            Welcome, {user.name.split(" ")[0]}
          </h1>
          <p style={{ color: COLORS.muted, fontSize: 14, margin: "4px 0 0" }}>{user.email}</p>
        </div>
      </div>

      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 18,
          padding: 40,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <Briefcase size={30} color={COLORS.orange} style={{ marginBottom: 16 }} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 19, color: COLORS.text, marginBottom: 8 }}>
          You're not enrolled in a course yet
        </div>
        <p style={{ color: COLORS.muted, fontSize: 14.5, maxWidth: 420, margin: "0 auto 24px" }}>
          Browse our tracks and submit an enquiry — our admissions team will get you set up and
          your dashboard will start tracking your progress.
        </p>
        <PrimaryButton onClick={() => setPage("courses")}>
          Explore courses <ArrowRight size={16} />
        </PrimaryButton>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cf-course-grid">
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>Courses enrolled</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.text }}>0</div>
        </div>
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>Projects submitted</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.text }}>0</div>
        </div>
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 22 }}>
          <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>Mentor sessions</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.text }}>0</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  App shell                                                         */
/* ---------------------------------------------------------------- */
export default function App() {
  useFonts();
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [contactCourse, setContactCourse] = useState("");

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ background: COLORS.ink, minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes cf-blink { 50% { opacity: 0; } }
        * { box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { border-color: ${COLORS.orange} !important; }
        input::placeholder, textarea::placeholder { color: #6B6475; }
        select option { background: ${COLORS.ink}; }
        @media (max-width: 860px) {
          .cf-hero-grid { grid-template-columns: 1fr !important; }
          .cf-course-grid { grid-template-columns: 1fr !important; }
          .cf-values-grid { grid-template-columns: 1fr !important; }
          .cf-contact-grid { grid-template-columns: 1fr !important; }
          .cf-form-row { grid-template-columns: 1fr !important; }
          .cf-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .cf-stats-grid { grid-template-columns: 1fr 1fr !important; row-gap: 28px !important; }
          .cf-path-grid { grid-template-columns: 1fr 1fr !important; row-gap: 32px !important; }
          .cf-path-line { display: none !important; }
          .cf-desktop-nav { display: none !important; }
          .cf-mobile-toggle { display: block !important; }
          .cf-mobile-menu { display: flex !important; }
        }
      `}</style>

      <Nav page={page} setPage={handlePageChange} user={user} onLogout={() => { setUser(null); handlePageChange("home"); }} />

      {page === "home" && <HomePage setPage={handlePageChange} />}
      {page === "courses" && <CoursesPage setPage={handlePageChange} setContactCourse={setContactCourse} />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage contactCourse={contactCourse} setContactCourse={setContactCourse} />}
      {page === "login" && <LoginPage setPage={handlePageChange} onLogin={setUser} />}
      {page === "signup" && <SignupPage setPage={handlePageChange} onLogin={setUser} />}
      {page === "dashboard" && (user ? <DashboardPage user={user} setPage={handlePageChange} /> : <LoginPage setPage={handlePageChange} onLogin={setUser} />)}

      <Footer setPage={handlePageChange} />
    </div>
  );
}

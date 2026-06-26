import React, { useState, useEffect, useRef } from "react";
// SEO Meta tags management ke liye standard library import (Background handling)
import { Helmet, HelmetProvider } from "react-helmet-async";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS_MAP = {
  Languages: ["PHP", "Python", "Node.js", "JavaScript"],
  Frameworks: ["Laravel", "FastAPI", "NestJS", "ReactJS"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  Cloud: ["AWS EC2", "AWS S3", "DigitalOcean", "Linux Server"],
  Practices: ["REST APIs", "CI/CD", "RBAC", "JWT Auth", "Payment Gateway", "Git"],
};

const EXPERIENCE = [
  {
    role: "Senior Software Engineer (Contract)",
    company: "Deorwine Infotech",
    period: "March 2026 – Present",
    location: "India",
    current: true,
    bullets: [
      "Leading backend development for Staarae — a production-grade astrology compatibility platform.",
      "Designing and maintaining scalable REST APIs using FastAPI and PostgreSQL.",
      "Managing production servers, deployments, monitoring, and infrastructure operations.",
      "Developing Admin Panel modules for user management, reports, and content management.",
      "Implementing caching, third-party integrations, and DB optimisation for reliability.",
    ],
  },
  {
    role: "Software Engineer",
    company: "The NineHertz",
    period: "July 2025 – March 2026",
    location: "Jaipur, India",
    bullets: [
      "Built and maintained backend services using NestJS and MongoDB for scalable web platforms.",
      "Developed REST APIs consumed by ReactJS dashboards and mobile applications.",
      "Integrated payment gateways, messaging systems, and analytics services.",
      "Improved performance through query optimisation and clean API architecture.",
    ],
  },
  {
    role: "Senior Backend Developer / Team Lead",
    company: "Deorwine Infotech",
    period: "Sept 2022 – July 2025",
    location: "India",
    bullets: [
      "Built backend systems using Laravel and FastAPI for multiple production platforms.",
      "Improved API response time by 30% and reduced infrastructure costs by 20%.",
      "Led a backend team of 4–5 developers, conducting code reviews and mentoring juniors.",
      "Managed deployments and server infrastructure on AWS and DigitalOcean.",
    ],
  },
  {
    role: "Trainee Junior PHP Developer",
    company: "Mitash Digital",
    period: "Jan 2022 – Aug 2022",
    location: "India",
    bullets: [
      "Worked on PHP and WordPress projects, building backend features with PHP and MySQL.",
      "Developed responsive UI components using HTML, CSS, and JavaScript.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Staarae",
    tagline: "Astrology Compatibility Platform",
    desc: "Production-grade backend APIs for horoscope calculations, compatibility analysis, OTP auth, and secure user data. Modular service architecture with Redis caching and AWS deployment.",
    longDesc: "Built from scratch as the primary backend engineer. Designed modular FastAPI services with PostgreSQL, implemented OTP-based authentication via Twilio, integrated NASA/JPL astronomical data APIs, and set up CI/CD on AWS EC2 with Redis caching for high-frequency endpoints. Also built the full admin panel and managed production server operations.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Redis", "AWS EC2", "S3", "JWT", "Twilio"],
    accent: "#7C5CBF",
    link: "https://staarae.com",
    metrics: ["40+ API endpoints", "OTP Auth", "Redis Cache", "AWS Prod"],
  },
  {
    name: "Food Truckky",
    tagline: "Food Ordering & Vendor Management",
    desc: "Full backend for food ordering, vendor onboarding, and order workflows. ReactJS Admin Panel for managing vendors, customers, orders, and operational reports.",
    longDesc: "Led backend development using NestJS with MongoDB. Implemented multi-role authentication (admin, vendor, customer), real-time order tracking, Stripe payment integration, push notification service, and a ReactJS admin dashboard with full CRUD for vendors and orders.",
    stack: ["NestJS", "ReactJS", "MongoDB", "Stripe", "JWT", "Socket.io", "REST APIs"],
    accent: "#E8640A",
    link: null,
    metrics: ["Multi-role RBAC", "Stripe Payments", "Real-time Updates", "Admin Panel"],
  },
  {
    name: "Cashcry",
    tagline: "Cashback & Gift Card Platform",
    desc: "Backend of a cashback and gift card platform. REST APIs for rewards, gift card issuance, user transactions, and secure payment gateway integration.",
    longDesc: "Led backend development for a fintech cashback platform. Built REST APIs for cashback reward calculation, gift card issuance and redemption, user wallet management, and secure payment gateway integration. Collaborated with React Native mobile team for seamless API integration.",
    stack: ["Laravel", "PHP", "MySQL", "Payment Gateway", "AWS S3", "REST APIs"],
    accent: "#00C9A7",
    link: "https://cashcry.com",
    metrics: ["Payment Gateway", "Wallet System", "Gift Cards", "React Native API"],
  },
  {
    name: "Avicenna-Care",
    tagline: "Healthcare Management Platform",
    desc: "Backend of a healthcare system for patient management, appointment scheduling, and medical records with strict RBAC and privacy compliance.",
    longDesc: "Directed backend development for a full healthcare management system. Built RESTful APIs for patient profiles, appointment scheduling, medical records, and prescription management. Implemented strict role-based access control for doctors, admins, and patients. Ensured HIPAA-aligned data handling and collaborated with Flutter mobile team.",
    stack: ["Laravel", "PHP", "MySQL", "RBAC", "AWS", "REST APIs", "JWT"],
    accent: "#2196F3",
    link: "https://avicenna-care.com",
    metrics: ["Patient Mgmt", "RBAC 3 roles", "Appointment System", "Flutter API"],
  },
];

const STATS = [
  { n: "4.5+", l: "Years Experience" },
  { n: "10+", l: "Production Projects" },
  { n: "30%", l: "API Speed Gain" },
  { n: "20%", l: "Infra Cost Saved" },
];

const EDUCATION = [
  { degree: "Master of Computer Applications (MCA)", inst: "Rajasthan Technical University (RTU)", period: "2023 – 2025" },
  { degree: "Bachelor of Computer Applications (BCA)", inst: "Rajasthan University (RU)", period: "2019 – 2022" },
];

const NAV = ["About", "Skills", "Experience", "Projects", "Tools", "Contact"];

// ─── TECH RECOMMENDER DATA ───────────────────────────────────────────────────

const TECH_LOGIC = {
  recommend: (type, scale, priority, db) => {
    const results = { backend: "", frontend: "", database: "", hosting: "", extra: [] };

    if (type === "api") {
      if (priority === "speed") results.backend = "FastAPI (Python)";
      else if (priority === "scalability") results.backend = "NestJS (Node.js)";
      else results.backend = "Laravel (PHP)";
    } else if (type === "ecommerce") {
      results.backend = priority === "speed" ? "FastAPI + Celery" : "Laravel";
      results.extra.push("Payment Gateway: Stripe / Razorpay");
    } else if (type === "saas") {
      results.backend = "NestJS (Node.js)";
      results.extra.push("Queue: Bull / BullMQ", "Cache: Redis");
    } else if (type === "mobile_backend") {
      results.backend = priority === "speed" ? "FastAPI" : "NestJS";
      results.extra.push("Push: FCM / APNs", "OTP: Twilio");
    } else if (type === "cms") {
      results.backend = "Laravel";
      results.extra.push("Admin: Laravel Nova / Filament");
    } else {
      results.backend = "Laravel (PHP)";
    }

    if (db === "relational" || db === "auto") {
      results.database = scale === "large" ? "PostgreSQL" : "MySQL";
    } else if (db === "nosql") {
      results.database = "MongoDB";
    } else if (db === "both") {
      results.database = "PostgreSQL + MongoDB";
      results.extra.push("Cache layer: Redis");
    }

    if (scale === "small") results.hosting = "DigitalOcean Droplet / Shared VPS";
    else if (scale === "medium") results.hosting = "AWS EC2 + RDS";
    else results.hosting = "AWS EC2 Auto Scaling + RDS + CloudFront";

    if (type === "saas" || type === "ecommerce") results.frontend = "ReactJS + Tailwind";
    else if (type === "cms") results.frontend = "ReactJS (Admin) + Blade (Public)";
    else results.frontend = "ReactJS / Vue (optional)";

    return results;
  }
};

const ESTIMATE_DATA = {
  api: { label: "REST API / Backend Service", base: 25000, weeks: [2, 4] },
  ecommerce: { label: "E-Commerce Platform", base: 80000, weeks: [6, 10] },
  saas: { label: "SaaS Product", base: 150000, weeks: [10, 16] },
  mobile_backend: { label: "Mobile App Backend", base: 40000, weeks: [3, 6] },
  cms: { label: "CMS / Admin Panel", base: 35000, weeks: [3, 5] },
  healthcare: { label: "Healthcare / FinTech App", base: 120000, weeks: [8, 14] },
};

const COMPLEXITY_MULT = { simple: 0.7, medium: 1.0, complex: 1.6 };
const SCALE_MULT = { small: 0.8, medium: 1.0, large: 1.4 };

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function fmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

// ─── HIDDEN BACKGROUND SEO COMPONENT (Design Ko Ekdum Safe Rkhega) ───────────

function PortfolioSEO() {
  const googleCrawlerSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gorishanker Sharma",
    "jobTitle": "Backend Developer (Laravel & FastAPI)",
    "url": "https://gorishanker.vercel.app/",
    "sameAs": [
      "https://www.linkedin.com/in/gorishanker-sharma",
      "https://github.com/chetanhaldinya"
    ],
    "knowsAbout": ["PHP", "Laravel", "Python", "FastAPI", "NestJS", "Node.js", "MySQL", "PostgreSQL", "MongoDB", "Redis", "AWS EC2", "AWS S3", "REST APIs", "CI/CD"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "India"
    }
  };

  return (
    <Helmet>
      {/* Google Engine Rules */}
      <title>Gorishanker Sharma | Backend Developer (Laravel & FastAPI)</title>
      <meta name="description" content="Gorishanker Sharma is a professional Backend Developer specializing in PHP Laravel, Python FastAPI, NestJS, and AWS server architecture with over 4.5 years of experience." />
      <meta name="keywords" content="Gorishanker Sharma, Gorishanker Sharma developer, Laravel Developer Jaipur, FastAPI Developer India, Backend Developer, Python Backend Engineer, Hire Laravel Developer" />
      <link rel="canonical" href="https://gorishanker.vercel.app/" />

      {/* Social Crawlers Link Previews */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gorishanker.vercel.app/" />
      <meta property="og:title" content="Gorishanker Sharma | Backend Developer (Laravel & FastAPI)" />
      <meta property="og:description" content="Portfolio of architectural backend engineering, API performance metrics, and production scale operations." />
      
      {/* Structured Snippet for Google Search Bot */}
      <script type="application/ld+json">
        {JSON.stringify(googleCrawlerSchema)}
      </script>
    </Helmet>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function GorishankerPortfolio() {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const [techForm, setTechForm] = useState({ type: "api", scale: "medium", priority: "speed", db: "auto" });
  const [techResult, setTechResult] = useState(null);

  const [estForm, setEstForm] = useState({ type: "api", complexity: "medium", scale: "medium" });
  const [estResult, setEstResult] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("gorishanker.devloper@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollTo = (id) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  const runTechRecommender = () => {
    const r = TECH_LOGIC.recommend(techForm.type, techForm.scale, techForm.priority, techForm.db);
    setTechResult(r);
  };

  const runEstimator = () => {
    const base = ESTIMATE_DATA[estForm.type];
    const cost = base.base * COMPLEXITY_MULT[estForm.complexity] * SCALE_MULT[estForm.scale];
    const wMin = Math.round(base.weeks[0] * COMPLEXITY_MULT[estForm.complexity]);
    const wMax = Math.round(base.weeks[1] * COMPLEXITY_MULT[estForm.complexity]);
    setEstResult({ costMin: cost * 0.85, costMax: cost * 1.2, wMin, wMax, label: base.label });
  };

  const [skillsRef, skillsVis] = useInView();
  const [expRef, expVis] = useInView();
  const [projRef, projVis] = useInView();
  const [toolsRef, toolsVis] = useInView();
  const [ctaRef, ctaVis] = useInView();

  return (
    <HelmetProvider>
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#080C10", color: "#E8EDF2", overflowX: "hidden" }}>
        
        {/* Safe Background SEO Rules Injector */}
        <PortfolioSEO />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #080C10; }
          ::-webkit-scrollbar-thumb { background: #00C9A7; border-radius: 2px; }

          .sg  { font-family: 'Space Grotesk', sans-serif; }
          .mono { font-family: 'JetBrains Mono', monospace; }

          body::before {
            content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,201,167,0.012) 2px, rgba(0,201,167,0.012) 4px);
          }

          .nav-link {
            cursor: pointer; color: #5A6472; font-size: 0.8rem;
            letter-spacing: 0.07em; transition: color 0.2s;
            text-transform: uppercase; font-weight: 600;
            font-family: 'Space Grotesk', sans-serif;
          }
          .nav-link:hover { color: #00C9A7; }

          .pill {
            display: inline-block; padding: 5px 14px; border-radius: 4px;
            font-size: 0.77rem; font-weight: 500; letter-spacing: 0.04em;
            border: 1px solid #1A2332; background: #0D1520; color: #5A6472;
            cursor: default; transition: all 0.2s;
            font-family: 'Space Grotesk', sans-serif;
          }
          .pill:hover, .pill.glow {
            border-color: #00C9A7; color: #00C9A7;
            background: rgba(0,201,167,0.06);
            box-shadow: 0 0 14px rgba(0,201,167,0.15);
          }

          .exp-row {
            border-left: 2px solid #1A2332; padding-left: 24px;
            position: relative; transition: border-color 0.3s;
          }
          .exp-row:hover { border-left-color: #00C9A7; }
          .exp-row::before {
            content: ''; position: absolute; left: -5px; top: 8px;
            width: 8px; height: 8px; border-radius: 50%;
            background: #1A2332; border: 2px solid #1A2332; transition: all 0.3s;
          }
          .exp-row:hover::before { background: #00C9A7; border-color: #00C9A7; }

          .proj-card {
            background: #0D1520; border: 1px solid #1A2332;
            border-radius: 10px; padding: 26px;
            transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
            cursor: pointer;
          }
          .proj-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }

          .stat-box {
            text-align: center; padding: 22px 12px;
            border: 1px solid #1A2332; border-radius: 8px; background: #0D1520;
            transition: border-color 0.3s;
          }
          .stat-box:hover { border-color: rgba(0,201,167,0.3); }

          .tool-card {
            background: #0D1520; border: 1px solid #1A2332;
            border-radius: 12px; overflow: hidden;
          }
          .tool-header {
            padding: 20px 24px; border-bottom: 1px solid #1A2332;
            display: flex; align-items: center; gap: 12px;
          }
          .tool-body { padding: 24px; }

          select, .sel-btn {
            font-family: 'Space Grotesk', sans-serif;
            background: #080C10; border: 1px solid #1A2332;
            color: #E8EDF2; border-radius: 6px; padding: 10px 14px;
            font-size: 0.84rem; cursor: pointer; transition: border-color 0.2s; width: 100%;
            appearance: none;
          }
          select:focus, .sel-btn:focus { outline: none; border-color: #00C9A7; }

          .opt-grid { display: grid; gap: 8px; }
          .opt-btn {
            padding: 10px 14px; border-radius: 6px; border: 1px solid #1A2332;
            background: #080C10; color: #5A6472; cursor: pointer; transition: all 0.2s;
            font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 500;
            text-align: left;
          }
          .opt-btn:hover { border-color: #00C9A740; color: #E8EDF2; }
          .opt-btn.active { border-color: #00C9A7; color: #00C9A7; background: rgba(0,201,167,0.07); }

          .run-btn {
            width: 100%; padding: 13px; border-radius: 6px;
            background: #00C9A7; color: #080C10; border: none;
            font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 700;
            cursor: pointer; transition: all 0.22s; letter-spacing: 0.04em;
            margin-top: 16px;
          }
          .run-btn:hover { background: #00deba; transform: translateY(-1px); }

          .result-box {
            margin-top: 20px; background: #060A0E; border: 1px solid #00C9A730;
            border-radius: 8px; padding: 20px;
          }
          .result-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #1A2332; }
          .result-row:last-child { border-bottom: none; }
          .result-label { font-size: 0.78rem; color: #5A6472; font-family: 'Space Grotesk', sans-serif; text-transform: uppercase; letter-spacing: 0.06em; }
          .result-val { font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; color: #00C9A7; font-weight: 600; }

          .contact-row {
            display: flex; align-items: center; justify-content: space-between;
            background: #0D1520; border: 1px solid #1A2332;
            border-radius: 8px; padding: 18px 24px;
            transition: all 0.22s; cursor: pointer; text-decoration: none; color: #E8EDF2;
          }
          .contact-row:hover { border-color: #00C9A7; background: rgba(0,201,167,0.04); }

          .hire-banner {
            background: linear-gradient(135deg, #0D1520 0%, #0a1a14 100%);
            border: 1px solid #00C9A740; border-radius: 12px; padding: 40px;
            text-align: center; position: relative; overflow: hidden;
          }
          .hire-banner::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at 50% 0%, rgba(0,201,167,0.08) 0%, transparent 70%);
            pointer-events: none;
          }

          .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
          .fade-up.in { opacity: 1; transform: translateY(0); }

          .badge {
            font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
            font-family: 'Space Grotesk', sans-serif; font-weight: 700;
            background: rgba(0,201,167,0.1); color: #00C9A7;
            padding: 4px 12px; border-radius: 3px; border: 1px solid rgba(0,201,167,0.25);
            display: inline-block;
          }
          .badge-available {
            background: rgba(0,201,167,0.08); animation: pulse-badge 2.5s infinite;
          }
          @keyframes pulse-badge {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0,201,167,0.3); }
            50% { box-shadow: 0 0 0 6px rgba(0,201,167,0); }
          }

          .section-label {
            font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
            letter-spacing: 0.18em; text-transform: uppercase;
            color: #00C9A7; font-weight: 500; margin-bottom: 10px;
          }
          .section-title {
            font-family: 'Space Grotesk', sans-serif; font-size: 1.95rem;
            font-weight: 700; color: #E8EDF2; line-height: 1.2;
          }

          .cta { display: inline-block; padding: 12px 28px; border-radius: 5px; font-family: 'Space Grotesk', sans-serif; font-size: 0.88rem; font-weight: 700; letter-spacing: 0.04em; cursor: pointer; transition: all 0.22s; text-decoration: none; }
          .cta-p { background: #00C9A7; color: #080C10; border: 2px solid #00C9A7; }
          .cta-p:hover { background: #00deba; border-color: #00deba; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,201,167,0.3); }
          .cta-o { background: transparent; color: #E8EDF2; border: 2px solid #1A2332; }
          .cta-o:hover { border-color: #00C9A7; color: #00C9A7; }

          .modal-overlay {
            position: fixed; inset: 0; background: rgba(8,12,16,0.92);
            z-index: 200; display: flex; align-items: center; justify-content: center;
            padding: 24px; backdrop-filter: blur(6px);
            animation: fadeIn 0.2s ease;
          }
          .modal-box {
            background: #0D1520; border: 1px solid #1A2332;
            border-radius: 14px; width: 100%; max-width: 620px;
            max-height: 85vh; overflow-y: auto;
            animation: slideUp 0.25s ease;
          }
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .proj-grid  { grid-template-columns: 1fr !important; }
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .nav-links  { display: none !important; }
            .section-title { font-size: 1.5rem !important; }
            .tools-grid { grid-template-columns: 1fr !important; }
            .hire-banner { padding: 28px 20px !important; }
          }
        `}</style>

        {/* ── NAV (Layout Fix Applied with space-between) ────────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(8,12,16,0.97)" : "rgba(8,12,16,0.5)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${scrolled ? "#1A2332" : "transparent"}`,
          padding: "0 5%", transition: "all 0.3s",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, width: "100%" }}>
            <span className="mono" style={{ fontWeight: 600, fontSize: "0.9rem", color: "#E8EDF2", letterSpacing: "0.02em", flexShrink: 0 }}>
              <span style={{ color: "#00C9A7" }}>~</span>/gorishanker
            </span>
            <div className="nav-links" style={{ display: "flex", gap: 32 }}>
              {NAV.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n)}>{n}</span>)}
            </div>
            <button className="cta cta-p" style={{ padding: "8px 20px", fontSize: "0.8rem", flexShrink: 0 }} onClick={() => scrollTo("Contact")}>
              Hire Me
            </button>
          </div>
        </nav>

        {/* ── HERO (Aapka Exact Layout & Green Brand Color Structure) ───── */}
        <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 5% 70px", position: "relative" }}>
          <div style={{ position: "absolute", top: "20%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,201,167,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%", position: "relative" }}>
            <div>
              <span className="badge badge-available" style={{ marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C9A7", display: "inline-block" }} />
                Available for new projects
              </span>
              
              {/* Exact Original Heading & Color Variant Maintained */}
              <h1 className="sg" style={{ fontSize: "clamp(2.4rem,5vw,3.7rem)", fontWeight: 700, lineHeight: 1.06, marginBottom: 14 }}>
                Gorishanker<br /><span style={{ color: "#00C9A7" }}>Sharma</span>
              </h1>
              
              <p className="sg" style={{ fontSize: "1.05rem", color: "#5A6472", fontWeight: 500, marginBottom: 18 }}>
                Senior Backend Engineer &nbsp;·&nbsp; 4.5+ Years
              </p>
              <p style={{ lineHeight: 1.9, color: "#8B95A2", maxWidth: 460, marginBottom: 16, fontSize: "0.93rem" }}>
                I build the systems that power your product — scalable APIs, solid databases, clean server architecture. From idea to production with <strong style={{ color: "#E8EDF2" }}>PHP, Python, and Node.js</strong>.
              </p>
              <div className="mono" style={{ fontSize: "0.78rem", color: "#5A6472", background: "#0D1520", border: "1px solid #1A2332", borderRadius: 6, padding: "10px 16px", marginBottom: 30, display: "inline-block" }}>
                <span style={{ color: "#00C9A7" }}>$</span> tech --stack Laravel FastAPI NestJS --exp 4.5yrs
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="cta cta-p" onClick={() => scrollTo("Contact")}>Hire Me Now</button>
                <button className="cta cta-o" onClick={() => scrollTo("Projects")}>View Projects</button>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 28 }}>
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/gorishanker-sharma" },
                  { label: "GitHub", href: "https://github.com/chetanhaldinya" },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                    className="sg"
                    style={{ fontSize: "0.75rem", color: "#5A6472", letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontWeight: 600, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#00C9A7"}
                    onMouseLeave={e => e.currentTarget.style.color = "#5A6472"}
                  >{l.label} ↗</a>
                ))}
              </div>
            </div>

            <div>
              <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 18 }}>
                {STATS.map(s => (
                  <div key={s.n} className="stat-box">
                    <div className="sg" style={{ fontSize: "2.1rem", fontWeight: 700, color: "#00C9A7", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: "0.73rem", color: "#5A6472", marginTop: 8, letterSpacing: "0.04em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#0D1520", border: "1px solid #1A2332", borderRadius: 10, padding: 22 }}>
                <div className="section-label" style={{ marginBottom: 14 }}>// core stack</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["PHP / Laravel", "Python / FastAPI", "Node.js / NestJS", "PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS"].map(s => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────────────────────────────── */}
        <section id="skills" style={{ padding: "80px 5%", borderTop: "1px solid #1A2332" }}>
          <div ref={skillsRef} className={`fade-up${skillsVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-label">// what I work with</div>
            <h2 className="section-title" style={{ marginBottom: 48 }}>Skills & Technologies</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {Object.entries(SKILLS_MAP).map(([cat, skills]) => (
                <div key={cat} style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div className="mono" style={{ width: 96, flexShrink: 0, fontSize: "0.68rem", letterSpacing: "0.08em", color: "#3A4550", textTransform: "uppercase", fontWeight: 600, paddingTop: 7 }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
                    {skills.map(s => (
                      <span key={s} className={`pill${activeSkill === s ? " glow" : ""}`}
                        onMouseEnter={() => setActiveSkill(s)}
                        onMouseLeave={() => setActiveSkill(null)}
                      >{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
        <section id="experience" style={{ padding: "80px 5%", borderTop: "1px solid #1A2332" }}>
          <div ref={expRef} className={`fade-up${expVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-label">// career history</div>
            <h2 className="section-title" style={{ marginBottom: 52 }}>Experience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-row">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                        <h3 className="sg" style={{ fontSize: "1.02rem", fontWeight: 600, color: "#E8EDF2" }}>{exp.role}</h3>
                        {exp.current && <span className="badge" style={{ fontSize: "0.6rem", padding: "2px 8px" }}>Current</span>}
                      </div>
                      <div className="sg" style={{ fontSize: "0.86rem", color: "#00C9A7", fontWeight: 600 }}>{exp.company}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="mono" style={{ fontSize: "0.73rem", color: "#3A4550" }}>{exp.period}</div>
                      <div style={{ fontSize: "0.72rem", color: "#3A4550", marginTop: 2 }}>{exp.location}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, fontSize: "0.875rem", color: "#8B95A2", lineHeight: 1.75 }}>
                        <span className="mono" style={{ color: "#00C9A7", flexShrink: 0, marginTop: 2 }}>›</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ────────────────────────────────────────────────── */}
        <section id="projects" style={{ padding: "80px 5%", borderTop: "1px solid #1A2332" }}>
          <div ref={projRef} className={`fade-up${projVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-label">// things I've built</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>Key Projects</h2>
            <p style={{ color: "#5A6472", fontSize: "0.88rem", marginBottom: 44 }}>Click any project to see full details</p>
            <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
              {PROJECTS.map(p => (
                <div key={p.name} className="proj-card"
                  style={{ borderColor: "#1A2332" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = p.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1A2332"}
                  onClick={() => setActiveProject(p)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.accent, boxShadow: `0 0 10px ${p.accent}90` }} />
                      <h3 className="sg" style={{ fontSize: "1rem", fontWeight: 700, color: "#E8EDF2" }}>{p.name}</h3>
                    </div>
                    <span className="mono" style={{ fontSize: "0.68rem", color: "#3A4550", letterSpacing: "0.06em" }}>VIEW DETAILS →</span>
                  </div>
                  <div className="sg" style={{ fontSize: "0.71rem", color: p.accent, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{p.tagline}</div>
                  <p style={{ fontSize: "0.865rem", color: "#8B95A2", lineHeight: 1.75, marginBottom: 18 }}>{p.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {p.metrics.map(m => (
                      <span key={m} className="mono" style={{ padding: "3px 10px", borderRadius: 3, fontSize: "0.66rem", background: `${p.accent}12`, border: `1px solid ${p.accent}30`, color: p.accent, fontWeight: 500 }}>{m}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.stack.map(t => (
                      <span key={t} className="sg" style={{ padding: "3px 10px", borderRadius: 3, fontSize: "0.7rem", background: "rgba(255,255,255,0.02)", border: "1px solid #1A2332", color: "#3A4550", fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ───────────────────────────────────────────────────── */}
        <section id="tools" style={{ padding: "80px 5%", borderTop: "1px solid #1A2332" }}>
          <div ref={toolsRef} className={`fade-up${toolsVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-label">// interactive tools</div>
            <h2 className="section-title" style={{ marginBottom: 10 }}>Try My Dev Tools</h2>
            <p style={{ color: "#5A6472", fontSize: "0.88rem", marginBottom: 44 }}>
              Not sure what tech you need? Estimate your project cost? Use these tools — built to help you make smarter decisions.
            </p>

            <div className="tools-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>

              {/* TECH RECOMMENDER */}
              <div className="tool-card">
                <div className="tool-header">
                  <div className="mono" style={{ fontSize: "1.2rem", color: "#00C9A7" }}>⚙</div>
                  <div>
                    <div className="sg" style={{ fontWeight: 700, fontSize: "0.95rem", color: "#E8EDF2" }}>Tech Stack Recommender</div>
                    <div style={{ fontSize: "0.75rem", color: "#5A6472", marginTop: 2 }}>Tell me your requirements → I'll suggest the best stack</div>
                  </div>
                </div>
                <div className="tool-body">
                  <div style={{ marginBottom: 18 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Project Type</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                      {[
                        { v: "api", l: "REST API / Service" },
                        { v: "ecommerce", l: "E-Commerce" },
                        { v: "saas", l: "SaaS Product" },
                        { v: "mobile_backend", l: "Mobile Backend" },
                        { v: "cms", l: "CMS / Admin" },
                        { v: "other", l: "Other" },
                      ].map(o => (
                        <button key={o.v} className={`opt-btn${techForm.type === o.v ? " active" : ""}`}
                          onClick={() => setTechForm(f => ({ ...f, type: o.v }))}
                        >{o.l}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Expected Scale</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                      {[{ v: "small", l: "Small\n< 1K users" }, { v: "medium", l: "Medium\n1K–50K" }, { v: "large", l: "Large\n50K+" }].map(o => (
                        <button key={o.v} className={`opt-btn${techForm.scale === o.v ? " active" : ""}`}
                          onClick={() => setTechForm(f => ({ ...f, scale: o.v }))}
                          style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}
                        >{o.l}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Top Priority</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                      {[{ v: "speed", l: "Dev Speed" }, { v: "scalability", l: "Scalability" }, { v: "cost", l: "Low Cost" }].map(o => (
                        <button key={o.v} className={`opt-btn${techForm.priority === o.v ? " active" : ""}`}
                          onClick={() => setTechForm(f => ({ ...f, priority: o.v }))}
                        >{o.l}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 4 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Database Preference</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
                      {[{ v: "auto", l: "Auto Decide" }, { v: "relational", l: "SQL / Relational" }, { v: "nosql", l: "NoSQL" }, { v: "both", l: "Both" }].map(o => (
                        <button key={o.v} className={`opt-btn${techForm.db === o.v ? " active" : ""}`}
                          onClick={() => setTechForm(f => ({ ...f, db: o.v }))}
                        >{o.l}</button>
                      ))}
                    </div>
                  </div>

                  <button className="run-btn" onClick={runTechRecommender}>→ Get Recommendation</button>

                  {techResult && (
                    <div className="result-box">
                      <div className="mono" style={{ fontSize: "0.68rem", color: "#00C9A7", marginBottom: 14, letterSpacing: "0.1em" }}>// RECOMMENDED STACK</div>
                      {[
                        { l: "Backend", v: techResult.backend },
                        { l: "Frontend", v: techResult.frontend },
                        { l: "Database", v: techResult.database },
                        { l: "Hosting", v: techResult.hosting },
                      ].map(r => (
                        <div key={r.l} className="result-row">
                          <span className="result-label">{r.l}</span>
                          <span className="result-val">{r.v}</span>
                        </div>
                      ))}
                      {techResult.extra.length > 0 && (
                        <div style={{ marginTop: 14 }}>
                          <div className="mono" style={{ fontSize: "0.65rem", color: "#5A6472", marginBottom: 8, letterSpacing: "0.1em" }}>// ALSO CONSIDER</div>
                          {techResult.extra.map(e => (
                            <div key={e} style={{ fontSize: "0.78rem", color: "#8B95A2", padding: "4px 0", display: "flex", gap: 8 }}>
                              <span style={{ color: "#00C9A7" }}>+</span>{e}
                            </div>
                          ))}
                        </div>
                      )}
                      <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(0,201,167,0.06)", borderRadius: 6, border: "1px solid rgba(0,201,167,0.15)" }}>
                        <div style={{ fontSize: "0.78rem", color: "#8B95A2", lineHeight: 1.7 }}>
                          I work with this exact stack. <button onClick={() => scrollTo("Contact")} style={{ background: "none", border: "none", color: "#00C9A7", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", fontWeight: 600, padding: 0 }}>Let's discuss your project →</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PROJECT ESTIMATOR */}
              <div className="tool-card">
                <div className="tool-header">
                  <div className="mono" style={{ fontSize: "1.2rem", color: "#00C9A7" }}>₹</div>
                  <div>
                    <div className="sg" style={{ fontWeight: 700, fontSize: "0.95rem", color: "#E8EDF2" }}>Project Cost Estimator</div>
                    <div style={{ fontSize: "0.75rem", color: "#5A6472", marginTop: 2 }}>Get a rough estimate for your backend project</div>
                  </div>
                </div>
                <div className="tool-body">
                  <div style={{ marginBottom: 18 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Project Type</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                      {Object.entries(ESTIMATE_DATA).map(([k, v]) => (
                        <button key={k} className={`opt-btn${estForm.type === k ? " active" : ""}`}
                          onClick={() => setEstForm(f => ({ ...f, type: k }))}
                        >{v.label}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Complexity</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                      {[
                        { v: "simple", l: "Simple", sub: "Basic CRUD" },
                        { v: "medium", l: "Medium", sub: "Integrations" },
                        { v: "complex", l: "Complex", sub: "Custom Logic" },
                      ].map(o => (
                        <button key={o.v} className={`opt-btn${estForm.complexity === o.v ? " active" : ""}`}
                          onClick={() => setEstForm(f => ({ ...f, complexity: o.v }))}
                          style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}
                        >{`${o.l}\n${o.sub}`}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 4 }}>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "#5A6472", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Scale</div>
                    <div className="opt-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                      {[
                        { v: "small", l: "Startup", sub: "MVP / POC" },
                        { v: "medium", l: "Growth", sub: "Production" },
                        { v: "large", l: "Enterprise", sub: "High Traffic" },
                      ].map(o => (
                        <button key={o.v} className={`opt-btn${estForm.scale === o.v ? " active" : ""}`}
                          onClick={() => setEstForm(f => ({ ...f, scale: o.v }))}
                          style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}
                        >{`${o.l}\n${o.sub}`}</button>
                      ))}
                    </div>
                  </div>

                  <button className="run-btn" onClick={runEstimator}>→ Calculate Estimate</button>

                  {estResult && (
                    <div className="result-box">
                      <div className="mono" style={{ fontSize: "0.68rem", color: "#00C9A7", marginBottom: 14, letterSpacing: "0.1em" }}>// ESTIMATE: {estResult.label.toUpperCase()}</div>
                      <div className="result-row">
                        <span className="result-label">Cost Range</span>
                        <span className="result-val">{fmt(estResult.costMin)} – {fmt(estResult.costMax)}</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Timeline</span>
                        <span className="result-val">{estResult.wMin}–{estResult.wMax} weeks</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Delivery</span>
                        <span className="result-val">Milestone-based</span>
                      </div>
                      <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(255,200,0,0.04)", borderRadius: 6, border: "1px solid rgba(255,200,0,0.15)" }}>
                        <div style={{ fontSize: "0.73rem", color: "#8B95A2", lineHeight: 1.7 }}>
                          ⚠ Estimates vary based on actual requirements. Contact me for a detailed proposal.
                        </div>
                      </div>
                      <button className="run-btn" onClick={() => scrollTo("Contact")} style={{ marginTop: 12, background: "transparent", border: "2px solid #00C9A7", color: "#00C9A7", fontWeight: 700 }}>
                        → Discuss This Project
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: "80px 5% 0", borderTop: "1px solid #1A2332" }}>
          <div ref={ctaRef} className={`fade-up${ctaVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>

            <div className="hire-banner" style={{ marginBottom: 60 }}>
              <div className="mono" style={{ fontSize: "0.68rem", color: "#00C9A7", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>// open to work</div>
              <h2 className="sg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: 16 }}>
                Let's Build Something<br /><span style={{ color: "#00C9A7" }}>Production-Ready</span>
              </h2>
              <p style={{ color: "#8B95A2", lineHeight: 1.85, maxWidth: 540, margin: "0 auto 32px", fontSize: "0.93rem" }}>
                Whether it's a startup MVP, a production API, or a full backend system — I deliver clean code, scalable architecture, and on-time execution. 4.5+ years of production experience across PHP, Python, and Node.js.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 700, margin: "0 auto 36px", textAlign: "left" }}>
                {[
                  { icon: "⚡", title: "Fast Delivery", desc: "Milestone-based, no delays" },
                  { icon: "🔒", title: "Clean & Secure", desc: "Best practices, tested APIs" },
                  { icon: "📈", title: "Built to Scale", desc: "From 100 to 100K users" },
                ].map(f => (
                  <div key={f.title} style={{ background: "rgba(0,201,167,0.04)", border: "1px solid rgba(0,201,167,0.12)", borderRadius: 8, padding: "16px 14px" }}>
                    <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{f.icon}</div>
                    <div className="sg" style={{ fontWeight: 600, fontSize: "0.88rem", color: "#E8EDF2", marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: "0.76rem", color: "#5A6472" }}>{f.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:gorishanker.devloper@gmail.com" className="cta cta-p" style={{ fontSize: "0.9rem" }}>
                  Email Me Directly
                </a>
                <a href="https://www.linkedin.com/in/gorishanker-sharma" target="_blank" rel="noreferrer" className="cta cta-o" style={{ fontSize: "0.9rem" }}>
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div style={{ maxWidth: 560, margin: "0 auto", paddingBottom: 100 }}>
              <div className="section-label" style={{ textAlign: "center", marginBottom: 24 }}>// reach me on</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                <div className="contact-row" onClick={copyEmail} role="button">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="mono" style={{ color: "#00C9A7", fontSize: "0.9rem", width: 20 }}>@</span>
                    <span className="sg" style={{ fontSize: "0.875rem" }}>gorishanker.devloper@gmail.com</span>
                  </div>
                  <span className="mono" style={{ fontSize: "0.68rem", color: copied ? "#00C9A7" : "#3A4550", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {copied ? "copied ✓" : "copy"}
                  </span>
                </div>

                <a href="tel:+917689864686" className="contact-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="mono" style={{ color: "#00C9A7", fontSize: "0.9rem", width: 20 }}>#</span>
                    <span className="sg" style={{ fontSize: "0.875rem" }}>+91 76898 64686</span>
                  </div>
                  <span className="mono" style={{ fontSize: "0.68rem", color: "#3A4550", textTransform: "uppercase", letterSpacing: "0.08em" }}>call</span>
                </a>

                <a href="https://wa.me/917689864686" target="_blank" rel="noreferrer" className="contact-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="sg" style={{ color: "#00C9A7", fontSize: "0.9rem", width: 20 }}>W</span>
                    <span className="sg" style={{ fontSize: "0.875rem" }}>+91 76898 64686</span>
                  </div>
                  <span className="mono" style={{ fontSize: "0.68rem", color: "#3A4550", textTransform: "uppercase", letterSpacing: "0.08em" }}>→</span>
                </a>

                <a href="https://www.linkedin.com/in/gorishanker-sharma" target="_blank" rel="noreferrer" className="contact-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="sg" style={{ color: "#00C9A7", fontSize: "0.9rem", fontWeight: 700, width: 20 }}>in</span>
                    <span className="sg" style={{ fontSize: "0.875rem" }}>linkedin.com/in/gorishanker-sharma</span>
                  </div>
                  <span className="mono" style={{ fontSize: "0.68rem", color: "#3A4550", textTransform: "uppercase", letterSpacing: "0.08em" }}>→</span>
                </a>

                <a href="https://github.com/chetanhaldinya" target="_blank" rel="noreferrer" className="contact-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span className="mono" style={{ color: "#00C9A7", fontSize: "0.9rem", width: 20 }}>$</span>
                    <span className="sg" style={{ fontSize: "0.875rem" }}>github.com/chetanhaldinya</span>
                  </div>
                  <span className="mono" style={{ fontSize: "0.68rem", color: "#3A4550", textTransform: "uppercase", letterSpacing: "0.08em" }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid #1A2332", padding: "20px 5%", textAlign: "center" }}>
          <p className="mono" style={{ fontSize: "0.7rem", color: "#3A4550" }}>
            © 2026 Gorishanker Sharma &nbsp;·&nbsp; Built with React + Vite &nbsp;·&nbsp; Jaipur, India
          </p>
        </footer>

        {/* ── PROJECT MODAL ───────────────────────────────────────────── */}
        {activeProject && (
          <div className="modal-overlay" onClick={() => setActiveProject(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid #1A2332", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: activeProject.accent, boxShadow: `0 0 12px ${activeProject.accent}` }} />
                  <h3 className="sg" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#E8EDF2" }}>{activeProject.name}</h3>
                </div>
                <button onClick={() => setActiveProject(null)} style={{ background: "none", border: "none", color: "#5A6472", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>✕</button>
              </div>

              <div style={{ padding: "28px" }}>
                <div className="sg" style={{ fontSize: "0.72rem", color: activeProject.accent, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{activeProject.tagline}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                  {activeProject.metrics.map(m => (
                    <span key={m} className="mono" style={{ padding: "4px 12px", borderRadius: 4, fontSize: "0.7rem", background: `${activeProject.accent}14`, border: `1px solid ${activeProject.accent}35`, color: activeProject.accent }}>{m}</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.885rem", color: "#8B95A2", lineHeight: 1.85, marginBottom: 24 }}>{activeProject.longDesc}</p>
                <div style={{ marginBottom: 24 }}>
                  <div className="mono" style={{ fontSize: "0.65rem", color: "#5A6472", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Tech Stack</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {activeProject.stack.map(t => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {activeProject.link && (
                    <a href={activeProject.link} target="_blank" rel="noreferrer" className="cta cta-p" style={{ padding: "10px 22px", fontSize: "0.84rem" }}>
                      View Live ↗
                    </a>
                  )}
                  <button className="cta cta-o" style={{ padding: "10px 22px", fontSize: "0.84rem" }} onClick={() => { setActiveProject(null); scrollTo("Contact"); }}>
                    Build Something Similar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}
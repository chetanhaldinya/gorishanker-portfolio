import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS = {
  Languages:  ["PHP", "Python", "Node.js", "JavaScript"],
  Frameworks: ["Laravel", "FastAPI", "NestJS", "ReactJS"],
  Databases:  ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  Cloud:      ["AWS EC2", "AWS S3", "DigitalOcean", "Linux Server"],
  Practices:  ["REST APIs", "CI/CD", "RBAC", "JWT Auth", "Payment Gateway", "Git"],
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
    desc: "Scalable backend APIs for horoscope calculations, compatibility analysis, OTP auth, and secure user data handling. Modular service architecture with Redis caching.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Redis", "AWS", "JWT"],
    accent: "#7C5CBF",
    link: "https://staarae.com",
  },
  {
    name: "Food Truckky",
    tagline: "Food Ordering & Vendor Management",
    desc: "Full backend for food ordering, vendor onboarding, and order workflows. ReactJS Admin Panel for managing vendors, customers, orders, and reports.",
    stack: ["NestJS", "ReactJS", "MongoDB", "JWT", "REST APIs"],
    accent: "#E8640A",
    link: null,
  },
  {
    name: "Cashcry",
    tagline: "Cashback & Gift Card Platform",
    desc: "Led backend of a cashback and gift card platform. REST APIs for rewards, gift card issuance, user transactions, and secure payment gateway integration.",
    stack: ["Laravel", "PHP", "MySQL", "Payment Gateway", "AWS"],
    accent: "#00C9A7",
    link: "https://cashcry.com",
  },
  {
    name: "Avicenna-Care",
    tagline: "Healthcare Management Platform",
    desc: "Backend of a healthcare system for patient management, appointment scheduling, and medical records with strict RBAC and privacy compliance.",
    stack: ["Laravel", "PHP", "MySQL", "RBAC", "AWS"],
    accent: "#2196F3",
    link: "https://avicenna-care.com",
  },
];

const STATS = [
  { n: "4.5+", l: "Years Experience" },
  { n: "10+",  l: "Production Projects" },
  { n: "30%",  l: "API Speed Gain" },
  { n: "20%",  l: "Infra Cost Saved" },
];

const EDUCATION = [
  { degree: "Master of Computer Applications (MCA)", inst: "Rajasthan Technical University (RTU)", period: "2023 – 2025" },
  { degree: "Bachelor of Computer Applications (BCA)", inst: "Rajasthan University (RU)", period: "2019 – 2022" },
];

const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function GorishankerPortfolio() {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

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

  // section fade-in hooks
  const [skillsRef, skillsVis]   = useInView();
  const [expRef,    expVis]      = useInView();
  const [projRef,   projVis]     = useInView();
  const [eduRef,    eduVis]      = useInView();
  const [ctaRef,    ctaVis]      = useInView();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0D1117", color: "#E8EDF2", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0D1117; }
        ::-webkit-scrollbar-thumb { background: #00C9A7; border-radius: 2px; }

        .sg { font-family: 'Space Grotesk', sans-serif; }

        .nav-link {
          cursor: pointer; color: #8B95A2; font-size: 0.82rem;
          letter-spacing: 0.06em; transition: color 0.2s;
          text-transform: uppercase; font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
        }
        .nav-link:hover { color: #00C9A7; }

        .pill {
          display: inline-block; padding: 5px 14px; border-radius: 4px;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.04em;
          border: 1px solid #1E2630; background: #131B24; color: #8B95A2;
          cursor: default; transition: all 0.2s;
          font-family: 'Space Grotesk', sans-serif;
        }
        .pill:hover, .pill.glow {
          border-color: #00C9A7; color: #00C9A7;
          background: rgba(0,201,167,0.07);
          box-shadow: 0 0 14px rgba(0,201,167,0.18);
        }

        .exp-row {
          border-left: 2px solid #1E2630; padding-left: 24px;
          position: relative; transition: border-color 0.3s;
        }
        .exp-row:hover { border-left-color: #00C9A7; }
        .exp-row::before {
          content: ''; position: absolute; left: -5px; top: 7px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #1E2630; border: 2px solid #1E2630; transition: all 0.3s;
        }
        .exp-row:hover::before { background: #00C9A7; border-color: #00C9A7; }

        .proj-card {
          background: #131B24; border: 1px solid #1E2630;
          border-radius: 10px; padding: 24px;
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
        }
        .proj-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
        }

        .stat-box {
          text-align: center; padding: 22px 12px;
          border: 1px solid #1E2630; border-radius: 8px; background: #131B24;
          transition: border-color 0.3s;
        }
        .stat-box:hover { border-color: #00C9A740; }

        .contact-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #131B24; border: 1px solid #1E2630;
          border-radius: 8px; padding: 16px 24px;
          transition: border-color 0.2s; cursor: pointer; text-decoration: none; color: #E8EDF2;
        }
        .contact-row:hover { border-color: #00C9A7; }

        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.in { opacity: 1; transform: translateY(0); }

        .badge {
          font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600;
          background: rgba(0,201,167,0.1); color: #00C9A7;
          padding: 4px 12px; border-radius: 3px; border: 1px solid rgba(0,201,167,0.25);
          display: inline-block;
        }

        .section-label {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #00C9A7; font-weight: 600; margin-bottom: 8px;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif; font-size: 2rem;
          font-weight: 700; color: #E8EDF2; line-height: 1.2;
        }

        .cta { display: inline-block; padding: 12px 28px; border-radius: 5px; font-family: 'Space Grotesk', sans-serif; font-size: 0.88rem; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; transition: all 0.22s; text-decoration: none; }
        .cta-p { background: #00C9A7; color: #0D1117; border: 2px solid #00C9A7; }
        .cta-p:hover { background: #00deba; border-color: #00deba; transform: translateY(-1px); }
        .cta-o { background: transparent; color: #E8EDF2; border: 2px solid #1E2630; }
        .cta-o:hover { border-color: #00C9A7; color: #00C9A7; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .proj-grid  { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-links  { display: none !important; }
          .section-title { font-size: 1.6rem !important; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(13,17,23,0.95)" : "rgba(13,17,23,0.7)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "#1E2630" : "transparent"}`,
        padding: "0 5%", transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span className="sg" style={{ fontWeight: 700, fontSize: "1rem", color: "#E8EDF2" }}>
            <span style={{ color: "#00C9A7" }}>G.</span>Sharma
          </span>
          <div className="nav-links" style={{ display: "flex", gap: 32 }}>
            {NAV.map(n => <span key={n} className="nav-link" onClick={() => scrollTo(n)}>{n}</span>)}
          </div>
          <button className="cta cta-p" style={{ padding: "8px 20px", fontSize: "0.8rem" }} onClick={() => scrollTo("Contact")}>
            Hire Me
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "110px 5% 70px" }}>
        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%" }}>

          {/* Left */}
          <div>
            <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>Available for opportunities</span>
            <h1 className="sg" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: 14 }}>
              Gorishanker<br /><span style={{ color: "#00C9A7" }}>Sharma</span>
            </h1>
            <p className="sg" style={{ fontSize: "1.1rem", color: "#8B95A2", fontWeight: 500, marginBottom: 20 }}>
              Senior Backend Engineer
            </p>
            <p style={{ lineHeight: 1.85, color: "#8B95A2", maxWidth: 460, marginBottom: 36, fontSize: "0.94rem" }}>
              Backend-focused engineer with <strong style={{ color: "#E8EDF2" }}>4.5+ years</strong> building production-grade APIs,
              scalable systems, and cloud infrastructure with PHP, Python, and Node.js.
              Experienced in leading teams and driving measurable performance improvements.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="cta cta-p" onClick={() => scrollTo("Projects")}>View Projects</button>
              <button className="cta cta-o" onClick={() => scrollTo("Contact")}>Get in Touch</button>
            </div>

            {/* quick links */}
            <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gorishanker-sharma" },
                { label: "GitHub",   href: "https://github.com/chetanhaldinya" },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="sg"
                  style={{ fontSize: "0.8rem", color: "#4A5568", letterSpacing: "0.05em", textDecoration: "none", textTransform: "uppercase", fontWeight: 600, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color="#00C9A7"}
                  onMouseLeave={e => e.currentTarget.style.color="#4A5568"}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 20 }}>
              {STATS.map(s => (
                <div key={s.n} className="stat-box">
                  <div className="sg" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#00C9A7", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "0.76rem", color: "#8B95A2", marginTop: 7, letterSpacing: "0.04em" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#131B24", border: "1px solid #1E2630", borderRadius: 10, padding: 22 }}>
              <div className="section-label" style={{ marginBottom: 14 }}>Core Stack</div>
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
      <section id="skills" style={{ padding: "80px 5%", borderTop: "1px solid #1E2630" }}>
        <div ref={skillsRef} className={`fade-up${skillsVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">What I work with</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Skills & Technologies</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {Object.entries(SKILLS).map(([cat, skills]) => (
              <div key={cat} style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div className="sg" style={{ width: 96, flexShrink: 0, fontSize: "0.72rem", letterSpacing: "0.09em", color: "#4A5568", textTransform: "uppercase", fontWeight: 600, paddingTop: 7 }}>{cat}</div>
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
      <section id="experience" style={{ padding: "80px 5%", borderTop: "1px solid #1E2630" }}>
        <div ref={expRef} className={`fade-up${expVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Career history</div>
          <h2 className="section-title" style={{ marginBottom: 52 }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="exp-row">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <h3 className="sg" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#E8EDF2" }}>{exp.role}</h3>
                      {exp.current && <span className="badge" style={{ fontSize: "0.62rem", padding: "2px 8px" }}>Current</span>}
                    </div>
                    <div className="sg" style={{ fontSize: "0.88rem", color: "#00C9A7", fontWeight: 500 }}>{exp.company}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="sg" style={{ fontSize: "0.78rem", color: "#4A5568" }}>{exp.period}</div>
                    <div style={{ fontSize: "0.74rem", color: "#4A5568", marginTop: 2 }}>{exp.location}</div>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, fontSize: "0.875rem", color: "#8B95A2", lineHeight: 1.75 }}>
                      <span style={{ color: "#00C9A7", flexShrink: 0, marginTop: 3 }}>›</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "80px 5%", borderTop: "1px solid #1E2630" }}>
        <div ref={projRef} className={`fade-up${projVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Things I've built</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Key Projects</h2>
          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {PROJECTS.map(p => (
              <div key={p.name} className="proj-card" style={{ borderColor: "#1E2630" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = p.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2630"}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.accent, boxShadow: `0 0 8px ${p.accent}80` }} />
                    <h3 className="sg" style={{ fontSize: "1rem", fontWeight: 700, color: "#E8EDF2" }}>{p.name}</h3>
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer"
                      className="sg"
                      style={{ fontSize: "0.72rem", color: "#4A5568", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = p.accent}
                      onMouseLeave={e => e.currentTarget.style.color = "#4A5568"}
                    >Live ↗</a>
                  )}
                </div>
                <div className="sg" style={{ fontSize: "0.73rem", color: p.accent, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>{p.tagline}</div>
                <p style={{ fontSize: "0.875rem", color: "#8B95A2", lineHeight: 1.75, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map(t => (
                    <span key={t} className="sg" style={{ padding: "3px 10px", borderRadius: 3, fontSize: "0.7rem", background: "rgba(255,255,255,0.03)", border: "1px solid #1E2630", color: "#4A5568", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ───────────────────────────────────────────────── */}
      <section id="education" style={{ padding: "80px 5%", borderTop: "1px solid #1E2630" }}>
        <div ref={eduRef} className={`fade-up${eduVis ? " in" : ""}`} style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">Academic background</div>
          <h2 className="section-title" style={{ marginBottom: 44 }}>Education</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ background: "#131B24", border: "1px solid #1E2630", borderRadius: 8, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h3 className="sg" style={{ fontSize: "0.98rem", fontWeight: 600, color: "#E8EDF2", marginBottom: 6 }}>{e.degree}</h3>
                  <div className="sg" style={{ fontSize: "0.86rem", color: "#00C9A7", fontWeight: 500 }}>{e.inst}</div>
                </div>
                <div className="sg" style={{ fontSize: "0.78rem", color: "#4A5568", background: "#0D1117", padding: "6px 16px", borderRadius: 4, border: "1px solid #1E2630" }}>{e.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "80px 5% 110px", borderTop: "1px solid #1E2630" }}>
        <div ref={ctaRef} className={`fade-up${ctaVis ? " in" : ""}`} style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Let's connect</div>
          <h2 className="section-title" style={{ marginBottom: 14, textAlign: "center" }}>Get in Touch</h2>
          <p style={{ color: "#8B95A2", lineHeight: 1.85, marginBottom: 40, fontSize: "0.94rem" }}>
            Open to backend engineering roles, freelance projects, and interesting collaborations.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Email */}
            <div className="contact-row" onClick={copyEmail} role="button">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ color: "#00C9A7", fontSize: "1.1rem" }}>✉</span>
                <span className="sg" style={{ fontSize: "0.88rem" }}>gorishanker.devloper@gmail.com</span>
              </div>
              <span className="sg" style={{ fontSize: "0.72rem", color: copied ? "#00C9A7" : "#4A5568", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {copied ? "Copied ✓" : "Copy"}
              </span>
            </div>

            {/* Phone */}
            <a href="tel:+917689864686" className="contact-row">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ color: "#00C9A7", fontSize: "1.1rem" }}>✆</span>
                <span className="sg" style={{ fontSize: "0.88rem" }}>+91 76898 64686</span>
              </div>
              <span className="sg" style={{ fontSize: "0.72rem", color: "#4A5568", textTransform: "uppercase", letterSpacing: "0.06em" }}>Call</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/gorishanker-sharma" target="_blank" rel="noreferrer" className="contact-row">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span className="sg" style={{ color: "#00C9A7", fontSize: "1rem", fontWeight: 700 }}>in</span>
                <span className="sg" style={{ fontSize: "0.88rem" }}>linkedin.com/in/gorishanker-sharma</span>
              </div>
              <span className="sg" style={{ fontSize: "0.72rem", color: "#4A5568", textTransform: "uppercase", letterSpacing: "0.06em" }}>→</span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/chetanhaldinya" target="_blank" rel="noreferrer" className="contact-row">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ color: "#00C9A7", fontSize: "1rem" }}>⌥</span>
                <span className="sg" style={{ fontSize: "0.88rem" }}>github.com/chetanhaldinya</span>
              </div>
              <span className="sg" style={{ fontSize: "0.72rem", color: "#4A5568", textTransform: "uppercase", letterSpacing: "0.06em" }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #1E2630", padding: "22px 5%", textAlign: "center" }}>
        <p className="sg" style={{ fontSize: "0.75rem", color: "#4A5568" }}>
          © 2026 Gorishanker Sharma &nbsp;·&nbsp; Built with React + Vite
        </p>
      </footer>
    </div>
  );
}

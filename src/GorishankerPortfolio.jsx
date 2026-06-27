import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── CANVAS ANIMATED BACKGROUND ─────────────────────────────────────────────
function CodeRainCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const chars = "01アイウエオカキクケコサシスセソ{}<>[]()=>const let function return import export class";
    const arr = chars.split("");
    const fontSize = 13;
    const cols = Math.floor(W / fontSize);
    const drops = Array(cols).fill(1);
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(6,8,16,0.055)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#00C9A718";
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      drops.forEach((y, i) => {
        const text = arr[Math.floor(Math.random() * arr.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none", opacity:0.55 }} />;
}

// ─── ICONS ──────────────────────────────────────────────────────────────────
const Ico = ({ d, size=20, color="currentColor", sw=1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{display:"block",flexShrink:0}}>
    {(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}
  </svg>
);
const I = {
  menu:    "M3 12h18M3 6h18M3 18h18",
  x:       "M18 6L6 18M6 6l12 12",
  arrow:   "M5 12h14m-7-7 7 7-7 7",
  check:   "M20 6L9 17l-5-5",
  ext:     "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3",
  web:     "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0c-3 3-4.5 6.5-4.5 10S9 19 12 22m0-20c3 3 4.5 6.5 4.5 10S15 19 12 22M2 12h20",
  mobile:  "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01",
  social:  ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z","M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"],
  api:     "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
  design:  ["M12 20h9","M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"],
  seo:     ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M21 21l-4.35-4.35"],
  app:     ["M12 18h.01","M8 21h8","M12 21v-3","M7 4h10l1 7H6L7 4z","M5 4H3","M21 4h-2"],
  zap:     "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  shield:  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  clock:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 3",
  users:   ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M16 3.13a4 4 0 0 1 0 7.75"],
  phone:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm18 2l-10 7L2 6",
  wa:      "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  li:      ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z","M2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  gh:      "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  chart:   ["M18 20V10","M12 20V4","M6 20v-6"],
  delivery:"M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m-7 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0m7 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0M13 9h8l4 4v4H13V9z",
  rupee:   ["M6 3h12","M6 8h12","M6 13l8.5 8","M6 13h3a4 4 0 1 0 0-5H6"],
  globe:   "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0v20M2 12h20M4.93 4.93A17 17 0 0 1 12 7a17 17 0 0 1 7.07-2.07M4.93 19.07A17 17 0 0 0 12 17a17 17 0 0 0 7.07 2.07",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const T = "#00C9A7"; // teal accent
const WA_LINK = "https://wa.me/917689864686?text=Hi!%20I%20want%20to%20discuss%20a%20project.";

const PAGES = ["Home","Services","Projects","Team","Contact"];

const SERVICES = [
  {
    id:"web", icon:"web", color:"#00C9A7", title:"Web Development",
    short:"Custom web apps, portals & dashboards — Laravel, React, FastAPI.",
    desc:"We build robust, scalable web applications from scratch. Whether it's a customer-facing product, an internal tool, or a SaaS dashboard — we design, develop, and deploy it with production-grade code.",
    features:["Custom Web Applications","Admin Panels & Dashboards","Landing Pages & Marketing Sites","REST API Development","Performance Optimization & CDN","CMS Integration (WordPress/Custom)"],
    tech:["ReactJS","Laravel","FastAPI","NestJS","MySQL","PostgreSQL","AWS"],
    from:"₹25K",
  },
  {
    id:"mobile", icon:"mobile", color:"#7C5CBF", title:"Mobile App Development",
    short:"Native Android/iOS apps & cross-platform Flutter. MVP to App Store.",
    desc:"From idea to App Store in record time. We build native Android (Kotlin/Java), iOS (Swift), and cross-platform Flutter apps — with full backend API, admin panel, and store publishing included.",
    features:["Android App (Kotlin/Java)","iOS App (Swift)","Cross-platform Flutter","App Store & Play Store Publishing","Push Notifications & OTP","Offline-first Architecture"],
    tech:["Flutter","React Native","Swift","Kotlin","Firebase","REST APIs","AWS"],
    from:"₹60K",
  },
  {
    id:"app-delivery", icon:"delivery", color:"#E8640A", title:"Delivery App Development",
    short:"Zomato/Swiggy clone. 3 apps (Customer, Vendor, Driver) + Admin Panel.",
    desc:"Launch your own food delivery, grocery, or hyperlocal delivery platform. We deliver a complete white-label ecosystem: Customer App, Vendor App, Driver App, and a powerful Admin Panel — all customized to your brand.",
    features:["Customer App (Android + iOS)","Vendor Management App","Driver / Delivery Agent App","Web Admin Panel","Real-time Order Tracking","Payment Gateway Integration","WhatsApp/SMS Notifications","Play Store + App Store Publish"],
    tech:["Flutter","NestJS","MongoDB","Socket.io","Stripe/Razorpay","AWS","Firebase"],
    from:"₹70K",
    featured:true,
  },
  {
    id:"social", icon:"social", color:"#FF6B9D", title:"Social Media Management",
    short:"Strategy, content, scheduling & paid ads — Instagram, LinkedIn, Facebook.",
    desc:"We manage your social media presence end-to-end. From content strategy to graphic design, from scheduling to paid ad campaigns — we grow your brand's following and engagement with data-driven decisions.",
    features:["Social Media Strategy & Calendar","Graphic Design for Posts/Reels","Paid Ad Campaigns (Meta/Google)","Analytics & Monthly Reports","Community Management","Personal Branding for Founders"],
    tech:["Meta Ads","Google Ads","Canva/Adobe","Buffer","Analytics","Hootsuite"],
    from:"₹8K/mo",
  },
  {
    id:"api", icon:"api", color:"#2196F3", title:"Backend & API Development",
    short:"Scalable APIs, microservices, payment gateways, AWS infra.",
    desc:"Your frontend and mobile apps need rock-solid APIs. We design, build, and deploy backend systems that scale — from a single REST API to full microservices architectures with queues, caches, and cloud deployment.",
    features:["REST & GraphQL API Design","Payment Gateway (Stripe/Razorpay)","Third-party API Integration","Database Design & Optimization","Redis Caching & Queue Systems","Cloud Deployment (AWS/DigitalOcean)"],
    tech:["FastAPI","NestJS","Laravel","PostgreSQL","MongoDB","Redis","AWS EC2"],
    from:"₹20K",
  },
  {
    id:"design", icon:"design", color:"#FFB800", title:"UI/UX Design",
    short:"Beautiful Figma prototypes → pixel-perfect implementation.",
    desc:"Great products start with great design. We research your users, design intuitive interfaces, build interactive prototypes, and hand off production-ready designs — or implement them ourselves.",
    features:["App UI/UX Design","Web Interface Design","Figma Prototyping","Design System & Component Library","User Flow Mapping","Responsive Design Implementation"],
    tech:["Figma","Adobe XD","Framer","Tailwind CSS","CSS3","React"],
    from:"₹15K",
  },
];

const PROJECTS = [
  {
    name:"Staarae", tag:"AstroTech", color:"#7C5CBF",
    desc:"Production-grade astrology compatibility platform. Scalable FastAPI backend with PostgreSQL, Redis caching, OTP auth via Twilio, AWS infra.",
    longDesc:"Built from scratch as primary backend engineer. FastAPI + PostgreSQL microservices, OTP-based authentication via Twilio, NASA/JPL astronomical data API integration, Redis caching for high-frequency endpoints, CI/CD on AWS EC2. Built the full admin panel and managed all production server operations.",
    stack:["FastAPI","Python","PostgreSQL","Redis","AWS EC2","S3","JWT","Twilio"],
    metrics:["40+ API Endpoints","OTP Auth","Redis Cache","AWS Production"],
    link:"https://staarae.com",
  },
  {
    name:"Food Truckky", tag:"FoodTech", color:"#E8640A",
    desc:"Food ordering & vendor management platform. Multi-role RBAC, real-time order tracking, Stripe payments, ReactJS admin panel.",
    longDesc:"NestJS + MongoDB backend with multi-role authentication (admin/vendor/customer). Stripe payment integration, Socket.io real-time order tracking, push notification service via FCM, and a full ReactJS admin dashboard with vendor/order/report management.",
    stack:["NestJS","ReactJS","MongoDB","Stripe","Socket.io","FCM","JWT"],
    metrics:["Multi-role RBAC","Stripe Payments","Real-time Tracking","Admin Panel"],
    link:null,
  },
  {
    name:"Cashcry", tag:"FinTech", color:T,
    desc:"Cashback & gift card platform. REST APIs for rewards, gift card issuance, user wallet, and payment gateway integration.",
    longDesc:"Led backend for a fintech cashback platform. Built cashback reward calculation engine, gift card issuance & redemption, user wallet management, and secure payment gateway integration. Collaborated closely with React Native mobile team for seamless API integration.",
    stack:["Laravel","PHP","MySQL","Payment Gateway","AWS S3","React Native API"],
    metrics:["Cashback Engine","Gift Cards","Wallet System","Mobile API"],
    link:"https://cashcry.com",
  },
  {
    name:"Avicenna-Care", tag:"HealthTech", color:"#2196F3",
    desc:"Healthcare management system. Patient records, appointment scheduling, RBAC for doctors/admins/patients, full privacy compliance.",
    longDesc:"Directed backend of a full healthcare management system. Patient profiles, appointment scheduling, medical records, prescription management. Strict 3-role RBAC (doctor/admin/patient). HIPAA-aligned data handling and collaborated with Flutter mobile team for API integration.",
    stack:["Laravel","PHP","MySQL","RBAC","AWS","JWT","Flutter API"],
    metrics:["Patient Management","3-role RBAC","Appointment System","Flutter API"],
    link:"https://avicenna-care.com",
  },
];

const TEAM = [
  { name:"Gorishanker Sharma", role:"Backend Lead & Founder",    exp:"4.5 yrs", color:T,         skills:["PHP/Laravel","Python/FastAPI","Node.js/NestJS","AWS","PostgreSQL"] },
  { name:"Frontend Engineer",   role:"React & Flutter Developer", exp:"3 yrs",   color:"#7C5CBF", skills:["ReactJS","Flutter","TypeScript","Firebase","UI Implementation"] },
  { name:"UI/UX Designer",      role:"Design & Visual Identity",  exp:"3 yrs",   color:"#FF6B9D", skills:["Figma","Adobe XD","Motion Design","Brand Identity","Prototyping"] },
  { name:"SMM Specialist",      role:"Social Media & Marketing",  exp:"2 yrs",   color:"#E8640A", skills:["Instagram","Meta Ads","Content Creation","SEO","Analytics"] },
];

const PROCESS = [
  { n:"01", title:"Discovery Call",      desc:"30-min free call. We understand your idea, goals, and timeline.",               icon:"phone" },
  { n:"02", title:"Proposal & Plan",     desc:"Detailed tech plan, milestone schedule, and cost breakdown. No hidden fees.",    icon:"chart" },
  { n:"03", title:"Design & Develop",    desc:"UI designs → development → testing. Regular demos, you always know progress.",   icon:"api" },
  { n:"04", title:"Launch & Support",    desc:"Deploy to production + App Store publish + 3-month post-launch support.",        icon:"zap" },
];

const STATS = [
  { n:"4.5+", l:"Years Building" },
  { n:"10+",  l:"Projects Shipped" },
  { n:"4",    l:"Team Members" },
  { n:"100%", l:"On-time Delivery" },
];

const TECHS = ["PHP","Laravel","Python","FastAPI","Node.js","NestJS","ReactJS","Flutter","MySQL","PostgreSQL","MongoDB","Redis","AWS EC2","S3","Docker","Figma","Meta Ads","Stripe","Firebase","Twilio"];

// ─── ESTIMATION DATA ─────────────────────────────────────────────────────────
const EST_TYPES = [
  { v:"web",      l:"Web Application",         min:25000,  max:100000, w:[3,8] },
  { v:"mobile",   l:"Mobile App",              min:60000,  max:250000, w:[6,14] },
  { v:"delivery", l:"Delivery App (3 Apps)",   min:70000,  max:200000, w:[5,12] },
  { v:"api",      l:"Backend / API",           min:20000,  max:80000,  w:[2,6] },
  { v:"ecommerce",l:"E-Commerce Platform",     min:70000,  max:200000, w:[6,12] },
  { v:"saas",     l:"SaaS Product",            min:120000, max:400000, w:[10,20] },
  { v:"social",   l:"Social Media Mgmt",       min:8000,   max:25000,  w:[1,1], monthly:true },
];
const CMPLX = { simple:0.7, medium:1.0, complex:1.55 };
const fmt = n => n>=100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}K`;

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useInView(t=0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold:t});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[t]);
  return [ref,vis];
}

// ─── SHARED STYLES ───────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

.syne { font-family:'Syne',sans-serif; }
.mono { font-family:'JetBrains Mono',monospace; }

/* Layout */
.wrap { max-width:1140px; margin:0 auto; width:100%; padding:0 24px; }

.fade { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease,transform 0.6s ease; }
.fade.in { opacity:1; transform:none; }

/* Nav */
.nav-link { cursor:pointer;color:#64748B;font-size:0.78rem;letter-spacing:0.07em;transition:color 0.2s;text-transform:uppercase;font-weight:600;font-family:'JetBrains Mono',monospace; }
.nav-link:hover,.nav-link.active { color:#00C9A7; }

/* Buttons */
.btn { display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:6px;font-family:'Syne',sans-serif;font-size:0.88rem;font-weight:700;letter-spacing:0.02em;cursor:pointer;transition:all 0.22s;text-decoration:none;border:2px solid transparent; }
.btn-p { background:#00C9A7;color:#060810;border-color:#00C9A7; }
.btn-p:hover { background:#00deba;border-color:#00deba;transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,201,167,0.35); }
.btn-o { background:transparent;color:#E2E8F0;border-color:#1E2D3D; }
.btn-o:hover { border-color:#00C9A7;color:#00C9A7; }
.btn-wa { background:#25D366;color:#fff;border-color:#25D366; }
.btn-wa:hover { background:#20bd5a;transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,211,102,0.35); }

/* Cards */
.card { background:#0C1218;border:1px solid #141E2A;border-radius:12px;transition:all 0.28s ease; }
.card:hover { border-color:#00C9A730;transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,0.45); }

/* Pill */
.pill { display:inline-block;padding:3px 10px;border-radius:4px;font-size:0.68rem;font-family:'JetBrains Mono',monospace;border:1px solid #141E2A;background:#0C1218;color:#64748B; }

/* Section label */
.slabel { font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#00C9A7;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:10px; }
.stitle { font-family:'Syne',sans-serif;font-size:2.1rem;font-weight:800;color:#E2E8F0;letter-spacing:-0.02em;line-height:1.1; }

/* Form elements */
.opt { padding:10px 14px;border-radius:6px;border:1px solid #141E2A;background:#060810;color:#64748B;cursor:pointer;transition:all 0.2s;font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:500;text-align:left;width:100%; }
.opt:hover { border-color:#00C9A740;color:#E2E8F0; }
.opt.sel { border-color:#00C9A7;color:#00C9A7;background:rgba(0,201,167,0.06); }
.run-btn { width:100%;padding:13px;border-radius:6px;background:#00C9A7;color:#060810;border:none;font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:800;cursor:pointer;transition:all 0.2s;letter-spacing:0.04em;margin-top:16px; }
.run-btn:hover { background:#00deba;transform:translateY(-1px); }

/* Contact row */
.crow { display:flex;align-items:center;justify-content:space-between;background:#0C1218;border:1px solid #141E2A;border-radius:8px;padding:16px 22px;transition:all 0.2s;cursor:pointer;text-decoration:none;color:#E2E8F0; }
.crow:hover { border-color:#00C9A7;background:rgba(0,201,167,0.03); }

/* Modal */
.mbg { position:fixed;inset:0;background:rgba(6,8,16,0.93);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(10px);animation:fi 0.2s ease; }
.mbox { background:#0C1218;border:1px solid #1E2D3D;border-radius:14px;width:100%;max-width:620px;max-height:88vh;overflow-y:auto;animation:su 0.22s ease; }
@keyframes fi { from{opacity:0} to{opacity:1} }
@keyframes su { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }

/* WhatsApp FAB */
.wafab { position:fixed;bottom:24px;right:24px;z-index:200;width:54px;height:54px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.45);cursor:pointer;transition:all 0.22s;text-decoration:none; }
.wafab:hover { transform:scale(1.12);box-shadow:0 8px 32px rgba(37,211,102,0.55); }

/* Ticker */
.tickwrap { overflow:hidden;white-space:nowrap;border-top:1px solid #141E2A;border-bottom:1px solid #141E2A;padding:12px 0;background:#0C1218; }
.tick { display:inline-block;animation:tick 28s linear infinite; }
@keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* Grid patterns */
.gridpat::before { content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(0,201,167,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,0.035) 1px,transparent 1px);background-size:52px 52px; }

/* Page transitions */
.page-enter { animation:pe 0.35s ease; }
@keyframes pe { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

/* Stat box */
.sbox { background:#0C1218;border:1px solid #141E2A;border-radius:10px;padding:22px 14px;text-align:center;transition:border-color 0.3s; }
.sbox:hover { border-color:#00C9A730; }

/* Mobile menu */
.mobmenu { position:fixed;inset:0;background:rgba(6,8,16,0.98);z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;backdrop-filter:blur(20px);animation:fi 0.2s ease; }

@media(max-width:900px) {
  .stitle { font-size:1.65rem!important; }
  .hero-grid,.svc-grid { grid-template-columns:1fr!important; }
  .proj-grid { grid-template-columns:1fr!important; }
  .team-grid { grid-template-columns:repeat(2,1fr)!important; }
  .proc-grid { grid-template-columns:1fr!important; }
  .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
  .nav-d { display:none!important; }
  .mob-btn { display:flex!important; }
  .hero-btns { flex-direction:column!important; }
  .testi-grid { grid-template-columns:1fr!important; }
  .est-type-grid { grid-template-columns:repeat(2,1fr)!important; }
}
@media(min-width:901px) { .mob-btn { display:none!important; } }
`;

// ─── SUBPAGE: SERVICES ───────────────────────────────────────────────────────
function ServicesPage({ goContact }) {
  const [active, setActive] = useState(null);
  const [ref, vis] = useInView(0.05);
  return (
    <div className="page-enter" style={{ padding:"100px 0 80px", position:"relative", zIndex:1 }}>
      <div className="wrap">
        <div ref={ref} className={`fade${vis?" in":""}`} style={{ textAlign:"center", marginBottom:60 }}>
          <div className="slabel">// what we offer</div>
          <h1 className="syne stitle" style={{ fontSize:"2.6rem", marginBottom:16 }}>Full-Service Digital Agency</h1>
          <p style={{ color:"#64748B", maxWidth:520, margin:"0 auto", fontSize:"0.92rem", lineHeight:1.8 }}>
            From wireframe to deployment — web, mobile, delivery apps, social media, backend APIs, and UI/UX design. One team, everything covered.
          </p>
        </div>

        <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {SERVICES.map(s => (
            <div key={s.id} className="card" style={{ padding:28, cursor:"pointer", position:"relative", overflow:"hidden" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"45"; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="#141E2A"; e.currentTarget.style.transform="translateY(0)"; }}
              onClick={()=>setActive(s)}
            >
              {s.featured && (
                <div style={{ position:"absolute", top:14, right:14, background:`${s.color}20`, border:`1px solid ${s.color}40`, borderRadius:3, padding:"2px 8px", fontSize:"0.6rem", fontFamily:"'JetBrains Mono',monospace", color:s.color, letterSpacing:"0.1em", textTransform:"uppercase" }}>Popular</div>
              )}
              <div style={{ width:50, height:50, borderRadius:10, background:`${s.color}15`, border:`1px solid ${s.color}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
                <Ico d={I[s.icon]} size={23} color={s.color}/>
              </div>
              <h3 className="syne" style={{ fontWeight:700, fontSize:"1rem", color:"#E2E8F0", marginBottom:10 }}>{s.title}</h3>
              <p style={{ fontSize:"0.835rem", color:"#64748B", lineHeight:1.75, marginBottom:18 }}>{s.short}</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:6 }}>
                {s.features.slice(0,3).map(f=>(
                  <li key={f} style={{ display:"flex", gap:8, fontSize:"0.78rem", color:"#94A3B8", alignItems:"flex-start" }}>
                    <span style={{ marginTop:2, flexShrink:0 }}><Ico d={I.check} size={12} color={s.color}/></span>{f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color:s.color, fontWeight:600 }}>Starting {s.from}</span>
                <span style={{ fontSize:"0.72rem", color:"#475569", fontFamily:"'JetBrains Mono',monospace" }}>Details →</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{ marginTop:60, background:"linear-gradient(135deg,#0C1218,#0D1A13)", border:"1px solid rgba(0,201,167,0.18)", borderRadius:14, padding:"40px 36px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, flexWrap:"wrap" }}>
          <div>
            <h3 className="syne" style={{ fontWeight:800, fontSize:"1.4rem", marginBottom:8 }}>Not sure which service you need?</h3>
            <p style={{ color:"#64748B", fontSize:"0.88rem" }}>Tell us about your idea — we'll suggest the right approach and give a free estimate.</p>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa"><Ico d={I.wa} size={17} color="#fff"/>WhatsApp Us</a>
            <button className="btn btn-o" onClick={goContact}>Get Free Estimate</button>
          </div>
        </div>
      </div>

      {/* SERVICE MODAL */}
      {active && (
        <div className="mbg" onClick={()=>setActive(null)}>
          <div className="mbox" onClick={e=>e.stopPropagation()}>
            <div style={{ padding:"22px 26px", borderBottom:"1px solid #141E2A", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:42, height:42, borderRadius:9, background:`${active.color}15`, border:`1px solid ${active.color}30`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ico d={I[active.icon]} size={20} color={active.color}/>
                </div>
                <div>
                  <h3 className="syne" style={{ fontWeight:800, fontSize:"1.05rem", color:"#E2E8F0" }}>{active.title}</h3>
                  <div className="mono" style={{ fontSize:"0.68rem", color:active.color, marginTop:2 }}>Starting {active.from}</div>
                </div>
              </div>
              <button onClick={()=>setActive(null)} style={{ background:"none", border:"none", color:"#64748B", cursor:"pointer" }}><Ico d={I.x} size={20}/></button>
            </div>
            <div style={{ padding:26 }}>
              <p style={{ fontSize:"0.885rem", color:"#94A3B8", lineHeight:1.85, marginBottom:22 }}>{active.desc}</p>
              <div className="mono" style={{ fontSize:"0.62rem", color:active.color, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>// What's included</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
                {active.features.map(f=>(
                  <li key={f} style={{ display:"flex", gap:10, fontSize:"0.85rem", color:"#94A3B8", alignItems:"flex-start" }}>
                    <span style={{ marginTop:2, flexShrink:0 }}><Ico d={I.check} size={14} color={active.color}/></span>{f}
                  </li>
                ))}
              </ul>
              <div className="mono" style={{ fontSize:"0.62rem", color:"#64748B", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:12 }}>// Tech Stack</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:24 }}>
                {active.tech.map(t=><span key={t} className="pill" style={{ color:"#94A3B8" }}>{t}</span>)}
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ fontSize:"0.84rem" }}><Ico d={I.wa} size={15} color="#fff"/>Discuss on WhatsApp</a>
                <button className="btn btn-o" style={{ fontSize:"0.84rem" }} onClick={()=>{ setActive(null); goContact(); }}>Get a Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUBPAGE: PROJECTS ───────────────────────────────────────────────────────
function ProjectsPage({ goContact }) {
  const [active, setActive] = useState(null);
  const [ref, vis] = useInView(0.05);
  return (
    <div className="page-enter" style={{ padding:"100px 0 80px", position:"relative", zIndex:1 }}>
      <div className="wrap">
        <div ref={ref} className={`fade${vis?" in":""}`} style={{ textAlign:"center", marginBottom:56 }}>
          <div className="slabel">// our work</div>
          <h1 className="syne stitle" style={{ fontSize:"2.6rem", marginBottom:16 }}>Projects We've Shipped</h1>
          <p style={{ color:"#64748B", maxWidth:500, margin:"0 auto", fontSize:"0.92rem", lineHeight:1.8 }}>
            Production-grade systems across FinTech, HealthTech, FoodTech, and AstroTech. Click any card for full details.
          </p>
        </div>

        <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
          {PROJECTS.map(p=>(
            <div key={p.name} className="card" style={{ padding:28, cursor:"pointer", position:"relative", overflow:"hidden" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color+"40"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 48px rgba(0,0,0,0.5)`; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="#141E2A"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              onClick={()=>setActive(p)}
            >
              <div style={{ position:"absolute", top:0, right:0, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle,${p.color}07,transparent 70%)`, pointerEvents:"none" }}/>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:11, height:11, borderRadius:"50%", background:p.color, boxShadow:`0 0 10px ${p.color}` }}/>
                  <h3 className="syne" style={{ fontWeight:700, fontSize:"1.05rem", color:"#E2E8F0" }}>{p.name}</h3>
                </div>
                <span className="mono" style={{ fontSize:"0.62rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.08em" }}>View →</span>
              </div>
              <div className="mono" style={{ fontSize:"0.65rem", color:p.color, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>{p.tag}</div>
              <p style={{ fontSize:"0.855rem", color:"#94A3B8", lineHeight:1.75, marginBottom:18 }}>{p.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                {p.metrics.map(m=>(
                  <span key={m} className="mono" style={{ padding:"3px 10px", borderRadius:4, fontSize:"0.62rem", background:`${p.color}12`, border:`1px solid ${p.color}28`, color:p.color }}>{m}</span>
                ))}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {p.stack.map(t=><span key={t} className="pill">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:60, textAlign:"center" }}>
          <p style={{ color:"#64748B", marginBottom:20, fontSize:"0.9rem" }}>Want to build something like this?</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa"><Ico d={I.wa} size={17} color="#fff"/>Chat on WhatsApp</a>
            <button className="btn btn-o" onClick={goContact}>Get a Free Quote</button>
          </div>
        </div>
      </div>

      {active && (
        <div className="mbg" onClick={()=>setActive(null)}>
          <div className="mbox" onClick={e=>e.stopPropagation()}>
            <div style={{ padding:"22px 26px", borderBottom:"1px solid #141E2A", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:11, height:11, borderRadius:"50%", background:active.color, boxShadow:`0 0 10px ${active.color}` }}/>
                <h3 className="syne" style={{ fontWeight:800, fontSize:"1.05rem", color:"#E2E8F0" }}>{active.name}</h3>
                <span className="mono" style={{ fontSize:"0.65rem", color:active.color, textTransform:"uppercase", letterSpacing:"0.08em", marginLeft:4 }}>{active.tag}</span>
              </div>
              <button onClick={()=>setActive(null)} style={{ background:"none", border:"none", color:"#64748B", cursor:"pointer" }}><Ico d={I.x} size={20}/></button>
            </div>
            <div style={{ padding:26 }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:20 }}>
                {active.metrics.map(m=><span key={m} className="mono" style={{ padding:"4px 12px", borderRadius:4, fontSize:"0.65rem", background:`${active.color}12`, border:`1px solid ${active.color}28`, color:active.color }}>{m}</span>)}
              </div>
              <p style={{ fontSize:"0.88rem", color:"#94A3B8", lineHeight:1.85, marginBottom:22 }}>{active.longDesc}</p>
              <div className="mono" style={{ fontSize:"0.62rem", color:"#64748B", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:12 }}>// Tech Stack</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:24 }}>
                {active.stack.map(t=><span key={t} className="pill" style={{ color:"#94A3B8" }}>{t}</span>)}
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {active.link && <a href={active.link} target="_blank" rel="noreferrer" className="btn btn-p" style={{ fontSize:"0.84rem" }}><Ico d={I.ext} size={14} color="#060810"/>View Live</a>}
                <button className="btn btn-o" style={{ fontSize:"0.84rem" }} onClick={()=>{ setActive(null); goContact(); }}>Build Something Similar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUBPAGE: TEAM ───────────────────────────────────────────────────────────
function TeamPage() {
  const [ref, vis] = useInView(0.05);
  return (
    <div className="page-enter" style={{ padding:"100px 0 80px", position:"relative", zIndex:1 }}>
      <div className="wrap">
        <div ref={ref} className={`fade${vis?" in":""}`} style={{ textAlign:"center", marginBottom:56 }}>
          <div className="slabel">// our team</div>
          <h1 className="syne stitle" style={{ fontSize:"2.6rem", marginBottom:16 }}>The People Behind the Code</h1>
          <p style={{ color:"#64748B", maxWidth:480, margin:"0 auto", fontSize:"0.92rem", lineHeight:1.8 }}>
            A tight-knit crew of specialists — not generalists. Every member owns their domain and delivers.
          </p>
        </div>

        <div className="team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginBottom:60 }}>
          {TEAM.map((t,i)=>(
            <div key={i} className="card" style={{ padding:26, textAlign:"center" }}>
              <div style={{ width:68, height:68, borderRadius:"50%", background:`${t.color}15`, border:`2px solid ${t.color}35`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                <span className="syne" style={{ fontWeight:800, fontSize:"1.2rem", color:t.color }}>{t.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</span>
              </div>
              <h3 className="syne" style={{ fontWeight:700, fontSize:"0.95rem", color:"#E2E8F0", marginBottom:4 }}>{t.name}</h3>
              <div className="mono" style={{ fontSize:"0.68rem", color:t.color, fontWeight:500, marginBottom:6, letterSpacing:"0.04em" }}>{t.role}</div>
              <div style={{ fontSize:"0.7rem", color:"#475569", marginBottom:16, fontFamily:"'JetBrains Mono',monospace" }}>{t.exp} experience</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center" }}>
                {t.skills.map(s=>(
                  <span key={s} style={{ padding:"2px 8px", borderRadius:3, fontSize:"0.62rem", background:`${t.color}10`, border:`1px solid ${t.color}22`, color:t.color, fontFamily:"'JetBrains Mono',monospace" }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Why choose us */}
        <div style={{ background:"#0C1218", border:"1px solid #141E2A", borderRadius:14, padding:"40px 36px" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div className="slabel">// why work with us</div>
            <h2 className="syne" style={{ fontWeight:800, fontSize:"1.6rem", color:"#E2E8F0" }}>What Sets Us Apart</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="svc-grid">
            {[
              { icon:"zap",    color:T,         title:"Fast Delivery",       desc:"We move fast without breaking things. MVPs in 2–4 weeks, not months." },
              { icon:"shield", color:"#7C5CBF", title:"Clean, Scalable Code",desc:"Production-grade architecture that grows with your business." },
              { icon:"users",  color:"#FF6B9D", title:"Dedicated Team",      desc:"Not a freelancer — a full team of Backend, Frontend, Design, and SMM." },
              { icon:"rupee",  color:"#E8640A", title:"Milestone Payments",  desc:"Pay step by step as we deliver. No full upfront, 100% ownership." },
              { icon:"clock",  color:"#FFB800", title:"On-time, Always",     desc:"We've never missed a delivery deadline. Transparency is our policy." },
              { icon:"globe",  color:"#2196F3", title:"End-to-End Service",  desc:"From design to deployment to App Store — one team does it all." },
            ].map(f=>(
              <div key={f.title} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:42, height:42, borderRadius:9, background:`${f.color}12`, border:`1px solid ${f.color}25`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Ico d={I[f.icon]} size={19} color={f.color}/>
                </div>
                <div>
                  <h4 className="syne" style={{ fontWeight:700, fontSize:"0.9rem", color:"#E2E8F0", marginBottom:5 }}>{f.title}</h4>
                  <p style={{ fontSize:"0.8rem", color:"#64748B", lineHeight:1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUBPAGE: CONTACT ────────────────────────────────────────────────────────
function ContactPage() {
  const [ref, vis] = useInView(0.05);
  const [estForm, setEstForm] = useState({ type:"web", complexity:"medium" });
  const [estResult, setEstResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => { navigator.clipboard.writeText("gorishanker.devloper@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const runEst = () => {
    const b = EST_TYPES.find(e=>e.v===estForm.type);
    const m = CMPLX[estForm.complexity];
    setEstResult({ label:b.l, min:b.min*m, max:b.max*m, wMin:b.w[0], wMax:b.w[1], monthly:b.monthly||false });
  };

  return (
    <div className="page-enter" style={{ padding:"100px 0 80px", position:"relative", zIndex:1 }}>
      <div className="wrap">
        <div ref={ref} className={`fade${vis?" in":""}`}>
          {/* HIRE BANNER */}
          <div style={{ background:"linear-gradient(135deg,#0C1218 0%,#0D1A13 100%)", border:"1px solid rgba(0,201,167,0.2)", borderRadius:16, padding:"56px 40px", textAlign:"center", position:"relative", overflow:"hidden", marginBottom:60 }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%,rgba(0,201,167,0.09),transparent 65%)", pointerEvents:"none" }}/>
            <div className="slabel" style={{ textAlign:"center" }}>// open to new projects</div>
            <h1 className="syne" style={{ fontSize:"clamp(1.9rem,4vw,3rem)", fontWeight:800, marginBottom:14, letterSpacing:"-0.02em" }}>
              Let's Build Your<br/><span style={{ color:T }}>Next Product Together</span>
            </h1>
            <p style={{ color:"#94A3B8", lineHeight:1.85, maxWidth:520, margin:"0 auto 36px", fontSize:"0.92rem" }}>
              We're a full-stack team from Jaipur — web, mobile apps, delivery platforms, backend APIs, social media. You bring the idea, we handle everything else.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, maxWidth:600, margin:"0 auto 36px" }} className="stats-grid">
              {[{icon:"zap",t:"Fast Delivery",d:"MVPs in 2–4 weeks"},{icon:"shield",t:"Clean Code",d:"Production-grade"},{icon:"users",t:"Full Team",d:"Not just freelance"}].map(f=>(
                <div key={f.t} style={{ background:"rgba(0,201,167,0.05)", border:"1px solid rgba(0,201,167,0.12)", borderRadius:10, padding:"18px 14px", textAlign:"center" }}>
                  <div style={{ width:38, height:38, borderRadius:9, background:"rgba(0,201,167,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                    <Ico d={I[f.icon]} size={18} color={T}/>
                  </div>
                  <div className="syne" style={{ fontWeight:700, fontSize:"0.85rem", color:"#E2E8F0", marginBottom:3 }}>{f.t}</div>
                  <div style={{ fontSize:"0.73rem", color:"#64748B" }}>{f.d}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa" style={{ fontSize:"0.92rem" }}><Ico d={I.wa} size={18} color="#fff"/>Chat on WhatsApp</a>
              <a href="mailto:gorishanker.devloper@gmail.com" className="btn btn-o" style={{ fontSize:"0.92rem" }}><Ico d={I.mail} size={16}/>Send Email</a>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }} className="svc-grid">
            {/* ESTIMATOR */}
            <div style={{ background:"#0C1218", border:"1px solid #141E2A", borderRadius:12, overflow:"hidden" }}>
              <div style={{ padding:"18px 22px", borderBottom:"1px solid #141E2A", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:"rgba(0,201,167,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ico d={I.rupee} size={18} color={T}/>
                </div>
                <div>
                  <div className="syne" style={{ fontWeight:700, fontSize:"0.92rem", color:"#E2E8F0" }}>Project Cost Estimator</div>
                  <div style={{ fontSize:"0.72rem", color:"#64748B", marginTop:1 }}>Get a rough ballpark before talking to us</div>
                </div>
              </div>
              <div style={{ padding:22 }}>
                <div style={{ marginBottom:18 }}>
                  <div className="mono" style={{ fontSize:"0.62rem", color:"#64748B", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10 }}>Project Type</div>
                  <div className="est-type-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:7 }}>
                    {EST_TYPES.map(e=>(
                      <button key={e.v} className={`opt${estForm.type===e.v?" sel":""}`} onClick={()=>setEstForm(f=>({...f,type:e.v}))}>{e.l}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom:4 }}>
                  <div className="mono" style={{ fontSize:"0.62rem", color:"#64748B", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10 }}>Complexity</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
                    {[{v:"simple",l:"Simple",s:"Basic CRUD"},{v:"medium",l:"Medium",s:"Integrations"},{v:"complex",l:"Complex",s:"Custom Logic"}].map(o=>(
                      <button key={o.v} className={`opt${estForm.complexity===o.v?" sel":""}`} onClick={()=>setEstForm(f=>({...f,complexity:o.v}))} style={{ whiteSpace:"pre-line", lineHeight:1.5 }}>{o.l+"\n"+o.s}</button>
                    ))}
                  </div>
                </div>
                <button className="run-btn" onClick={runEst}>→ Calculate Estimate</button>
                {estResult && (
                  <div style={{ marginTop:18, background:"#060810", border:"1px solid rgba(0,201,167,0.18)", borderRadius:8, padding:20 }}>
                    <div className="mono" style={{ fontSize:"0.6rem", color:T, letterSpacing:"0.14em", marginBottom:14 }}>// {estResult.label.toUpperCase()}</div>
                    {[
                      { l:"Cost Range", v:`${fmt(estResult.min)} – ${fmt(estResult.max)}` },
                      { l:"Timeline",   v:`${estResult.wMin}–${estResult.wMax} ${estResult.monthly?"months/mo":"weeks"}` },
                      { l:"Payment",    v:"Milestone-based" },
                      { l:"Ownership",  v:"100% yours" },
                    ].map(r=>(
                      <div key={r.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #141E2A" }}>
                        <span className="mono" style={{ fontSize:"0.68rem", color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>{r.l}</span>
                        <span className="syne" style={{ fontWeight:700, fontSize:"0.92rem", color:T }}>{r.v}</span>
                      </div>
                    ))}
                    <p style={{ marginTop:14, fontSize:"0.75rem", color:"#64748B", lineHeight:1.7, padding:"10px 12px", background:"rgba(0,201,167,0.04)", borderRadius:6, border:"1px solid rgba(0,201,167,0.1)" }}>
                      ⚡ Rough estimate only. <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color:T, fontWeight:700, textDecoration:"none" }}>WhatsApp us for exact quote →</a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CONTACT LINKS */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div className="mono" style={{ fontSize:"0.62rem", color:T, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:6 }}>// reach us on</div>
              {[
                { icon:"wa",   label:"WhatsApp",           val:"+91 76898 64686",               href:WA_LINK,                                                    tag:"Chat Now" },
                { icon:"mail", label:"Email",              val:"gorishanker.devloper@gmail.com", href:null,                                                       tag:copied?"Copied ✓":"Copy", action:copyEmail },
                { icon:"phone",label:"Phone",              val:"+91 76898 64686",               href:"tel:+917689864686",                                         tag:"Call" },
                { icon:"li",   label:"LinkedIn",           val:"linkedin.com/in/gorishanker-sharma", href:"https://www.linkedin.com/in/gorishanker-sharma",       tag:"→" },
                { icon:"gh",   label:"GitHub",             val:"github.com/chetanhaldinya",     href:"https://github.com/chetanhaldinya",                        tag:"→" },
              ].map(c=>{
                const inner = (
                  <>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ color:T, display:"flex", width:20, alignItems:"center" }}>
                        <Ico d={Array.isArray(I[c.icon])?I[c.icon][0]:I[c.icon]} size={16} color={T}/>
                      </span>
                      <div>
                        <div className="mono" style={{ fontSize:"0.62rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:2 }}>{c.label}</div>
                        <div style={{ fontSize:"0.82rem", color:"#E2E8F0" }}>{c.val}</div>
                      </div>
                    </div>
                    <span className="mono" style={{ fontSize:"0.65rem", color:c.tag==="Copied ✓"?T:"#475569", textTransform:"uppercase", letterSpacing:"0.08em" }}>{c.tag}</span>
                  </>
                );
                return c.href
                  ? <a key={c.label} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="crow">{inner}</a>
                  : <div key={c.label} className="crow" onClick={c.action}>{inner}</div>;
              })}

              {/* Process quick summary */}
              <div style={{ background:"#0C1218", border:"1px solid #141E2A", borderRadius:10, padding:20, marginTop:6 }}>
                <div className="mono" style={{ fontSize:"0.62rem", color:T, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>// how we work</div>
                {PROCESS.map((p,i)=>(
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom: i<PROCESS.length-1?12:0 }}>
                    <div className="mono" style={{ fontSize:"0.65rem", color:T, fontWeight:600, width:20, flexShrink:0, paddingTop:2 }}>{p.n}</div>
                    <div>
                      <div className="syne" style={{ fontWeight:600, fontSize:"0.83rem", color:"#E2E8F0", marginBottom:2 }}>{p.title}</div>
                      <div style={{ fontSize:"0.76rem", color:"#64748B", lineHeight:1.6 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ goPage }) {
  const [heroRef, heroVis] = useInView(0.05);
  const [svcRef,  svcVis]  = useInView();
  const [projRef, projVis] = useInView();
  const [testiRef,testiVis]= useInView();

  const TESTI = [
    { name:"Rahul M.", company:"E-commerce Startup, Delhi",    text:"Team delivered our backend + admin panel in 3 weeks. Code quality is excellent, documentation thorough. Highly recommend.", rating:5, c:T },
    { name:"Priya S.", company:"HealthTech Platform, Bangalore",text:"Needed a complex multi-role healthcare system. Gorishanker's team nailed the RBAC and API architecture. On time, clean code.", rating:5, c:"#7C5CBF" },
    { name:"Arjun K.", company:"Food Delivery App, Jaipur",    text:"Our food ordering backend was built perfectly. Payment integration, real-time tracking — everything works flawlessly.", rating:5, c:"#E8640A" },
  ];

  return (
    <div style={{ position:"relative", zIndex:1 }}>
      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"110px 0 70px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"15%", right:"5%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,201,167,0.05),transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"10%", left:"-5%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,92,191,0.05),transparent 70%)", pointerEvents:"none" }}/>
        <div className="wrap">
          <div ref={heroRef} className={`fade${heroVis?" in":""}`}>
            <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,201,167,0.08)", border:"1px solid rgba(0,201,167,0.22)", borderRadius:20, padding:"5px 14px", marginBottom:22 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:T, display:"inline-block", animation:"pulse 2s infinite" }}/>
                  <span className="mono" style={{ fontSize:"0.68rem", color:T, letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600 }}>Available · Jaipur, India</span>
                </div>
                <h1 className="syne" style={{ fontSize:"clamp(2.3rem,4.8vw,3.8rem)", fontWeight:800, lineHeight:1.05, marginBottom:18, letterSpacing:"-0.02em" }}>
                  We Build<br/><span style={{ color:T }}>Production-Grade</span><br/>Digital Products
                </h1>
                <p style={{ fontSize:"0.95rem", color:"#94A3B8", lineHeight:1.88, maxWidth:460, marginBottom:28 }}>
                  A full-service dev team from Jaipur — <strong style={{ color:"#E2E8F0" }}>Web Apps, Mobile Apps, Delivery Platforms, Backend APIs, UI/UX Design, and Social Media</strong>. One team, everything covered.
                </p>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:30 }} className="hero-btns">
                  <button className="btn btn-p" onClick={()=>goPage("Contact")}><Ico d={I.arrow} size={16} color="#060810"/>Start a Project</button>
                  <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa"><Ico d={I.wa} size={16} color="#fff"/>WhatsApp Us</a>
                  <button className="btn btn-o" onClick={()=>goPage("Projects")}>View Our Work</button>
                </div>
                <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                  {[{l:"LinkedIn",h:"https://www.linkedin.com/in/gorishanker-sharma",i:I.li},{l:"GitHub",h:"https://github.com/chetanhaldinya",i:I.gh}].map(s=>(
                    <a key={s.l} href={s.h} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:6, color:"#475569", textDecoration:"none", fontSize:"0.75rem", fontFamily:"'JetBrains Mono',monospace", fontWeight:500, transition:"color 0.2s", textTransform:"uppercase", letterSpacing:"0.06em" }}
                      onMouseEnter={e=>e.currentTarget.style.color=T} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>
                      <Ico d={Array.isArray(s.i)?s.i[0]:s.i} size={13}/>{s.l} ↗
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
                  {STATS.map(s=>(
                    <div key={s.n} className="sbox">
                      <div className="syne" style={{ fontSize:"2.1rem", fontWeight:800, color:T, lineHeight:1 }}>{s.n}</div>
                      <div className="mono" style={{ fontSize:"0.68rem", color:"#64748B", marginTop:8, letterSpacing:"0.04em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:"#0C1218", border:"1px solid #141E2A", borderRadius:12, padding:"20px 22px" }}>
                  <div className="mono" style={{ fontSize:"0.6rem", color:T, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:14 }}>// our full tech stack</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {TECHS.map(t=><span key={t} className="pill" style={{ color:"#94A3B8" }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ background:"linear-gradient(135deg,rgba(0,201,167,0.07),rgba(124,92,191,0.07))", border:"1px solid rgba(0,201,167,0.14)", borderRadius:10, padding:"16px 20px", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:42, height:42, borderRadius:9, background:T, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Ico d={I.zap} size={20} color="#060810"/>
                  </div>
                  <div>
                    <div className="syne" style={{ fontWeight:700, fontSize:"0.88rem", color:"#E2E8F0" }}>Milestone-based payments</div>
                    <div style={{ fontSize:"0.76rem", color:"#64748B", marginTop:3 }}>Pay as we deliver. No full upfront. 100% code ownership.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="tickwrap">
        <span className="tick mono" style={{ fontSize:"0.7rem", color:"#475569", letterSpacing:"0.1em" }}>
          {Array(2).fill(["WEB DEVELOPMENT","MOBILE APPS","DELIVERY PLATFORMS","BACKEND APIS","UI/UX DESIGN","SOCIAL MEDIA","SEO","FLUTTER","REACT","FASTAPI","LARAVEL","NESTJS","AWS","STRIPE","PAYMENT GATEWAY"]).flat().map((t,i)=>(
            <span key={i} style={{ marginRight:44 }}><span style={{ color:T, marginRight:14 }}>◆</span>{t}</span>
          ))}
        </span>
      </div>

      {/* SERVICES PREVIEW */}
      <section style={{ padding:"90px 0", borderTop:"1px solid #141E2A" }}>
        <div className="wrap">
          <div ref={svcRef} className={`fade${svcVis?" in":""}`}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:50, flexWrap:"wrap", gap:16 }}>
              <div>
                <div className="slabel">// services</div>
                <h2 className="syne stitle">What We Build</h2>
              </div>
              <button className="btn btn-o" style={{ fontSize:"0.82rem" }} onClick={()=>goPage("Services")}>All Services →</button>
            </div>
            <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
              {SERVICES.map(s=>(
                <div key={s.id} className="card" style={{ padding:26, cursor:"pointer" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"40"; e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="#141E2A"; e.currentTarget.style.transform="translateY(0)"; }}
                  onClick={()=>goPage("Services")}
                >
                  <div style={{ width:46, height:46, borderRadius:10, background:`${s.color}14`, border:`1px solid ${s.color}28`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                    <Ico d={I[s.icon]} size={21} color={s.color}/>
                  </div>
                  <h3 className="syne" style={{ fontWeight:700, fontSize:"0.95rem", color:"#E2E8F0", marginBottom:8 }}>{s.title}</h3>
                  <p style={{ fontSize:"0.82rem", color:"#64748B", lineHeight:1.7, marginBottom:14 }}>{s.short}</p>
                  <div className="mono" style={{ fontSize:"0.68rem", color:s.color, fontWeight:600 }}>Starting {s.from} →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section style={{ padding:"90px 0", borderTop:"1px solid #141E2A", background:"#0A0D13" }}>
        <div className="wrap">
          <div ref={projRef} className={`fade${projVis?" in":""}`}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:50, flexWrap:"wrap", gap:16 }}>
              <div>
                <div className="slabel">// recent work</div>
                <h2 className="syne stitle">Projects Shipped</h2>
              </div>
              <button className="btn btn-o" style={{ fontSize:"0.82rem" }} onClick={()=>goPage("Projects")}>All Projects →</button>
            </div>
            <div className="proj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
              {PROJECTS.map(p=>(
                <div key={p.name} className="card" style={{ padding:26, cursor:"pointer" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color+"40"; e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="#141E2A"; e.currentTarget.style.transform="translateY(0)"; }}
                  onClick={()=>goPage("Projects")}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:p.color, boxShadow:`0 0 8px ${p.color}` }}/>
                    <span className="syne" style={{ fontWeight:700, fontSize:"1rem", color:"#E2E8F0" }}>{p.name}</span>
                    <span className="mono" style={{ fontSize:"0.6rem", color:p.color, marginLeft:4, textTransform:"uppercase", letterSpacing:"0.1em" }}>{p.tag}</span>
                  </div>
                  <p style={{ fontSize:"0.845rem", color:"#94A3B8", lineHeight:1.75, marginBottom:14 }}>{p.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {p.stack.slice(0,5).map(t=><span key={t} className="pill">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"90px 0", borderTop:"1px solid #141E2A" }}>
        <div className="wrap">
          <div ref={testiRef} className={`fade${testiVis?" in":""}`}>
            <div style={{ textAlign:"center", marginBottom:50 }}>
              <div className="slabel">// client words</div>
              <h2 className="syne stitle">What Clients Say</h2>
            </div>
            <div className="testi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
              {TESTI.map((t,i)=>(
                <div key={i} className="card" style={{ padding:26 }}>
                  <div style={{ marginBottom:12 }}>
                    {Array(t.rating).fill(0).map((_,j)=><span key={j} style={{ color:"#FFB800", fontSize:"0.9rem" }}>★</span>)}
                  </div>
                  <p style={{ fontSize:"0.855rem", color:"#94A3B8", lineHeight:1.82, marginBottom:20, fontStyle:"italic" }}>"{t.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:`${t.c}15`, border:`1px solid ${t.c}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span className="syne" style={{ fontWeight:800, color:t.c, fontSize:"0.85rem" }}>{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="syne" style={{ fontWeight:600, fontSize:"0.85rem", color:"#E2E8F0" }}>{t.name}</div>
                      <div className="mono" style={{ fontSize:"0.68rem", color:"#475569" }}>{t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding:"80px 0 100px", borderTop:"1px solid #141E2A" }}>
        <div className="wrap" style={{ textAlign:"center" }}>
          <div className="slabel" style={{ textAlign:"center" }}>// let's build together</div>
          <h2 className="syne" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:800, marginBottom:16, letterSpacing:"-0.02em" }}>
            Have an Idea? Let's Make It <span style={{ color:T }}>Real.</span>
          </h2>
          <p style={{ color:"#64748B", marginBottom:32, fontSize:"0.9rem", maxWidth:460, margin:"0 auto 32px" }}>Free 30-min consultation call. No commitment.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa"><Ico d={I.wa} size={18} color="#fff"/>WhatsApp Now</a>
            <button className="btn btn-p" onClick={()=>goPage("Contact")}><Ico d={I.arrow} size={16} color="#060810"/>Get Free Quote</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function GorishankerPortfolio() {
  const [page,    setPage]    = useState("Home");
  const [scrolled,setScrolled]= useState(false);
  const [menuOpen,setMenuOpen]= useState(false);

  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>50); window.addEventListener("scroll",fn,{passive:true}); return()=>window.removeEventListener("scroll",fn); },[]);

  const goPage = useCallback((p)=>{ setPage(p); setMenuOpen(false); window.scrollTo({top:0,behavior:"smooth"}); },[]);

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:"#060810", color:"#E2E8F0", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{CSS}</style>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* Animated code rain bg */}
      <CodeRainCanvas/>

      {/* WhatsApp FAB */}
      <a href={WA_LINK} className="wafab" target="_blank" rel="noreferrer" title="Chat on WhatsApp">
        <Ico d={I.wa} size={26} color="#fff"/>
      </a>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobmenu">
          <button onClick={()=>setMenuOpen(false)} style={{ position:"absolute", top:20, right:20, background:"none", border:"none", color:"#64748B", cursor:"pointer" }}><Ico d={I.x} size={26}/></button>
          {PAGES.map(p=>(
            <button key={p} className={`nav-link${page===p?" active":""}`} style={{ fontSize:"1.1rem", background:"none", border:"none", cursor:"pointer" }} onClick={()=>goPage(p)}>{p}</button>
          ))}
          <button className="btn btn-p" onClick={()=>goPage("Contact")}>Hire Us</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(6,8,16,0.97)":"rgba(6,8,16,0.55)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${scrolled?"#141E2A":"transparent"}`, transition:"all 0.3s" }}>
        <div className="wrap" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <button onClick={()=>goPage("Home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer" }}>
            <div style={{ width:32, height:32, borderRadius:8, background:T, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span className="syne" style={{ fontWeight:800, color:"#060810", fontSize:"0.82rem" }}>GS</span>
            </div>
            <span className="syne" style={{ fontWeight:800, fontSize:"0.93rem", color:"#E2E8F0", letterSpacing:"-0.01em" }}>
              Gorishanker<span style={{ color:T }}>.dev</span>
            </span>
          </button>
          <div className="nav-d" style={{ display:"flex", gap:28 }}>
            {PAGES.map(p=>(
              <span key={p} className={`nav-link${page===p?" active":""}`} onClick={()=>goPage(p)}>{p}</span>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button className="btn btn-p nav-d" style={{ padding:"8px 18px", fontSize:"0.78rem" }} onClick={()=>goPage("Contact")}>Hire Us</button>
            <button className="mob-btn" onClick={()=>setMenuOpen(true)} style={{ background:"none", border:"none", color:"#E2E8F0", cursor:"pointer", display:"none" }}><Ico d={I.menu} size={23}/></button>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {page==="Home"     && <HomePage    goPage={goPage}/>}
      {page==="Services" && <ServicesPage goContact={()=>goPage("Contact")}/>}
      {page==="Projects" && <ProjectsPage goContact={()=>goPage("Contact")}/>}
      {page==="Team"     && <TeamPage/>}
      {page==="Contact"  && <ContactPage/>}

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #141E2A", padding:"20px 5%", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10, position:"relative", zIndex:1 }}>
        <span className="mono" style={{ fontSize:"0.68rem", color:"#475569" }}>© 2026 Gorishanker Sharma · Jaipur, India</span>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {["Web Dev","Mobile Apps","Delivery Apps","APIs","Social Media","UI/UX"].map(s=>(
            <span key={s} className="mono" style={{ fontSize:"0.65rem", color:"#334155" }}>{s}</span>
          ))}
        </div>
        <span className="mono" style={{ fontSize:"0.65rem", color:"#334155" }}>Built with React + Vite</span>
      </footer>
    </div>
  );
}
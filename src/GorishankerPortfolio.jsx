import React from "react";

// Single-file React + Tailwind portfolio component
// Usage: place this file in a React app (Create React App / Vite / Next) and ensure Tailwind CSS is configured.

export default function GorishankerPortfolio() {
  const data = {
    name: "Gorishanker Sharma",
    title: "Backend Developer & Team Lead",
    location: "Jaipur, Rajasthan, India",
    email: "gorishanker.softeng@gmail.com",
    phone: "+91 7689864686",
    linkedin: "https://www.linkedin.com/in/gorishanker-sharma",
    github: "https://github.com/chetanhaldinya",
    resume: "/GorishankerCV.pdf", // replace with actual public URL or file path
    summary:
      "Backend developer with 3.5 years experience building scalable APIs, mentoring teams, and delivering production projects. Comfortable with PHP (Laravel), Python (FastAPI), Node.js, and React.js.",
    skills: [
      "PHP", "Laravel", "Python", "FastAPI", "Node.js", "React.js",
      "MySQL", "PostgreSQL", "MongoDB", "REST APIs", "Git", "Docker", "AWS"
    ],
    projects: [
      {
        title: "Cashcry.com",
        desc: "Cashback & rewards platform. Built REST APIs and admin modules.",
        tech: "Laravel, React Native, MySQL",
        role: "Team Leader, API Developer",
        link: "https://cashcry.com"
      },
      {
        title: "Avicenna-care.com",
        desc: "Healthcare portal with patient management and telemedicine features.",
        tech: "Laravel, Flutter, MySQL",
        role: "Project Lead",
        link: "https://avicenna-care.com"
      },
      {
        title: "Staarae.com",
        desc: "Astrology platform providing real-time horoscope APIs.",
        tech: "FastAPI, PostgreSQL",
        role: "API Developer",
        link: "https://staarae.com"
      }
    ],
    education: [
      { degree: "MCA", years: "2023 - 2025", inst: "CIITM (RTU)" },
      { degree: "BCA", years: "2019 - 2022", inst: "CIITM (Rajasthan University)" }
    ],
    certs: ["Python for Machine Learning"],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{data.title} • {data.location}</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <a href={data.resume} target="_blank" className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm">Download Resume</a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-sm">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noreferrer" className="text-sm">GitHub</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <section className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{data.summary}</p>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Highlighted Projects</h3>
            <div className="mt-4 grid gap-4">
              {data.projects.map((p) => (
                <article key={p.title} className="border rounded-lg p-4 hover:shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{p.role} • {p.tech}</p>
                    </div>
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-sm text-sky-600">Live</a>
                  </div>
                  <p className="mt-3 text-gray-700 text-sm">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Experience & Impact</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Backend Developer / Team Lead — Deorwine Infotech (July 2022 - Present)</li>
              <li>Led a team to deliver multiple production-grade web & mobile backend systems</li>
              <li>Designed scalable REST APIs, implemented authentication, and integrated payment gateways</li>
              <li>Mentored juniors and conducted code reviews to improve code quality</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Sample Code / API Snippet</h3>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-sm">{`// Example: Simple Express route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});`}</pre>
          </div>

        </section>

        {/* Right column */}
        <aside className="bg-white p-6 rounded-2xl shadow">
          <div>
            <h3 className="text-lg font-medium">Contact</h3>
            <p className="text-sm text-gray-700 mt-2">{data.email}</p>
            <p className="text-sm text-gray-700">{data.phone}</p>
            <p className="text-sm text-gray-700">{data.location}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="text-sm px-2 py-1 bg-gray-100 rounded">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Education</h3>
            <div className="mt-2 text-sm text-gray-700">
              {data.education.map((e) => (
                <div key={e.degree} className="mb-2">
                  <div className="font-medium">{e.degree}</div>
                  <div className="text-xs text-gray-600">{e.inst} • {e.years}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Certifications</h3>
            <ul className="text-sm text-gray-700 mt-2">
              {data.certs.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Social</h3>
            <div className="flex gap-3 mt-2">
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-sm">LinkedIn</a>
              <a href={data.github} target="_blank" rel="noreferrer" className="text-sm">GitHub</a>
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-5xl mx-auto p-6 text-center text-sm text-gray-600">
        Built by {data.name} • Interested in collaboration? Email at <a href={`mailto:${data.email}`} className="underline">{data.email}</a>
      </footer>
    </div>
  );
}

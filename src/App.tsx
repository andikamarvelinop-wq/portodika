import React, { useState, useEffect } from "react";
import { 
  Terminal, Network, ShieldCheck, Mail, Phone, MapPin, 
  Linkedin, Download, Cpu, Laptop, Calendar, User, 
  Database, Award, RefreshCw, Layers, CheckCircle2, ChevronRight, MessageSquare 
} from "lucide-react";

import { portfolioData } from "./data";
import NetworkTopology from "./components/NetworkTopology";
import TerminalPlayground from "./components/TerminalPlayground";
import ProjectViewer from "./components/ProjectViewer";
import CertificatesViewer from "./components/CertificatesViewer";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"portfolio" | "certificates">("portfolio");
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<"topology" | "terminal">("topology");
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCurrentPage("portfolio");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setCurrentPage("portfolio");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const openCertificatesPage = () => {
    setCurrentPage("certificates");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#F3F4F6] font-sans antialiased text-sm selection:bg-emerald-500 selection:text-black">
      
      {/* Dynamic Background Grid lines mimicking visual mapping blueprint */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 z-0" />

      {/* Header Navigation in Post-Lab Poster style */}
      <header className="sticky top-0 z-40 bg-[#070707]/90 backdrop-blur-md border-b border-white/10 flex-none select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage("portfolio")}>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-display font-black tracking-tighter text-2xl text-white">
              ANDIKA.LAB
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-[#10b981] bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 uppercase">
              WIKRAMA NODE // ONLINE
            </span>
          </div>

          {/* Minimalist Nav Link Items with hover opacity animations */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest font-semibold text-white/60">
            <button onClick={() => navigateToSection("profile")} className="hover:text-emerald-400 transition-colors uppercase">About</button>
            <button onClick={() => navigateToSection("lab-simulator")} className="hover:text-emerald-400 transition-colors uppercase">Lab Terminal</button>
            <button onClick={() => navigateToSection("projects")} className="hover:text-emerald-400 transition-colors uppercase">Projects</button>
            <button onClick={() => navigateToSection("skills")} className="hover:text-emerald-400 transition-colors uppercase">Competency</button>
            <button 
              onClick={openCertificatesPage} 
              className={`hover:text-emerald-400 transition-colors uppercase font-black ${currentPage === "certificates" ? "text-emerald-500" : ""}`}
            >
              Certificates
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-5 py-2 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
            >
              Start Connection
            </a>
          </div>
        </div>
      </header>

      {/* Main Structural Body */}
      <main className="relative z-10 max-w-7xl mx-auto border-x border-white/10 bg-[#070707]/40">
        {currentPage === "certificates" ? (
          <CertificatesViewer onBack={() => { setCurrentPage("portfolio"); window.scrollTo({ top: 0 }); }} />
        ) : (
          <>
            {/* HERO SECTION / PROFILE (Grid with Left Vertical side strip) */}
        <section id="profile" className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          
          {/* Vertical Separator Banner (Recipe 5) */}
          <div className="hidden lg:col-span-1 lg:flex items-center justify-center border-r border-white/10 py-16 bg-white/[0.01]">
            <span className="rotate-180 text-[10px] uppercase tracking-[0.6em] font-black opacity-30 text-center flex font-mono" style={{ writingMode: "vertical-rl" }}>
              TKJT // IT ENTHUSIAST // EST 2026
            </span>
          </div>

          {/* Main Hero Space (Recipe 2 styling) */}
          <div className="col-span-1 lg:col-span-11 px-8 md:px-12 py-16 md:py-24 flex flex-col justify-center space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              <div className="space-y-4 flex-1">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block">
                  01 // INTRODUCTION LABS
                </span>
                
                {/* Massive Oversized Bold Heading */}
                <h1 className="font-display font-black text-white text-5xl sm:text-7xl md:text-8xl leading-[0.85] tracking-tighter uppercase">
                  ANDIKA<br />
                  <span className="text-emerald-500">MARVELINO</span>
                </h1>

                <div className="h-0.5 bg-white/10 w-24 my-4" />

                <h2 className="font-display font-bold text-xl md:text-2xl text-slate-100 uppercase tracking-tight">
                  {portfolioData.profile.role}
                </h2>
              </div>

              {/* Ultra-polished Brutalist Profile Photo Frame */}
              <div className="relative group shrink-0 self-center md:self-start">
                <div className="absolute inset-0 bg-emerald-500 translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-350 z-0" />
                <div className="relative z-10 border border-white bg-[#070707] p-1.5 shadow-xl">
                  <img 
                    src="/src/assets/images/andika_real_photo_1781933636114.jpg" 
                    alt="Andika Marvelino Putra" 
                    className="w-32 h-32 md:w-36 md:h-36 object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-crosshair"
                    referrerPolicy="no-referrer"
                  />
                  {/* Tactical status overlay */}
                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm border border-emerald-500/30 px-1 py-0.5 text-[7px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                    NODE // ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <p className="max-w-xl text-slate-400 text-sm md:text-base leading-relaxed font-light">
              {portfolioData.profile.aboutText}
            </p>

            {/* Quick Contact Interactive Badges */}
            <div className="flex flex-wrap gap-2.5 pt-4 font-mono text-xs">
              <button 
                onClick={() => handleCopy(portfolioData.profile.email, "email")}
                className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 hover:border-emerald-500/40 text-slate-300 transition"
                title="Click to copy email address"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-500" />
                <span>{portfolioData.profile.email}</span>
                {copiedText === "email" && <span className="text-emerald-400 text-[10px] ml-1">Copied!</span>}
              </button>

              <button 
                onClick={() => handleCopy(portfolioData.profile.phone, "phone")}
                className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 hover:border-emerald-500/40 text-slate-300 transition"
                title="Click to copy phone number"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-500" />
                <span>{portfolioData.profile.phone}</span>
                {copiedText === "phone" && <span className="text-emerald-400 text-[10px] ml-1">Copied!</span>}
              </button>

              <div className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                <span>{portfolioData.profile.address.split(",").slice(-2).join(",").trim()}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-wrap gap-4">
              <a 
                href="#lab-simulator"
                className="bg-white text-black px-8 py-3.5 font-sans font-black uppercase tracking-tighter text-sm flex items-center gap-3 hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-xl"
              >
                EXPLORE SIMULATION
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>

              <a 
                href={`https://${portfolioData.profile.linkedin}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="px-6 py-3.5 border border-white/20 text-white font-mono uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors"
              >
                Connect on Linkedin
              </a>
            </div>
          </div>

        </section>

        {/* STATS STRIP BANNER */}
        <section className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-black/40 select-none">
          <div className="p-6 md:p-8 border-r border-b md:border-b-0 border-white/10 flex flex-col justify-between">
            <span className="text-[10px] text-[#10b981] font-mono uppercase tracking-widest font-extrabold mb-4">01 // TARGET GRADE</span>
            <div>
              <span className="text-3xl font-display font-black text-white block">2027</span>
              <span className="text-xs text-slate-500 font-mono">TKJT SMK Wikrama</span>
            </div>
          </div>

          <div className="p-6 md:p-8 border-r border-b md:border-b-0 border-white/10 flex flex-col justify-between">
            <span className="text-[10px] text-[#10b981] font-mono uppercase tracking-widest font-extrabold mb-4">02 // DEPLOYED CASE</span>
            <div>
              <span className="text-3xl font-display font-black text-white block">5+ Projects</span>
              <span className="text-xs text-slate-500 font-mono">Full Sandbox Specs</span>
            </div>
          </div>

          <div className="p-6 md:p-8 border-r border-white/10 flex flex-col justify-between">
            <span className="text-[10px] text-[#10b981] font-mono uppercase tracking-widest font-extrabold mb-4">03 // STUNT INDEX</span>
            <div>
              <span className="text-3xl font-display font-black text-white block">5 Active</span>
              <span className="text-xs text-slate-500 font-mono">Cisco & Aguna Course</span>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between">
            <span className="text-[10px] text-[#10b981] font-mono uppercase tracking-widest font-extrabold mb-4">04 // SYSTEMS LAB</span>
            <div>
              <span className="text-3xl font-display font-black text-white block">100% Secure</span>
              <span className="text-xs text-slate-500 font-mono">Telemetry Active</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PLAYGROUND (Dual Tab) */}
        <section id="lab-simulator" className="border-b border-white/10 py-16 md:py-20 px-8 md:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
                02 // INTERACTIVE SYSTEMS SIMULATION
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
                Simulasi Topologi & Shell Control
              </h2>
              <p className="text-sm text-slate-400 mt-1 font-light">
                Jalankan diagnostik paket network virtual atau akses terminal sandbox retro untuk meninjau database portofolio.
              </p>
            </div>

            {/* Premium styled custom tab selector (Poster/Bold theme design style) */}
            <div className="flex bg-white/5 border border-white/15 p-1 rounded-xl">
              <button
                onClick={() => setActiveInteractiveTab("topology")}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition duration-300 ${
                  activeInteractiveTab === "topology" 
                    ? "bg-[#10b981] text-black font-black" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                VLAN Topology
              </button>
              <button
                onClick={() => setActiveInteractiveTab("terminal")}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition duration-300 ${
                  activeInteractiveTab === "terminal" 
                    ? "bg-[#10b981] text-black font-black" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Host Bash Shell
              </button>
            </div>
          </div>

          <div className="mt-8">
            {activeInteractiveTab === "topology" ? (
              <NetworkTopology />
            ) : (
              <TerminalPlayground />
            )}
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="border-b border-white/10 py-16 md:py-20 px-8 md:px-12 space-y-8">
          <div className="pb-6 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
              03 // HIGH FIDELITY DEPLOYMENTS
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
              Case Studies & System Deliverables
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-light">
              Desain topologi routing, virtualisasi hosting, dan monitoring mitigasi cyber security. Klik kartu untuk melihat log report.
            </p>
          </div>

          <ProjectViewer />
        </section>

        {/* TECHNICAL COMPETENCIES & CERTIFICATIONS GRID */}
        <section id="skills" className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          
          {/* Skill List Competency (Left 7 Cols) */}
          <div className="col-span-1 lg:col-span-7 px-8 md:px-12 py-16 md:py-20 border-b lg:border-b-0 lg:border-r border-white/10 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
                04 // CAPABILITY PROFILE
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
                Technical Mastery Index
              </h2>
              <p className="text-sm text-slate-400 mt-1 font-light">
                Evaluasi tingkat persentase kompetensi jaringan inter-VLAN, virtualisasi server, dan analisis log.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="space-y-2 group">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-white tracking-wide uppercase font-semibold">{skill.name}</span>
                    <span className="font-mono text-emerald-400 font-extrabold">{skill.level}%</span>
                  </div>
                  {/* Brutalist minimalist skill bars */}
                  <div className="w-full h-3 bg-black border border-white/10 p-[2px]">
                    <div 
                      className="h-full bg-emerald-500 group-hover:bg-[#10b981] transition-all duration-500" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block">
                    VLAN ZONE: {skill.category.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications (Right 5 Cols) */}
          <div id="certifications" className="col-span-1 lg:col-span-5 px-8 md:px-12 py-16 md:py-20 bg-white/[0.01] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
                  05 // INDUSTRY VERIFICATION
                </span>
                <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight">
                  Credentials Verified
                </h2>
                <p className="text-sm text-slate-400 mt-1 font-light">
                  Sertifikat formal kelulusan kurikulum Cisco dan course eksternal terpercaya.
                </p>
              </div>

              <div className="space-y-4">
                {portfolioData.certifications.slice(0, 3).map((cert, index) => (
                  <div 
                    key={index} 
                    className="bg-black/40 border border-white/10 p-5 rounded-none hover:border-emerald-500/40 transition duration-300 flex items-start gap-4 group"
                  >
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-none shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/40 block">
                        {cert.provider}
                      </span>
                      <h4 className="font-display font-bold text-white text-sm group-hover:text-emerald-400 transition">
                        {cert.title}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.skillsCovered.slice(0, 2).map((skill, i) => (
                          <span key={i} className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5">
                            {skill}
                          </span>
                        ))}
                        {cert.skillsCovered.length > 2 && (
                          <span className="text-[9px] font-mono text-[#10b981] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-bold">
                            +{cert.skillsCovered.length - 2} More
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={openCertificatesPage}
                className="w-full bg-[#10b981] hover:bg-white hover:text-black text-black py-4 px-4 font-sans font-black uppercase tracking-tight text-xs flex items-center justify-center gap-2 transition duration-300 shadow-xl"
              >
                <span>Buka Cabinet Sertifikasi Khusus</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </section>

        {/* EDUCATION & TIMELINE CBT SECTION (Brutalist Style) */}
        <section className="border-b border-white/10 py-16 md:py-20 px-8 md:px-12 space-y-8 bg-black/20">
          <div className="pb-6 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-2">
              06 // ACADEMIC RECORD
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
              Formal Education & CBT Timelines
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-light">
              Rekam jejak kurikulum akademik di SMK Wikrama Bogor terpadu dengan program Competence Based Training (CBT).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* School details column (Left 5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
                <Laptop className="h-4 w-4" />
                <span>FORMAL EDUCATION</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  {portfolioData.education.school}
                </h4>
                <div className="text-xs font-mono text-slate-450 flex items-center gap-2">
                  <span>ACTIVE TERM: {portfolioData.education.period}</span>
                  <span className="text-slate-650">|</span>
                  <span className="text-emerald-400">{portfolioData.education.major}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {portfolioData.education.details}
              </p>
            </div>

            {/* CBT process timeline (Right 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
                <Calendar className="h-4 w-4" />
                <span>COMPETENCE BASED TRAINING timeline</span>
              </div>

              {portfolioData.experiences.map((exp, idx) => (
                <div key={idx} className="bg-black/60 border border-white/10 p-6 rounded-none space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-3">
                    <div>
                      <h4 className="font-display font-bold text-white text-base uppercase">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono text-black bg-[#10b981] font-bold px-3 py-1">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="flex gap-2.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

          </>
        )}
      </main>

      {/* Structured Minimal Footprint footer bar */}
      <footer className="border-t border-white/10 bg-[#070707]/90 py-16 px-8 md:px-12 select-none z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center text-xs text-white/50">
          
          <div className="md:col-span-5 space-y-3">
            <span className="font-display font-black text-white text-lg tracking-tighter uppercase block">
              ANDIKA // MARVELINO
            </span>
            <p className="max-w-sm leading-relaxed text-white/40 font-light">
              High-fidelity interactive systems portfolio built strictly around network planning, server operations, and penetration assessments.
            </p>
          </div>

          {/* Quick references Map links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider font-semibold text-white/50">
            <button onClick={() => navigateToSection("profile")} className="hover:text-emerald-400 transition-colors uppercase">About</button>
            <button onClick={() => navigateToSection("lab-simulator")} className="hover:text-emerald-400 transition-colors uppercase">Labs</button>
            <button onClick={() => navigateToSection("projects")} className="hover:text-emerald-400 transition-colors uppercase">Projects</button>
            <button onClick={() => navigateToSection("skills")} className="hover:text-emerald-400 transition-colors uppercase">Skills</button>
            <button onClick={openCertificatesPage} className="hover:text-emerald-400 transition-colors uppercase">Certificates</button>
          </div>

          {/* Telemetry log systems stats */}
          <div className="md:col-span-3 text-right font-mono text-[10px] space-y-1 opacity-70">
            <div>SYSTEM STATUS: OPTIMAL</div>
            <div>EXPOSURE PORT: 3000 // NODE-ACTIVE</div>
            <div>© 2026 ANDIKA MARVELINO PUTRA.</div>
          </div>

        </div>
      </footer>

    </div>
  );
}

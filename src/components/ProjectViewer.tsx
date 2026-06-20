import React, { useState } from "react";
import { Project, portfolioData } from "../data";
import { 
  Network, Server, Cloud, ShieldCheck, ExternalLink, 
  ChevronRight, Terminal, CheckCircle2, Shield, Calendar 
} from "lucide-react";

export default function ProjectViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["All", "Networking", "System Administration", "Cloud", "Cyber Security"];

  const filteredProjects = selectedCategory === "All" 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Networking": return <Network className="h-4 w-4" />;
      case "System Administration": return <Server className="h-4 w-4" />;
      case "Cloud": return <Cloud className="h-4 w-4" />;
      case "Cyber Security": return <ShieldCheck className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Networking": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "System Administration": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Cloud": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Cyber Security": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-slate-400 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 select-none border-b border-white/10 pb-5">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition duration-300 flex items-center gap-2 ${
              selectedCategory === cat
                ? "bg-[#10b981] text-black font-black"
                : "bg-black/40 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            {cat !== "All" && getCategoryIcon(cat)}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="group cursor-pointer bg-[#0c0c0c] border border-white/10 rounded-none overflow-hidden p-6 hover:border-white/25 hover:bg-black/90 transition-all duration-300 flex flex-col justify-between relative shadow-lg"
          >
            {/* Ambient indicator */}
            <div className="absolute top-0 left-0 w-1 h-full bg-white/5 group-hover:bg-emerald-500 transition duration-300" />
            
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pl-2">
                <span className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-white/30">LAB-0{project.id}</span>
              </div>

              <h4 className="text-lg font-display font-black uppercase text-white group-hover:text-emerald-400 transition duration-300 mb-2 pl-2 tracking-tight">
                {project.title}
              </h4>
              <p className="text-slate-450 text-xs leading-relaxed mb-6 pl-2 font-light">
                {project.description}
              </p>
            </div>

            <div className="pl-2">
              <div className="flex flex-wrap gap-1 mb-5">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className="px-2 py-0.5 text-[9px] font-mono uppercase bg-black border border-white/15 text-slate-400">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono text-white/40">
                    +{project.tech.length - 3} MORE
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono uppercase tracking-widest text-[#10b981] font-bold group-hover:text-emerald-300 transition">
                <span>View Lab Details</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal Dialog Backdrop */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-[#0b0b0b] border border-white/15 rounded-none max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-black/90 px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400`}>
                  {getCategoryIcon(activeProject.category)}
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#10b981] uppercase tracking-[0.2em] block font-bold">
                    Diagnostic Lab Report
                  </span>
                  <h3 className="font-display font-black text-white text-base uppercase tracking-tight">
                    {activeProject.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 px-3 text-white/50 hover:text-white hover:bg-white/5 font-mono text-xs uppercase tracking-widest transition"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[75vh] custom-scroll">
              <div>
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 font-bold">
                  Lab Abstract & Overview
                </h5>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {activeProject.description}
                </p>
              </div>

              {/* Technologies / Tools Used */}
              <div>
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 font-bold">
                  Involved Devices & Technologies
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 text-xs font-mono uppercase bg-black border border-white/10 text-slate-300 flex items-center gap-1.5 font-medium"
                    >
                      <span className="h-1.5 w-1.5 bg-emerald-500" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step by Step Operations */}
              <div>
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 font-bold">
                  Configured Deliverables & Achievements
                </h5>
                <ul className="space-y-3">
                  {activeProject.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Associated CLI Commands */}
              {activeProject.commands && activeProject.commands.length > 0 && (
                <div className="bg-black border border-white/10 p-5 font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-white/40 mb-3 pb-2 border-b border-white/5 font-bold uppercase tracking-widest">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Associated Lab Commands</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeProject.commands.map((cmd, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-200">
                        <span>$ <span className="text-emerald-400">{cmd}</span></span>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest font-semibold">Ready</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-black/40 p-4 border-t border-white/10 px-6 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 text-xs font-mono uppercase tracking-widest bg-white text-black font-black"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
